import { Stock } from '../../stocks/models/stock.model';
export interface IOrder {
  id: string;
  stock: Stock | null;
  quantity: number;
  price: number;
  symbol: string;
  stockId?: string;
}

export class OrderResponse {
  id:string = '';
  quantity: number = 0;
  price: number = 0;
  symbol: string = '';
}

export class Order implements IOrder {
  id: string = '';
  stock: Stock | null = null;
  quantity: number = 0;
  price: number = 0;
  symbol: string = '';
}
