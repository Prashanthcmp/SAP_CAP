namespace my.productPurchase;

using {
  Country,
  cuid,
  managed
} from '@sap/cds/common';


entity User : cuid, managed {
  name         : String;
  email        : String;
  phone_number : Integer;
  address      : String;
}

entity Products : cuid, managed {
  PurchaseCategory    : String;
  ProductCategory     : Association to ProductCategory;
  ModelNumber         : String;
  ProductId           : String;
  ProductName         : String;
  Mrp                 : Integer;
  StaffPrice          : Integer;
  Color               : String;
  Avilability         : String;
  DeliverHome         : String;
  DeliveryCriticality : Integer;
  Criticality         : Integer;
}

entity ProductCategory {
  key ID          : Integer;
      name        : String;
      Description : String;
}

entity Customers : cuid, managed {
  name    : String(100);
  email   : String(100);
  phone   : String(30);
  address : String(255);
}

entity Orders : cuid, managed {
  name             : String;
  order_id         : Integer;
  customer         : Association to Customers;
  order_date       : Date;
  status           : String;
  total_amount     : Integer;
  shipping_address : String;
  payment_method   : String;
  item             : Composition of many OrderItems
                       on item.order = $self;
}

entity OrderItems : cuid, managed {
  order      : Association to Orders;
  product    : Association to Products;
  quantity   : Integer;
  unitPrice  : Decimal(15, 2);
  totalPrice : Decimal(15, 2);
}
