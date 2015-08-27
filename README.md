# usemin-lib 

> Library version of usemin. For _purists_, those who doesn't use build tools like [Grunt](https://github.com/yeoman/grunt-usemin) and [Gulp](https://github.com/zont/gulp-usemin), but just use NPM as their build tool.

## Getting started

To use this now, install with this command:
```
npm install usemin-lib
```

From GitHub
```
git clone https://github.com/driftyco/usemin-lib.git
cd usemin-lib
npm install
npm link
```

## Usage

``` js
var fs = require('fs'), path = require('path');
var indexHtmlFilePath = path.join('./', 'index.html');
var useminLib = require('usemin-lib');
var content = fs.readFileSync(indexHtmlFilePath).toString();
var blocks = useminLib.getBlocks(indexHtmlFilePath, content, true /* removeLivereloadBool */);
var process = useminLib.processBlocks(blocks, './www/dist/index.html' /* destDir */);
var output = useminLib.getHTML(content, blocks, true /* htmlminBool */);
console.log('minified stuffs:', output);
```

### Example HTML
```html
<!-- build:css css/main.js -->
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/modules.css">
<!-- endbuild -->

<!-- build:js js/main.js -->
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<!-- endbuild -->

<!-- build:js js/main.js -->
<script defer async src="js/app.js"></script>
<script defer async src="js/controllers.js"></script>
<!-- endbuild -->

<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
```
Running the command with `--rmlr true` will output:
```
<link rel="stylesheet" href="css/main.js">
<script src="js/main.js"></script>
<script defer async src="js/main.js"></script>
```

## License

[MIT license](http://opensource.org/licenses/MIT.php)
