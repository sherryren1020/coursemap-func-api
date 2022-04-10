const dbconfig = require('../dbconfig')
const sql = require('mssql')


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
//connect to databse

try{
  await sql.connect(dbconfig)
  const result =  await sql.query(`SELECT * FROM AcademicYears ORDER BY title DESC`)
  console.log(result)

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: result.recordset
};
}catch(err){
    context.log(err)
    context.res = {
        status: 400, /* Defaults to 200 */
        body: `Failed to execute the query, casue ${err}`
    };
    
}

//fetch some data from db

//display as JSON format



    
}