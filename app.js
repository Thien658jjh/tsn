// Set timezone: Asia
// Config app server
let express = require('express'),
    config = require('./config/apiConfig').CONFIG_API,
    app = express(),
    mongoose = require('mongoose'),
    path = require('path'),
    html = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || config.__port_server,
    server = require('http').Server(app);

// Config mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://oqpsajsngpapasjwgnskamzasskksnwir:uqUsn829Upq2ngKla0o2N4Msquss1n4paknd93nAIsnwl0sowUNagnxk30siwB@ds151892.mlab.com:51892/truyensongngu', {
    useNewUrlParser: true
})

// Config template views
app.engine('html', html({
    extname: 'html',
    defaultLayout: 'main-layout',
    layoutsDir: __dirname + '/views/'
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// Config body parser json
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Config Public folder
app.use(express.static(path.join(__dirname, 'public')))

// Model config
let appModel = require('./models/appModel'), // App model
    userModel = require('./models/userModel'), // App model
    storyModel = require('./models/storyModel'), // App model
    vocabModel = require('./models/vocabModel'), // App model
    idiomModel = require('./models/idiomModel')

// Route config
let appRoute = require('./routes/appRoute')(app),
    userRoute = require('./routes/userRoute')(app),
    storyRoute = require('./routes/storyRoute')(app)

// App listen lnfo
app.listen(port)
console.log('App has been connected from port: ' + port)
