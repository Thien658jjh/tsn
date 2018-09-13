module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        config = require('../config/apiConfig').CONFIG_API,
        userModel = mongoose.model('users'),
        bcrypt = require('bcrypt-nodejs'),
        userRoute = {},

        // Check access token user if request permission
        __check_header_access_token = (callback, access_token) => {
            userModel.findOne({access_token: access_token}, (err, res) => {
                callback(res)
            })
        },

        // Generate password
        __generate_password = (callback, password) => {
            bcrypt.hash(password, null, null, (err, hash) => {
                callback(hash)
            })
        },

        // Verify password
        __verify_password = (callback, password_de, password_en) => {
            bcrypt.compare(password_de, password_en, (err, res) => {
                callback(res)
            })
        }

    // User register    
    userRoute.register = (req, res) => {
        if(func.__check_header_request(req.headers) && !func.isEmpty(req.body)) {
            userModel.find({email: req.body.email}, (error, result) => {
                if(result[0] === undefined) {
                    let __encrypt_password = (hash) => {
                        new userModel({
                            fullname: req.body.fullname,
                            email: req.body.email,
                            phone: req.body.phone,
                            dayofbirth: req.body.dayofbirth,
                            password: hash,
                            account_type: req.body.account_type,
                            reset_password_token: func.__generate_reset_password_token(),
                            access_token: func.__generate_access_token({
                                fullname: req.body.fullname,
                                email: req.body.email,
                                account_type: req.body.account_type
                            })
                        }).save((err, data) => {
                            if(err) {
                                res.status(400).json({code: 400, message: 'Account registration failed'})
                            }else {
                                res.status(200).json({code: 200, message: 'Account registration successful'})
                            }
                        })
                    }
                    __generate_password(__encrypt_password, req.body.password)
                }else {
                    res.status(400).json({code: 400, message: 'Email address already exists'})
                }
            })
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }

    // User Login
    userRoute.login = (req, res) => {
        if(func.__check_header_request(req.headers) && !func.isEmpty(req.body)) {
            userModel.findOne({email: req.body.email}, (err, data) => {
                if(data == null) { // The email does not exist
                    res.status(404).json({code: 404, message: 'The email does not exist'})
                }else if(data) {
                    // Check password
                    if(func.__verify_password(req.body.password, data.password)) {
                        res.status(200).json({
                            code: 200,
                            _id: data._id,
                            email: data.email,
                            fullname: data.fullname,
                            phone: data.phone,
                            dayofbirth: data.dayofbirth,
                            address: data.address,
                            level: data.level,
                            introduce: data.introduce,
                            company: data.company,
                            facebook: data.facebook,
                            account_type: data.account_type,
                            status: data.status,
                            access_token: data.access_token,
                            created_date: data.created_date,
                            modified_date: data.modified_date
                        })
                    }else {
                        res.status(400).json({code: 400, message: 'Wrong password'})
                    }
                }
            })
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }

    // Change password
    userRoute.changepassword = (req, res) => {
        if(func.__check_header_request(req.headers) && !func.isEmpty(req.body)) {
            // Check session user if login success
            session_user = (permission) => {
                if(permission != null) {
                    userModel.findByIdAndUpdate({
                        _id: req.body._id
                    }, {
                        password: func.__encrypt_password(req.body.password),
                        modified_date: Date.now()
                    }, {
                        upsert: true,
                        new: true
                    }).exec((err, new_user) => {
                        res.status(200).json('Change password success')
                    })
                }else {
                    res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
                }
            }
            __check_header_access_token(session_user, req.query['access_token'])
            // End check session
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }

    // Update information
    userRoute.updateinformation = (req, res) => {
        if(func.__check_header_request(req.headers) && !func.isEmpty(req.body)) {
            // Check session user if login success
            session_user = (permission) => {
                if(permission != null) {
                    userModel.findByIdAndUpdate({
                        _id: req.body._id
                    }, {
                        fullname: req.body.fullname,
                        email: req.body.email,
                        phone: req.body.phone,
                        dayofbirth: req.body.dayofbirth,
                        address: req.body.adddress,
                        introduce: req.body.introduce,
                        company: req.body.company,
                        facebook: req.body.facebook,
                        modified_date: Date.now()
                    }, {
                        upsert: true,
                        new: true
                    }).exec((err, new_user) => {
                        res.status(200).json({code: 200, message: 'Update account information successfully'})
                    })
                }else {
                    res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
                }
            }
            __check_header_access_token(session_user, req.query['access_token'])
            // End check session
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        } 
    }
    
    return userRoute
})()