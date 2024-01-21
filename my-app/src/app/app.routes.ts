import { Routes } from '@angular/router';


export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'orders',
      loadComponent: () =>
        import('./features/orders/components/orderlist/orderlist.component').then((m) => m.orderlist),
    },
    {
      path: 'stocks',
      loadComponent: () =>
        import('./features/stocks/component/stock.component').then((m) => m.StockComponent),
    }
    ,
    {
      path: 'stockHistory/:symbol',
      loadComponent: () =>
        import('./features/stockHistory/component/stockHistory.component').then((m) => m.StockHistoryComponent),
    }
    ,
    {
      path: 'login',
      loadComponent: () =>
        import('./features/login/components/login.component').then((m) => m.LoginComponent),
    },
  ];