import express, { Request, Response, Router } from "express";
import { vacation_service } from "../4-services/vacation-service";
import { fileSaver } from "uploaded-file-saver";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";

class VacationController {
  public router: Router = express.Router();

  public constructor() {
    // TODO: Choose which API routes here and in users and maybe in likes can be accessed by users/admins only. Keep the routes untokened for ease of development.
    this.router.get("/api/vacations", securityMiddleware.verifyToken, this.getVacations);
    this.router.get("/api/vacations/:id", securityMiddleware.verifyToken, this.getOneVacation);
    this.router.post("/api/vacations", securityMiddleware.verifyToken, this.addVacation);
    this.router.put("/api/vacations/:id", securityMiddleware.verifyToken, this.updateVacation);
    this.router.delete("/api/vacations/:id", securityMiddleware.verifyAdmin, this.deleteVacation);
    this.router.get("/api/vacations/images/:imageName", this.getImage);  // No token - The project's <img/> doesn't use axios. This is used at getAllVacations(), getOneVacation() via: appConfig.imagesLocation = "http://localhost:4000/api/vacations/images/"
    // this.router.get("/api/vacations", this.getVacations);
    // this.router.get("/api/vacations/:id", this.getOneVacation);
    // this.router.post("/api/vacations", this.addVacation);
    // this.router.put("/api/vacations/:id", this.updateVacation);
    // this.router.delete("/api/vacations/:id", this.deleteVacation);
    // this.router.get("/api/vacations-by-price/:min/:max", this.getVacationsByPriceRange);
    // this.router.get("/api/vacations/images/:imageName", securityMiddleware.verifyToken, this.getImage);  // This is used at getAllVacations(), getOneVacation() via: appConfig.imagesLocation = "http://localhost:4000/api/vacations/images/"
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

  // Get one vacation by id:
  private async getOneVacation(request: Request, response: Response) {
    const id = +request.params.id;
    const vacation = await vacation_service.getOneVacation(id);
    response.json(vacation);
  }

  // Add vacation:
  private async addVacation(request: Request, response: Response) {
    request.body.image = request.files?.image;
    const vacation = new VacationModel(request.body);
    const dbVacation = await vacation_service.addVacation(vacation);
    response.status(StatusCode.Created).json(dbVacation);
  }

  // Update vacation:
  private async updateVacation(request: Request, response: Response) {
    request.body.image = request.files?.image;
    request.body.id = +request.params.id;
    const vacation = new VacationModel(request.body);
    const dbVacation = await vacation_service.updateVacation(vacation);
    response.json(dbVacation);
  }

  // Delete vacation:
  private async deleteVacation(request: Request, response: Response) {
    const id = +request.params.id;
    await vacation_service.deleteVacation(id);
    response.sendStatus(StatusCode.NoContent); // response.status(StatusCode.NoContent).send();
  }

  // Get vacations by price range:
  /*private async getVacationsByPriceRange(request: Request, response: Response) {
    const min = +request.params.min;
    const max = +request.params.max;
    const vacations = await vacation_service.getVacationsByPriceRange(min, max);
    response.json(vacations);
  }*/

  // Get image by imageName:
  private async getImage(request: Request, response: Response) {
    const imageName = request.params.imageName.toString();
    const filePath = fileSaver.getFilePath(imageName);
    response.sendFile(filePath);
  }
}

export const vacation_controller = new VacationController();
