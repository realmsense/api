import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalEmail1637443250878 implements MigrationInterface {
    public name = "OptionalEmail1637443250878";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` DROP FOREIGN KEY `FK_59b313fb09be0a97b3f2a756760`");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` CHANGE `updatedTime` `updatedTime` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` CHANGE `accountPlayerID` `accountPlayerID` int NULL");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` DROP FOREIGN KEY `FK_6c3799e038faeb7cd074272acfb`");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` CHANGE `email` `email` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` CHANGE `createdAt` `createdAt` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` CHANGE `discordLinkId` `discordLinkId` int NULL");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` ADD CONSTRAINT `FK_59b313fb09be0a97b3f2a756760` FOREIGN KEY (`accountPlayerID`) REFERENCES `rs_tracker`.`account`(`playerID`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` ADD CONSTRAINT `FK_6c3799e038faeb7cd074272acfb` FOREIGN KEY (`discordLinkId`) REFERENCES `rs_customers`.`discord_link`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` DROP FOREIGN KEY `FK_6c3799e038faeb7cd074272acfb`");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` DROP FOREIGN KEY `FK_59b313fb09be0a97b3f2a756760`");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` CHANGE `discordLinkId` `discordLinkId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` CHANGE `createdAt` `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` CHANGE `email` `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `rs_customers`.`user` ADD CONSTRAINT `FK_6c3799e038faeb7cd074272acfb` FOREIGN KEY (`discordLinkId`) REFERENCES `rs_customers`.`discord_link`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` CHANGE `accountPlayerID` `accountPlayerID` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` CHANGE `updatedTime` `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `rs_tracker`.`character` ADD CONSTRAINT `FK_59b313fb09be0a97b3f2a756760` FOREIGN KEY (`accountPlayerID`) REFERENCES `rs_tracker`.`account`(`playerID`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
