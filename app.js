const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');



const port =  3001;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
  res.render('welcome');
})
var token = 'IGQVJWWjhheVo5TTVkMV91U2UyalgtZAjNBVHRWVUI0bG52bHVHenhqakdvN2lIeG1RenhlSkg5SGh0RTA4MlE3a1NTU0hkc29WSkxiN0FPbWVua0k1bmV1WkplUjhhY1d0S2ZADcWRR';
app.get('/refreshToken',(req,res)=>{
  axios.get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&&access_token='+token).then(function(response){
    
    let data = response.data;
    //console.log(data);
    let newToken = data.access_token;
    let expire  = data.expires_in;
    console.log(expire);
    console.log("--------------------------");
    console.log(newToken); 
    console.log("--------------------");
    token = newToken;
    res.redirect("/");
  }).catch(function(error){
    console.log(error);
  })
})



app.get('/insta',(req,res)=>{
    axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token='+token)
  .then(function (response) {
    console.log(token);
    // handle success
    //console.log(response);
    //console.log(response);
    let data = response.data.data;
    //console.log(response.data.data);
    let toSendData = [];
    for(i=0;i<data.length;i++){
    
      let type=data[i].media_type;
      let url = data[i].media_url;
      let index = (i+1)%4;
      index=index===0?4:index;
      //console.log(index);
      const obj = {type:type,url:url,index:index};
      toSendData.push(obj);
    }
    //console.log(toSendData.length);
    res.render('insta',{insta:toSendData});
    })
  .catch(function (error) {
    // handle error
    console.log("Error in axios:"+error.message);
  })
  .finally(function () {
    // always executed
    console.log("Executed Finally")
  });
})

app.listen(process.env.PORT || 3000, function () {
    console.log("App Started");
});