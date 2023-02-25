import "reflect-metadata";
import { Container } from "inversify";

const createContainer = (): Container => {
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: "Singleton",
  });

  return container;
};

export const container: Container = createContainer();
