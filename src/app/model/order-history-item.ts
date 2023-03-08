export class OrderHistoryItem {
  constructor(
    public orderTruckingNumber: string,
    public totalPrice: number,
    public dateCreated: Date
  ) {}
}
