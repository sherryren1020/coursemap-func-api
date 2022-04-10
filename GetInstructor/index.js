const dbconfig = require('../dbconfig')
const sql = require('mssql')


module.exports = async function (context, req) {
let status;
let body;
// let data;
try{
  await sql.connect(dbconfig)
  const result =  await sql.query(
      `select * from Instructors where Id=${req.params.id};;

select D.Title as Diploma,AY.Title as AcademicYear,DY.Title as Year,DYS.Title as Section
from Instructors
inner join AdvisingAssignments AA on Instructors.Id = AA.InstructorId
inner join DiplomaYearSections DYS on DYS.Id = AA.DiplomaYearSectionId
inner join AcademicYears AY on AY.Id = DYS.AcademicYearId
inner join DiplomaYears DY on DY.Id = DYS.DiplomaYearId
inner join Diplomas D on D.Id = DY.DiplomaId
where Instructors.Id=${req.params.id}
order by AcademicYear desc,Diploma desc,Year asc,Section asc;

select DISTINCT C.Id as id,C.Title as Title, C.CourseCode as CourseCode from Instructors
inner join CourseOfferings CO on Instructors.Id = CO.InstructorId
inner join Courses C on C.Id = CO.CourseId
where Instructors.Id=${req.params.id}
order by CourseCode;
`)
if(result.recordset.length > 0){
    //course exists, building recordsets 

    status=200
     body =result.recordsets[0][0]
    body.AdvisingAssignment =result.recordsets[1]
    body.CoursesTaught=result.recordsets[2]
   
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
        body: err.message
    };
    
}

//fetch some data from db

//display as JSON format



    
}