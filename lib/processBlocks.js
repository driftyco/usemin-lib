'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var ngAnnotate = require('ng-annotate');

module.exports = function (blocks, destDir) {
	blocks.forEach(function (block) {
		if (block.type === 'js') {
      // Need to annotate before we minimize.
      block.src.forEach(function(annotateSrc) {
        if (!fs.existsSync(annotateSrc)) {
          return;
        }

        var originalSrc = fs.readFileSync(annotateSrc, 'utf-8');
        var res = ngAnnotate(originalSrc, {add:true});  
        var errorstringArray = res.errors;
        var transformedSource = res.src;
        if (res.errors) {
          console.log('Error running ng-annotate: ', res.errors);
        }
        
        fs.writeFileSync(annotateSrc, transformedSource);
      });

			var js = UglifyJS.minify(block.src);

			mkdirp(path.dirname(path.join(destDir, block.dest)), function (err) {
				if (!err) {
					fs.writeFile(path.join(destDir, block.dest), js.code, function(err) {
						if (err) {
							throw Error(err);
						}
					});
				}
			});
		}
		else if (block.type === 'css') {
			var css = '';

			block.src.forEach(function (src) {
				css += fs.readFileSync(src);
			});

			css = new CleanCSS().minify(css).styles;

			mkdirp(path.dirname(path.join(destDir, block.dest)), function (err) {
				if (!err) {
					fs.writeFile(path.join(destDir, block.dest), css, function(err) {
						if (err) {
							throw Error(err);
						}
					});
				}
			});
		}
		else if (block.type === 'livereload') {
		}
		else {
			throw Error('Unsupport format: ' + block.type);
		}
	});

	return true;
};
