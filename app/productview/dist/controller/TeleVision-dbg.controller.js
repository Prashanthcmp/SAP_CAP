sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], (BaseController, Filter, FilterOperator, MessageBox) => {
  "use strict";

  return BaseController.extend("productview.controller.TeleVision", {
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("TeleVision").attachPatternMatched(this.onObjectMatched, this);
    },

    onObjectMatched(oEvent) {
      let oProductTable = this.getView().byId("idProductsTable");
      let sProductCategoryID = oEvent.getParameter("arguments").Id;
      let aFilter = [new Filter("ProductCategory_ID", FilterOperator.EQ, sProductCategoryID)];
      oProductTable.getBinding("items").filter(aFilter);
			// this.getView().bindElement({
			// 	path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").Id),
			// 	model: "invoice"
			// });
		},

    onPressBuy: function(){
      let oProductTable = this.getView().byId("idProductsTable");
      let aSelectedItems = oProductTable.getSelectedItems();
      if(aSelectedItems.length === 0){
        return MessageBox.error("Please select any one product");
      }

      
    }

  });
});