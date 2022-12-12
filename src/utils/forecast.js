const request=require('request');
const forecast=(latitude,longitude,callback)=>{
const url=`http://api.weatherstack.com/current?access_key=c0cc21bad7ad5bb41c5624005a4c5af3&query=${latitude},${longitude}&units=f`
request({url,json:true},(error,{body}={})=>{
    if(error)
    callback('Unable to connect to internet!');
    else if(body.error)
    callback('Unable to find location!')
    else
    {
       current=body.current;
       callback(undefined,`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`);

    }
})
}

module.exports=forecast;