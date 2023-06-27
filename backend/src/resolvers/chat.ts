import { Resolver, Query, Arg, Ctx, Int, Mutation } from "type-graphql";
import { In } from "typeorm";

import { MyContext } from "../types";
import { Chat, ChatInput } from "../entities/Chat";
import { User } from "../entities/User";
import logger from "../helpers/logger";

@Resolver(Chat)
export class ChatResolver {
  @Query(() => [Chat])
  async chats(@Ctx() { dataSource }: MyContext): Promise<Chat[]> {
    const chatRepository = dataSource.getRepository(Chat);
    const chats = await chatRepository.find({
      relations: { messages: true, users: true },
    });
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
      relations: { messages: true, users: true },
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
