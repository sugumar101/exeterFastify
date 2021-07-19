const fastify = require("fastify")({logger:true});
const crypto = require("crypto");
PORT = 4000

let studentData = require('./studentData')

/* GET ALL STUDENT LISTS */
fastify.get('/getAllStudentsList',(req,res) => {
    res.send(studentData)
})

/* GET STUDENT BY ID */
fastify.get('/getStudent/:id',(req,res) => {
    const { id } = req.params
    const studentDetail = studentData.find((student) => student.studentId === id)  
    res.send(studentDetail)
})

/* ADD STUDENT to the LIST */
fastify.post('/addStudent', (req,res)=>{
    const { studentName,subject1,subject2,subject3,subject4,subject5 } = req.body
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const addData = {
        studentId: uniqueId,
        studentName,
        subject1,
        subject2,
        subject3,
        subject4,
        subject5
    }
    studentData = [...studentData  , addData]
    res.code(201).send(studentData)
})
/* Update List */
fastify.put('/updateStudent/:studentId', (req,res)=>{
    const { studentName,subject1,subject2,subject3,subject4,subject5 } = req.body
    const { studentId } = req.params
  studentData = studentData.map((student) => (student.studentId === studentId ? { studentId,studentName,subject1,subject2,subject3,subject4,subject5 } : student))
    res.code(201).send(studentData)
})

/* Delete from List */
fastify.delete('/deleteStudent/:studentId', (req,res)=>{
    const { studentId } = req.params
    studentData = studentData.filter((student) => student.studentId !== studentId)
    res.send(studentData)
})



const start = async ()=>{
    try{
        await fastify.listen(PORT)
    }catch(error){
        fastify.log.error(error)
        process.exit(1)
    }
}

start()