const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');
const hbs=require('hbs');
const express=require('express');
const app=express();

// define paths or express config
const path=require('path');
const viewPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');


// setup static directory to serve

// setup handlebars engine and view loation
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.get('',(req,res) => {
    res.render('index',{
        title:'dynamically generated',
        author:'Titas'
    });
});

app.get('/home',(req,res)=>{
    res.render('home',{ author:'Titas'});
});

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({ error: 'no address provided...!!'});
    }
    console.log(req.query.address);
    
    geocode(req.query.address,(error,data) =>{
        if (error){
            return res.send({ error: error}); //console.log(error);
        }
        forecast(data.lattitude, data.longitude, (error, forecastdata) => {
            if (error){
                return res.send({ error: error}); //console.log(error);
            }
            console.log('Data', forecastdata);
            res.send(forecastdata);
          });
    });
    
    /*res.send({
        
    });*/
});
app.listen(3000,()=>{
    console.log("server is up and running on port 3000");
});