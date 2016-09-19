'use strict';

const expect = require('chai').expect;
const axon = require('axon');
const sock = axon.socket('rep');
const Central = require('../lib/central');

let mock_timeout = 0;

describe('#Central', function(){
	before(function(){
		// setTimeout
		sock.bind(4000);
		sock.on('message', function(msg, reply){
			setTimeout(function(){
				reply('ok');
			}, mock_timeout);
		});
	});

	after(function(){
		sock.close();
	});

	it('should get a reply with msg /ok/', function(done){
		let ctl = new Central({
			timeout: 500,
			parts:[4000]
		});

		Promise.resolve()
		.then(() => ctl.collect())
		.then((r) => {
			expect(r[0]).to.be.equal('ok');
			done();
		})
		.catch((e) => console.log(e));
	});

	it('should get a reply with msg /Central: REQ_TIMEOUT/', function(done){
		mock_timeout = 10;
		let ctl = new Central({
			timeout: 2,
			parts:[4000]
		});

		Promise.resolve()
		.then(() => ctl.collect())
		.then((r) => {
			expect(r[0]).to.be.equal('Central: REQ_TIMEOUT');
			done();
		})
		.catch((e) => console.log(e));
	});
});