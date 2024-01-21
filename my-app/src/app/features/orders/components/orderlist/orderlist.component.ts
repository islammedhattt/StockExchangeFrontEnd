import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewOrderComponent } from '../../components/createorder/createorder.component';
import { IOrder, OrderResponse } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.scss',
  providers: [NgbActiveModal],
})
export class orderlist implements OnDestroy {
  orders: OrderResponse[] = [];
  subscription: Subscription = new Subscription();
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);

  constructor(private orderService: OrderService) {
    this.initSubscriptions();
    this.getAllOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initSubscriptions(): void {
    this.subscription.add(
      this.orderService.getOrder().subscribe({
        next: (order) => {
          if (order) {
            this.createNewOrder(order);
          }
        },
        error: (err) => console.error('Error fetching order', err)
      })
    );
  }

  createNewOrder(order: IOrder): void {
    order.stockId = order.stock?.id;
    this.subscription.add(
      this.orderService.createNewOrder(order).subscribe({
        next: (res) => {
          if (res) {
            this.orders.push(res);
            this.orderService.setOrder(null);
          }
        },
        error: (err) => console.error('Error creating new order', err)
      })
    );
  }

  openAddNewOrder(): void {
    this.modalService.open(AddNewOrderComponent, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  getAllOrders(): void {
    this.subscription.add(
      this.orderService.getAllOrder().subscribe({
        next: (res) => {
          if (res) {
            this.orders = res;
          }
        },
        error: (err) => console.error('Error fetching all orders', err)
      })
    );
  }
}
