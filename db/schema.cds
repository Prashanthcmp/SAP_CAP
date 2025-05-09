namespace my.productPurchase;

using { Country, cuid, managed } from '@sap/cds/common';


entity User : cuid, managed  {
  name  : String;
  email  : String;
  phone_number: Integer;
  address: String;
}
 entity Products : cuid, managed  {
  name: String;
  ProductCategory: String;
  modelNumber: String;
  mrp:Integer;
  staffPrice: Integer;
  avilability: String;
  deliverHome: String;
  purchaseCategory: String;
}

