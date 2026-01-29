import { IsInt, Min } from 'class-validator';

export class OptionDto {
    @IsInt()
    @Min(1)
    option_id: number;
}