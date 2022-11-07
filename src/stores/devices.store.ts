import { defineStore } from "pinia";
import { Res } from "../common/either";
import * as gateway from "../gateways/device.gateway";
import { Consumption } from "../models/consumption.model";
import { Device } from "../models/device.model";

export const useDeviceStore = defineStore("devices", () => {
  const getDeviceReadings = async (deviceId: number): Promise<Consumption[]> => {
    const res = await gateway.getDeviceReadings(deviceId);
    if (res.isResult()) {
      return res.value.map((e) => new Consumption(e));
    }
    return [];
  };

  const getDevicesForUser = async (userId: number) => {
    const usr = await gateway.getDevicesForUser(userId);
    if (usr.isResult()) {
      return usr.value.map((e) => new Device(e));
    } else {
      return [];
    }
  };

  const getOrphanDevices = async (userId: number) => {
    const usr = await gateway.getOrphanDevices(userId);
    if (usr.isResult()) {
      return usr.value.map((e) => new Device(e));
    } else {
      return [];
    }
  };

  const createDevice = async (dto: any) => {
    const res = await gateway.create(dto);
    if (res.isResult()) {
      return Res.create(new Device(res.value));
    }
    return res;
  };

  const removeDevice = async (id: number) => {
    const res = await gateway.remove(id);
    return res;
  };

  const associate = async (deviceId: number, userId: number) => {
    const res = await gateway.associate(deviceId, userId);
    if (res.isResult()) {
      return Res.create(new Device(res.value));
    }
    return res;
  };

  const disassociate = async (deviceId: number) => {
    const res = await gateway.disassociate(deviceId);
    return res;
  };

  return {
    getDevicesForUser,
    getOrphanDevices,
    createDevice,
    associate,
    disassociate,
    removeDevice,
    getDeviceReadings,
  };
});
