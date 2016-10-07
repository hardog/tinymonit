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
	let len = osstat.sys.cpus.list.length || 1;
	let value = osstat.sys.load[2] / len;
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

exports.alarm_format = function(osstat, proc_num){
	let actual_procs_num = osstat.procs.length;
	let procs_detail;

	if(!proc_num){
		procs_detail = '已忽略进程数比对!';
	}else{
		procs_detail = `应有进程数: ${proc_num || 1}, 实际进程数: ${actual_procs_num} \n`;
	}

	return `
		主机名称: ${osstat.sys.hostname} <br/>
		启动时间: ${osstat.sys.uptime} <br/>
		CPU占比: ${osstat.sys.cpus.percent} <br/>
		内存占比: ${osstat.sys.mem.percent} <br/>
		系统负载: ${osstat.sys.load.join(', ')} <br/>
		核 心 数: ${osstat.sys.cpus.list.length} <br/>  
		机器进程数: ${actual_procs_num} <br/>
		${procs_detail}
	`;
};