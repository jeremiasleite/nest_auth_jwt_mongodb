import { Controller, Get, UseGuards, Post, Body, Param, Delete, Put, ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { User } from './interfaces/user.interface';
import { ResponseUserDto } from './dto/response-userDto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)    
    async findAll(): Promise<User[]>{
        return await this.usersService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)          
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)      
    async findOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)   
    async update(@Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string){
        return this.usersService.remove(id)
    }

}
