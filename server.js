var express=require('express')
var body=require('body-parser')
var session=require('express-session')
var cookieParser=require('cookie-parser')
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var app=express()
app.use(cookieParser())
app.use(session({secret:"MeAnStack"}))
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','pug')
app.set('views',__dirname+'/views')
b=mongoose.connect("mongodb://127.0.0.1:27017/PUG")
b.then(data=>{
    console.log("sucess")
})
b.catch(err=>{
    console.log(err)
})
let cse2=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mail:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true  
    }
   
},
{
    collection:'pug',
    versionKey:false
})
const demo=mongoose.model('pug',cse2)
app.get('/',(req,res)=>{
     res.render('reg')//sigin page the values goes into database
})
app.post('/login',(req,res)=>{
  var data={
      username:req.body.username,
      mail:req.body.mail,
      password:req.body.password
      
  }
  const m=new demo(data)
  m.save().then((info)=>{
       res.render('login')//login page
  })
})
app.post('/profile',(req,res)=>{
  const username=req.body.username
    const password=req.body.password;
    req.session.username=username;
    req.session.loggedIn=true
    demo.findOne({username:username}).then((data)=>{
        if(data==null){
            res.send('first register into website');
        }
        else
        {
           if(data.password==password)
           {
              return res.render('dashboard')
           
           }
           else{
            res.send('password incorrect')
           }
        }
    })
})
app.listen(4000)