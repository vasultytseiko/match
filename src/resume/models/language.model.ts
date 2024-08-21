import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
  } from 'sequelize-typescript';
  
  import { Resume } from './resume.model';
  
  interface LanguageCreationAttribute {
    resumeId: string;
    value: string;
    level: string;
  }
  
  @Table({ tableName: 'language' })
  export class Language extends Model<Language, LanguageCreationAttribute> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      unique: true,
      primaryKey: true,
    })
    id: string;
  
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
    value: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    level: string;
  
    @BelongsTo(() => Resume)
    resume: Resume;
  }
  