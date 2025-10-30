import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../users/user.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ default: false })
    completed: boolean;

    @ManyToOne(() => User, (user) => user.tasks, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id' })
    userId: number;
}