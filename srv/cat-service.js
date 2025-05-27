const cds = require('@sap/cds')
class CatalogService extends cds.ApplicationService {
  init() {
    const { Products, ProductCategory, Orders, OrderItems } = cds.entities('CatalogService')


    this.before('NEW', Orders.drafts, async (req) => {
      console.log("Create Order triggered");
      let oData = req.data;
      oData.order_date = new Date();
      oData.status = "New";
      return oData;

    });

    this.before("NEW", OrderItems.drafts, async (req) => {
      console.log('Order Items Press');
    });


    this.after("UPDATE", OrderItems, async (req) => {
      const db = cds.transaction(req); // ✅ use transactional DB context
      const aOrderItems = await db.run(SELECT.from(OrderItems.drafts));
    })

   

    this.before("UPDATE", OrderItems.drafts, async (req) => {

      const sProductId = req.data.product_ID;

      const iQuantity = req.data.quantity;

      let isValid = true;

      if (sProductId) {
        await _callProductUpdate(req);
        isValid = await _callQuantityValidation(req);
        await _callUpdateOrderTotal(req);
      }

      if (iQuantity) {
        await _callQuantityUpdate(req);
        isValid = await _callQuantitLineItemValidation(req);
        isValid = await _callQuantityValidation(req);
        await _callUpdateOrderTotal(req);
      }

      if (!isValid) {
        req.error(400, 'All product quantities are not within defined limits.');
        return;
      }

    });



    async function _callUpdateOrderTotal(req) {
      const db = cds.transaction(req); // ✅ use transactional DB context
      const aOrderItems = await db.run(SELECT.from(OrderItems.drafts));
      const totalAmount = aOrderItems.reduce((sum, item) => sum + parseInt(item.totalPrice), 0);
      let item = await db.run(
        SELECT.one
          .from(OrderItems.drafts)
          .columns('ID', 'order_ID', 'DraftAdministrativeData_DraftUUID', 'totalPrice', 'product_ID', 'ProductCategory', 'unitPrice')
          .where({ ID: req.data.ID })
      );
// ✅ update the draft order safely using DB service
      await db.run(
        UPDATE(Orders.drafts)
          .set({ total_amount: totalAmount })
          .where({
            ID: item.order_ID,
            DraftAdministrativeData_DraftUUID: item.DraftAdministrativeData_DraftUUID
          })
      );

    }


    async function _callQuantitLineItemValidation(req) {
      const db = cds.transaction(req); // ✅ use transactional DB context
      const iQuantity = req.data.quantity;
      let item = await db.run(
        SELECT.one
          .from(OrderItems.drafts)
          .columns('ID', 'order_ID', 'DraftAdministrativeData_DraftUUID', 'totalPrice', 'product_ID', 'ProductCategory', 'unitPrice')
          .where({ ID: req.data.ID })
      );

      if (item.ProductCategory === 1 && iQuantity > 2) {
        return false;
      }
    }

    async function _callQuantityUpdate(req) {

      const db = cds.transaction(req); // ✅ use transactional DB context
      const iQuantity = req.data.quantity;
      let item = await db.run(
        SELECT.one
          .from(OrderItems.drafts)
          .columns('ID', 'order_ID', 'DraftAdministrativeData_DraftUUID', 'totalPrice', 'product_ID', 'ProductCategory', 'unitPrice')
          .where({ ID: req.data.ID })
      );
      let iTotalPrice = item.unitPrice * iQuantity;
      await db.run(
        UPDATE(OrderItems.drafts)
          .set({ totalPrice: iTotalPrice })
          .where({
            ID: item.ID,
            DraftAdministrativeData_DraftUUID: item.DraftAdministrativeData_DraftUUID
          })
      );

      await db.run(
        SELECT
          .from(OrderItems.drafts)
          .columns('ID', 'order_ID', 'DraftAdministrativeData_DraftUUID', 'totalPrice')
          .where({ ID: req.data.ID })
      );
    }

    async function _callProductUpdate(req) {

      const db = cds.transaction(req); // ✅ use transactional DB context
      const oProductDeatils = await db.run(SELECT.from(Products).where({ ID: req.data.product_ID }));

      let item = await db.run(
        SELECT.one
          .from(OrderItems.drafts)
          .columns('ID', 'order_ID', 'DraftAdministrativeData_DraftUUID', 'totalPrice')
          .where({ ID: req.data.ID })
      );

      if (!item?.order_ID || !item?.DraftAdministrativeData_DraftUUID) {
        req.error(400, "Missing order ID or draft UUID");
        return;
      }

      // ✅ update the draft order item safely using DB service
      await db.run(
        UPDATE(OrderItems.drafts)
          .set({ totalPrice: oProductDeatils[0].StaffPrice, quantity: 1, ProductCategory: oProductDeatils[0].ProductCategory_ID, unitPrice: oProductDeatils[0].StaffPrice })
          .where({
            ID: item.ID,
            DraftAdministrativeData_DraftUUID: item.DraftAdministrativeData_DraftUUID
          })
      );

      item = await db.run(
        SELECT.one
          .from(OrderItems.drafts)
          .columns('ID', 'order_ID', 'DraftAdministrativeData_DraftUUID', 'totalPrice', 'ProductCategory', 'unitPrice')
          .where({ ID: req.data.ID })
      );

    }

    async function _callQuantityValidation(req) {
      const db = cds.transaction(req); // ✅ use transactional DB context
      const aOrderItems = await db.run(SELECT.from(OrderItems.drafts));
      let aValidArray = [];
      if (req.data.quantity) {
        aValidArray = aOrderItems.map(function (item) {
          if (item.ID === req.data.ID)
            item.quantity = req.data.quantity;
          return item;
        });
      } else {
        aValidArray = aOrderItems;
      }


      // Define quantity limits per product
      const quantityLimits = {
        1: 2,  // Product 1 → max 2
        2: 2   // Product 2 → max 1
      };

      const productQuantities = {};
      let isValid = true;

      for (const item of aValidArray) {
        const oProductCategory = item.ProductCategory;
        const quantity = item.quantity;
        productQuantities[oProductCategory] = (productQuantities[oProductCategory] || 0) + quantity;

        const limit = quantityLimits[oProductCategory] ?? Infinity;

        if (productQuantities[oProductCategory] > limit) {
          console.error('Error, All product quantities are not within defined limits.');
          isValid = false;
        }
      }
      return isValid;
    }


    // Register your event handlers in here, for example:
    this.after('each', Products, product => {
      console.log("Product Triggered");
      let oAvilCricality = product.Avilability === 'Yes' ? 3 : 1;
      product.Criticality = oAvilCricality;

      let oDeliverHome = product.DeliverHome === 'Yes' ? 3 : 1;
      product.DeliveryCriticality = oDeliverHome;
    });

    this.after('READ', ProductCategory, async Results => {
      console.log("Product Category Triggered");

      if (Results.length === 0) {
        let aData = [{ ID: 1, name: "Bravia" }, { ID: 2, name: 'Ear Phone' }, { ID: 3, name: 'Head Phone' }, { ID: 4, name: 'Bluetooth Speaker' }, { ID: 5, name: 'Home Theater' }, { ID: 6, name: 'Play Station' }];
        const insertQuery = await INSERT.into(ProductCategory, aData);
      }
    });

    async function CallEntity(entity, data) {
      let srv = await cds.connect.to('CatalogService');
      if (entity === 'Products') {
        //If any custom handling required for a particular entity
      }

      const insertQuery = await INSERT.into(Products, data);

    }

    this.on('PUT', "ExcelUpload", async (req, next) => {
      console.log("Excel Upload Triggered");
      if (req.data.excel) {
        var entity = req.headers.slug;
        const stream = new require('stream').PassThrough();;
        var buffers = [];
        req.data.excel.pipe(stream);
        await new Promise((resolve, reject) => {
          stream.on('data', dataChunk => {
            buffers.push(dataChunk);
          });
          stream.on('end', async () => {
            var buffer = Buffer.concat(buffers);
            var XLSX = require("xlsx");
            var workbook = XLSX.read(buffer, { type: "buffer", cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', cellNF: true, rawNumbers: false });
            let data = [];
            const sheets = workbook.SheetNames
            for (let i = 0; i < sheets.length; i++) {
              const temp = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[i]], { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false })
              temp.forEach((res, index) => {
                // if (index === 0) return;
                data.push(JSON.parse(JSON.stringify(res)))
              })
            }
            if (data) {
              const responseCall = await CallEntity(entity, data);
              if (responseCall == -1)
                reject(req.error(400, JSON.stringify(data)));
              else {
                resolve(req.notify({
                  message: 'Upload Successful',
                  status: 200
                }));
              }
            }
          });
        });
      } else {
        return next();
      }
    });


    return super.init()
  }
}

module.exports = CatalogService