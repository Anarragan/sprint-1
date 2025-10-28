import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date_start: Date;

  @Column()
  id_status: number;

  @Column()
  id_priority: number;

  @Column()
  id_created_by: number;
}
