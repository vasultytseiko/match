import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
  } from 'sequelize-typescript';
  import { User } from 'src/user/models/user.model';
  import { Vacancy } from './vacancy.model';
  
  interface ResponseCreationAttribute {
    vacancyId: string;
    userId: string;
    description: string;
    file: string;
    resume: string;
  }
  
  @Table({ tableName: 'response' })
  export class Response  extends Model<Response , ResponseCreationAttribute> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      unique: true,
      primaryKey: true,
    })
    id: string;
  
    @ForeignKey(() => Vacancy)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    vacancyId: string;

    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    userId: string;
  

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    description: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    file: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    resume: string;
  
  
    
  }
  

