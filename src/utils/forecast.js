//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request=require("request");
const forecast = (lat,lng,callback) => {
    const url=`https://api.darksky.net/forecast/2044be285d673d69faf07b4d65cc4477/${lat},${lng}`;
    request(    {url: url, json: true},    (  error  ,  response  ) => {
        if (error){
            callback("unable to connect to location service",undefined);
        }else if (response.body.error ){
            callback("invalid coordinates !!!",undefined);
        }else{
            const currinfo=response.body.currently;
            callback(undefined,{
                forecast: currinfo.summary,
                temp: currinfo.temperature,
                rain: currinfo.precipProbability,
                humidity: currinfo.humidity
            });
        }
    });

    
}
module.exports = forecast ;

