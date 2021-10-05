import { IsString } from "class-validator";

export class WatchListDTO {
    @IsString()
    public playerName: string;
}