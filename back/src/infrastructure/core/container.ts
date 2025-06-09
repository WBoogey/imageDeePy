
import { container } from "tsyringe";
import { UserRepository } from "../../domain/user/user.repository";
import { HistoryRepository } from "../../domain/history/history.repository";
import { DrizzleUserRepository } from "../shared/domain/repositories/DrizzleUserRepositories";
// import { DrizzleHistoryRepository } from "../shared/domain/repositories/DrizzleHistoryRepository";
import Logger from "../../domain/logger.port";
import { LogLevel, WinstonLogger } from "../shared/winston-logger/winston-logger.adapter";
import { UserService } from "../../domain/user/application/user.service";
import { LoginUser } from "../../domain/user/application/signin-with-email-usecase";
import { UserController } from "../shared/HTTP/controllers/auth.controller";
import config from "./config";
import { DrizzleHistoryRepository } from "../shared/domain/repositories/DrizzleHistoryRepository";

container
  .register<Logger>('Logger', {
    useValue: new WinstonLogger(config.logLevel as LogLevel),
  })
  .register<HistoryRepository>('HistoryRepository', {
    useValue: new DrizzleHistoryRepository(),
  })
  .register<UserRepository>('UserRepository', {
    useValue: new DrizzleUserRepository(),
  });
export { container };