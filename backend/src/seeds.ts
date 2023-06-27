import "reflect-metadata";
import { runSeeders } from "typeorm-extension";
import AppDataSource from "./database";

AppDataSource.initialize().then(async () => {
  await AppDataSource.synchronize(true);
  await runSeeders(AppDataSource);
  process.exit();
});
