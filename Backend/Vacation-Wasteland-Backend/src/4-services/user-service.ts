import axios from "axios";
import { OkPacketParams } from "mysql2";
import { cyber } from "../2-utils/cyber";
import { dal } from "../2-utils/dal";
import {
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../3-models/client-errors";
import { CredentialsModel } from "../3-models/credentials-model";
import { UserModel } from "../3-models/user-model";
import { appConfig } from "../2-utils/app-config";
import { Role } from "../3-models/enums";

class UserService {
  private async verifyFreeEmail(email: string): Promise<void> {
    const sql = "select * from users where email = ?";
    const values = [email];
    const users = (await dal.execute(sql, values)) as UserModel[];
    if (users.length > 0)
      throw new ValidationError(`Email ${email} already taken.`);
  }

  public async register(user: UserModel): Promise<string> {
    // Validation:
    user.validate();
    await this.verifyFreeEmail(user.email);

    // Create sql:
    user.password = cyber.hash(user.password);
    user.role = Role.User;
    const sql =
      "insert into users(first_name, last_name, email, password_hash, role) values(?, ?, ?, ?, ?)";
    const values = [
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.role,
    ];

    // Execute:
    const info: OkPacketParams = (await dal.execute(
      sql,
      values,
    )) as OkPacketParams;
    user.id = info.insertId!;

    // Generate token:
    const token = cyber.generateToken(user);
    return token;
  }

  // Login:
  public async login(credentials: CredentialsModel): Promise<string> {
    // Validate:
    credentials.validate();

    // Create sql:
    credentials.password = cyber.hash(credentials.password);
    const sql = "select * from users where email = ? and password_hash = ?"; // Prepared Statement
    const values = [credentials.email, credentials.password];

    // Execute:
    const users = (await dal.execute(sql, values)) as UserModel[];

    // Extract user:
    const user = users[0];

    // If no such user:
    if (!user) throw new UnauthorizedError("Incorrect email or password.");

    // Generate token:
    const token = cyber.generateToken(user);

    // Return token:
    return token;
  }

  // The front-end is able to convert a token to a UserModel, extracting its id, to access API endpoints like this.
  public async getOneUser(id: number): Promise<UserModel> {
    // Create sql:
    const sql = "select * from users where id = ?";
    const values = [id];

    // Execute:
    const users = (await dal.execute(sql, values)) as UserModel[];

    // Extract user:
    const user = users[0];

    // If no such user:
    if (!user) throw new ResourceNotFoundError(id);

    // Remove password:
    delete (user as any).password;

    // Return user:
    return user;
  }

  // May be useful for admins.
  public async getAllUsers(): Promise<UserModel[] | undefined> {
    const sql = "select * from users";

    console.log("Executing SQL: " + sql);
    let vacations;
    try {
      vacations = (await dal.execute(sql)) as UserModel[];
    } catch (error: any) {
      console.error("DB/SQL error:", error);
      throw error; // The controller has to handle this error, not the service.
    }
    console.log("Finished executing SQL: " + sql);
    return vacations;
  }
}

export const user_service = new UserService();
