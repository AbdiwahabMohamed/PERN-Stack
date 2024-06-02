export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  location: string;
  address: string;
  phone: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
