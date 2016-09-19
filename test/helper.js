'use strict';

const expect = require('chai').expect;
const helper = require('../lib/helper');

describe('#helper', function(){
	describe('#isArray', function(){
		it('should be true when is array', function(){
			expect(helper.isArray([])).to.be.true;
		});

		it('should be false, string is not array', function(){
			expect(helper.isArray('')).to.be.false;
		});

		it('should be false, null is not array', function(){
			expect(helper.isArray(null)).to.be.false;
		});

		it('should be false, undefined is not array', function(){
			expect(helper.isArray(undefined)).to.be.false;
		});

		it('should be false, Number is not array', function(){
			expect(helper.isArray(1)).to.be.false;
		});
	});

	describe('#to_kb', function(){
		it('should return 2kb', function(){
			expect(helper.to_kb(1024 * 2)).to.be.equal(2);
		});

		it('should return 1kb', function(){
			expect(helper.to_kb(1024 * 1.5)).to.be.equal(1);
		});
	});

	describe('#to_mb', function(){
		it('should return 2mb', function(){
			expect(helper.to_mb(1024 * 1024 * 2)).to.be.equal(2);
		});

		it('should return 1mb', function(){
			expect(helper.to_mb(1024 * 1024 * 1.5)).to.be.equal(1);
		});
	});

	describe('#to_gb', function(){
		it('should return 2gb', function(){
			expect(helper.to_gb(1024 * 1024 * 1024 * 2)).to.be.equal(2);
		});

		it('should return 1gb', function(){
			expect(helper.to_gb(1024 * 1024 * 1024 * 1.5)).to.be.equal(1);
		});
	});

	describe('#to_days', function(){
		it('should return /1 days/', function(){
			expect(helper.to_days(86433)).to.be.equal('1 days');
		});
	});

	describe('#to_time', function(){
		it('should return /24:00:33/', function(){
			expect(helper.to_time(86433)).to.be.equal('24:00:33');
		});

		it('should return /01:59:20/', function(){
			expect(helper.to_time(7160)).to.be.equal('01:59:20');
		});
	});
});