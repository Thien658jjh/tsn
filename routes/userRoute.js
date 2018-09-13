module.exports = (app) => {
    let userController = require('../controllers/userController'),
        config = require('../config/apiConfig').CONFIG_API

    // Route register: get, post, put...
    app.route('/' + config.__link_user + 'register')
        .get(userController.register)
        .post(userController.register)

    // Route login: get, post, put...
    app.route('/' + config.__link_user + 'login')
        .get(userController.login)
        .post(userController.login) 

    // Route change password by _id
    app.route('/' + config.__link_user + 'change-password')
        .get(userController.changepassword) 
        .post(userController.changepassword)

    // Route update information user
    app.route('/' + config.__link_user + 'update-infomartion')
        .get(userController.updateinformation)
        .post(userController.updateinformation)
}