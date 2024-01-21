import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Stock } from '../models/stock.model';
import { stockService } from './../service/stock.service';
import { OrderService } from './../../orders/services/order.service';
import { SignalRService } from '../../../shared/services/signal-r.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SignalRService],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent implements OnDestroy {
  @Input() canOrder: boolean = false;
  stocks: Stock[] = [];
  private orderService = inject(OrderService);
  private stockService = inject(stockService);
  private signalRService = inject(SignalRService);
  private subscription: Subscription = new Subscription();

  constructor(private router: Router) {
    this.initializeSignalRConnection();
    this.getAllStocks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeSignalRConnection(): void {
    this.signalRService.buildConnection();
    this.signalRService.startConnection();
    this.subscription.add(
      this.signalRService.getStockData().subscribe({
        next: (res) => (this.stocks = res),
        error: (err) => console.error('Error receiving stock data', err),
      })
    );
  }

  orderStock(stock: Stock): void {
    if (stock.quantity! > 0) {
      this.orderService.setOrderStock(stock);
    }
  }

  private getAllStocks(): void {
    this.subscription.add(
      this.stockService.getAllStocks().subscribe({
        next: (res) => (this.stocks = res),
        error: (err) => console.error('Error fetching stocks', err),
      })
    );
  }

  navigateToHistory(stock: Stock): void {
    this.router.navigate(['/stockHistory', stock.symbol]);
  }
}
