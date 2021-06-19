const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
 var firstname= req.body.fname;
 var lastname = req.body.lname;
 var email = req.body.email;

 const data = {
    members : [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/46641dc887";

const options = {
    method: "POST",
    auth: "sandeep:179090914976ac5d8a3fd7cd82715398-us6"

}

const request = https.request(url, options, function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        // console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
})


let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}


app.listen(port, function () {
  console.log("Server started on port 3000");
});



//179090914976ac5d8a3fd7cd82715398-us6

// 46641dc887