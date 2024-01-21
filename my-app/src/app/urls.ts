
const baseUrl = 'https://localhost:7204'; 
const baseApiUrl = `${baseUrl}/api`; 

export const ApiUrls = {
  Login : `${baseApiUrl}/Authenticate/login`,
  OrderList : `${baseApiUrl}/Order/OrderList`,
  CreateOrder : `${baseApiUrl}/Order/CreateOrder`,
  GetAllStocks : `${baseApiUrl}/Stock/GetAllStocks`,
  GetAllStocksHistory : `${baseApiUrl}/Stock/GetAllStocksHistory`,
  StockHub : `${baseUrl}/StockHub`
  // Add more URLs as needed
};
