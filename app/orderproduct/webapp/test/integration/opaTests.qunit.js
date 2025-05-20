sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'orderproduct/test/integration/FirstJourney',
		'orderproduct/test/integration/pages/OrdersList',
		'orderproduct/test/integration/pages/OrdersObjectPage',
		'orderproduct/test/integration/pages/OrderItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersList, OrdersObjectPage, OrderItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('orderproduct') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersList: OrdersList,
					onTheOrdersObjectPage: OrdersObjectPage,
					onTheOrderItemsObjectPage: OrderItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);