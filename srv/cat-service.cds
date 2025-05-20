using my.productPurchase as my from '../db/schema';


service CatalogService {
    entity Products        as projection on my.Products;
    entity AppUser         as projection on my.User;
    entity ProductCategory as projection on my.ProductCategory;
    entity Orders          as projection on my.Orders;
    entity OrderItems      as projection on my.OrderItems;
    entity Customers       as projection on my.Customers;


    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };
}

annotate CatalogService.Products with @odata.draft.enabled;
annotate CatalogService.ProductCategory with @odata.draft.enabled;
annotate CatalogService.Orders with @odata.draft.enabled;
// annotate CatalogService.OrderItems with @odata.draft.enabled;
