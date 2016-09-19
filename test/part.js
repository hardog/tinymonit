'use strict';

const expect = require('chai').expect;
const mm = require('mm');
const axon = require('axon');
const sock = axon.socket('req');
const proc = require('../lib/proc');
const Part = require('../lib/part');

let part;

describe('#part', function(){
	describe('receive osstat msg', function(){
		before(function(done){
			part = new Part(4000);
			// wait bind success
			setTimeout(function(){done();}, 100);
		});

		after(function(){
			sock.close();
			part.close();
		});

		it('should receive msg and return os stat', function(done){
			sock.connect(4000);
			sock.send('collect', function(stat){
				expect(stat.sys).to.be.an('object');
				expect(stat.procs).to.be.an('array');
				expect(stat.procs.length).to.be.equal(1);
				done();
			});
		});
	});
	
	describe('timeout osstat msg', function(){
		before(function(done){
			part = new Part(4001, {timeout: 1});
			// wait bind success
			setTimeout(function(){done();}, 100);
		});

		after(function(){
			sock.close();
			part.close();
		});

		it('should receive /Part: EXE_TIMEOUT/', function(done){
			mm(proc, 'p_stat', function(pid){
				return new Promise(function(resolve, reject){
					setTimeout(function(){
						resolve(pid);
					}, 10);
				});
			});

			sock.connect(4001);
			sock.send('collect', function(stat){
				expect(stat).to.be.equal('Part: EXE_TIMEOUT');
				done();
			});
		});
	});

	describe('error osstat msg', function(){
		before(function(done){
			part = new Part(4002);
			// wait bind success
			setTimeout(function(){done();}, 100);
		});

		after(function(){
			sock.close();
			part.close();
			mm.restore();
		});

		it('should receive /xx/ exception message', function(done){
			mm(proc, 'p_stat', function(pid){
				throw new Error('xx');
			});

			sock.connect(4002);
			sock.send('collect', function(stat){
				expect(/xx/.test(stat)).to.be.true;
				done();
			});
		});
	});
});