import { Injectable } from "@nestjs/common";
import { PlayerDto } from "./dto/player.dto";
import { IPlayer } from "@realmsense/types";
import { Account } from "./entities/account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Character } from "./entities/character.entity";

@Injectable()
export class PlayersService {

    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(Character)
        private characterRepository: Repository<Character>,
    ) { }

    public async createPlayer(player: PlayerDto): Promise<void> {

        // Account
        const account = new Account(player);
        await this.accountRepository.save(account);

        // Character
        const character = new Character(player);
        character.account = account;

        const existingCharacter = await this.getCharacter(player);
        if (existingCharacter) {
            character.id = existingCharacter.id;
        }
        await this.characterRepository.save(character);
    }

    /**
     * Used to determine if the current Player DTO has a character stored in the Database.
     * This function exists because there is no Unique ID given to characters in the game.
     */
    private async getCharacter(player: PlayerDto): Promise<Character | null> {
        const characters = await this.characterRepository.find({
            where: {
                alive: true,
                objectType: player.objectType // class must be equal
            }
        });

        let returnCharacter: Character = null;

        for (const character of characters) {

            // Player can not remove backpack
            if (!player.hasBackpack && character.hasBackpack) continue;

            // Player can not lose xp
            if (player.exp < character.exp) continue;

            // Player's stats can not be less
            if (player.dexterity < character.dexterity
                || player.attack < character.attack
                || player.defense < character.defense
                || player.vitality < character.vitality
                || player.wisdom < character.wisdom
                || player.speed < character.speed
            ) {
                continue;
            }

            // Exalts can not be less
            if (player.exaltedDexterity < character.exaltedDexterity
                || player.exaltedAttack < character.exaltedAttack
                || player.exaltedDefense < character.exaltedDefense
                || player.exaltedVitality < character.exaltedVitality
                || player.exaltedWisdom < character.exaltedWisdom
                || player.exaltedSpeed < character.exaltedSpeed
            ) {
                continue;
            }

            // If outfits match most likely the right character
            if (character.tex1 == player.tex1 && character.tex2 == player.tex2) {
                return character;
            }

            returnCharacter = character;
        }

        return returnCharacter;
    }

    public async searchAccounts(accountName: string): Promise<Account[]> {
        const accounts = await this.accountRepository.find({
            where: {
                name: Like(`%${accountName}%`)
            }
        });
        return accounts;
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
}