module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        storyModel = mongoose.model('storyModel'),
        idiomModel = mongoose.model('idiomModel'),
        vocabModel = mongoose.model('vocabModel'),
        appRoute = {}

    appRoute.getStory = (req, res) => {
        storyModel.find({}, (err, result) => {
            if (result) {
                res.status(200).json({
                    code: 200,
                    stories: result
                })
            } else {
                res.status(200).json({ code: 403, message: 'Loi !!' })
            }
        })
    }

    // User register    
    appRoute.createNewStory = (req, res) => {
        require('getmac').getMac(function (err, macAddress) {
            if (err) return res.status(200).json({ code: 403, message: 'Err' })
            else
                if (!func.isEmpty(req.body)
                    && req.body.storyName
                    && req.body.storyOriginal
                    && req.body.storyVietNam
                    && req.body.vocabs
                    && req.body.idioms) {
                    if (func.__verify_keyupload(req.body.keyupload) | func.__verify_mac_address(macAddress)) {
                        storyModel.find({ storyName: req.body.storyName }, (error, result) => {
                            if (error) {
                                res.status(200).json({
                                    code: 403, message: 'Failed'
                                })
                            } else {
                                if (!result.length) {
                                    vocabModel.create(req.body.vocabs, function (err, resultVocabs) {
                                        if (err) {
                                            res.status(403).json({ code: 403, message: "Create new vocabs err " });
                                        } else {
                                            idiomModel.create(req.body.idioms, function (err2, resultIdioms) {
                                                if (err) {
                                                    res.status(403).json({ code: 403, message: "Create new idioms err " });
                                                } else {
                                                    new storyModel({
                                                        storyName: req.body.storyName,
                                                        storyOriginal: req.body.storyOriginal,
                                                        storyVietNam: req.body.storyVietNam,
                                                        vocabs: resultVocabs,
                                                        idioms: resultIdioms
                                                    }).save((err, data) => {
                                                        if (err) {
                                                            res.status(200).json({
                                                                code: 400, message: 'Account registration failed'
                                                            })
                                                        } else {
                                                            res.status(200).json({
                                                                code: 200, message: 'Add new story successful',
                                                                data: data
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    res.status(200).json({ code: 400, message: 'Already exists' })
                                }
                            }
                        })
                    } else {
                        res.status(200).json({ code: 403, message: 'The request is understood, but have somethings wrong !!'})
                    }
                } else {
                    res.status(200).json({ code: 403, message: 'The request is understood, but it has been refused or access is not allowed' })
                }
        })
    }

    return appRoute
})()
