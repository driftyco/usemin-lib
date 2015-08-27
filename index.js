'use strict';

var fs = require('fs'),
    Usemin = module.exports;

Usemin.getBlocks = require('./lib/getBlocks');
Usemin.processBlocks = require('./lib/processBlocks');
Usemin.getHTML = require('./lib/getHTML'),
Usemin.compressImages = require('./lib/compressImages');
