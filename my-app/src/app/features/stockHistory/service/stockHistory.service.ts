import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockHistory } from '../models/stockHistory.model';
import { StockHistoryRequest } from '../models/stockHistory.model';
import { ApiUrls } from './../../../urls'

@Injectable({
  providedIn: 'root',
})
export class StockHistoryService {
  httpClient = inject(HttpClient);

  StockHistoryRequest = null;

  constructor(private http: HttpClient) {}

  getStockHistory(symbol: string): Observable<StockHistory[]> {
    // Adjust the API endpoint as needed, assuming it requires the stock symbol as a query parameter
    const url = ApiUrls.GetAllStocksHistory ;
    const request = new StockHistoryRequest();
    request.Sympol = symbol;
    debugger
    return this.httpClient.post<any>(url, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
