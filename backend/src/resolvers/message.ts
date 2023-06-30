import { Resolver, Arg, Ctx, Mutation } from "type-graphql";

import { MyContext } from "../types";
import logger from "../helpers/logger";
import { Message, MessageInput } from "../entities/Message";

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Message)
  async addMessage(
    @Arg("message") message: MessageInput,
    @Ctx() { dataSource }: MyContext
  ): Promise<Message | null> {
    const messageRepository = dataSource.getRepository(Message);

    const newMessage = messageRepository.create({ ...message, userId: 1 });

    const savedMessage = await messageRepository.save(newMessage);
    const returnedMessage = await messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: { user: true },
    });

    logger.log({ level: "info", message: "Message was created" });
    return returnedMessage;
  }
}
