import express, { Request, Response, Router } from "express";
import { user_service } from "../4-services/user-service";

class UserController {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/users", this.getUsers);
  }

  private async getUsers(request: Request, response: Response) {
    try {
      const users = await user_service.getAllUsers(); // May throw error.
      response.json(users);
    } catch (e: any) {
      console.error("Controller error:", e);

      response.status(500).json({
        message: "Database error",
        details: e.message,
      });
    }
  }
}

export const user_controller = new UserController();
