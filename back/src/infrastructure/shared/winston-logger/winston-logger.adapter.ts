import * as winston from "winston";
import { format, transports } from "winston";
import Logger from "../../../domain/logger.port";
import { injectable } from "tsyringe";

export type LogLevel = "error" | "warn" | "info" | "debug";


@injectable()
export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor(logLevel: LogLevel) {
    this.logger = winston.createLogger({
      level: logLevel,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] ${level}: ${message}`,
        ),
      ),
      transports: [new transports.Console()],
    });
  }

  error(message: any): void {
    this.logger.error(message);
  }

  warning(message: any): void {
    this.logger.warn(message);
  }

  info(message: any): void {
    this.logger.info(message);
  }

  debug(message: any): void {
    this.logger.debug(message);
  }
}
