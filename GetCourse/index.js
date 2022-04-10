const dbconfig = require('../dbconfig')
const sql = require('mssql')


module.exports = async function (context, req) {
let status;
let body;

try{
  await sql.connect(dbconfig)
  const result =  await sql.query(`
  SELECT Id as id, Title as title, CourseCode as courseCode
 FROM Courses
WHERE id=${req.params.id};

Select C2.Id as Id, C2.Title as Title, C2.CourseCode as CourseCode From Courses C
inner join CoursePrerequisites CP on C.Id = CP.CourseId
inner join Courses C2 on C2.Id = PrerequisiteId
where C.Id = ${req.params.id};

select C2.Id AS Id, C2.CourseCode AS CourseCode, C2.Title AS title from Courses C
inner join CoursePrerequisites CP on C.Id = CP.PrerequisiteId
inner join Courses C2 on C2.Id = CP.CourseId
where C.Id=${req.params.id};
`)
if(result.recordset.length > 0){
    //course exists, building recordsets 

    status=200
    body =result.recordsets[0][0]
    body.CoursePrerequisites =result.recordsets[1]
    body.IsPrerequisitesFor = result.recordsets[2]
}else{
    status=404
}

  context.res = {
    // status: 200, /* Defaults to 200 */
    status,
    body
};
}catch(err){

    context.res = {
        status: 400, /* Defaults to 200 */
        body: err
    };
    
}

//fetch some data from db

//display as JSON format



    
}