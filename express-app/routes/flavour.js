const expressFunction = require('express');
const mongoose = require('mongoose');
const router = expressFunction.Router();
var Schema = require("mongoose").Schema;

const flavourSchema = Schema({
    flavour_id: String,
    name: String,
    price: Number,
    detail: String,
    image: String
}, {
    collection: 'flavour'
});

let Flavour
try {
    Flavour = mongoose.model('flavour')
} catch (error){
    Flavour = mongoose.model('flavour', flavourSchema);
}

// **********--------------- 1.Flavour ------------------**********

// function add
const addFlavour = (flavourData) => {
    return new Promise ((resolve,reject) => {
        var new_product = new Flavour(
            flavourData
        );
        new_product.save((err,data) => {
            if(err){
                reject(new Error('Cannot insert Flavour to DB!'));
            }else{
                resolve({message: 'Flavour added successfully'});
            }
        });
    });
}
// function get
const getFlavours = () => {
    return new Promise ((resolve, reject) => {
        Flavour.find({}, (err, data) => {
            if(err) {
                reject(new Error('Cannot get Flavour!'));
            }else{
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get Flavour!'));
                }
            }
        })
    });
}

// .post
router.route('/add')
    .post(async(req,res) => {
        console.log('add');
        addFlavour(req.body)
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
});
// .get
router.route('/get')
    .get(async(req,res) => {
        console.log('get');
        getFlavours()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
})

module.exports = router;