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

app.get('/auth/instagram',(req,res)=>{

})



app.get('/insta',(req,res)=>{
    axios.get('https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJWaWE0VnJmVXloei00anZAabndXTW05b3dDdWFzUWpQcmhBZA3RXVTk4NV9VMFl1TmV0R2dQbW5TR1lGTzg1bktsMFhZASmtkSXMtUDd4bTNpTUI5NmFOX0NoQXVlUW1VcW9haDJ3')
  .then(function (response) {
    // handle success
    //console.log(response);
    //console.log(response);
    let data = response.data.data;
    let toSendData = [];
    for(i=0;i<data.length;i++){
    
      let type=data[i].media_type;
      let url = data[i].media_url;
      let index = (i+1)%4;
      index=index===0?4:index;
      console.log(index);
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