import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { Resume } from './resume.model';

interface ExperienceCreationAttribute {
  resumeId: string;
  position: string;
  description: string;
  companyName: string;
  city: string;
  periodStart: Date;
  periodEnd: Date;
}

@Table({ tableName: 'experience' })
export class Experience extends Model<Experience, ExperienceCreationAttribute> {
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
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  companyName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  periodStart: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  periodEnd: Date;

  @BelongsTo(() => Resume)
  resume: Resume;
}
