import { Resolver, Arg, Ctx, Mutation, Int } from "type-graphql";

import { MyContext } from "../types";
import logger from "../helpers/logger";
import { Message, MessageInput } from "../entities/Message";

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Message)
  async addMessage(
    @Arg("message") message: MessageInput,
    @Arg("userId", () => Int) userId: number,
    @Ctx() { dataSource }: MyContext
  ): Promise<Message> {
    const messageRepository = dataSource.getRepository(Message);

    const newMessage = messageRepository.create({ ...message, userId });

    const savedMessage = await messageRepository.save(newMessage);

    logger.log({ level: "info", message: "Message was created" });
    return savedMessage;
  }
}
