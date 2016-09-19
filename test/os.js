'use strict';

const expect = require('chai').expect;
const os = require('../lib/os');


describe('#os', () => {
	describe('#hostname', function(){
		it('shoud print hostname', () => {
			expect(os.hostname()).to.be.an('string');
		});

		it('shoud print hostname by custom format fn', () => {
			let hostname = os.hostname(function(v){
				return `HT:${v}`;
			});

			expect(/HT:/.test(hostname)).to.be.true;
		});
	});
	
	describe('#uptime', function(){
		it('shoud print uptime', () => {
			expect(os.uptime()).to.be.an('string');
		});

		it('shoud print uptime by custom format fn', () => {
			let uptime = os.uptime(function(secs){
				return secs * 1000;
			});

			expect(/000$/.test(uptime)).to.be.true;
		});
	});

	describe('#cpus', function(){
		it('shoud print cpus', () => {
			let c = os.cpus();

			expect(c).to.be.an('object');
			expect(c.list[0]).to.have.property('percent');
			expect(c.list[0]).to.have.property('free');
			expect(c.list[0]).to.have.property('total');
			expect(c.list[0]).to.have.property('model');
			expect(c).to.have.property('percent');
		});

		it('shoud print cpus by custom format fn', () => {
			let c = os.cpus(function(v){
				return 'custom';
			});

			expect(c).to.equal('custom');
		});
	});

	describe('#load', function(){
		it('shoud print load', () => {
			let load = os.load();

			expect(load).to.be.an('array');
			expect(load.length).to.equal(3);
		});

		it('shoud print load by custom format fn', () => {
			let load = os.load(function(v){
				return v[2] * 1000;
			});

			expect(load).to.be.a('number');
		});
	});

	describe('#mem', function(){
		it('shoud print memory', () => {
			let mem = os.mem();
			
			expect(mem).to.be.an('object');
			expect(mem).to.have.property('free');
			expect(mem).to.have.property('total');
			expect(mem).to.have.property('percent');
		});

		it('shoud print memory by custom format fn', () => {
			let mem = os.mem(function(v){
				let free = Math.floor(v.free / 1024);
				let total = Math.floor(v.total / 1024);

				return {free: `${free}kb`, total: `${total}kb`};
			});
			
			expect(/kb$/.test(mem.free)).to.be.true;
		});
	});
});