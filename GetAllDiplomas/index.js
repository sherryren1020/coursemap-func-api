const dbconfig = require('../dbconfig')
const sql = require('mssql')


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
//connect to databse

try{
  await sql.connect(dbconfig)
  const result =  await sql.query(`
  SELECT Diplomas.Id as id, Diplomas.Title as title,concat(count(DY.Id),' Years') as Duration  from Diplomas
  inner join DiplomaYears DY on Diplomas.Id = DY.DiplomaId
  group by Diplomas.Id, Diplomas.Title 
  ORDER BY Title asc`)
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