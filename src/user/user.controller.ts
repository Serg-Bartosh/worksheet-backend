import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUserDto";
import { UserService } from "./user.service";
import { LoginUserDto } from "./dto/loginUserDto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create-user')
  async create_user(@Body() dto: CreateUserDto) {
    return await this.userService.register(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return await this.userService.login(dto);
  }
}