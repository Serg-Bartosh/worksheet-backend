import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    login: string;

    @IsString()
    @MinLength(6, { message: 'Password is too short (min 6 characters)' })
    password: string;
}