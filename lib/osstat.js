'use strict';

const _ = require('lodash');
const os = require('./os');
const proc = require('./proc');

module.exports = function osstat_handle(pids){
	let sys = {
		hostname: os.hostname(),
		uptime: os.uptime(),
		load: os.load(),
		cpu: os.cpus(),
		mem: os.mem()
	};

	if(!_.isArray(pids)){
		pids = [pids];
	}

	return proc.p_stats(pids)
	.then(function(procs){
		return {sys, procs};
	});
};
