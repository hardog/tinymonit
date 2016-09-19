'use strict';

const expect = require('chai').expect;
const pusage = require('pidusage');
const proc = require('../lib/proc');

describe('#proc', function(){
	describe('#cb_stat', function(){
		it('should return stat by callback style', function(done){
			proc.cb_stat(process.pid, function(err, v){
				expect(err).to.be.null;
				expect(v).to.be.an('object');
				done();
			});
		});

		it('should throw err /ENOENT .../', function(done){
			proc.cb_stat('notexist', function(err, v){
				expect(err.message).to.be.equal(`ENOENT: no such file or directory, open '/proc/notexist/stat'`);
				expect(err).to.not.be.null;
				done();
			});
		});
	});

	describe('#p_stat', function(){
		it('should return current proc stat', function(done){
			Promise.resolve()
			.then(() => proc.p_stat(process.pid))
			.then((r) => {
				expect(r).to.be.an('object');
				expect(r).to.have.property('cpu');
				expect(r).to.have.property('memory');
				done();
			})
			.catch((e) => console.log(e));
		});

		it('should reject when no the pid of process ', function(done){
			Promise.resolve()
			.then(() => proc.p_stat('notexist'))
			.catch((e) => {
				expect(e.message).to.be.equal(`ENOENT: no such file or directory, open '/proc/notexist/stat'`);
				done();
			});
		});
	});

	describe('#p_stats', function(){
		it('should print multi procs stat', function(done){
			Promise.resolve()
			.then(() => proc.p_stats([process.pid, process.pid]))
			.then((r) => {
				expect(r).to.be.an('array');
				expect(r[0]).to.be.an('object');
				done();
			})
			.catch((e) => console.log(e));
		});

		it('should print reject message', function(done){
			Promise.resolve()
			.then(() => proc.p_stats([process.pid, 'notexist']))
			.catch((e) => {
				expect(e.message).to.be.equal(`ENOENT: no such file or directory, open '/proc/notexist/stat'`);
				done();
			});
		});
	});

	describe('#clear', function(){
		it('should clear history stats', function(){
			proc.clear([process.pid]);
			expect(pusage._history[process.pid]).to.be.undefined;
		});
	});

	describe('#format', function(){
		it('should return formated stat', function(done){
			proc.cb_stat(process.pid, function(err, v){
				let formated = proc.format(v);
				
				expect(/%$/.test(formated.cpu)).to.be.true;
				expect(/Mb$/.test(formated.mem)).to.be.true;
				expect(formated.pid).to.be.a('number');
				done();
			});
		});
	});
});