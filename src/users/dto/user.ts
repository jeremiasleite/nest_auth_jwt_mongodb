import { Document } from 'mongoose';

export class User extends Document {

    username: string
    email: string    
    password: string
    isActive: boolean

    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }
}