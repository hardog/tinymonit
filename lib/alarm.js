'use strict';

/**
 * osstat: os stat structure
 * {
 * 	sys: {
 * 		hostname: 'xx',
 * 		loadavg: {},
 * 		...
 * 	},
 * 	procs: [{
 * 		name: 'p1-name',
 * 		cpu: '45%',
 * 		mem: 23Mb,
 * 		...
 * 	}, {
 * 		name: 'p2-name',
 * 		cpu: '80%'
 * 	}]
 * }
 */

const _ = require('lodash');

exports.should_cpu_alarm = function(osstat, threshold){
	if(!_.isObject(osstat)){
		throw new Error('osstat is not an object');
	}

	threshold = threshold || 95;
	let value = osstat.sys.cpus.percent;
	let int_value = parseInt(value.replace('%', ''));

	if(int_value > threshold){
		return true;
	}

	return false;
};

exports.should_mem_alarm = function(osstat, threshold){
	if(!_.isObject(osstat)){
		throw new Error('osstat is not an object');
	}

	threshold = threshold || 95;
	let value = osstat.sys.mem.percent;
	let int_value = parseInt(value.replace('%', ''));

	if(int_value > threshold){
		return true;
	}

	return false;
};

exports.should_load_alarm = function(osstat, threshold){
	if(!_.isObject(osstat)){
		throw new Error('osstat is not an object');
	}

	threshold = threshold || 90;
	let value = osstat.sys.load[2];
	let int_value = parseInt(value*100);

	if(int_value > threshold){
		return true;
	}

	return false;
};

exports.should_procs_alarm = function(osstat, threshold){
	if(!_.isObject(osstat)){
		throw new Error('osstat is not an object');
	}

	let should_value = threshold || 1;
	let acutal_value = osstat.procs.length;

	if(should_value !== acutal_value){
		return true;
	}

	return false;
};

exports.alarm_format = function(osstat, opts){
	let actual_procs_num = osstat.procs.length;
	let should_procs_num = opts.threshold.procs;

	return `
		主机名称: ${osstat.sys.hostname} \n
		启动时间: ${osstat.sys.uptime} \n
		CPU占比: ${osstat.sys.cpus.percent} \n
		内存占比: ${osstat.sys.mem.percent} \n
		进程情况: 应有进程数: ${should_procs_num}, 实际进程数: ${actual_procs_num} \n
	`;
};