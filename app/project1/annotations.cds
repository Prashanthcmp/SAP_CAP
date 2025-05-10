using CatalogService as service from '../../srv/cat-service';

annotate service.Products with {
    @title: '{i18n>name}'
    ProductName;
    @title : '{i18n>ProductCategory}'
    ProductCategory;
    @title : '{i18n>mrp}'
    Mrp;
    @title : '{i18n>staffPrice}'
    StaffPrice;
    @title : '{i18n>modelNumber}'
    ModelNumber;

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
                Value : ProductName,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : ModelNumber,
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
            },
            {
                $Type : 'UI.DataField',
                Value : DeliverHome,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductCategory,
            },
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
            Value : ProductName,
        },
        {
            $Type : 'UI.DataField',
            Value : ProductCategory,
        },
        {
            $Type : 'UI.DataField',
            Value : ModelNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : Mrp,
        },
    ],
);

