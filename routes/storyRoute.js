module.exports = (app) => {
	let storyController = require('../controllers/storyController'),
        config = require('../config/apiConfig').CONFIG_API

    app.route('/' + config.__link_story)
        .get(storyController.getStory)
        .post(storyController.createNewStory)

}