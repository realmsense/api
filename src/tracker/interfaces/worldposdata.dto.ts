import { IsNumber } from "class-validator";
import { IWorldPosData } from "@realmsense/types";

export class WorldPosDataDTO implements IWorldPosData {
    @IsNumber()
    public x: number;

    @IsNumber()
    public y: number;
}