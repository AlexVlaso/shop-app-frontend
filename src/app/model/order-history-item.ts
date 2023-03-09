export class OrderHistoryItem {
  constructor(
    public orderTrackingNumber: string,
    public totalPrice: number,
    public dateCreated: Date,
    public dateUpdated: Date,
    public totalQuantity: number
  ) {}
}
