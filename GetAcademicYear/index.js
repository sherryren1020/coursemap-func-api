const dbconfig = require('../dbconfig')
const sql = require('mssql')


module.exports = async function (context, req) {
let status;
let body;
// let data;
try{
  await sql.connect(dbconfig)
  const result =  await sql.query(
      `select Id as id, Title as title from AcademicYears where Id=${req.params.id};
        select S.Name,s.StartDate,s.EndDate from AcademicYears
        inner join Semesters S on AcademicYears.Id = S.AcademicYearId
         where AcademicYears.Id=${req.params.id}
         order by s.StartDate DESC;
  
  select concat(I.FirstName,' ', I.LastName) as Advisor,D.Title as Diploma,DYS.Title as Section,dy.Title as Year from AcademicYears A
  inner join DiplomaYearSections DYS on A.Id = DYS.AcademicYearId
  inner join AdvisingAssignments AA on DYS.Id = AA.DiplomaYearSectionId
  inner join Instructors I on I.Id = AA.InstructorId
  inner join DiplomaYears DY on DY.Id = DYS.DiplomaYearId
  inner join Diplomas D on D.Id = DY.DiplomaId
  where A.Id=${req.params.id}
  order by Year,Diploma,Section;
`)
if(result.recordset.length > 0){
    //course exists, building recordsets 

    status=200
     body =result.recordsets[0][0]
    body.Semesters =result.recordsets[1]
    body.AdvisingAssignments = result.recordsets[2]
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