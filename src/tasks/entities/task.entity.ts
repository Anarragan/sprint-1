import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn, 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: string; // pending | complete

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.tasks, {
    eager: false,      
    onDelete: 'CASCADE',  
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;
}
