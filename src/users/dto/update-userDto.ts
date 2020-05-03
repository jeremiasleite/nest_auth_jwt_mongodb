import { IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsString } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsNotEmpty()
    readonly _id: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsNotEmpty()
    @IsOptional()
    readonly username?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsBoolean()
    readonly isActive?: boolean;
}