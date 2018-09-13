module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        appRoute = {}

    appRoute.home = (req, res) => {
        res.json({code: 404, message: 'Error 404 ! Did you lost your way ?? You can walk arround to relax.'})
    }

    appRoute.uploadnewstory = (req, res) => {
        res.render('uploadstory', {
            layout: 'main-layout',
            title: 'Upload new story'
        })
    }
    
    return appRoute
})()
