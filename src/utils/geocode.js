const request=require('request');

const geocode = (address,callback) => {
    const gcodeurl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=country&access_token=pk.eyJ1IjoidHJjMjU3MyIsImEiOiJjanR4NW8wbzAwNHFxNGRwbjIwM2IyOW9vIn0.H9Yueh9oSRGZM1AmFyBfzA&limit=1`;

    request(    {url: gcodeurl, json: true},    (  error  ,  response  ) => {
        if (error){
            callback("unable to connect to location service",undefined);
        }else if (response.body.features.length == 0 ){
            callback("unable to locate...wromg location !!!",undefined);
        }else{
            const loc=response.body.features[0].center;
            callback(undefined,{
                lattitude: loc[1],
                longitude: loc[0]
            });
        }
        //console.log(response.body.features[0].center);
    });
}
module.exports=geocode;