import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { Stock } from './../../features/stocks/models/stock.model';
import { ApiUrls } from './../../urls'


@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  setStockData(data: Stock[]) {
    this.stockPriceReceived$.next(data);
  }
  getStockData() {
    return this.stockPriceReceived$.asObservable();
  }
  private hubConnection!: signalR.HubConnection;
  private stockPriceReceived$ = new Subject<Stock[]>();

  constructor() {
    // this.buildConnection();
    // this.startConnection();
  }

  buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(ApiUrls.StockHub) // Replace with your API base URL
      .build();

    this.hubConnection.on('UpdateStockPrices', (data: Stock[]) => {
      this.stockPriceReceived$.next(data);
    });
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => {})
      .catch((err: any) =>
        console.error('Error while starting connection: ', err)
      );
  }
}
