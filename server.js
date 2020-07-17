const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;

    res.json({ name: originalname, type: mimetype, size: size });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
