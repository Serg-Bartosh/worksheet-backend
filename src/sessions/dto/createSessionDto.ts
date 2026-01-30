
import { IsInt } from 'class-validator';

export class CreateSessionDto {
    @IsInt()
    userId: number;
}