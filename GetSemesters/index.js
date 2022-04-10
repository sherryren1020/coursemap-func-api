const sql = require('mssql')
const dbConfig = require('../dbconfig')

module.exports = async function (context, req) {
    
    let result;
    let status;
    let body;

    try {
        // make sure that any items are correctly URL encoded in the connection string
        //connect to db
        await sql.connect(dbConfig)
        // await sql.connect(`Server=tcp:w0422685cousemapdb.database.windows.net,1433;Initial Catalog=CourseMapDB;Persist Security Info=False;User ID=w0422685;Password=NSCC123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`)

        //query for data
        result = await sql.query(
                    `
                    select Semesters.Id as Id, Semesters.Name as Name, StartDate as StartDate, EndDate as EndDate, Title as AcademicYear from Semesters
                        inner join AcademicYears AY on AY.Id = Semesters.AcademicYearId where Semesters.Id = ${req.params.id}
                        group by Semesters.Id, Semesters.Name, StartDate, EndDate, Title
                        ;

                    select  Courses.id,Courses.CourseCode as CourseCode, Courses.Title as Title from Courses inner join CourseOfferings CO on Courses.Id = CO.CourseId
                            inner join Semesters S on S.Id = CO.SemesterId
                            inner join AcademicYears AY on AY.Id = S.AcademicYearId
                            where S.Id = ${req.params.id}
                            group by Courses.id, Courses.CourseCode, Courses.Title
                            order by Courses.CourseCode
                    `
                )
        console.log(result)

        if(result.recordsets[0].length > 0){
            status = 200

            body = result.recordsets[0][0]
            body.CoursesTaught = result.recordsets[1]

        }else {
            status = 404
        }

        context.res = {
            status,
            body
        };

    } catch (ex) {
        // ... error checks
        console.log(ex)

        status = 400,
        body
    }

    context.res = {
        status,
        body
    };
    
}