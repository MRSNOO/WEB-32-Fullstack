const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const app = express();  //web server 

app.use(bodyParser.urlencoded({extended:false}))
//route 
// app.get("/",(req, res)=>{
//   // res.send("<h1>hello world</h1>")   //gửi về 1 đoạn text 
//   // res.sendFile(__dirname  + "/buoi 1/index.html")
//   //dirname là đường dẫn đến folder đang chứa file hiện tại 
//   // res.sendFile(path.resolve(__dirname,"./buoi 1/index.html"))
// })

//frontend router
app.get('/', (req,res)=>{
  res.sendFile(__dirname + "/views/answer.html")
})

app.get('/ask', (req,res)=>{
  res.sendFile(__dirname + "/views/ask.html")

})

app.get('/question', (req,res)=>{
  res.sendFile(__dirname + "/views/questionDetail.html")

})

// app.use(express.static(path.resolve(__dirname,"./buoi 1")))
// app.use(express.static(path.resolve(__dirname,"../nav")))

//backend router
app.post('/add-question',(req,res)=>{
  console.log(req.body.question)
})


app.listen(6969, (err)=>{
  if(err){
    console.log(err)
  }
  else{ 
    console.log("start success")
  }
})