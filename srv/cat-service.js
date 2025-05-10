const cds = require('@sap/cds')
class CatalogService extends cds.ApplicationService { init() {
  const { Products } = cds.entities('CatalogService')

  // Register your event handlers in here, for example:
  this.after ('each', Products, book => { 
    console.log("Product Triggered");
  });

  async function CallEntity(entity, data) {
    let srv = await cds.connect.to('CatalogService');
    if (entity === 'Products') {
      //If any custom handling required for a particular entity
    }

    data.map(async function(oData){
      const insertQuery = INSERT.into('Products').entries(oData);
      const insertResult = await srv.run(insertQuery);
    })
    
    // let query = SELECT.from(entity);
    // await srv.run(query);
    // return insertResult; //returns response to excel upload entity
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
}}

module.exports = CatalogService