import express, { Request, Response, Router } from "express";
import { service } from "../4-services/service";

class Controller {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/vacations", this.get_vacations);
  }

  private async get_vacations(request: Request, response: Response) {
    const vacations = await service.getAllVacations();
    if(vacations === undefined) {
      response.status(503);
      return;
    }
    response.json(vacations);
  }
}

export const controller = new Controller();
