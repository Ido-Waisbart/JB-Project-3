import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacation-model";
import { OkPacketParams } from "mysql2";
import { DateUtils } from "../2-utils/date-utils";

class VacationService {
  // Get all vacations:
  public async getAllVacations(): Promise<VacationModel[] | undefined> {
    const sql = "select *, concat(?, image_uri) as image_url from vacations";
    const values = [appConfig.imagesLocation];

    console.log("Executing SQL: `" + sql + "` with values: " + values);
    let vacations;
    try {
      vacations = (await dal.execute(sql, values)) as VacationModel[];
    } catch (error: any) {
      console.error("DB/SQL error:", error);
      throw error; // The controller has to handle this error, not the service.
    }
    console.log("Finished executing SQL: " + sql);
    return vacations;
  }

  // Get one vacation by id:
  public async getOneVacation(id: number): Promise<VacationModel> {
    // Create sql:
    const sql =
      "select *, concat(?, image_uri) as image_url from vacations where id = ?";
    const values = [appConfig.imagesLocation, id];

    // Execute:
    const vacations = (await dal.execute(sql, values)) as VacationModel[];

    // Extract the single vacation:
    const vacation = vacations[0];

    // If no such vacation:
    if (!vacation) throw new ResourceNotFoundError(id);

    // Return:
    return vacation;
  }

  // Add vacation:
  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validation:
    vacation.validate();

    // Save the image:
    const image_name = vacation.image
      ? await fileSaver.add(vacation.image)
      : null!;

    // Create sql:
    const sql =
      "insert into vacations(destination, description, price_in_usd, start_date, end_date, image_uri) values(?, ?, ?, ?, ?, ?)";
    const values = [
      vacation.destination,
      vacation.description ?? null,
      vacation.price_in_usd,
      DateUtils.toMySQLDateLocal(vacation.start_date),
      DateUtils.toMySQLDateLocal(vacation.end_date),
      image_name,
    ];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;

    // Get the added vacation from the database:
    const dbVacation = await this.getOneVacation(info.insertId!);

    // Return:
    return dbVacation;
  }

  // Update vacation:
  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validation:
    vacation.validate();

    // Update image:
    const oldImageName = await this.getImageName(vacation.id);
    const newImageName = vacation.image
      ? await fileSaver.update(oldImageName!, vacation.image)
      : oldImageName;

    // Create sql:
    const sql =
      "update vacations set destination = ?, description = ?, price_in_usd = ?, start_date = ?, end_date = ?, image_uri = ? where id = ?";
    const values = [
      vacation.destination,
      vacation.description ?? null,
      vacation.price_in_usd,
      DateUtils.toMySQLDateLocal(vacation.start_date),
      DateUtils.toMySQLDateLocal(vacation.end_date),
      newImageName,
      vacation.id,
    ];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;

    // If no such vacation:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id!);

    // Get the updated vacation from the database:
    const dbVacation = await this.getOneVacation(vacation.id!);

    // Return:
    return dbVacation;
  }

  // Delete vacation:
  public async deleteVacation(id: number): Promise<void> {
    // Get old image:
    const oldImageName = await this.getImageName(id);

    // Create sql:
    const sql = "delete from vacations where id = ?";
    const values = [id];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;

    // If no such vacation:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

    // Delete image:
    await fileSaver.delete(oldImageName!);
  }

  // Get vacations by price range:
  public async getVacationsByPriceRange(
    min: number,
    max: number,
  ): Promise<VacationModel[]> {
    // Create sql:
    const sql =
      "select * from vacations where price between ? and ? order by price";
    const values = [min, max];

    // Execute:
    const vacations = (await dal.execute(sql, values)) as VacationModel[];

    // Return:
    return vacations;
  }

  // Get image name from db:
  private async getImageName(id: number): Promise<string | null> {
    const sql = "select image_uri from vacations where id = ?";
    const values = [id];
    const vacations = (await dal.execute(sql, values)) as VacationModel[];
    const vacation = vacations[0];
    if (!vacation) return null;
    return vacation.image_uri!;
  }
}

export const vacation_service = new VacationService();
