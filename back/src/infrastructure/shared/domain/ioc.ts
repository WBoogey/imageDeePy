// src/ioc.ts
import { container } from "tsyringe";
import type { Controller, IocContainer } from "tsoa";

/**
 * Adaptateur pour que tsoa délègue à tsyringe.
 * Il doit exporter *exactement* `iocContainer`.
 */
export const iocContainer: IocContainer = {
  get<T extends Controller>(someClass: new (...args: unknown[]) => T): T {
    return container.resolve<T>(someClass);
  },
};
