import axios from "axios";
import { useCookies } from "vue3-cookies";
import { baseURL, eitherify } from "../common/help";

export async function getDevicesForUser(userId: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any[]>(() =>
    axios.get(`${baseURL}/devices/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}

export async function getDeviceReadings(deviceId: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any[]>(() =>
    axios.get(`${baseURL}/energy-consumption/device/${deviceId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}

export async function getOrphanDevices(userId: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any[]>(() =>
    axios.get(`${baseURL}/devices/not-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}

export async function create(dto: any) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any>(() =>
    axios.post(`${baseURL}/devices`, dto, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}
export async function associate(deviceId: number, userId: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify<any>(() =>
    axios.post(
      `${baseURL}/devices/associate`,
      { deviceId, userId },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
  );
}

export async function disassociate(deviceId: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify(() =>
    axios.delete(`${baseURL}/devices/disassociate/${deviceId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}

export async function remove(deviceId: number) {
  const { cookies } = useCookies();
  const jwt = cookies.get("jwt");

  return eitherify(() =>
    axios.delete(`${baseURL}/devices/${deviceId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  );
}
