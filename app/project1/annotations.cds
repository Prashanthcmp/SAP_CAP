using CatalogService as service from '../../srv/cat-service';

annotate service.Products with {
    @title: '{i18n>name}'
    ProductName;
    @title : '{i18n>ProductCategory}'
    @Common.Text: ProductCategory.name
    @Common.TextArrangement: #TextOnly
    ProductCategory;
    @title : '{i18n>mrp}'
    Mrp;
    @title : '{i18n>modelNumber}'
    ModelNumber;
    @title : '{i18n>PurchaseCategory}'
    PurchaseCategory;
    @title : '{i18n>StaffPrice}'
    StaffPrice;
    @title : '{i18n>Avilability}'
    Avilability;
    @title : '{i18n>DeliverHome}'
    DeliverHome;

}

annotate service.Products with @(
     UI.HeaderInfo : {
    TypeName : 'Product',
    TypeNamePlural : 'Products',
    Title : {
        $Type : 'UI.DataField',
        Value : ProductId
    },
    Description : {
        $Type : 'UI.DataField',
        Value : ProductName
    }
},

    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
           
            {
                $Type : 'UI.DataField',
                Value : PurchaseCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductCategory_ID
            },
            {
                $Type : 'UI.DataField',
                Value : ModelNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductId,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductName,
            },
            {
                $Type : 'UI.DataField',
                Value : Mrp,
            },
            {
                $Type : 'UI.DataField',
                Value : StaffPrice,
            },
            {
                $Type : 'UI.DataField',
                Value : Avilability,
                Criticality: Criticality
            },
            {
                $Type : 'UI.DataField',
                Value : DeliverHome,
                Criticality: DeliveryCriticality
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        
         {
                $Type : 'UI.DataField',
                Value : PurchaseCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductCategory_ID
            },
            {
                $Type : 'UI.DataField',
                Value : ModelNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductId,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductName,
            },
            {
                $Type : 'UI.DataField',
                Value : Mrp,
            },
            {
                $Type : 'UI.DataField',
                Value : StaffPrice,
            },
            {
                $Type : 'UI.DataField',
                Value : Avilability,
                Criticality: Criticality,
            },
            {
                $Type : 'UI.DataField',
                Value : DeliverHome,
                Criticality: DeliveryCriticality,
            }
    ],
);

