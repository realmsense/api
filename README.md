# realmsense api
[![Build Status](https://drone.extacy.cc/api/badges/realmsense/api/status.svg)](https://drone.extacy.cc/realmsense/api)


## Setup

`./ormconfig.json`:
```json
{
    "type": "mysql",
    "host": "",
    "port": 3306,
    "username": "",
    "password": "",
    "database": "",
    "entities": [ "dist/**/*.entity{.ts,.js}" ],
    "synchronize": true
}
```