import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Int,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { In } from "typeorm";

import { MyContext } from "../types";
import { Chat, ChatInput } from "../entities/Chat";
import { User } from "../entities/User";
import logger from "../helpers/logger";
import { Message } from "../entities/Message";

@Resolver(Chat)
export class ChatResolver {
  @FieldResolver(() => Message, { nullable: true })
  lastMessage(@Root() chat: Chat): Message {
    return chat.messages.sort((a, b) => b.id - a.id)[0];
  }

  @Query(() => [Chat], { nullable: true })
  async chats(@Ctx() { dataSource }: MyContext): Promise<Chat[]> {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: 1 },
      relations: { chats: { messages: true, users: true } },
    });
    if (!user) {
      return [];
    }
    const chats = user.chats;
    return chats;
  }

  @Query(() => Chat, { nullable: true })
  async chat(
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { dataSource }: MyContext
  ): Promise<Chat | null> {
    const chatRepository = dataSource.getRepository(Chat);
    const chat = await chatRepository.findOne({
      where: { id: chatId },
      relations: { messages: { user: true }, users: true },
    });
    return chat;
  }

  @Mutation(() => Chat)
  async addChat(
    @Arg("chat") chat: ChatInput,
    @Ctx() { dataSource }: MyContext
  ): Promise<Chat> {
    const chatRepository = dataSource.getRepository(Chat);
    const userRepository = dataSource.getRepository(User);

    const users = await userRepository.find({
      where: { id: In(chat.users) },
    });
    if (!users.length) {
      throw new Error("Users not found");
    }

    const newChat = new Chat();
    newChat.users = [...newChat.users, ...users];

    const savedChat = chatRepository.save(newChat);

    logger.log({ level: "info", message: "Chat was created" });
    return savedChat;
  }
}
