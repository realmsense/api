import { IsString } from "class-validator";

export class LinkDiscordDTO {
    @IsString()
    public code: string;

    // TODO: verify state 
    // @IsString()
    // public state: string;
}