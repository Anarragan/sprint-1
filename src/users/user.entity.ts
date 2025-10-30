import { Task } from "src/tasks/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}