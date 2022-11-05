import { AxiosError } from "axios";
import { Either, Err, Res } from "./either";

export const baseURL = "http://localhost:3000";

export async function eitherify<U>(func: any): Promise<Either<AxiosError<any>, U>> {
  try {
    const res = await func();
    return Res.create(res.data);
  } catch (e) {
    return Err.create(e as AxiosError);
  }
}
