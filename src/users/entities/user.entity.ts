import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn, 
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}
