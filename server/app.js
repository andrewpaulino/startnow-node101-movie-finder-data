const express = require('express');
const logger = require('morgan')
const axios = require('axios')
const app = express();
const url = 'http://www.omdbapi.com/?'
const apiKey = '&apikey=8730e0e'
const fs = require('fs');
var history = [{QueryNumber: 123, body: 0}]
app.use(logger('dev'))

app.get('/', function(req, res){    


    var id = req.query.i
    var sameMovie = history.filter(function(obj){
    return obj.QueryNumber == id  
    })
   console.log(sameMovie  + " Should Not go through API")
  
  var newMovie = history.filter(function(obj){
     return obj.QueryNumber != id
  })
console.log(newMovie + " Should Go through API")

  console.log("The Movie Id Selected: " + id)


if (sameMovie == 0 && newMovie !== 0){
    axios.get(url + 'i=' + id + apiKey)
        .then(function(response){ 
         var getData = response.data
         res.json(getData)                                          
         console.log("The status of request: " + response.status)
         history.push({QueryNumber: id, body: response.data})
         console.log("Succesfully Went through Api!")
          
    }).catch(function(error){
        console.log(error)
        res.json(error)
    })

}else{
    res.json(sameMovie[0].body)
    console.log('Recieved Without going through Api!')
}

})
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
module.exports = app;
