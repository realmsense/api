import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { IPlayer } from "../../../shared/src";
import { User } from "../../users/interfaces/user.entity";
import { PlayerDto } from "./dto/player.dto";
import { WatchListDTO } from "./dto/watchlist.dto";
import { Account } from "./entities/account.entity";
import { Character } from "./entities/character.entity";

@Injectable()
export class PlayersService {

    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(Character)
        private characterRepository: Repository<Character>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    public async createPlayer(playerDto: PlayerDto): Promise<void> {

        // Account
        const account = new Account(playerDto);
        await this.accountRepository.save(account);

        // Character
        const character = new Character(playerDto);
        character.account = account;

        const existingCharacter = await this.getCharacter(playerDto);
        if (existingCharacter) {
            character.id = existingCharacter.id;
        }
        await this.characterRepository.save(character);
    }

    /**
     * Used to determine if the current Player DTO has a character stored in the Database.
     * This function exists because there is no Unique ID given to characters in the game.
     */
    private async getCharacter(playerDto: PlayerDto): Promise<Character | null> {
        const characters = await this.characterRepository.find({
            where: {
                alive: true,
                objectType: playerDto.objectType // class must be equal
            }
        });

        let returnCharacter: Character | null = null;

        for (const character of characters) {

            // Player can not remove backpack
            if (!playerDto.hasBackpack && character.hasBackpack) continue;

            // Player can not lose xp
            if (playerDto.exp < character.exp) continue;

            // Player's stats can not be less
            if (playerDto.dexterity < character.dexterity
                || playerDto.attack < character.attack
                || playerDto.defense < character.defense
                || playerDto.vitality < character.vitality
                || playerDto.wisdom < character.wisdom
                || playerDto.speed < character.speed
            ) {
                continue;
            }

            // Exalts can not be less
            if (playerDto.exaltedDexterity < character.exaltedDexterity
                || playerDto.exaltedAttack < character.exaltedAttack
                || playerDto.exaltedDefense < character.exaltedDefense
                || playerDto.exaltedVitality < character.exaltedVitality
                || playerDto.exaltedWisdom < character.exaltedWisdom
                || playerDto.exaltedSpeed < character.exaltedSpeed
            ) {
                continue;
            }

            // If outfits match most likely the right character
            if (character.tex1 == playerDto.tex1 && character.tex2 == playerDto.tex2) {
                return character;
            }

            returnCharacter = character;
        }

        return returnCharacter;
    }

    public async searchPlayer(accountName: string): Promise<IPlayer[]> {

        const accounts = await this.accountRepository.find({
            // relations: ["characters"],
            where: {
                name: Raw(alias =>`LOWER(${alias}) LIKE :value`, { value: `%${accountName.toLowerCase()}%` })
            }
        });

        const players: IPlayer[] = [];

        for (const account of accounts) {

            const character = await this.characterRepository.findOne({
                where: {
                    account: { playerID: account.playerID },
                    alive: true
                },
                // relations: ["account"],
                order: {
                    updatedTime: "DESC"
                }
            });
            
            if (!character) continue;

            const player: IPlayer = {
                ...account,
                ...character  
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            player.updatedTime = player.updatedTime.getTime();
            players.push(player);
        }

        return players;
    }

    public async getCharacters(playerId: number, alive: boolean): Promise<Character[]> {
        const characters = await this.characterRepository.find({
            where: {
                account: { playerID: playerId },
                alive: alive
            },
            relations: ["account"]
        });
        return characters;
    }

    public async addToWatchList(user: User, watchListDTO: WatchListDTO): Promise<string[]> {
        if (user.watchList.includes(watchListDTO.playerName)) {
            return user.watchList;
        }

        user.watchList.push(watchListDTO.playerName);
        await this.userRepository.save(user);
        return user.watchList;
    }

    public async removeFromWatchList(user: User, watchListDTO: WatchListDTO): Promise<string[]> {
        const index = user.watchList.findIndex((value) => value == watchListDTO.playerName);
        if (index == -1) {
            return user.watchList;
        }

        user.watchList.splice(index, 1);
        await this.userRepository.save(user);
        return user.watchList;
    }

}