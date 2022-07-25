import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async findUser(user: User){
    let userFinded: User;
    if(user.isGoogleAuthenticated){
      userFinded = await this.userRepository.findOneBy({
        email: user.email,
        profileId: user.profileId
      });
    }else{
      userFinded = await this.userRepository.findOneBy({
        userId: user.userId
      });
    } 
    return userFinded;
  }

  async createUser(user:User){
    const userCreated = await this.userRepository.insert(user);
    return userCreated;
  }
}
