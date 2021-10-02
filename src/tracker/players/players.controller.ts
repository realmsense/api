import { Body, Controller, Get, HttpCode, Put, Query} from "@nestjs/common";
import { AuthKeyConstants, SkipJWTAuth } from "../../auth/auth.constants";
import { RequireAuthKey } from "../../auth/guards/authkey.guard";
import { PlayerDto } from "./dto/player.dto";
import { PlayersService } from "./players.service";
import { Character } from "./entities/character.entity";
import { GetCharacterDTO } from "./dto/get-character.dto";
import { IPlayer } from "@realmsense/types";

@Controller("tracker/players")
export class RealmsController {

    constructor(private playersService: PlayersService) { }

    @Put("")
    @HttpCode(201)
    @RequireAuthKey(AuthKeyConstants.Players)
    @SkipJWTAuth()
    public createPlayer(@Body() playerDto: PlayerDto): Promise<void> {
        return this.playersService.createPlayer(playerDto);
    }

    @Get("search")
    @SkipJWTAuth()
    public search(@Query("name") accountName: string): Promise<IPlayer[]> {
        return this.playersService.searchPlayer(accountName);
    }

    @Get("characters")
    @RequireAuthKey(AuthKeyConstants.Players)
    @SkipJWTAuth()
    public getCharacters(@Body() getCharactersDto: GetCharacterDTO): Promise<Character[]> {
        return this.playersService.getCharacters(getCharactersDto.playerId, getCharactersDto.alive);
    }

    // @Sse("events")
    // public events(): Observable<MessageEvent> {
    //     return this.playersService.sendEvents();
    // }
}
