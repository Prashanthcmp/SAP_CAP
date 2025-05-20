using CatalogService as service from '../../srv/cat-service';

annotate service.OrderItems with {
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
            }
        ],
    }
}


annotate service.OrderItems with @(

UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: order_ID,
    },
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
], );

annotate service.Orders with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'name',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Label: 'order_id',
                Value: order_id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'order_date',
                Value: order_date,
            },
            {
                $Type: 'UI.DataField',
                Label: 'status',
                Value: status,
            },
            {
                $Type: 'UI.DataField',
                Label: 'total_amount',
                Value: total_amount,
            },
            {
                $Type: 'UI.DataField',
                Label: 'shipping_address',
                Value: shipping_address,
            },
            {
                $Type: 'UI.DataField',
                Label: 'payment_method',
                Value: payment_method,
            },
            {
                $Type: 'UI.DataField',
                Value: customer_ID,
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
            Label: 'name',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'order_id',
            Value: order_id,
        },
        {
            $Type: 'UI.DataField',
            Label: 'order_date',
            Value: order_date,
        },
        {
            $Type: 'UI.DataField',
            Label: 'status',
            Value: status,
        },
        {
            $Type: 'UI.DataField',
            Label: 'total_amount',
            Value: total_amount,
        },
    ],
);

annotate service.Orders with {
    customer @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Customers',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: customer_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'email',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'phone',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'address',
            },
        ],
    }


};
