sap.ui.define([
    "sap/m/MessageBox", 
    "sap/m/MessageToast", 
    "sap/ui/core/UIComponent",
    'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
], function(MessageBox, MessageToast, UIComponent, exportLibrary, Spreadsheet) {
    'use strict';

    var EdmType = exportLibrary.EdmType;

    function  createColumnConfig() {
        var aCols = [];

        aCols.push({
            type: EdmType.Number,
            property: 'PurchaseCategory',
            scale: 0
        });

        aCols.push({
            property: 'ProductCategory',
            type: EdmType.String
        });

        aCols.push({
            property: 'ModelNumber',
            type: EdmType.String
        });

        aCols.push({
            property: 'ProductId',
            type: EdmType.String
        });

        aCols.push({
            property: 'ProductName',
            type: EdmType.String
        });

        aCols.push({
            property: 'Mrp',
            type: EdmType.Number
        });

        aCols.push({
            property: 'StaffPrice',
            type: EdmType.Number
        });

        aCols.push({
            property: 'Color',
            type: EdmType.String
        });

        aCols.push({
            property: 'Avilability',
            type: EdmType.String
        });
        aCols.push({
            property: 'DeliverHome',
            type: EdmType.String
        });

        return aCols;
    }

    function _createProductCategoryController(oExtensionAPI) {
        var oUploadDialog;

        function closeDialog() {
            oUploadDialog && oUploadDialog.close()
        }

        return {

            onBeforeOpen: function (oEvent) {
                oUploadDialog = oEvent.getSource();
                oExtensionAPI.addDependent(oUploadDialog);
            },

            onAfterClose: function (oEvent) {
                oExtensionAPI.removeDependent(oUploadDialog);
                oUploadDialog.destroy();
                oUploadDialog = undefined;
            },
            
            onCancel: function (oEvent) {
                closeDialog();
            },
        }
    }

    function _createUploadController(oExtensionAPI, Entity) {
        var oUploadDialog;

        function setOkButtonEnabled(bOk) {
            oUploadDialog && oUploadDialog.getBeginButton().setEnabled(bOk);
        }

        function setDialogBusy(bBusy) {
            oUploadDialog.setBusy(bBusy)
        }

        function closeDialog() {
            oUploadDialog && oUploadDialog.close()
        }

        function showError(code, target, sMessage) {
            MessageBox.error("Upload failed", {title: "Error"});
        }

        function byId(sId) {
            return sap.ui.core.Fragment.byId("excelUploadDialog", sId);
        }

        return {
            onBeforeOpen: function (oEvent) {
                oUploadDialog = oEvent.getSource();
                oExtensionAPI.addDependent(oUploadDialog);
            },

            onAfterClose: function (oEvent) {
                oExtensionAPI.removeDependent(oUploadDialog);
                oUploadDialog.destroy();
                oUploadDialog = undefined;
            },

            onOk: function (oEvent) {
                setDialogBusy(true)
                debugger;
                var oFileUploader = byId("uploader");
                var headPar = new sap.ui.unified.FileUploaderParameter();
                headPar.setName('slug');
                headPar.setValue(Entity);
                oFileUploader.removeHeaderParameter('slug');
                oFileUploader.addHeaderParameter(headPar);
                headPar.setName("x-csrf-token");
                headPar.setValue(oExtensionAPI._view.getModel().mHeaders["X-CSRF-Token"]);
                oFileUploader.addHeaderParameter(headPar);
                var sUploadUri = oExtensionAPI._controller.extensionAPI._controller._oAppComponent.getManifestObject().resolveUri("./odata/v4/catalog/ExcelUpload/excel");
                oFileUploader.setUploadUrl(sUploadUri);
                oFileUploader
                    .checkFileReadable()
                    .then(function () {
                        oFileUploader.upload();
                    })
                    .catch(function (error) {
                        showError("The file cannot be read.");
                        setDialogBusy(false)
                    })
            },

            onCancel: function (oEvent) {
                closeDialog();
            },

            onTypeMismatch: function (oEvent) {
                var sSupportedFileTypes = oEvent
                    .getSource()
                    .getFileType()
                    .map(function (sFileType) {
                        return "*." + sFileType;
                    })
                    .join(", ");

                showError(
                    "The file type *." +
                    oEvent.getParameter("fileType") +
                    " is not supported. Choose one of the following types: " +
                    sSupportedFileTypes
                );
            },

            onFileAllowed: function (oEvent) {
                setOkButtonEnabled(true)
            },

            onFileEmpty: function (oEvent) {
                setOkButtonEnabled(false)
            },

            onUploadComplete: function (oEvent) {
                var iStatus = oEvent.getParameter("status");
                var oFileUploader = oEvent.getSource()

                oFileUploader.clear();
                setOkButtonEnabled(false)
                setDialogBusy(false)

                if (iStatus >= 400) {
                    var oRawResponse;
                    try {
                        oRawResponse = JSON.parse(oEvent.getParameter("responseRaw"));
                    } catch (e) {
                        oRawResponse = oEvent.getParameter("responseRaw");
                    }
                    if (oRawResponse && oRawResponse.error && oRawResponse.error.message) {
                        showError(oRawResponse.error.code, oRawResponse.error.target, oRawResponse && oRawResponse.error && oRawResponse.error.message);
                    }
                } else {
                    MessageToast.show("File uploaded successfully");
                    oExtensionAPI.refresh()
                    closeDialog();
                }
            }
        };
    };

    return {
        onUploadExcel: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            this.loadFragment({
                id: "excelUploadDialog",
                name: "project1.ext.fragment.ExcelUploadDialog",
                controller: _createUploadController(this, "Products")
            }).then(function (oDialog) {
                oDialog.open();
            });
        },

		onDownloadTemplate: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
			aCols = createColumnConfig();
            aCols.push(["Project", "Project1"]);
			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: [],
				fileName: 'Table export sample.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},

        onProductCategory: function() {
            this.loadFragment({
                id: "idProductCategory",
                name: "project1.ext.fragment.ProductCategory",
                controller: _createProductCategoryController(this)
            }).then(function (oDialog) {
                oDialog.open();
            });
        }

        
    };
});

