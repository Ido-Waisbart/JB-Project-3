import express, { Request, Response, Router } from "express";
import { vacation_service } from "../4-services/vacation-service";
import { fileSaver } from "uploaded-file-saver";

class VacationController {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/vacations", this.getVacations);
    this.router.get("/api/vacations/images/:imageName", this.getImage);  // TODO: Where is this used? Answer: IMAGES_LOCATION = BE's appConfig.imagesLocation = "http://localhost:4000/api/vacations/images/"; getAllVacations(), getOneVacation()
  }

  private async getVacations(request: Request, response: Response) {
    try {
      const vacations = await vacation_service.getAllVacations(); // May throw error.
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

export const vacation_controller = new VacationController();
