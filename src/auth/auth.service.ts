import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if(existing) throw new BadRequestException('Email already in use');

        const hashed = await bcrypt.hash(dto.password, 10)
        const user = await this.usersService.create({
            ...dto,
            password: hashed,
        });

        return { message: 'User registered', user};
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new BadRequestException('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new BadRequestException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { access_token: token }

    }

}
