import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Message } from "../../entities/Message";

export const MessagesFactory = setSeederFactory(Message, (faker: Faker) => {
  const message = new Message();
  message.text = faker.lorem.sentences({ max: 3, min: 1 });

  return message;
});
