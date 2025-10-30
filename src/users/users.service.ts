import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    findById(id: number) {
        return this.userRepo.findOne({ where: { id } });
    }

    findByEmail(email: string) {
        return this.userRepo.findOne({ where: { email } });
    }

    create(data: Partial<User>) {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }
}
