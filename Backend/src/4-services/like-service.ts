import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { LikeModel } from "../3-models/like-model";
import { OkPacketParams } from "mysql2";

class LikeService {
  //  Get all likes.
  public async getAllLikes(): Promise<LikeModel[] | undefined> {
    const sql = "select * from likes";

    console.log("Executing SQL: `" + sql);
    let likes;
    try {
      likes = (await dal.execute(sql)) as LikeModel[];
    } catch (error: any) {
      console.error("DB/SQL error:", error);
      throw error; // The controller has to handle this error, not the service.
    }
    console.log("Finished executing SQL: " + sql);
    return likes;
  }
  
  //  Add like:
  public async addLike(like: LikeModel): Promise<LikeModel> {
    // Validation:
    like.validate();

    // Create sql:
    const sql =
      "insert into likes(user_id, vacation_id) values(?, ?)";
    const values = [
      like.user_id,
      like.vacation_id,
    ];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;

    // Return:
    return {user_id: like.user_id, vacation_id: like.vacation_id} as LikeModel;
  }

  //  Update like:
  /*public async updateLike(like: LikeModel): Promise<LikeModel> {
    // Validation:
    like.validate();

    // Create sql:
    const sql =
      "update likes set user_id = ?, vacation_id = ?, price_in_usd = ?, start_date = ?, end_date = ?, image_uri = ? where id = ?";
    const values = [
      like.vacation_id,
    ];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;

    // If no such like:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(like.id!);

    // Get the updated like from the database:
    const dbLike = await this.getOneLike(like.id!);

    // Return:
    return dbLike;
  }*/

  //  Delete like:
  public async deleteLike(user_id: number, vacation_id: number): Promise<void> {
    // Create sql:
    const sql = "delete from likes where user_id = ? AND vacation_id = ?";
    const values = [user_id, vacation_id];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;

    // If no such like:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation_id);
  }
}

export const like_service = new LikeService();
