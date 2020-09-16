// dependencies:


(function(){
	const template = document.createElement('template');
	template.innerHTML = `
	<div>
		<select class="calendar_select_year"></select>
		<select class="calendar_select_month">
			<option value=0> January </option>
			<option value=1> February </option>
			<option value=2> March </option>
			<option value=3> April </option>
			<option value=4> May </option>
			<option value=5> June </option>
			<option value=6> July </option>
			<option value=7> August </option>
			<option value=8> September </option>
			<option value=9> October </option>
			<option value=10> November </option>
			<option value=11> December </option>
		<select>
	</div>`;
	
	class CalendarSelect extends HTMLElement{
		
		constructor(){
			super();
		}
		
		connectedCallback(){
			this.appendChild(template.content.cloneNode(true));
			
			this._el = {
				year: this.querySelector('.calendar_select_year')
				,month: this.querySelector('.calendar_select_month')
			};
			
			this._addEventListeners();
		}
		
		disconnectedCallback(){
			this._removeEventListeners();
		}
		
		//----- private methods
		
		_onMonthChange(evt){
			
		}
		
		_onYearChange(evt){
			
		}
		
		_addEventListeners(){
			
			
			this._boundOnYearChange = this._onYearChange.bind(this);
			this._el.year.addEventListener('change', this._boundOnYearChange);
			
			this._boundOnMonthChange = this._onMonthChange.bind(this);
			this._el.month.addEventListener('change', this._boundOnMonthChange);
		}
		
		_removeEventListeners(){
			this._el.year.removeEventListener('change', this._boundOnYearChange);
			this._el.month.removeEventListener('change', this._boundOnMonthChange);
		}
		
		_setMonth(val){
			this._el.selected = val;
		}
		
		_setYear(val){
			this._el.selected = val;
		}
		
		//----- public methods
		
		//----- getters and setters
		
		set month(val){
			this._setMonth(val);
		}
		
		set year(val){
			this._setYear(val);
		}
	}

	window.customElements.define('calendar-select-component', CalendarSelect);
})();