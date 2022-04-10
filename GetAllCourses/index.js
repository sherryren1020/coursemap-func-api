
const sql = require('mssql')
const dbconfig = require('../dbconfig')


module.exports = async function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
try{
  await sql.connect(dbconfig)
  const result =  await sql.query(`SELECT * FROM Courses ORDER BY CourseCode`)
  console.log(result)

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: result.recordset
};
}catch(err){

    context.res = {
        status: 400, /* Defaults to 200 */
        body: 'err'
    };
    
}

//fetch some data from db

//display as JSON format



    
}