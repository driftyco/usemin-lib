#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var ImageMin = require('imagemin');
var imagemin = new ImageMin();

function compressImages(file) {
  var ext = path.extname(file);
  switch(ext) {
    // Image options https://github.com/imagemin/imagemin
    case '.svg':
      console.log('Minifying SVG File: ' + file);
      // svgGo options https://github.com/imagemin/imagemin#svgo
      imagemin.src(file).dest(file).use(ImageMin.svgo());
      break;
    case '.gif':
      console.log('Minifying GIF File: ' + file);
      // GifSicle options https://github.com/imagemin/imagemin#gifsicle
      imagemin.src(file).dest(file).use(ImageMin.gifsicle({
        interlaced: true
      }));
      break;
    case '.png':
      console.log('Minifying PNG File: ' + file);
      // OptiPNG options https://github.com/imagemin/imagemin#optipng
      imagemin.src(file).dest(file).use(ImageMin.optipng({
        optimizationLevel: 2
      }));
      break;
    case '.jpg':
    case '.jpeg':
      console.log('Minifying JPEG File: ' + file);
      // jpegTran options https://github.com/imagemin/imagemin#jpegtran
      imagemin.src(file).dest(file).use(ImageMin.jpegtran({
        progressive: true
      }));
      console.log('Minifying JPEG File: ' + file);
      break;
    default:
      console.log('Encountered file with ' + ext + ' extension - not compressing.');
      break;
  }
}

module.exports = compressImages;
