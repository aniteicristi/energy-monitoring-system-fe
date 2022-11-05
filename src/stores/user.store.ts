import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { User } from "../models/user.model";
import * as gateway from "../gateways/user.gateway";

export const useUserStore = defineStore("user", () => {
  const users: Ref<User[]> = ref([]);

  const getUsers = async () => {
    const usr = await gateway.findAll();
    if (usr.isResult()) {
      console.log(usr);
      users.value = usr.value.map((e) => new User(e));
    }
    return users;
  };

  return {
    users,
    getUsers,
  };
});
