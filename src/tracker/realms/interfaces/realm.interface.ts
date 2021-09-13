import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested, IsNumber, IsString, IsOptional } from "class-validator";
import { WorldPosData, WorldPosDataDTO } from "src/tracker/interfaces/position-dto";
import { Server, ServerDTO } from "src/tracker/interfaces/server.interface";

export interface Realm {
    name: string;
    openedTime: number;
    objectID: number;
    pos: WorldPosData;
    server: Server,
    players: number,
    maxPlayers: number,

    queue: number,
    updatedTime: number,

    ip?: string,
    heroesLeft?: number
}

export class RealmDto implements Realm {
    @IsString()
    public name: string;

    @IsNumber()
    public openedTime: number;

    @IsNumber()
    public objectID: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => WorldPosDataDTO)
    public pos: WorldPosData;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ServerDTO)
    public server: Server;

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