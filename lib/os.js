'use strict';

const os = require('os');
const helper = require('./helper');

let wrapper = function(v_handle, default_format){
	return function(format){
		let value = v_handle();
		let direct_return_fn = function(v){ return v; };

		format = format || default_format;
		format = format || direct_return_fn;

		return format(value);
	};
};

// format fn: cpus, there may be multi cores
let cpus_format = function(cpus){
	let formated = [];
	let idle = 0, total = 0;
	let len = cpus.length;

	for(let i = 0; i < len; i++){
		let idle_single = 0, total_single = 0;
		let times = cpus[i].times;

		idle_single = times.idle;
		total_single = times.sys + times.user + times.idle;

		idle += idle_single;
		total += total_single;

		let used_percent = (total_single - idle_single) / total_single;

		formated.push({
			model: cpus[i].model,
			free: idle_single,
			total: total_single,
			percent: `${used_percent.toFixed(2)*100}%`
		});
	}

	let total_used_percent = (total - idle) / total;

	return {
		list: formated,
		percent: `${total_used_percent.toFixed(2)*100}%`
	};
};

// format fn: loadavg toFixed to 2 
let loadavg_to_fixed = function(load){
	let len = load.length;

	for(let i = 0; i < len; i++){
		load[i] = load[i].toFixed(2);
	}

	return load;
};

// format fn: mem
let mem_to_fixed = function(mem){
	let percent = (mem.total - mem.free) / mem.total;

	mem.free = `${helper.to_mb(mem.free)}Mb`;
	mem.total = `${helper.to_mb(mem.total)}Mb`;
	mem.percent = `${percent.toFixed(2)*100}%`;

	return mem;
};

// delay get mem profile
let os_mem = function(){
	return {
		free: os.freemem(), 
		total: os.totalmem()
	};
};

exports.hostname = wrapper(os.hostname);
exports.uptime 	 = wrapper(os.uptime, helper.to_time);
exports.cpus 	 = wrapper(os.cpus, cpus_format);
exports.load 	 = wrapper(os.loadavg, loadavg_to_fixed);
exports.mem 	 = wrapper(os_mem, mem_to_fixed);