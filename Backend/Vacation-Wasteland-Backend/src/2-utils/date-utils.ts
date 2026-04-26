// TODO OPTIONAL: Should this be put in a shared folder that both backend and frontend can use? A library?
export class DateUtils {
  public static toMySQLDateLocal(date: Date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
