using CatalogService as service from '../../srv/cat-service';

annotate service.OrderItems with {
    @title                 : 'Product'
    @Common.Text           : product.ProductCategory.name
    @Common.TextArrangement: #TextOnly
    product @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Products',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: product_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'ProductName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'ProductCategory_ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'ModelNumber',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'Mrp',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'StaffPrice',
            }
        ],
    };

    @title                 : 'Quantity'
    // @Common.FieldControl   : #ReadOnly
    quantity;
    @Common.FieldControl   : #ReadOnly
    @title                 : 'Total Price'
    totalPrice;
    @Common.FieldControl   : #ReadOnly
    @title                 : 'Unit Staff Price'
    unitPrice;
}


annotate service.OrderItems with @(


    Common     : {SideEffects: {
        $Type           : 'Common.SideEffectsType',
        SourceProperties: ['product_ID', 'quantity'],
        TargetProperties: [
            'totalPrice',
            'quantity',
            'unitPrice'
        ]
    }, },

    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: product_ID,
        },
        {
            $Type: 'UI.DataField',
            Value: quantity,
        },
        {
            $Type: 'UI.DataField',
            Value: totalPrice,
        },
        {
            $Type: 'UI.DataField',
            Value: unitPrice,
        },
    ],
);

annotate service.Orders with @(

    Common                       : {SideEffects: {
        $Type           : 'Common.SideEffectsType',
        SourceEntities  : ['item'],
        TargetProperties: ['total_amount']
    }, },

    UI.HeaderInfo                : {
        TypeName      : 'Order',
        TypeNamePlural: 'Order',
        Title         : {
            $Type: 'UI.DataField',
            Value: order_date
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: customer
        }
    },

    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: order_date,
            },
            {
                $Type: 'UI.DataField',
                Value: status,
            },
            {
                $Type: 'UI.DataField',
                Value: customer,
            },
            {
                $Type: 'UI.DataField',
                Value: total_amount,
            },
            {
                $Type: 'UI.DataField',
                Value: shipping_address,
            },
        ],
    },
    UI.Facets                    : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'ItemsFacet',
            Label : 'Order Items',
            Target: 'item/@UI.LineItem'
        }
    ],

    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Value: order_date,
        },
        {
            $Type: 'UI.DataField',
            Value: status,
        },
        {
            $Type: 'UI.DataField',
            Value: customer,
        },
        {
            $Type: 'UI.DataField',
            Value: total_amount,
        },
        {
            $Type: 'UI.DataField',
            Value: shipping_address,
        },
    ],
);

annotate service.Orders with {
    @title              : 'Order Date'
    @Common.FieldControl: #ReadOnly
    order_date;
    @title              : 'Total Amount'
    @Common.FieldControl: #ReadOnly
    total_amount;
    @title              : 'Status'
    @Common.FieldControl: #ReadOnly
    status;
    @title: 'Shipping Address'
    shipping_address;
    @title: 'Customer'
    customer;

};
