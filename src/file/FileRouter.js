const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({limits: {fileSize: 1024*1024}}).single("file");

router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      return res.status(400).send({message: req.t('size_too_big')})
    }
    const file = req.file;
    console.log(req.file);
    await fs.promises.writeFile('./upload-dir/images/uploaded-file.png', file.buffer);
    res.send({message: req.t('upload_success')});
  })
});

module.exports = router;
