import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // async getUsers(): Promise<UserDto[]> {
  //   return this.usersService.getUsers();
  // }
}
