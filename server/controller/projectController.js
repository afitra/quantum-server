const Model = require('../models/project')
class Controller {

    static all(req, res) {
        Model.find({})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })

    }
    static add(req, res) {
        console.log('add');
        Model.create({
                title: req.body.title,
                url: req.body.url,
                description: req.body.description,
                createdAt: new Date()
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }

}
module.exports = Controller