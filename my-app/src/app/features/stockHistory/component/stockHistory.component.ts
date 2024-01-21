import { Component, Input, OnInit, Pipe, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
//import { StockHistoryComponent } from './stockHistory.component';


import { ActivatedRoute, Router } from '@angular/router';
import { StockHistoryService } from './../service/stockHistory.service';
import { StockHistory } from '../models/stockHistory.model';

@Component({
  selector: 'app-stock-history',  imports: [CommonModule, FormsModule],

  standalone: true,
  templateUrl: './stockHistory.component.html',
  styleUrl: './stockHistory.component.css',
})
export class StockHistoryComponent {
  stockSymbol: string = '';;
  stockHistoryList: StockHistory[]= []; 
  stockHistoryService = inject(StockHistoryService);
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.stockSymbol = params.get('symbol') || '';
      this.loadStockHistory();
    });
  }

  loadStockHistory() {
    this.stockHistoryService
      .getStockHistory(this.stockSymbol)
      .subscribe(
        (history) => {
          debugger
          this.stockHistoryList = history;
        },
        (error) => {
          console.error('Error fetching stock history:', error);
        }
      );
  }

  navigateToStock() {
    this.router.navigate(['/stock']);
  }
}
