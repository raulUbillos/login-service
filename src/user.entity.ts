import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn({type:"uuid"})
    userId?: string;

    @Column()
    username: string;

    @Column({default:""})
    password?: string;

    @Column()
    email: string;

    @Column()
    profileId: string;

    @Column()
    isGoogleAuthenticated: boolean;
}