'use strict';

const _ = require('lodash');
const os = require('./os');
const proc = require('./proc');

// format all process stat
let format_stat = (procs) => {
	let result = [];

	_.each(procs, (v) => {
		result.push(proc.format(v));
	});

	return result;
};

// compose by process pid
let compose = (src_procs, dest_procs) => {
	let result = [];

	// no src_procs just return dest_procs
	if(dest_procs.length === 0){
		return src_procs;
	}

	_.each(dest_procs, (v, k) => {
		let src = _.find(src_procs, {pid: v.pid});

		result.push(_.assign(dest_procs[k], src));
	});

	return result;
};

module.exports = function osstat_handle(pids, more){
	let sys = {
		hostname: os.hostname(),
		uptime: os.uptime(),
		load: os.load(),
		cpus: os.cpus(),
		mem: os.mem()
	};

	if(!_.isArray(pids)){
		pids = [pids];
	}

	return proc.p_stats(pids)
	.then((procs) => format_stat(procs))
	.then((procs) => compose(more, procs))
	.then((procs) => ({sys, procs}));
};
