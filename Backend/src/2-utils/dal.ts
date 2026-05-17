import mysql2, { PoolOptions, QueryError, QueryResult } from "mysql2";
import { appConfig } from "./app-config";

class Dal {
  private readonly options: PoolOptions = {
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase,
    queueLimit: 0,
    connectTimeout: 5000,
  };

  private readonly connection = mysql2.createPool(this.options);

  constructor() {
    console.log("Connecting with " + JSON.stringify(this.options));
  }

  public execute(
    sql: string,
    values?: (string | number | null)[],
  ): Promise<QueryResult> {
    return new Promise<QueryResult>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Query timeout"));
      }, 5000);

      this.connection.query(
        sql,
        values,
        (err: QueryError | null, result: QueryResult) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        },
      );
    });
  }
}

export const dal = new Dal();
