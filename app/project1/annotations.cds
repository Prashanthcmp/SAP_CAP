using CatalogService as service from '../../srv/cat-service';

annotate service.Products with {
    @title: '{i18n>name}'
    name;
    @title : '{i18n>ProductCategory}'
    ProductCategory;
    @title : '{i18n>mrp}'
    mrp;
    @title : '{i18n>staffPrice}'
    staffPrice;
    @title : '{i18n>modelNumber}'
    modelNumber;
}

annotate service.Products with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
           
            {
                $Type : 'UI.DataField',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Value : ProductCategory,
            },
            {
                $Type : 'UI.DataField',
                Value : modelNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : mrp,
            },
            {
                $Type : 'UI.DataField',
                Value : staffPrice,
            },
            {
                $Type : 'UI.DataField',
                Value : avilability,
            },
            {
                $Type : 'UI.DataField',
                Value : deliverHome,
            },
            {
                $Type : 'UI.DataField',
                Value : purchaseCategory,
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
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : ProductCategory,
        },
        {
            $Type : 'UI.DataField',
            Value : modelNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : mrp,
        },
    ],
);

