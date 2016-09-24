'use strict';

const debug = require('debug')('tm:part');
const axon = require('axon');
const sock = axon.socket('rep');
const osstat = require('./osstat');

// bind to central addr(ip:port)
function Part(addr, opts){
	let self = this;
	if(!(self instanceof Part)) return new Part(addr, opts);

	debug('part instance created ', addr, opts);
	opts = opts || {};

	sock.bind(addr);
	sock.on('message', function(msg, reply){
		debug('received message');

		Promise.resolve()
		.then(() => self.reply())
		.then(reply)
		.catch(reply);
	});

	self.timeout = opts.timeout || 500;
	self.pid = opts.pid || process.pid;
}

module.exports = Part;

// reply 
Part.prototype.reply = function(){
	let self = this;
	let races = [];

	races.push(new Promise(function(resolve){
		setTimeout(function(){
			debug('reply timeout');
			resolve('Part: EXE_TIMEOUT');
		}, self.timeout);
	}));

	races.push(new Promise(function(resolve, reject){
		Promise.resolve()
		.then(() => osstat(self.pid))
		.then(resolve)
		.catch(function(e){
			debug('reply reject');
			// if direct return e, 
			// it's useless, no message return
			// because axon use JSON.stringify Error object,
			// but it's not a json object
			reject(e.stack);
		});
	}));
	
	return Promise.race(races);
};

// close
Part.prototype.close = function(){
	debug('part closed');
	sock.close();
};