import "reflect-metadata";
import { Container } from "inversify";

const createContainer = (): Container => {
  return new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
  });
};

export const container: Container = createContainer();
