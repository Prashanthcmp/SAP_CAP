namespace my.productPurchase;

using { Country, cuid, managed } from '@sap/cds/common';


entity User : cuid, managed  {
  name  : String;
  email  : String;
  phone_number: Integer;
  address: String;
}
 entity Products : cuid, managed  {
  PurchaseCategory: String;
  ProductCategory: String;
  ModelNumber: String;
  ProductId: String;
  ProductName: String;
  Mrp:Integer;
  StaffPrice: Integer;
  Color:String;
  Avilability: String;
  DeliverHome: String;
}

