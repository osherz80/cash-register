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


const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");// to encript passwords
const Joi = require("joi");
app.use(cors());

//for getting parameters with not get methodes(set before the routes)
//(parameters in the req.body)
app.use(bodyParser.urlencoded({ extended: false }));// apparently the same as app.use(express.bodyParser());
app.use(bodyParser.json());

// setting the view engine and replacing the default views folder with our own 
app.set('view engine', "ejs");
app.set('views'/*default folder*/, 'my views'/*our folder*/);

// getting static files from "public" folder
app.use(express.static("public"));

// app.use((req,res,next) => {
//   console.log('a request was made');
//   console.log(`host ${req.hostname}`);
//   console.log(`path ${req.path}`);
//   console.log(`method ${req.method}`);
//   next();
// })
//3rd party middleware for requests console log info^^^^
app.use(morgan('dev'));


// connecting to mongo (async function!)
const dbCredentials = 'mongodb+srv://osherz:tonitoni1@cashregister.dky7y.mongodb.net/system-essentials?retryWrites=true&w=majority';
mongoose.connect(dbCredentials)
  .then((result) => {
    console.log('connected to db');
    app.listen(PORT, () => {
      console.log(`cash register app listening on port ${PORT}`);
    });
  })
  .catch((err) => { console.log('db connection error ' + err) });


//importing our mongo schema/model
const menuesModel = require('./mongo models/menues');
const extrasModel = require('./mongo models/extras');
const orderSumModel = require('./mongo models/orderSum');
const adminsModel = require('./mongo models/admins');

////////////////////////   POST routes   \\\\\\\\\\\\\\\\\\\\\\

app.post('/post-menues', (req, res) => {
  let data = req.body;
  const menuesDB = new menuesModel({
    menues: data.menues
  });

  menuesDB.save()
    .then((result) => {
      res.send(result);
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/post-extras', (req, res) => {
  let data = req.body;
  const extrasDB = new extrasModel({
    extras: data.extras
  });

  extrasDB.save()
    .then((result) => {
      res.send(result);
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/update-menues', (req, res) => {
  console.log('updated menue', req.body);
  menuesModel.findByIdAndUpdate({ _id: "6281e7c9d3a3fbfe70827cba" }, { menues: req.body.menues })
    .then((result) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
      console.log(err);
    })
})

app.post('/update-extras', (req, res) => {
  console.log('updated extras menue', req.body);
  extrasModel.findByIdAndUpdate({ _id: "6272cb49fc14669c66b20222" }, { extras: req.body.extras })
    .then((result) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
      console.log(err);
    })
})

const validAdmin = (_reqBody) => {
  let joiSchema = Joi.object({
    userName: Joi.string().max(50),
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().email().required()
  })
  return joiSchema.validate(_reqBody);
}

app.post('/add-admin', async (req, res) => {
  let validBody = validAdmin(req.body);
  if (validBody.error) {
    return res.status(400).send(validBody.error.details);
  }
  try {
    console.log("adding admin")
    const password = await bcrypt.hash(req.body.password, 10);
    console.log("password crypted")
    const newAdmin = await new adminsModel({
      userName: req.body.userName,
      email: req.body.email,
      password
    });
    const result = await newAdmin.save()
    result.password = "**********";
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err)
  }
})

app.delete('/delete-admin', async (req, res) => {
  let validBody = validAdmin(req.body);
  if (validBody.error) {
    return res.status(400).send(validBody.error.details);
  }
  try {
    const numOfAdmins = await adminsModel.countDocuments();
    const result = await adminsModel.find({ email: req.body.email });
    if (numOfAdmins === 1) {
      console.log("short list");
      res.send({
        adminDeleted: false,
        message: "add another admin before deleting the last one"
      });
      return;
    } else if (await bcrypt.compare(req.body.password, result[0].password)) {
      const deleteRes = await adminsModel.findByIdAndDelete(result[0]._id);
      result[0].password = '********';
      res.send({
        adminDeleted: true,
        result: result[0],
      });
      console.log("admin deleted")
    } else {
      console.log("admin has not been deleted")
      res.send({
        adminDeleted: false,
        reason: "no such admin in the system / admin credentials are wrong"
      });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
})


////////////////////////   GET routes   \\\\\\\\\\\\\\\\\\\\\\

app.get('/', (req, res) => {
  res.render('../../index.ejs', { title: 'cash register' });
});



app.post('/admin-authentication', async (req, res) => {
  if (validAdmin(req.body).error) {
    return res.status(400).send(validBody.error.details);
  }

  try {
    const result = await adminsModel.find({ email: req.body.email });
    if (await bcrypt.compare(req.body.password, result[0].password)) {
      res.send({
        authorized: true,
        adminName: result[0].userName
      })
      console.log(result[0].userName, "admin connected")
      return;
    } else {
      console.log("login credentials are wrong");
      res.send({
        authorized: false,
        reason: "no such admin in the system / login credentials are wrong"
      })
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
})

app.post('/save-receipt', (req, res) => {
  const newOrderSum = new orderSumModel({
    name: req.body.costumerName,
    paymentMethod: req.body.paymentMethod,
    totalCashReceived: req.body.totalCashReceived,
    cost: req.body.totalCost,
    change: req.body.change,
    detailes: req.body.detailes
  })
  newOrderSum.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err)
    })
})

// const RECORDS_LIMIT = 3;
// let pageNum = 0;
// let lastPage = 0;
// let reachedEnd = false;
app.post('/search-record', async (req, res) => {
  console.log(req.body)
  // pageNum += req.body.pageFactor;  

  // if(pageNum < 0) {
  //   pageNum = 0;
  // } else if (reachedEnd) {
  //   if(pageNum > lastPage) {
  //     pageNum = lastPage;
  //     return;
  //   }
  // }
  try {
    const result = await orderSumModel.find({ [req.body.field]: req.body.value })//.skip(pageNum * RECORDS_LIMIT).limit(RECORDS_LIMIT)
    // if(result.length < RECORDS_LIMIT) {
    //   lastPage = pageNum;
    //   reachedEnd = true;
    // } else {
    //   reachedEnd = false;
    // }
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(false);
  }
})

//find() = getting all the documents from menuesModel, sort({_id:-1}) = sorting the result in decending order(from newest to oldest), limit(1) = limiting the returned results to (1) results
//this route giving us the newest document created(most updated usually) 
//the response data will be an object inside array!!!
app.get('/menues', async (req, res) => {
  try {
    const result = await menuesModel.find().sort({ _id: -1 }).limit(1);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
})



app.get('/extras', async (req, res) => {
  try {
    const result = await extrasModel.find().sort({ _id: -1 }).limit(1);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
})

app.get('/all-products', async (req, res) => {
  try {
    const menues = await menuesModel.find().sort({ _id: -1 }).limit(1);
    const extras = await extrasModel.find().sort({ _id: -1 }).limit(1);
    res.send({ menues, extras });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
})

app.use((req, res) => {
  res.status(404).render('404', { title: "oops" });
});

