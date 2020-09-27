//  dependencies
//    js/enums.js

'use strict';

Object.defineProperty(Date.prototype, 'getDaysCount', {
	value: function(){
		var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let month = this.getMonth();
		if(month == MONTHS.FEB){
			var dte = new Date(this.getFullYear(), month, 29);
			if(dte.getMonth() == MONTHS.FEB){
				return 29; // leap year
			}
		}
		return days[month];			
	}
	,writable: true
	,configurable: true
});

Object.defineProperty(Date.prototype, 'getFirstDayOfMonth', {
	value: function(){
		let dte = new Date(this.getFullYear(), this.getMonth(), 1);
		return dte.getDay();
	}
	,writable: true
	,configurable: true
});

Object.defineProperty(Date.prototype, 'isCurrentMonth', {
	value: function(){
		let now = new Date();
		return this.getMonth() === now.getMonth() && this.getFullYear() === now.getFullYear();
	}
	,writable: true
	,configurable: true
});

Object.defineProperty(Date.prototype, 'nextMonth', {
	value: function() {
		let dte = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 
		this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());

		dte.setMonth(dte.getMonth() + 1);
		return dte;
	}
	,writable: true
	,configurable: true
});

Object.defineProperty(Date.prototype, 'previousMonth', {
	value: function() {
		let dte = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 
		this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());

		dte.setMonth(dte.getMonth() - 1);
		return dte;
	}
	,writable: true
	,configurable: true
});
