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

  const deleteUser = async (user: User) => {
    const res = await gateway.remove(user.id);
    return res;
  };

  const editUser = async (user: User, dto: any) => {
    const res = await gateway.edit(user.id, dto);
    if (res.isResult()) {
      const index = users.value.findIndex((usr) => usr.id == user.id);
      console.log(res.value);
      users.value[index].email = res.value.email;
    }
    return res;
  };

  return {
    users,
    getUsers,
    deleteUser,
    editUser,
  };
});
