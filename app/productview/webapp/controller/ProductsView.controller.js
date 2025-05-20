sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], (Controller, UIComponent) => {
    "use strict";

    return Controller.extend("productview.controller.ProductsView", {
        onInit() {
            // var oModel = this.getOwnerComponent().getModel();
            // var aReqData = [];
            // var chunkedArray = [];
            // oModel.bindList("/ProductCategory").requestContexts().then(aContexts => {
            //     aContexts.forEach(oContext => {
            //         const oData = oContext.getObject();
            //         aReqData.push(oData);
            //     });
            // });
            // this.getView().byId("idImage").setSrc(this.getOwnerComponent().getModel().sServiceUrl.replace("/odata/v4/catalog/", "/Image/Employee-Group.JPG"));
        },

        onLinkPress: function (oEvent) {
            debugger
            // sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")
            //     .then(function (oCrossAppNav) {
            //         // Use the oCrossAppNav service here
            //         oCrossAppNav.toExternal({
            //             target: {
            //               semanticObject: "Customer",
            //               action: "display"
            //             }
            //           });
            //     })
            //     .catch(function (oError) {
            //         // Handle error
            //         console.error("Failed to get CrossApplicationNavigation service", oError);
            //     });
            let sId = oEvent.getSource().getBindingContext().getProperty("ID");
            this.getRouter().navTo("TeleVision", {
                Id: window.encodeURIComponent(sId)
            });
        },

        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },
    });
});