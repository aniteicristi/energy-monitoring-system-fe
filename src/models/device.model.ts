export class Device {
  constructor(params: Partial<Device>) {
    this.id = params.id!;
    this.description = params.description!;
    this.address = params.address!;
    this.maximumHourlyConsumption = params.maximumHourlyConsumption!;
  }

  id: number;
  description: string;
  address: string;
  maximumHourlyConsumption: number;
}
