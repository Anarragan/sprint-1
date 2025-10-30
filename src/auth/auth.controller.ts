import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ) {}

    @Post('register')
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'User logged successfully' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
