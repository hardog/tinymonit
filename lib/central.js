'use strict';

const axon = require('axon');
const helper = require('./helper');

// addr(ip:port)
function Central(opts){
	if(!(this instanceof Central)) return new Central(opts);

	opts = opts || {};

	this.timeout = opts.timeout || 500;
	this.parts = opts.parts || [];
}

module.exports = Central;

Central.prototype.one_collect = function(addr, timeout){
	let self = this;
	let races = [];
	let sock = axon.socket('req');

	sock.connect(addr);
	races.push(new Promise(function(resolve){
		setTimeout(function(){
			resolve('Central: REQ_TIMEOUT');
			sock.close();
		}, timeout || self.timeout);
	}));

	races.push(new Promise(function(resolve){
		// just send to receive monit info, 
		// `collect` no special meaning
		sock.send('collect', function(msg){
			resolve(msg);
			sock.close();
		});
	}));

	return Promise.race(races);
};

let parse_part = function(part){
	let arraify_part = part;

	// convert to array
	if(!helper.isArray(part)){
		arraify_part = [part];
	}

	return arraify_part;
};

Central.prototype.collect = function(){
	let all_parts = [];
	let parts = this.parts;
	let len = parts.length;


	for(let i = 0; i < len; i++){
		let part = parse_part(parts[i]);
		
		all_parts.push(this.one_collect(part[0], part[1]));
	}

	return Promise.all(all_parts);
};
