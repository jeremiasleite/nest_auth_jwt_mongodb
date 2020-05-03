
export class ResponseUserDto {    
    
    _id: string
    username: string    
    email: string
    isActive: boolean
    createdAt: Date  
    
    constructor(_id: string, username: string, email: string, isActive: boolean, createdAt: Date){
        this._id =_id;
        this.username = username;
        this.email = email;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}