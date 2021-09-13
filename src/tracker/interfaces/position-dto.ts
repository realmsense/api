import { IsNumber } from "class-validator";

export interface WorldPosData {
    x: number;
    y: number;
}

export class WorldPosDataDTO implements WorldPosData {
    @IsNumber()
    public x: number;

    @IsNumber()
    public y: number;
}