import { AxiosError } from "axios";
import { Either, Err, Res } from "./either";

export const baseURL = "https://localhost:3000";

export const wsURL = "wss://localhost:3000";

export async function eitherify<U>(func: any): Promise<Either<AxiosError<any>, U>> {
  try {
    const res = await func();
    return Res.create(res.data);
  } catch (e) {
    return Err.create(e as AxiosError);
  }
}
