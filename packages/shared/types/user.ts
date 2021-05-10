export interface IUser {
  _id: string;
  active: boolean;
  confirmed: boolean;
  email: string;
  name: string;
  picture: string;
  status: string;
  username: string;
  bookings: number;
  listings: number;
  createdAt: Date;
}
