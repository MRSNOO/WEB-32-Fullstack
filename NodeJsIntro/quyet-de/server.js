const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express();  //web server 

app.use(bodyParser.urlencoded({ extended: false }))
//route 
// app.get("/",(req, res)=>{
//   // res.send("<h1>hello world</h1>")   //gửi về 1 đoạn text 
//   // res.sendFile(__dirname  + "/buoi 1/index.html")
//   //dirname là đường dẫn đến folder đang chứa file hiện tại 
//   // res.sendFile(path.resolve(__dirname,"./buoi 1/index.html"))
// })

//frontend router
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/answer.html")
})

app.get('/ask', (req, res) => {
  res.sendFile(__dirname + "/views/ask.html")

})

app.get('/question', (req, res) => {
  res.sendFile(__dirname + "/views/questionDetail.html")

})

// app.use(express.static(path.resolve(__dirname,"./buoi 1")))
// app.use(express.static(path.resolve(__dirname,"../nav")))

//backend router
app.post('/add-question', (req, res) => {
  // console.log(req.body.question)
  const fileData = fs.readFileSync("questions.json", "utf-8") //dạng string 
  const questionList = JSON.parse(fileData) //array câu hỏi chuyển dạng từ bên trong file JSON ra dạng khác
  //hieu duoc questionList là array vì mình để sẵn 1 cái [] trong questions.json
  const questionContent = req.body.question
  questionList.push({
    content: questionContent,
    yes: 0,
    no: 0
  })

  fs.writeFileSync("questions.json", JSON.stringify(questionList)) //chuyển về dạng mà có thể cho vào JSON được
  res.redirect(`/question/${questionList.length - 1}`) //chuyen den route dang thuc hien /question 
})

app.get('/question/:questionIndex', (req, res) => {
  const fileData = fs.readFileSync("questions.json", "utf-8") //dạng string 
  const questionList = JSON.parse(fileData)
  const question = questionList[req.params.questionIndex]
  // console.log(question)
  // res.sendFile(__dirname + '/views/questionDetail.html')
  if(question){
    const questionDetailHtml = fs.readFileSync(__dirname + "/views/questionDetail.html", "utf-8")
    var htmlWithData = questionDetailHtml
    htmlWithData = htmlWithData
      .replace("question_content", question.content)
      .replace("yes", question.yes)
      .replace("no", question.no)
  
    res.send(htmlWithData)
    console.log(htmlWithData)
  }
  else{
    res.send("Câu hỏi ko tồn tại!")
  }
})
app.get('/home',(req,res)=>{
  const fileData = fs.readFileSync("questions.json","utf-8")
  const questionList = JSON.parse(fileData)

  var randomNumb = Math.floor(Math.random()*questionList.length)
  var randomQuestion = questionList[randomNumb]
    const questionDetailHtml = fs.readFileSync(__dirname + "/views/questionDetail.html", "utf-8")
    var htmlWithData = questionDetailHtml
    htmlWithData = htmlWithData
      .replace("question_content", randomQuestion.content)
      .replace("yes", randomQuestion.yes)
      .replace("no", randomQuestion.no)
  
    res.send(htmlWithData)

    // let yesBtn = document.getElementById("yes")
    // let noBtn = document.getElementById("no")
    // let otherBtn = document.getElementById("other")

    // yesBtn.addEventListener("click",function(){
    //   console.log("hello")
    //   // res.redirect(`/question/${randomNumb}`) 
    // })



})
app.listen(6969, (err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log("start success")
  }
})