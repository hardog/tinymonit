'use strict';

const expect = require('chai').expect;
const alarm = require('../lib/alarm');

// basic osstat data structure
let osstat = {
	procs: [],
	sys: {
		cpus: {},
		hostname: '',
		uptime: 2340,
		mem: {},
		load: [0, 0, 0]
	}
};

describe('#alarm', function(){
	describe('#should_cpu_alarm', function(){
		it('shoud throw exception /osstat is not an object/', function(){
			let r;

			try{
				r = alarm.should_cpu_alarm('', 90);
			}catch(e){
				expect(e.message).to.be.equal('osstat is not an object');
			}
		});

		it('shoud return true when cpu usage large than default threshold', function(){
			osstat.sys.cpus.percent = '96%';

			let r = alarm.should_cpu_alarm(osstat);
			expect(r).to.be.true;
		});

		it('shoud return true when cpus usage large than 90%', function(){
			osstat.sys.cpus.percent = '91%';

			let r = alarm.should_cpu_alarm(osstat, 90);
			expect(r).to.be.true;
		});

		it('shoud return false when cpus usage less than 90%', function(){
			osstat.sys.cpus.percent = '89%';

			let r = alarm.should_cpu_alarm(osstat, 90);
			expect(r).to.be.false;
		});
	});

	describe('#should_mem_alarm', function(){
		it('shoud throw exception /osstat is not an object/', function(){
			let r;

			try{
				r = alarm.should_mem_alarm('', 90);
			}catch(e){
				expect(e.message).to.be.equal('osstat is not an object');
			}
		});

		it('shoud return true when mem usage large than default threshold(95%)', function(){
			osstat.sys.mem.percent = '96%';

			let r = alarm.should_mem_alarm(osstat);
			expect(r).to.be.true;
		});

		it('shoud return true when mem usage large than 90%', function(){
			osstat.sys.mem.percent = '91%';

			let r = alarm.should_mem_alarm(osstat, 90);
			expect(r).to.be.true;
		});

		it('shoud return false when mem usage less than 90%', function(){
			osstat.sys.mem.percent = '89%';

			let r = alarm.should_mem_alarm(osstat, 90);
			expect(r).to.be.false;
		});
	});

	describe('#should_load_alarm', function(){
		it('shoud throw exception /osstat is not an object/', function(){
			let r;

			try{
				r = alarm.should_load_alarm('', 90);
			}catch(e){
				expect(e.message).to.be.equal('osstat is not an object');
			}
		});

		it('shoud return true when the loadavg large than default threshold(90) last 15m', function(){
			osstat.sys.load[2] = 0.91;
			osstat.sys.cpus.list = [{}];

			let r = alarm.should_load_alarm(osstat);
			expect(r).to.be.true;
		});

		it('shoud return true when the loadavg large than threshold(80) last 15m', function(){
			osstat.sys.load[2] = 0.9;
			osstat.sys.cpus.list = [{}];

			let r = alarm.should_load_alarm(osstat, 80);
			expect(r).to.be.true;
		});

		it('shoud return false when the loadavg less than default threshold(90) last 15m', function(){
			osstat.sys.load[2] = 0.8;
			osstat.sys.cpus.list = [{}];

			let r = alarm.should_load_alarm(osstat, 90);
			expect(r).to.be.false;
		});
	});

	describe('#should_procs_alarm', function(){
		it('shoud throw exception /osstat is not an object/', function(){
			let r;

			try{
				r = alarm.should_procs_alarm('', 1);
			}catch(e){
				expect(e.message).to.be.equal('osstat is not an object');
			}
		});

		it('shoud return false when no process offline default 1', function(){
			osstat.procs.length = 1;

			let r = alarm.should_procs_alarm(osstat);
			expect(r).to.be.false;
		});

		it('shoud return false when no process offline', function(){
			osstat.procs.length = 4;

			let r = alarm.should_procs_alarm(osstat, 4);
			expect(r).to.be.false;
		});

		it('shoud return true when anyone of the process offline', function(){
			osstat.procs.length = 3;

			let r = alarm.should_procs_alarm(osstat, 4);
			expect(r).to.be.true;
		});
	});

	describe('#alarm_format', function(){
		it('shoud print formated monit infomation', function(){
			osstat.sys.hostname = 'TM';
			osstat.sys.uptime = 2340;
			osstat.sys.cpus.percent = '70%';
			osstat.sys.mem.percent = '90%';
			osstat.procs.length = 4;
			let opt = {
				threshold: {
					procs: 3
				}
			};

			expect(alarm.alarm_format(osstat, opt)).to.be.a('string');
		});

	});
});