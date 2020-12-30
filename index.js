let express = require('express')
let http = require('http')
let cors = require('cors')
let path = require('path')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let multer = require('multer')

mongoose.connect('mongodb+srv://bmulhern2:Bmole22%21%21@cluster0.eopst.mongodb.net/mean-file-upload?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

let VideoSchema = mongoose.Schema({
    video: String
})

let Video = mongoose.model('Video', VideoSchema)

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split(" ").join(""))
    }
})

let upload = multer({ storage: storage })

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static(path.join(__dirname, './client/dist/client')))
app.use('/', express.static(path.join(__dirname, './client/dist/client')))
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

// Routes
app.post('/upload', upload.single('photo'), function(req, res) {
    let newUser = {
        video: req.file.path
    }
    Video.create(newUser)
})

app.get('/video', function(req, res) {
    Video.find({}, function(err, videos) {
        if (err) {
            console.log(err)
        } else {
            res.json(videos)
        }
    })
})

let port = process.env.PORT
http.createServer(app).listen(port, function() {
    console.log("Server Started on PORT " + port)
})
