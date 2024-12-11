export class UserDto {
  email: string;
  password: string;

  constructor(data: UserDto) {
    this.email = data.email;
    this.password = data.password;
  }
}
