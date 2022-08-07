// // const axios = require("axios");

// // const options = {
// //   method: 'GET',
// //   url: 'https://currency-exchange.p.rapidapi.com/exchange',
// //   params: {from: 'USD', to: 'ILS', q: '1'},
// //   headers: {
// //     'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
// //     'X-RapidAPI-Key': '48ba1c312emsh98267ba26a8424ep15c5e3jsne7cea0d9d754'
// //   }
// // };

// // axios.request(options).then(function (response) {
// // 	console.log(response.data);
// // }).catch(function (error) {
// // 	console.error(error);
// // });

// let from = "ILS";
// let to = "USD";
// let amount = 20;
// const host = 'api.frankfurter.app';
// fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
//   .then(resp => resp.json())
//   .then((data) => {
//     document.getElementById('currency').innerHTML = `${amount} ${from} = ${data.rates.USD} ${to}`;
//   });

// //data.1.quote.USD
// // fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1`,{mode:"no-cors"})
// // .then(function (response){
// //     console.log(response.data);
// // })
// // .catch(function (error) {
// //     // handle error
// //     console.log(error);
// //   })

// // axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
// // .then(Response => {
// //     console.log(Response);
// // })

// // axios.get('https://pro-api.coinmarketcap.com/v1/exchange/info',{
// //     mode: 'no-cors',
// //     headers: {
// //         'Access-Control-Allow-Origin': '*',
// //         Accept: 'application/json',
// //         'Content-Type': 'application/json',
// //         'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
// //     },
// // })
// // .then(Response => {
// //     console.log(Response);
// // })

// axios.get('https://api.coincap.io/v2/assets/bitcoin',{mode : 'no-cors'})
// .then(Response => {
//   document.getElementById('currency').innerHTML = Response.data.data.priceUsd;
//   console.log(Response.data.data.priceUsd);
// })
// .catch(function (error) {
//   console.log(error);
// });


// // var axios = require('axios');

// // var config = {
// //   method: 'get',
// //   url: 'api.coincap.io/v2/assets',
// //   headers: { }
// // };

// // axios(config)
// // .then(function (response) {
// //   console.log(JSON.stringify(response.data));
// // })


// // var requestOptions = {
// //     method: 'GET',
// //     redirect: 'follow'
// //   };
  
// //   fetch("api.coincap.io/v2/assets", requestOptions)
// //     .then(response => response.text())
// //     .then(result => console.log(result))
// //     .catch(error => console.log('error', error));

const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cors = require('cors')

let menues = {
    1: ".hot_beverages_menue",
    2: ".juice_menue",
    3: ".iced_menue",
    42069: ".item_instructions"
};

let items = {
  hot_item: {
      capuchino: 15,
      americano: 14,
      espreso: 10
  },

  juice_item: {
      fresh_orange_juice: 16,
      fresh_apple_juice: 14,
      fresh_pomegranate_juice: 18
  },

  iced_item: {
      slushy_iced_coffe: 19,
      slushy_diet_iced_coffe: 19,
      slushy_iced_cohocolate: 19
  }
};

// const server = http.createServer(req,res => {
//   res.writeHead(200,{'content-type' : 'text/html'});
//   fs.readFile('index.html', function(error,data){
//     if(error){
//       res.writeHead(404);
//       res.write('file not found 404');
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// })

// server.listen(port, function(error){
//   if(error){
//     console.log('error ' + error);
//   } else{
//     console.log(`server listening on port ${port}`);
//   }
// })

app.use(cors());
app.use(express.static("public"));

app.get('/items', (req, res) => {
  //console.log(JSON.stringify(items));
  res.send(JSON.stringify(items));
  res.end();
});

app.get('/menues', (req, res) => {
  //console.log(JSON.stringify(menues));
  res.send(JSON.stringify(menues));
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
