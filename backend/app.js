const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const caisse = require('./models/add-caisse');
mongoose.connect('mongodb://127.0.0.1:27017/caisseR')

const sekretKey = 'crococoder'
const app = express()
const bodyParser = require('body-parser');
const archive = require('./models/archive');
const prod = require('./models/add-prod');
const signup = require('./models/signup');

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


app.get('', (req, res) => {
    res.send('hello world')
})

// add prod
app.post('/addProduct/addProd', (req, res) => {
    const prodSchema = new prod({
        name: req.body.name,
        prix: req.body.prix,
        qty: req.body.qty,
        specify: req.body.specify
    })
    prodSchema.save().then(() => { 
        res.status(200).json({
            message: 'success'
        })
    })
        .catch((error) => {
            res.status(200).json({
                message: 'error'
            }) 
        })
})

// get all prod
app.get('/addProduct', (req, res) => {
    prod.find().then(
        (finded) => {
            res.status(200).json({
                res: finded
            })
        }
    )
})

// get all prod by id
app.get('/addProduct/:id', (req, res) => {
    prod.findOne({ _id: req.params.id }).then(
        (finded) => {
            res.status(200).json({
                resId: finded
            })
        }
    )
})

// edit prod
app.put('/addProduct/:id', (req, res) => {
    prod.updateOne({ _id: req.params.id }, req.body).then(
        (result) => {
            if (result) {
                res.status(200).json({
                    message: 'update'
                })
            }
        }
    )
})

// delete prod
app.delete('/addProduct/:id', (req, res) => {
    prod.deleteOne({ _id: req.params.id }).then(
        (result) => {
            if (result) {
                res.status(200).json({
                    message: 'update'
                })
            }
        }
    )
})


// add caisse
app.post('/add-caisse/caisse', (req, res) => {
    const caisseSchema = new caisse({
        name: req.body.name,
        prix: req.body.prix,
        qty: req.body.qty,
        specify: req.body.specify
    })
    caisseSchema.save().then(() => {
        res.status(200).json({
            message: 'success'
        })
    })
        .catch((error) => {
            res.status(200).json({
                message: 'error'
            })
        })
})


// get all caisse
app.get('/add-caisse', (req, res) => {
    caisse.find().then(
        (finded) => {
            res.status(200).json({
                res: finded
            })
        }
    )
})

// delete caisse by id
app.delete('/add-caisse/:id', (req, res) => {
    caisse.deleteOne({ _id: req.params.id }).then(
        (result) => {
            res.status(200).json({
                message: 'delete success'
            })
        }
    )
})


// delete all caisse
app.delete('/add-caisse', (req, res) => {
    caisse.deleteMany().then(
        (result) => {
            res.status(200).json({
                message: 'delted'
            })
        }
    )
})

// get caisse by id
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
    caisse.findByIdAndUpdate({ _id: req.params.id }, req.body).then((result) => {
        res.status(200).json({
            message: 'update'
        })
    })
});

// add signup
app.post('/signup/signup', async (req, res)=>{
    let user = await signup.findOne({email:req.body.email})
    if (user) {
        return res.status(200).json({
            message:'0'
        })
    }
bcrypt.hash(req.body.password, 10).then((bcrypted)=>{
    const signupSchema = new signup ({
        name : req.body.name,
        email : req.body.email,
        password : bcrypted
    })
    signupSchema.save().then((doc, err)=>{
        if (!err) {
            const transporter = nodemailer.createTransport({
              host: 'sandbox.smtp.mailtrap.io',
              port: '2525',
              auth: {
                user: 'a0988965899e37',
                pass: 'c459d4973a6a15'
              }
            });
            const mailOptions = {
              from: 'vindication@enron.com',
              to: req.body.email,
              subject: 'added user', 
              text: 'added user'
            };
            transporter.sendMail(mailOptions, function (error,
              info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
    
          res.status(200).json({
            message: '1'
          })
    })
})
})

// login
app.post('/signup/login', async (req, res)=>{
    const {email, password} = req.body
    const user = await signup.findOne({email})
    if (!user) {
        return res.status(200).json({
            message : '0'
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(200).json({
            message: '1'
        })
    } 
    const token = jwt.sign({id: user._id, name: user.name, email: user.email, role: user.role}, sekretKey, { expiresIn: 60 })
    res.status(200).json({
        message: 'login successful', token,
        user : token
    })
})


// add archive 
app.post('/archives/addArchive', (req, res) => {
    const archiveSchema = new archive({
        name: req.body.name,
        prix: req.body.prix,
        qty: req.body.qty,
        specify: req.body.specify,
        date: req.body.date,
        time: req.body.time
    })
    archiveSchema.save().then(() => {
        res.status(200).json({
            message: 'success'
        })
    }).catch((error) => {
        res.status(200).json({
            message: 'error'
        })
    })
})


// get all Archives
app.get('/archives', (req, res) => {
    archive.find().then(
        (finded) => {
            if (finded) {
                res.status(200).json({
                    findedA: finded
                })  
            }

        }
    )
})

// delete archive by id
app.delete('/archives/:id', (req, res)=>{
    archive.deleteOne({_id:req.params.id}).then((result)=>{
        if (result) {
            res.status(200).json({
                message : 'deleted'
            })
        }
    })
})

// get archives by id
app.get('/archives/:id', (req, res)=>{
    const id = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    archive.findOne({ _id: id }) 
        .then(result => {
            if (result) {
                res.status(200).json({ findRes: result });
            } else {
                res.status(404).json({ message: "Caisse not found" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        });
})

// delete archive by id
app.put('/archives/:id', (req, res) => {
    archive.findByIdAndUpdate({ _id:req.params.id }, req.body).then(() => {
        res.status(200).json({
            message: 'update'
        })
    })
});
module.exports = app 