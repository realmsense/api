import { IsNumber } from "class-validator";
import { IWorldPosData } from "../../../shared/src";

export class WorldPosDataDTO implements IWorldPosData {
    @IsNumber()
    public x: number;

    @IsNumber()
    public y: number;
}