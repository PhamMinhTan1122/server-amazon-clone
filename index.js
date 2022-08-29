//IMPORT PACKAGE
const express = require("express");
const mongoose = require('mongoose');

//IMPORT FROM OTHER FILES
const authRouter = require('./routers/auth');
const DB = "mongodb+srv://minhtan:masterminhtan@cluster0.lczbvig.mongodb.net/?retryWrites=true&w=majority"
//INIT
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


const PORT = process.env.PORT || 5000;
const app = express();
// app.use(
//     express.urlencoded({ extended: true })
// );
app.use(express.json());
app.use(authRouter);
mongoose.connect(DB).then(()=> {
    console.log("Connection Successful");

}).catch((e)=> {
    console.log(e);
})
app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`Connected at PORT ${PORT}`);

})




