const request=require('request');
const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFpdmVjb2RlcjgwODAiLCJhIjoiY2t6ejh0bzVsMDgwbTNwcXBmYjhsOWhyeSJ9.YHfSLSGUlfRF3N9mcVg3bA&limit=1`;
    request({url,json:true},(error,{body}={})=>{
        if(error)
        callback('Unable to connect to internet!');
      else  if(body.features.length===0)
       callback('Could not find the location.Try another search.');
      else
        callback(undefined,{location:body.features[0].place_name,latitude:body.features[0].center[1],longitude:body.features[0].center[0]});
    })
}

module.exports=geocode;