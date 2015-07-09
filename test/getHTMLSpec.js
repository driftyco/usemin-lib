'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var getBlocks = require('../lib/getBlocks');
var getHTML = require('../lib/getHTML');

describe('Get HTML', function () {
	it('should get HTML correctly', function () {
		var src = './test/index.html';
		var content = fs.readFileSync(src).toString();
		var outcome = fs.readFileSync('./test/outcome.html').toString();
		var blocks = getBlocks(src, content);
		var html = getHTML(content, blocks);

		expect(html).to.eql(outcome);
	});
});