const path=require('path');
const request=require('request');
 const geocode=require('./utils/geocode');
 const forecast=require('./utils/forecast');
const hbs=require('hbs');
const express=require('express');
const app=express();

const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');


app.use(express.static(publicDirectoryPath));

app.set("view engine","hbs");
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kumar Ankit'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Kumar Ankit'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Message for help page',
        title:'Help',
        name:'Kumar Ankit'
    })
})


app.get('/weather',(req,res)=>{
if(!req.query.address)
{return res.send({
    error:'No address provided'
})}

geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if (error)
    {return res.send({error});}
    forecast(latitude,longitude,(error,forecastData)=>{
        if (error)
        return res.send({error});
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
    })
})
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({error:'No search provided'})
        
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name:'Kumar Ankit'
    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page not found',
        name:'Kumar Ankit'
    });
})


app.listen('3000',()=>{
console.log('Server started at port 3000');
});