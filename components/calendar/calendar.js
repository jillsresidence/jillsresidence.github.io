
//	dependencies:
//		js/enums.js
//		js/date_extension.js

(function(){

	const template = document.createElement('template');
	template.innerHTML = `
		<div class="month">
			<div class="month-title">
				<span>September</span> <span>2020</span>
			</div>
			<table>
				<thead>
					<tr> <th>Su</th> <th>Mo</th> <th>Tu</th> <th>We</th> <th>Th</th> <th>Fr</th> <th>Sa</th> </tr>
				</thead>
				<tbody>
					<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
					<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
					<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
					<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
					<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
					<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
				</tbody>
			</table>
		</div>`;

	class Calendar extends HTMLElement{
	

		constructor(){
			super();
			
			// common values
			this._css = {
				 SELECTED_START_DATE: 'selected-start-date'
				,SELECTED_END_DATE: 'selected-end-date'
				,CURRENT_DATE: 'current-date'
				,AVAILABLE_CELL: 'available-cell'
				,INCLUDED_DATE: 'included-date'
			};

			this._settings = {
				shouldRender: true
			};

			this._state = {};
		}
		
		connectedCallback(){
			this.appendChild(template.content.cloneNode(true));
			this._init();
			this._render();
		}
		
		disconnectedCallback(){
			this._removeEventListeners();
		}
		
		
		//----- private methods -----
		
		_init(val){
			this._initCss();
			this._initState(val);
			
			this._selectStartDate(this._state.selectedStartDate);
			this._selectEndDate(this._state.selectedEndDate);
		}
		
		
		_initState(val){
			
			if(val){
				this._state = {
					selectedStartDate: val.selectedStartDate
					,selectedEndDate: val.selectedEndDate
					,month: val.month
					,year: val.year
				};
			} else {
				let today = new Date();
				this._state = {
					currentDate: today
					,selectedStartDate: null // used to initialize the selected start date
					,selectedEndDate: null // used to initialize the selected end date
					,month: today.getMonth()
					,year: today.getFullYear()
				};				
			}

		}
		
		_initCss(){
			
			let selectedStartDateEl = this.querySelector('.' + this._css.SELECTED_START_DATE);
			if(selectedStartDateEl){
				selectedStartDateEl.classList.remove(this._css.SELECTED_START_DATE);
			}
			
			let selectedEndDateEl = this.querySelector('.' + this._css.SELECTED_END_DATE);
			if(selectedEndDateEl){
				selectedEndDateEl.classList.remove(this._css.SELECTED_END_DATE);
			}
			
			let currentDateEl = this.querySelector('.' + this._css.CURRENT_DATE);
			if(currentDateEl){
				currentDateEl.classList.remove(this._css.CURRENT_DATE);
			}
		}
		
		_renderWeek(rowEl, dayOfMonth, lastDateOfMonth, dayOfWeek){
			
			while(dayOfWeek <= DAYS.SAT && lastDateOfMonth >= dayOfMonth){
				
				let dte = new Date(this._state.year, this._state.month, dayOfMonth, 0, 0, 0, 0);
				let el = rowEl.children[dayOfWeek];
				el.innerText = dayOfMonth;
				el.data = {date:dte};
				el.classList.add(this._css.AVAILABLE_CELL);
				
				dayOfMonth++;
				dayOfWeek++;
			}
			
			return dayOfMonth;
		}
		
		_render(){
			if( ! this._settings.shouldRender){
				return;
			}
			this._removeEventListeners();
			this._renderMonth();
			this._addEventListeners();

			// update the css when year or month is changed
			if(this._state.selectedStartDate || this._state.selectedEndDate){
				this.setDates({startDate: this._state.selectedStartDate, endDate: this._state.selectedEndDate});
			}

			this._selectCurrentDate();
			this._updateMonthTitle();
		}
		
		_renderMonth(){
			
			let dte = new Date(this._state.year, this._state.month, 1);
			let dayOfWeek = dte.getDay();
			let dayOfMonth = 1; // start of the month
			let lastDateOfMonth = dte.getDaysCount();
			
			let tbl = this.querySelector('table');
			if( ! tbl) return;

			let tableRows = tbl.querySelector('tbody').children;
			let firstWeekRow = 0; 
			let rowCount = 6;
			
			this._clearUnavailableDays(dayOfWeek, lastDateOfMonth, tableRows, firstWeekRow);
			
			let weekRow;
			for(weekRow = 0; weekRow <= rowCount && dayOfMonth <= lastDateOfMonth; weekRow++){
				dayOfMonth = this._renderWeek(tableRows[firstWeekRow + weekRow], dayOfMonth, lastDateOfMonth, dayOfWeek);
				dayOfWeek = DAYS.SUN;
			}			
		}
		
		_clearUnavailableDays(dayOfWeek, lastDateOfMonth, tableRows, firstWeekRow){
			
			let clearCell = cell => {
				cell.data = null;
				cell.innerText = '';
				cell.classList.remove(this._css.AVAILABLE_CELL);				
			};
			
			// clear the days that are before the start of the month
			if(dayOfWeek > DAYS.SUN){
				
				let firstRow = tableRows[firstWeekRow];
				let day = DAYS.SUN;
				let dayEl;
				
				while(day < dayOfWeek){
					clearCell(firstRow.children[day]);
					day++;
				}
			}

			// clear the days that are after the last day of the month
			let cellCount = 7 * 6; // days in a week * number of rows in the calendar
			let lastAvailableCell = dayOfWeek + lastDateOfMonth;
			let unavailableCellCount = cellCount - lastAvailableCell;
			let row = 5; // last row in the calendar
			let day = DAYS.SAT;
			
			while(unavailableCellCount > 0){
				clearCell(tableRows[row].children[day]);
				day = day === DAYS.SUN ? DAYS.MON : day-1;
				unavailableCellCount--;
			}
		}
		
		_addEventListeners(){
			this._boundOnClick = this._onClick.bind(this);
			let tbody = this.querySelector('tbody');
			if(tbody) {
				tbody.addEventListener('click', this._boundOnClick);
			}
			
		}

		_selectDate(val){
			
			if( ! this._state.selectedStartDate){
				
				this._selectStartDate(val);
				
			} else {

				if(this._state.selectedStartDate > val){
					this._selectStartDate(val);
				} else {
					this._selectEndDate(val);
				}
				
			} 

			this.dispatchEvent(new CustomEvent('dateSelected', {detail:val}));
			
		}
		
		_byClass(css){
			return this.querySelector('.' + css);
		}

		_setCellCss(val, css){
			if(val){
				let cell = this._whichCellEl(val);
				if(cell){
					cell.classList.add(css);
				}
			}
		}

		_updateMonthTitle(){
			let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			let monthTitle = this.querySelector('.month-title');
			if(monthTitle) {
				monthTitle.children[0].innerText = monthName[this._state.month];
				monthTitle.children[1].innerText = this._state.year;
			}
		}

		_selectStartDate(val){
						
			if(val === this._state.selectedStartDate){
				return;
			}

			let css = this._css.SELECTED_START_DATE;
			
			this._state.selectedStartDate = val;
			
			if(this._state.selectedEndDate){
				this._selectEndDate(null);
			}
			
			let selectedStartDateEl = this._byClass(css);
			if(selectedStartDateEl){
				selectedStartDateEl.classList.remove(css);
			}

			this._setCellCss(val, css);
		}
		
		_setInclusiveDatesCss(){
			let css = this._css.INCLUDED_DATE;
			let tbl = this.querySelector('table');

			// clear included dates css
			tbl.querySelectorAll('.' + css).forEach(el => el.classList.remove(css));

			// add the css to included dates
			tbl.querySelectorAll('td').forEach(el => {
				if(el.data && el.data.date > this._state.selectedStartDate && el.data.date < this._state.selectedEndDate){
					el.classList.add(css);
				}
			});
		}

		_selectEndDate(val){
			
			if(!val && !this._state.selectedEndDate){
				return;
			}

			let css = this._css.SELECTED_END_DATE;
			
			let selectedStartDate = this._state.selectedStartDate;
			if(val && selectedStartDate && selectedStartDate > val){
				return; // invalid end date
			}
			this._state.selectedEndDate = val;
			
			let selectedEndDateEl = this._byClass(css);
			if(selectedEndDateEl){
				selectedEndDateEl.classList.remove(css);
			}
			
			this._setCellCss(val, css);
			this._setInclusiveDatesCss();
		}
		
		_selectCurrentDate(){
			let css = this._css.CURRENT_DATE;
			
			this._state.currentDate = new Date();
			let currentDateEl = this._byClass(css);
			if(currentDateEl){
				currentDateEl.classList.remove(css);
			}
			
			this._setCellCss(this._state.currentDate, css);
		}
		
		_onClick(evt){
			if(evt.target.data){
				this._selectDate(evt.target.data.date);
			}
		}
		
		_removeEventListeners(){
			let tbody = this.querySelector('tbody');
			if(tbody) {
				tbody.removeEventListener('click', this._boundOnClick);
			}
		}
		
		_whichTableRow(monthStartsAt, dte){
			return Math.ceil((monthStartsAt + dte) / 7) - 1; // row index starts at zero
		}
		
		_whichTableCol(monthStartsAt, dte){
			let col = ((monthStartsAt + dte) % 7) - 1; //column index starts at zero
			return col < 0 ? DAYS.SAT : col;
		}
		
		_isValidDate(dte){
			return dte.getFullYear() === this._state.year && dte.getMonth() === this._state.month;
		}

		_whichCellEl(dte){

			if( ! this._isValidDate(dte)){
				return null;
			}

			let monthStartsAt = dte.getFirstDayOfMonth();
			let d = dte.getDate();
			let row = this._whichTableRow(monthStartsAt, d);
			let col = this._whichTableCol(monthStartsAt, d);
			let tbl = this.querySelector('tbody');
			
			return tbl.children[row].children[col];
		}
		
		//----- public methods
		
		// param: {year, month, selectedStartDate, selectedEndDate, currentDate}
		init(param){	
		
			this._init(param);	
			this._render();							
		}

		// param: {startDate, endDate}
		setDates(param){
			this._selectStartDate(param.startDate);
			this._selectEndDate(param.endDate);
		}
		
		
		
		//----- getters and setters
		
		set month(val){
			if(MONTHS.JAN <= val && val <= MONTHS.DEC){
				this._state.month = val;
				this._render();
			}
		}

		set shouldRender(val){
			this._settings.shouldRender = val;
		}
		
		set year(val){
			let today = new Date();
			if(val >= today.getFullYear() - 1){
				this._state.year = val;
				this._render();
			}
		}
		
		set startDate(val){
			this._selectStartDate(val);
		}
		
		set endDate(val){
			this._selectEndDate(val);
		}
		
		get shouldRender(){
			return this._settings.shouldRender;
		}

		get month(){
			return this._state.month;
		}

		get year(){
			return this._state.year;
		}

		get selectedStartDate(){
			return this._state.selectedStartDate;
		}
		
		get selectedEndDate(){
			return this._state.selectedEndDate;
		}
		
	}
	
	window.customElements.define('calendar-component', Calendar);
})();