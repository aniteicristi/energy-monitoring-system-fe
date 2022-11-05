export class User {
  constructor(params: Partial<User>) {
    this.id = params.id!;
    this.email = params.email!;
    this.role = params.role!;
  }

  id!: number;

  email!: string;

  role!: string;
}
