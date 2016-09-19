'use strict';

exports.isArray = function(obj){
	return (toString.call(obj) === '[object Array]');
};

const byte_per_kbytes = 1024;
const byte_per_mbytes = 1024 * 1024;
const byte_per_gbytes = 1024 * 1024 * 1024;

// bytes to kbytes
exports.to_kb = function(bytes){
	return Math.floor(bytes / byte_per_kbytes);
};

// bytes to mbytes
exports.to_mb = function(bytes){
	return Math.floor(bytes / byte_per_mbytes);
};

// bytes to gbytes
exports.to_gb = function(bytes){
	return Math.floor(bytes / byte_per_gbytes);
};

const secs_per_minute = 60;
const secs_per_hour = 60 * 60;
const secs_per_day = 24 * 60 * 60;

// seconds to days
exports.to_days = function(secs){
	let day;

	day = Math.floor(secs / secs_per_day);

	return `${day} days`;
};

// seconds to hour:minute:sec
exports.to_time = function(secs){
	let hour, minute, sec;

	hour = Math.floor(secs / secs_per_hour);
	minute = Math.floor((secs - hour * secs_per_hour) / secs_per_minute);
	sec = secs - hour * secs_per_hour - minute * secs_per_minute;

	if(String(hour).length < 2){
		hour = `0${hour}`;
	}

	if(String(minute).length !== 2){
		minute = `0${minute}`;
	}

	if(String(sec).length !== 2){
		sec = `0${sec}`;
	}

	return `${hour}:${minute}:${sec}`;
};