import { IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name!: string;

    @IsString()
    @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'Цвет должен быть в формате HEX (например, #ff5733 или #f53)',
    })
    color!: string;

}

