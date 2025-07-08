using my.productPurchase as my from '../db/schema';


service CatalogService {
    entity Products  @(restrict:[{
        grant:['*'],
        to: 'Admin'
    },{
        grant:['READ'],
        to: 'AvilabilityRole',
        where:'$user.Avilability = Avilability'
    }])      as projection on my.Products;
    entity AppUser         as projection on my.User;
    entity ProductCategory as projection on my.ProductCategory;
    entity Orders   @(restrict:[{
        grant:['READ'],
        to: 'OrderRead'
    }])        as projection on my.Orders;
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
annotate CatalogService.ProductCategory with  @odata.draft.bypass @odata.draft.enabled;
annotate CatalogService.Orders with @odata.draft.enabled;

annotate CatalogService.Orders with @Capabilities.InsertRestrictions.Insertable: true;
// annotate CatalogService.OrderItems with @odata.draft.enabled;
