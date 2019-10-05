const fs = require("fs")   // gán thư viện vào 1 biến 
const obj = {
  a:5,
  b:6
}
//ghi file 
// dùng json 
console.log("begin")

const jsonObj = JSON.stringify(obj)  // biến thành dạng string
require("fs").writeFile("test.txt", jsonObj, (err)=>{    //writeFile chi nhận string 
  if(err){
    console.log(err)
  }
  else{
    console.log("ghi file thanh cong ")
  }
})
console.log("end")

//read file 
console.log("begin")
require("fs").readFile("test.txt", {encoding: "utf-8"}, (err, data)=>{
  if(err){
    console.log(err)
  }
  else{
    const dataObj = JSON.parse(data)
    console.log("File data:", dataObj.a)   //đưa dữ liệu về dạng object  
  }
})
console.log("end")