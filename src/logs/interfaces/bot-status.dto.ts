import { IBotStatus } from "@realmsense/shared";
import { IsNotEmpty } from "class-validator";

export class BotStatusDTO implements IBotStatus {
    @IsNotEmpty()
    public status: IBotStatus["status"];

    @IsNotEmpty()
    public name: string;
    
    @IsNotEmpty()
    public message: string;

    public time: Date;
}