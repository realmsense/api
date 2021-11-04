import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1636027562585 implements MigrationInterface {
    public name = "CreateDatabase1636027562585";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `rs_default`.`build` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `file_size` int NOT NULL, `file_path` varchar(255) NOT NULL, `enabled` tinyint NOT NULL DEFAULT 1, `typeName` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rs_default`.`build_type` (`name` varchar(255) NOT NULL, `webhook_url` varchar(255) NOT NULL, `embed_template` longtext NOT NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rs_tracker`.`character` (`id` int NOT NULL AUTO_INCREMENT, `objectType` int NOT NULL, `updatedTime` timestamp NOT NULL, `alive` tinyint NOT NULL DEFAULT 1, `server` text NOT NULL, `location` varchar(255) NOT NULL, `level` int NOT NULL DEFAULT '0', `exp` int NOT NULL DEFAULT '0', `nextLevelExp` int NOT NULL DEFAULT '0', `nextClassQuestFame` int NOT NULL DEFAULT '0', `xpBoosted` int NOT NULL DEFAULT '0', `xpTimer` int NOT NULL DEFAULT '0', `lootDropTimer` int NOT NULL DEFAULT '0', `lootTierTimer` int NOT NULL DEFAULT '0', `maxHP` int NOT NULL DEFAULT '0', `hp` int NOT NULL DEFAULT '0', `maxMP` int NOT NULL DEFAULT '0', `mp` int NOT NULL DEFAULT '0', `dexterity` int NOT NULL DEFAULT '0', `attack` int NOT NULL DEFAULT '0', `defense` int NOT NULL DEFAULT '0', `vitality` int NOT NULL DEFAULT '0', `wisdom` int NOT NULL DEFAULT '0', `speed` int NOT NULL DEFAULT '0', `exaltedBonusDamage` int NOT NULL DEFAULT '0', `exaltedHP` int NOT NULL DEFAULT '0', `exaltedMP` int NOT NULL DEFAULT '0', `exaltedDexterity` int NOT NULL DEFAULT '0', `exaltedAttack` int NOT NULL DEFAULT '0', `exaltedDefense` int NOT NULL DEFAULT '0', `exaltedSpeed` int NOT NULL DEFAULT '0', `exaltedVitality` int NOT NULL DEFAULT '0', `exaltedWisdom` int NOT NULL DEFAULT '0', `potions` text NOT NULL DEFAULT '[]', `inventory` text NOT NULL DEFAULT '[]', `backpack` text NOT NULL DEFAULT '[]', `hasBackpack` tinyint NOT NULL DEFAULT 0, `texture` int NOT NULL DEFAULT '0', `tex1` int NOT NULL DEFAULT '0', `tex2` int NOT NULL DEFAULT '0', `accountPlayerID` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rs_tracker`.`account` (`playerID` int NOT NULL, `name` varchar(255) NOT NULL DEFAULT 'None', `accountID` varchar(255) NOT NULL, `supporter` tinyint NOT NULL DEFAULT 1, `supporterPoints` int NOT NULL DEFAULT '0', `numStars` int NOT NULL DEFAULT '0', `accountFame` int NOT NULL DEFAULT '0', `credits` int NOT NULL DEFAULT '0', `fortuneToken` int NOT NULL DEFAULT '0', `currentFame` int NOT NULL DEFAULT '0', `legendaryRank` int NOT NULL DEFAULT '0', `forgeFire` int NOT NULL DEFAULT '0', `_119` int NOT NULL DEFAULT '0', `guildName` varchar(255) NOT NULL DEFAULT '', `guildRank` int NOT NULL DEFAULT '-1', PRIMARY KEY (`playerID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rs_customers`.`discord_link` (`id` int NOT NULL AUTO_INCREMENT, `userId` varchar(255) NOT NULL, `access_token` varchar(255) NOT NULL, `token_type` varchar(255) NOT NULL, `expires_in` int NOT NULL, `refresh_token` varchar(255) NOT NULL, `scope` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rs_customers`.`user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `permissions` text NOT NULL DEFAULT '[]', `enabled` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp NOT NULL, `watchList` text NOT NULL DEFAULT '[]', `discordLinkId` int NULL, UNIQUE INDEX `REL_6c3799e038faeb7cd074272acf` (`discordLinkId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` ADD CONSTRAINT `FK_59b313fb09be0a97b3f2a756760` FOREIGN KEY (`accountPlayerID`) REFERENCES `rs_tracker`.`account`(`playerID`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` ADD CONSTRAINT `FK_6c3799e038faeb7cd074272acfb` FOREIGN KEY (`discordLinkId`) REFERENCES `rs_customers`.`discord_link`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` DROP FOREIGN KEY `FK_6c3799e038faeb7cd074272acfb`");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` DROP FOREIGN KEY `FK_59b313fb09be0a97b3f2a756760`");
        await queryRunner.query("DROP INDEX `REL_6c3799e038faeb7cd074272acf` ON `rs_customers`.`user`");
        await queryRunner.query("DROP TABLE `rs_customers`.`user`");
        await queryRunner.query("DROP TABLE `rs_customers`.`discord_link`");
        await queryRunner.query("DROP TABLE `rs_tracker`.`account`");
        await queryRunner.query("DROP TABLE `rs_tracker`.`character`");
        await queryRunner.query("DROP TABLE `rs_default`.`build_type`");
        await queryRunner.query("DROP TABLE `rs_default`.`build`");
    }
}
