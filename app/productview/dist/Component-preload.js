//@ui5-bundle productview/Component-preload.js
sap.ui.require.preload({
	"productview/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","productview/model/models"],(e,t)=>{"use strict";return e.extend("productview.Component",{metadata:{manifest:"json",interfaces:["sap.ui.core.IAsyncContentCreation"]},init(){e.prototype.init.apply(this,arguments);this.setModel(t.createDeviceModel(),"device");this.getRouter().initialize()}})});
},
	"productview/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],e=>{"use strict";return e.extend("productview.controller.App",{onInit(){}})});
},
	"productview/controller/ProductsView.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],e=>{"use strict";return e.extend("productview.controller.ProductsView",{onInit(){}})});
},
	"productview/i18n/i18n.properties":'# This is the resource bundle for productview\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Products\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Products',
	"productview/manifest.json":'{"_version":"1.65.0","sap.app":{"id":"productview","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.17.4","toolsId":"63df718f-c906-4707-ab29-55c4f6a9f118"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"ProductDisplay":{"semanticObject":"Product","action":"display","title":"Display Products","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.135.0","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"productview.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","controlAggregation":"pages","controlId":"app","transition":"slide","type":"View","viewType":"XML","path":"productview.view","async":true,"viewPath":"productview.view"},"routes":[{"name":"RouteProductsView","pattern":":?query:","target":["TargetProductsView"]}],"targets":{"TargetProductsView":{"id":"ProductsView","name":"ProductsView"}}},"rootView":{"viewName":"productview.view.App","type":"XML","id":"App","async":true}},"sap.cloud":{"public":true,"service":"managed-approuter"}}',
	"productview/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"productview/view/App.view.xml":'<mvc:View controllerName="productview.controller.App"\n    displayBlock="true"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"><App id="app"></App></mvc:View>',
	"productview/view/ProductsView.view.xml":'<mvc:View controllerName="productview.controller.ProductsView"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"></Page></mvc:View>'
});
//# sourceMappingURL=Component-preload.js.map
