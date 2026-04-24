import express, { Request, Response, Router } from "express";
import { user_service } from "../4-services/user-service";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";

class UserController {
  public router: Router = express.Router();

  public constructor() {
    this.router.post("/api/register", this.register);
    this.router.post("/api/login", this.login);
    this.router.get("/api/users/:id", securityMiddleware.verifyToken, securityMiddleware.verifyMe, this.getOneUser);
    this.router.get("/api/users", securityMiddleware.verifyAdmin, this.getUsers);
    
    // this.router.get("/api/users", this.getUsers);
    // this.router.get("/api/users/:id", this.getOneUser);
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

  // Register new user:
  private async register(request: Request, response: Response) {
    const user = new UserModel(request.body);
    const token = await user_service.register(user);
    response.status(StatusCode.Created).json(token);
  }

  // Login existing new user:
  private async login(request: Request, response: Response) {
    const credentials = new CredentialsModel(request.body);
    const token = await user_service.login(credentials);
    response.json(token);
  }

  // Get one user:
  private async getOneUser(request: Request, response: Response) {
    const id = +request.params.id;
    const user = await user_service.getOneUser(id);
    response.json(user);
  }
}

export const user_controller = new UserController();
