export class Consumption {
  constructor(params: Partial<Consumption>) {
    this.timestamp = new Date(params.timestamp!);
    this.value = params.value!;
  }

  timestamp: Date;
  value: number;
}
