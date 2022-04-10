const dbconfig = require('../dbconfig')
const sql = require('mssql')


module.exports = async function (context, req) {
let status;
let body;
// let data;
try{
  await sql.connect(dbconfig)
  const result =  await sql.query(
      `SELECT Id as id, Title as title from Diplomas where Id=${req.params.id};

      SELECT AY.Title As AcademicYear,DY.Title AS DiplomaYear,DYS.Title AS DiplomaYearSection, concat(I.FirstName,' ', I.LastName) as Advisor
                        FROM Diplomas D
                        inner join DiplomaYears DY on D.Id = DY.DiplomaId
                        inner join DiplomaYearSections DYS on DY.Id = DYS.DiplomaYearId
                        inner join AdvisingAssignments AA on DYS.Id = AA.DiplomaYearSectionId
                        inner join Instructors I on AA.InstructorId = I.Id
                        inner join AcademicYears AY on AY.Id = DYS.AcademicYearId
                        WHERE D.Id=${req.params.id}
                        ORDER BY AcademicYear DESC, DiplomaYear,DiplomaYearSection ASC;

`)
if(result.recordset.length > 0){
    //course exists, building recordsets 

    status=200
     body =result.recordsets[0][0]
    body.advisors =result.recordsets[1]
   
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