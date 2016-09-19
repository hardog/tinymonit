'use strict';

const expect = require('chai').expect;
const osstat = require('../lib/osstat');

describe('#osstat', function(){
	it('should return os stat info', function(done){
		let pid = process.pid;

		Promise.resolve()
		.then(() => osstat(pid))
		.then((r) => {
			expect(r.sys).to.be.an('object');
			expect(r.procs).to.be.an('array');
			expect(r.procs.length).to.be.equal(1);
			done();
		})
		.catch((e) => console.log(e));
	});

	it('should reject when pid is wrong', function(done){
		let pid = '22x';

		Promise.resolve()
		.then(() => osstat(pid))
		.catch((e) => {
			expect(e.message).to.be.equal(`ENOENT: no such file or directory, open '/proc/22x/stat'`);
			done();
		});
	});
});