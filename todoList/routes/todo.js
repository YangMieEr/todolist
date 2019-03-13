const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var formDataParser = bodyParser.urlencoded({extended: false});
// const shema

var router = express.Router();

var todoShema = mongoose.Schema({
    item: String
});

var todoModel = mongoose.model('todos', todoShema);

mongoose.connect('mongodb://127.0.0.1:27017/todo');

mongoose.connection.on('connected', () => {
    console.log('success to connect');
});

mongoose.connection.on('error', () => {
    console.log('failed to connect');
});

mongoose.connection.on('disconnected', () => {
    console.log('success to disconnect');
});

router.get('/getlist', (req, res, next) => {
    todoModel.find({}, function(err, data) {
        if (err) throw err;
        res.json({
            info:'success',
            code: 0,
            data: data
        });
    });
});

router.delete('/remove/:item', (req, res, next) => {
    todoModel.remove({item: req.params.item}, function (err, data) {
        if (err) throw err;
        if (1 === data.n && 1 === data.ok) {
            todoModel.find({}, function(err, count) {
                if (err) throw err;
                res.json({
                    info:'success',
                    code: 0,
                    data: count
                });
            });
        }
    })
})

router.post('/add',formDataParser, (req, res, next) => {
    todoModel.find({item: req.body.item}, function (err, data) {
        // console.log(data);
        if (data.length > 0) {
            res.json({
                info:'The item already exist and cannot be created any more.',
                code: -1
            });
        } else {
            todoModel.create([{item: req.body.item}], function (err, data) {
                if (err) throw err;
                todoModel.find({}, function(err, count) {
                    if (err) throw err;
                    res.json({
                        info:'success',
                        code: 0,
                        data: count
                    });
                });
            });
        }
    })
    
})

module.exports = router;