import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()    
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(6, 30)
    password: string
}