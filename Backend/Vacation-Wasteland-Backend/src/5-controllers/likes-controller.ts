import express, { Request, Response, Router } from "express";
import { like_service } from "../4-services/like-service";
import { LikeModel } from "../3-models/like-model";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";

class LikeController {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/likes", securityMiddleware.verifyToken, this.getLikes);
    this.router.post("/api/likes", securityMiddleware.verifyToken, this.addLike);
    this.router.delete("/api/likes/:user_id/:vacation_id", securityMiddleware.verifyToken, this.deleteLike);
  }

  private async getLikes(request: Request, response: Response) {
    try {
      const likes = await like_service.getAllLikes(); // May throw error.
      response.json(likes);
    } catch (e: any) {
      console.error("Controller error:", e);

      response.status(500).json({
        message: "Database error",
        details: e.message,
      });
    }
  }

  // Add like:
  private async addLike(request: Request, response: Response) {
    const like = new LikeModel(request.body);
    const dbLike = await like_service.addLike(like);
    response.status(StatusCode.Created).json(dbLike);
  }

  // Delete like:
  private async deleteLike(request: Request, response: Response) {
    const user_id = +request.params.user_id;
    const vacation_id = +request.params.vacation_id;
    await like_service.deleteLike(user_id, vacation_id);
    response.sendStatus(StatusCode.NoContent); // response.status(StatusCode.NoContent).send();
  }
}

export const like_controller = new LikeController();
