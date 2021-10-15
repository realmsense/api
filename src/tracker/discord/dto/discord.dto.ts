import { IsNotEmpty } from "class-validator";

export class PlayerLocationDto {
    @IsNotEmpty()
    public name: string;
}

export class RealmInfoDto {
    @IsNotEmpty()
    public serverName: string;

    @IsNotEmpty()
    public realmName: string;
}
