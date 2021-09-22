import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const Database = {
    Default: "rs_default",
    Tracker: "rs_tracker",
    Customers: "rs_customers",
};

export const DatabaseConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "phpmyadmin.extacy.cc",
    port: 3306,
    username: "realmsense_test",
    password: "Wzt8]aou@.GjcBci",
    database: Database.Default,
    entities: ["dist/src/**/*.entity{.ts,.js}"],
    synchronize: true
};