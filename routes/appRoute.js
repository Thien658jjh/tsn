module.exports = (app) => {
    let appController = require('../controllers/appController'),
        config = require('../config/apiConfig').CONFIG_API

    // Route get, post, put...
    app.route('/')
        .get(appController.home)

    app.route(config.__link_upload_new_story)
        .get(appController.uploadnewstory)
}