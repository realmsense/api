import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query, Request } from "@nestjs/common";
import { ENV, IPlayer } from "@realmsense/shared";
import { SkipJWTAuth } from "../../auth/auth.constants";
import { RequireAuthKey } from "../../auth/guards/authkey.guard";
import { User } from "../../users/interfaces/user.entity";
import { GetCharacterDTO } from "./dto/get-character.dto";
import { PlayerDto } from "./dto/player.dto";
import { WatchListDTO } from "./dto/watchlist.dto";
import { Character } from "./entities/character.entity";
import { PlayersService } from "./players.service";

@Controller("tracker/players")
export class PlayersController {

    constructor(private playersService: PlayersService) { }

    @Put("")
    @HttpCode(201)
    @RequireAuthKey(ENV.Authkey.Players)
    @SkipJWTAuth()
    public createPlayer(@Body() playerDto: PlayerDto): Promise<void> {
        return this.playersService.createPlayer(playerDto);
    }

    @Get("")
    public searchPlayers(@Query("name") accountName: string): Promise<IPlayer[]> {
        return this.playersService.searchPlayer(accountName);
    }

    @Get("characters")
    public getCharacters(@Body() getCharactersDto: GetCharacterDTO): Promise<Character[]> {
        return this.playersService.getCharacters(getCharactersDto.playerId, getCharactersDto.alive);
    }

    @Get("watchList")
    public getWatchList(@Request() request: any): string[] {
        const user: User = request.user;
        return user?.watchList;
    }

    @Post("watchList")
    public watchListAdd(
        @Request() request: any,
        @Body() watchListDTO: WatchListDTO
    ): Promise<string[]> {
        return this.playersService.addToWatchList(request.user, watchListDTO);
    }

    @Delete("watchList")
    public watchListRemove(
        @Request() request: any,
        @Body() watchListDTO: WatchListDTO
    ): Promise<string[]> {
        return this.playersService.removeFromWatchList(request.user, watchListDTO);
    }

    // @Sse("events")
    // public events(): Observable<MessageEvent> {
    //     return this.playersService.sendEvents();
    // }
}
