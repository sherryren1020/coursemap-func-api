const sql = require('mssql')
const dbconfig = require('../dbconfig')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //connect to databse

    try {
        await sql.connect(dbconfig)
        const result = await sql.query(`
      select Semesters.Id,Semesters.Name from Semesters inner join AcademicYears AY on AY.Id = Semesters.AcademicYearId
        where AcademicYearId = ${req.params.aid}  
        order by Semesters.StartDate asc`)
        console.log(result)

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result.recordset
        };
    } catch (err) {
        context.log(err)
        context.res = {
            status: 400, /* Defaults to 200 */
            body: `Failed to execute the query, casue ${err}`
        };

    }
}