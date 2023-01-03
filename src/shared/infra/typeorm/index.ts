import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

export default async (host = "database") => {
  const defaultOptions = await getConnectionOptions();
  console.log("Database is running!");
  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
