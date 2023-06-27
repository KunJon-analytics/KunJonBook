import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { __prod__ } from "../constants";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Chat } from "../entities/Chat";
import { Message } from "../entities/Message";
import { UsersFactory } from "../seedings/factories/user.factory";
import { ChatsFactory } from "../seedings/factories/chat.factory";
import { MessagesFactory } from "../seedings/factories/message.factory";
import { PostsFactory } from "../seedings/factories/post.factory";
import MainSeeder from "../seedings/seeds/main.seeder";

dotenv.config();

const { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: DATABASE_HOST,
  port: 5432,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: "kunjonbook",
  entities: [User, Post, Chat, Message],
  synchronize: true,
  logging: !__prod__,
  subscribers: ["dist/subscriber/*.js"],
  migrations: ["dist/migration/*.js"],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PostsFactory, MessagesFactory, ChatsFactory],
  seeds: [MainSeeder],
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
