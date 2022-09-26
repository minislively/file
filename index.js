const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
// 폴더 views임
app.set('views', __dirname + '/views');
// public 폴더
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
  // cb : callback
  filename: (req, file, cb) => {
    // const filename =
    //   parseInt(Math.random() * 100000) + '.' + file.mimetype.split('/')[1]; // image/png
    const filename = Date.now() + path.extname(file.originalname);
    console.log(filename);
    // null -> error
    cb(null, filename);
  },
  destination: (req, filename, cb) => {
    cb(null, __dirname + '/public');
  },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/upload', upload.single('myImage'), (req, res) => {
  res.send(req.file);
});

app.listen(4000, () => console.log('server is running'));
