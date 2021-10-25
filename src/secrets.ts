import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const Discord = {
    API_URL     : "https://discord.com/api/v9",
    ClientID    : "880231286579527680",
    ClientSecret: "oLjM_PGL4AW9MdInHbu1h-fprD0ye2VZ",
    RedirectURI : "http://127.0.0.1:4200/dashboard/profile/link-discord"
};

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
    synchronize: true,
    // logging: true
};