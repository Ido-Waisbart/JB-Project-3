import express, { Request, Response, Router } from "express";
import { service } from "../4-services/service";

class Controller {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/vacations", this.get_vacations);
  }

  private async get_vacations(request: Request, response: Response) {
    try {
      const vacations = await service.getAllVacations();  // May throw error.
      response.json(vacations);
    }
    catch (e: any) {
      console.error("Controller error:", e);

      response.status(500).json({
        message: "Database error",
        details: e.message,
      });
    }
  }
}

export const controller = new Controller();
