const express = require('express')
const mongoose = require('mongoose');
const caisse = require('./models/add-caisse');
mongoose.connect('mongodb://127.0.0.1:27017/caisseR')

const app = express()
const bodyParser = require('body-parser');
const archive = require('./models/archive');
const prod = require('./models/add-prod');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});


app.get('', (req,res)=>{
    res.send('hello world')
})

// add prod
app.post('/addProduct/addProd', (req, res)=>{
    const prodSchema = new prod ({
        name : req.body.name,
        prix : req.body.prix,
        qty : req.body.qty,
        specify : req.body.specify
    })
    prodSchema.save().then(()=>{
        res.status(200).json({
            message : 'success'
        }) 
    })
    .catch((error)=>{
        res.status(200).json({
            message : 'error'
        })
    })
})

// get all prod
app.get('/addProduct', (req, res)=>{
    prod.find().then(
        (finded)=>{
            res.status(200).json({
                res : finded
            })
        }
    )
})

// add caisse
app.post('/add-caisse/caisse', (req, res)=>{
    const caisseSchema = new caisse ({
        name : req.body.name,
        prix : req.body.prix,
        qty : req.body.qty,
        specify : req.body.specify
    })
    caisseSchema.save().then(()=>{
        res.status(200).json({
            message : 'success'
        }) 
    })
    .catch((error)=>{
        res.status(200).json({
            message : 'error'
        })
    })
})


// get all caisse
app.get('/add-caisse', (req, res)=>{
    caisse.find().then(
        (finded)=>{
            res.status(200).json({
                res : finded
            })
        }
    )
})

// delete caisse by id
app.delete('/add-caisse/:id', (req, res)=>{
    caisse.deleteOne({_id:req.params.id}).then(
        (result)=>{
       res.status(200).json({
        message : 'delete success'
       })
        }
    )
})

// add archive 
app.post('/archives/addArchive', (req, res)=>{
    const archiveSchema = new archive ({
        name : req.body.name,
        prix : req.body.prix,
        date : req.body.date,
        time : req.body.time
    })
    archiveSchema.save().then(()=>{
        res.status(200).json({
            message : 'success'
        })
    }).catch((error)=>{
        res.status(200).json({
            message : 'error'
        })
    })
})

// delete all caisse
app.delete('/add-caisse', (req, res)=>{
    caisse.deleteMany().then(
        (result)=>{
            res.status(200).json({
                message : 'delted'
            })
        }
    )
})

app.get('/add-caisse/:id', (req, res) => {
    const id = req.params.id;
  
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
  
    caisse.findOne({ _id: id })
      .then(result => {
        if (result) {
          res.status(200).json({ resId: result });
        } else {
          res.status(404).json({ message: "Caisse not found" });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
      });
  });

  app.put('/add-caisse/:id', (req, res) => {
caisse.findByIdAndUpdate({_id:req.params.id}, req.body).then((result)=>{
    res.status(200).json({
        message:'update'     
    })
})
  });
module.exports = app 