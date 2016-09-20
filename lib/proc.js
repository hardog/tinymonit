'use strict';

const pusage = require('pidusage');
const helper = require('./helper');

// async single process cpu & mem usage,
// cb mean callback
exports.cb_stat = function(pid, done){
	pusage.stat(pid, function(err, stat){
		if(err){ done(err); }

		// attach pid
		stat.pid = pid;
		done(null, stat);
	});
};

// promisify stat, p mean promise
exports.p_stat =  function(pid){
	return new Promise(function(resolve, reject){
		pusage.stat(pid, function(err, stat){
			if(err){ return reject(err); }

			stat.pid = pid;
			resolve(stat);
		});
	});
};

// promisify stats from pids
exports.p_stats = function(pids){
	let all = [];

	pids = Array.prototype.slice.call(pids);

	let len = pids.length;
	for(let i = 0; i < len; i++){
		all.push(exports.p_stat(pids[i]));
	}

	return Promise.all(all);
};

// delete histroy prevent mem leak
exports.clear = function(pids){
	pids = Array.prototype.slice.call(pids);
	let len = pids.length;

	for(let i = 0; i < len; i++){
		pusage.unmonitor(pids[i]);
	}
};

// humanize cpu & mem
exports.format = function(stat){
	let mem = stat.memory;

	// to mbytes
	mem = helper.to_mb(mem);
	// to int
	mem = Math.floor(mem);

	return {
		cpu: `${Math.floor(stat.cpu)}%`,
		mem: `${mem}Mb`,
		pid: stat.pid
	};
};