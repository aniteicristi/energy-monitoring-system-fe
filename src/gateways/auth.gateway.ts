import axios, { AxiosError } from "axios";
import { useCookies } from "vue3-cookies";
import { Either, Err, Res } from "../common/either";
import { eitherify, baseURL } from "../common/help";

export function login<T>(body: T): Promise<Either<AxiosError<any>, { token: string }>> {
  return eitherify(async () =>
    axios.post(`${baseURL}/auth/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
}

export async function self(): Promise<any> {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify(() =>
    axios.get(`${baseURL}/users/self`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}

export async function register(dto: any): Promise<Either<AxiosError<any>, any>> {
  return eitherify(() => axios.post(`${baseURL}/users/`, dto));
}
