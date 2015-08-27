#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var ImageMin = require('imagemin');

function processFiles(dir) {
  fs.readdir(dir, function (err, list) {
    if (err) {
      console.log('processFiles - reading directories error: ' + err);
      return;
    }
    list.forEach(function(file) {
      file = path.join(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat.isDirectory()) {
          processFiles(file);
        } else{
          compressImages(file); 
        }
      });
    });
  });
}

function compressImages(file) {
  var imagemin = new ImageMin();
  
  var ext = path.extname(file);
  var destDir = path.dirname(file);
  // console.log('looking at file:', file);
  // console.log('destDir', destDir);

  switch(ext) {
    // Image options https://github.com/imagemin/imagemin
    case '.svg':
      console.log('Minifying SVG File: ' + file);
      // svgGo options https://github.com/imagemin/imagemin#svgo
      imagemin.src(file).dest(destDir).use(ImageMin.svgo());
      break;
    case '.gif':
      console.log('Minifying GIF File: ' + file);
      // GifSicle options https://github.com/imagemin/imagemin#gifsicle
      imagemin.src(file).dest(destDir).use(ImageMin.gifsicle({
        interlaced: true
      })).run();
      break;
    case '.png':
      console.log('Minifying PNG File: ' + file);
      // OptiPNG options https://github.com/imagemin/imagemin#optipng
      imagemin.src(file).dest(destDir).use(ImageMin.optipng({
        optimizationLevel: 2
      })).run();
      break;
    case '.jpg':
    case '.jpeg':
      console.log('Minifying JPEG File: ' + file);
      // jpegTran options https://github.com/imagemin/imagemin#jpegtran
      imagemin.src(file).dest(destDir).use(ImageMin.jpegtran({
        progressive: true
      })).run();
      break;
    default:
      console.log('Encountered file with ' + ext + ' extension - not compressing.');
      break;
  }
}

module.exports = {
  compressImages: compressImages,
  processFiles: processFiles
};
