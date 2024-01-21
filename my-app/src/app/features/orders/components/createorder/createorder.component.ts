import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IOrder, Order } from './../../models/order.model';
import { OrderService } from './../../services/order.service';
import { StockComponent } from './../../../stocks/component/stock.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-order',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, StockComponent],
  templateUrl: './createorder.component.html',
  styleUrl: './createorder.component.scss',
})
export class AddNewOrderComponent implements OnDestroy {
  order: IOrder = new Order();
  activeModal = inject(NgbActiveModal);
  subs: Subscription = new Subscription();

  constructor(private orderService: OrderService) {
    this.subs.add(
      this.orderService.getOrderStock().subscribe({
        next: (res) => this.processOrderStock(res),
        error: (err) => this.handleError(err),
      })
    );
  }

  private processOrderStock(res: any): void {
    if (res) {
      const { symbol, quantity, currentPrice } = res;
      this.order.stock = res;
      this.order.symbol = symbol;
      this.order.quantity = quantity ?? 0;
      this.order.price = currentPrice;
      this.orderService.setOrder(this.order);
      this.activeModal.close();
    }
  }

  private handleError(error: any): void {
    console.error('Error fetching order stock:', error);
    // Handle the error appropriately
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
