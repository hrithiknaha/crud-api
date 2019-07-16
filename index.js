const express = require('express');
const app = express();


app.get('/', function(req, res){
    res.send("Testing");
});

//Server Setup
const PORT = 3000;
app.listen(process.env.PORT || PORT , function(){
    console.log(`Server up at ${3000}`);
})