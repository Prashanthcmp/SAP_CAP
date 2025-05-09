using my.productPurchase as my from '../db/schema';


service CatalogService {
    entity Products as projection on my.Products;
    entity User     as projection on my.User;

    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };
}

annotate CatalogService.Products with @odata.draft.enabled;
