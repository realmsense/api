import { IsBoolean, IsNumber } from "class-validator";

export class GetCharacterDTO {
    @IsNumber()
    public playerId: number;

    @IsBoolean()
    public alive: boolean;
}