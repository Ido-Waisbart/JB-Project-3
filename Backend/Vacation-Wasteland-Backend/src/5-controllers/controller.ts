import express, { Request, Response, Router } from "express";
import { service } from "../4-services/service";
import { fileSaver } from "uploaded-file-saver";

class Controller {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/vacations", this.get_vacations);
    this.router.get("/api/vacations/images/:imageName", this.getImage);  // TODO: Where is this used? Answer: IMAGES_LOCATION = BE's appConfig.imagesLocation = "http://localhost:4000/api/vacations/images/"; getAllVacations(), getOneVacation()
  }

  private async get_vacations(request: Request, response: Response) {
    try {
      const vacations = await service.getAllVacations(); // May throw error.
      response.json(vacations);
    } catch (e: any) {
      console.error("Controller error:", e);

      response.status(500).json({
        message: "Database error",
        details: e.message,
      });
    }
  }

  // Get image by imageName:
  private async getImage(request: Request, response: Response) {
    const imageName = request.params.imageName.toString();
    const filePath = fileSaver.getFilePath(imageName);
    response.sendFile(filePath);
  }
}

export const controller = new Controller();
