import axios from "axios";
import { useCookies } from "vue3-cookies";
import { baseURL, eitherify } from "../common/help";

export function findAll() {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");
  return eitherify<any[]>(() =>
    axios.get(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}
