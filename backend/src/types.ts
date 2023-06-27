import { Request, Response } from "express";
import { DataSource } from "typeorm";

export interface MyContext {
  dataSource: DataSource;
  req: Request;
  res: Response;
}
