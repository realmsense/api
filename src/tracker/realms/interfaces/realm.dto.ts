import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { IRealm, IServer, IWorldPosData } from "../../../../shared/src";
import { ServerDTO } from "../../interfaces/server.dto";
import { WorldPosDataDTO } from "../../interfaces/worldposdata.dto";

export class RealmDto implements IRealm {
    @IsString()
    public name: string;

    @IsNumber()
    public openedTime: number;

    @IsNumber()
    public objectID: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => WorldPosDataDTO)
    public pos: IWorldPosData;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ServerDTO)
    public server: IServer;

    @IsNumber()
    public players: number;

    @IsNumber()
    public maxPlayers: number;
    
    @IsNumber()
    public queue: number;
    
    @IsNumber()
    public updatedTime: number;

    @IsString()
    @IsOptional()
    public ip?: string;

    @IsNumber()
    @IsOptional()
    public heroesLeft?: number;
}