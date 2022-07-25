import { PassportStrategy } from "@nestjs/passport";
import {Strategy,VerifyCallback} from 'passport-google-oauth20';
import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import {v4} from 'uuid';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_DEFAULT_REDIRECT_URL,
            scope: ['email', 'profile']
        })
    }

    authorizationParams(): { [key: string]: string; } {
        return ({
          access_type: 'offline',
          prompt: 'consent'
        });
    };

    async authenticate(req, options) {
        if(req.query.redirectTo)
            this._callbackURL= req.query.redirectTo
        super.authenticate(req,options);
    }

    async validate(accessToken: string, refreshToken: string, profile:any, done: VerifyCallback) : Promise<User>{
        const {name, emails, id} = profile;
        const user =  {
            isGoogleAuthenticated:true,
            username:name.givenName,
            profileId:id,
            email: emails[0].value,
            accessToken,
            refreshToken
        }

        return user;
    }
}