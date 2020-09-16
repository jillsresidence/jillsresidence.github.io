//	dependencies:

(function(){
	
	const template = document.createElement('template');
	template.innerHTML = `
		<div>
			<div class="binder-wires"><span></span><span></span><span></span></div>
			<div class="month-display"></div>
			<div class="date-display"></div>
		</div>`;
	
	class CalendarIcon extends HTMLElement{
		
		constructor(){
			super();
			
			// common values
			this._monthDisplay = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		}
		
		connectedCallback(){
			this.appendChild(template.content.cloneNode(true));
			this._initState();
			this._render();
		}
		
		disconnectedCallback(){
			
		}
		
		//----- private methods 
		
		_initState(){
			
			this._state = {
				date: null
			};
		}
		
		_setDate(val){
			this._state.date = val;
			this._render();
		}
		
		_dateDisplay(dte){
			return (dte < 10) ? '0' + dte : dte;
		}
		
		_render(){
			let monthDisplay = this.querySelector('.month-display');
			let dateDisplay = this.querySelector('.date-display');
			
			if(this._state.date){
				
				monthDisplay.innerText = this._monthDisplay[this._state.date.getMonth()];
				dateDisplay.innerText = this._dateDisplay(this._state.date.getDate());
				
			} else {
				
				monthDisplay.innerText = 'XXX';
				dateDisplay.innerText = '--';
				
			}
		}
		
		//----- getters and setters 
		
		get value(){
			return this._state.date;
		}
		
		set value(val){
			this._setDate(val);
		}
	}
	
	window.customElements.define('calendar-icon-component', CalendarIcon);
	
})();