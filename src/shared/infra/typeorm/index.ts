import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database") => {
  const defaultOptions = await getConnectionOptions();
  console.log("Database is running!");
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database,
    })
  );
};
