import { IWorldPosData } from "@realmsense/shared";
import { IsNumber } from "class-validator";

export class WorldPosDataDTO implements IWorldPosData {
    @IsNumber()
    public x: number;

    @IsNumber()
    public y: number;
}