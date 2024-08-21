import {
  Injectable,
  BadRequestException,
  NotFoundException,
  BadGatewayException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/CompanyDto/create-company.dto';
import { UpdateCompanyDto } from './dto/CompanyDto/update-company.dto';
import { Company } from './models/company.model';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { Members } from './models/members.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.model';
import { CreateMembersDto } from './dto/MembersDto/create-members.dto';
import { ResumeService } from 'src/resume/resume.service';
import { Offer } from './models/offer.model';
import { CreateOfferDto } from './dto/OfferDto/create-offer.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyRepository: typeof Company,
    @InjectModel(Members) private readonly membersRepository: typeof Members,
    @InjectModel(Offer) private readonly offerRepository: typeof Offer,

    private readonly userService: UserService,
    private readonly resumeService: ResumeService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const {members, ...companyData} = createCompanyDto;
    const isUnique = await this.isUniqueCompanyName(
      companyData.companyName,
    );

    if (!isUnique) {
      throw new BadRequestException({
        message: 'Such company name has already exist',
      });
    }
    const company = await this.companyRepository.create(companyData);

    if(members) {
      const isUser = await this.userService.findOne(members.userId);
      if (!isUser) {
        throw {
          message: 'such user is not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const membersData = {
        ...members,
        companyId: company.id,
      }
      await this.membersRepository.create(membersData);
    }

    return {company, members};
  }

  async createOffer(createOfferDto: CreateOfferDto, userId: string, resumeId: string) {
    try {
      const company = await this.findOneByUser(
        userId,
        createOfferDto.companyId,
      );
      const resume = this.resumeService.findOne(resumeId);

      const offerData = {
        ...createOfferDto,
        resumeId: resumeId,
      }
  
      const offer = await this.offerRepository.create(offerData);
   
      return offer;
    } catch(error) {
      ErrorHandler(error);
    }
  }

  async findOneOffer(id: string) {
    try {
      const offer = await this.offerRepository.findByPk(id);
      if (!offer) {
        throw { message: 'offer not found', status: HttpStatus.NOT_FOUND };
      }
      return offer;
    } catch (error) {
      ErrorHandler(error)
    }
  }

  async addMember(id: string, createMembersDto: CreateMembersDto) {
    const comp = await this.findOne(id);
    const isUser = await this.userService.findOne(createMembersDto.userId);
    if (!isUser) {
      throw {
        message: 'such user is not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    const isUserInCompany = await this.membersRepository.findOne({
      where: { userId: createMembersDto.userId, companyId: id },
    });
    if (isUserInCompany) {
      throw new BadRequestException({ message: 'Such user alredy in this company' })
    }

    const membersData = {
      ...createMembersDto,
      companyId: id,
    }

    await this.membersRepository.create(membersData);

    return membersData;
  }

  async findAll() {
    const company = await this.companyRepository.findAll({
      include: [{ 
        model: User, 
        as: 'users',
        attributes: { exclude: ['password'] }
      }],
    });
    return company;
  }

  async findOne(id: string) {
    try {
      const company = await this.companyRepository.findByPk(id, {
        include: [{ 
          model: User, 
          as: 'users',
          attributes: { exclude: ['password'] }
        }],
      });
      if (!company) {
        throw { message: 'Company not found', status: HttpStatus.NOT_FOUND };
      }
      return company;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async findOneByUser(userId: string, companyId: string) {
    const company = await this.companyRepository.findOne({
      where: { userId, id: companyId },
    });
    if (!company) {
      throw { message: 'Company not found or you do now own this company', status: HttpStatus.NOT_FOUND };
    }
    return company;
  }

  async findOneMembers(companyId: string) {
    try {
      const members = await this.membersRepository.findOne({
        where: { companyId },
      });
      if (!members) {
        throw new Error('members not found');
      }
      return members;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.findOne(updateCompanyDto.id);
      if (!company) {
        throw { message: 'company not found',status: HttpStatus.NOT_FOUND };
      }
      const { members, ...companyData } = updateCompanyDto;
      const membersToUpdate = await this.findOneMembers(updateCompanyDto.id);
      await membersToUpdate.update(members);
      await company.update(companyData);
      return {company, members};
    } catch(error) {
      ErrorHandler(error);
    }
  }

  async remove(id: string) {
    await this.companyRepository.destroy({ where: { id } });
    return { message: 'company deleted successfuly' };
  }

  private async isUniqueCompanyName(companyName: string): Promise<boolean> {
    const isUnique = await this.companyRepository.findOne({
      where: { companyName },
    });
    if (isUnique) {
      return false;
    }
    return true;
  }
}
