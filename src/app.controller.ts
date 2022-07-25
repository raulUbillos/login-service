import { Controller, Get, Req, UseGuards, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {v4} from 'uuid';
import { AppService } from './app.service';

@Controller('authentication')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req){
    let user = await this.appService.findUser(req.user);
    if(user){
      return {
        id: user.userId,
        accessToken:req.user.accessToken,
        refreshToken:req.user.refreshToken,
        isGoogleAuthenticated: req.user.isGoogleAuthenticated
      }
    }else{
      const inserted = await this.appService.createUser({
        userId:v4(),
        isGoogleAuthenticated:req.user.isGoogleAuthenticated,
        username:req.user.username,
        profileId:req.user.profileId,
        email: req.user.email
      });
      
      return {
        id: inserted.identifiers[0].userId,
        accessToken:req.user.accessToken,
        refreshToken:req.user.refreshToken,
        isGoogleAuthenticated: req.user.isGoogleAuthenticated
      }
    }
  }
}
