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

export function remove(id: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any[]>(() =>
    axios.delete(`${baseURL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}

export function edit(id: number, dto: any) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any>(() =>
    axios.patch(`${baseURL}/users/${id}`, dto, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}
