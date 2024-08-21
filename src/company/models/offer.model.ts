import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
  } from 'sequelize-typescript';

import { Company } from 'src/company/models/company.model';
import { Resume } from '../../resume/models/resume.model';
  
  interface OfferCreationAttribute { 
    companyId: string;
    resumeId: string;
    description: string;
  }
  
  @Table({ tableName: 'offer' })
  export class Offer extends Model<Offer, OfferCreationAttribute> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      unique: true,
      primaryKey: true,
    })
    id: string;
  
    @ForeignKey(() => Company)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    companyId: string;

    @ForeignKey(() => Resume)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    resumeId: string;
  

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    description: string;
  }
  

