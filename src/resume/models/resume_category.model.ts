import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
  } from 'sequelize-typescript';
  
  import { Resume } from './resume.model';
  import { Category } from 'src/category/category.model';
  
  interface ResumeCategoryCreationAttribute {
    resumeId: string;
    categoryId: string
  }
  
  @Table({ tableName: 'resume_category' })
  export class ResumeCategory extends Model<ResumeCategory, ResumeCategoryCreationAttribute> {
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

    @ForeignKey(() => Category)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    categoryId: string;
  
   
  
    @BelongsTo(() => Resume)
    resume: Resume;
  }
  