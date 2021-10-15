import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/interfaces/user.entity";

@Injectable()
export class DiscordService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    public async getUser(discordId: string): Promise<User | undefined> {
        return this.usersRepository.findOne({where: {
            discordId: discordId
        }});
    }

}