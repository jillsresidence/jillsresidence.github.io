// dependencies: 
//    components/calendar

(function(){

        const template = document.createElement('template');
        template.innerHTML = `<div class="calendar-carousel"></div>`;

        class CalendarCarousel extends HTMLElement {

            constructor() {
                super();
                
                this._state = {
                     startDate: null
                    ,endDate: null
                    ,visibleCalendar: null
                };
            }

            connectedCallback() {
                this._addEventListeners();
            }

            disconnectedCallback() {
                this._removeEventListeners();
            }

            //----- private methods

            _initCalendars() {

            }

            _addEventListeners() {

            }

            _removeEventListeners() {

            }

            _render() {
                
            }

            _previous() {
                if(this._state.visibleCalendar.isCurrentMonth()) return;

                this._state.visibleCalendar = this._state.visibleCalendar.previousMonth();

                // move the carousel to the right

                // add a calendar at the start of the carousel
                if(this.children.length > 0) {
                    let cal = document.createElement('calendar-component');
                    let hiddenPrevCal = this._state.visibleCalendar.previousMonth();
                    
                    cal.shouldRender = false;
                    this.insertBefore(hiddenPrevCal, this.firstChild);
                    

                    cal.year = hiddenPrevCal.getFullYear();
                    cal.shouldRender = true;
                    cal.month = hiddenPrevCal.getMonth();
                }
            }

            _next() {
                this._state.visibleCalendar = this._state.visibleCalendar.nextMonth();

                // move the carousel to the left

                // add a calendar to the end of the carousel
                let cal = document.createElement('calendar-component');
                let hiddenNextCal = this._state.visibleCalendar.nextMonth();

                cal.shouldRender = false;
                this.appendChild(cal);

                cal.year = hiddenNextCal.getFullYear();
                cal.shouldRender = true;
                cal.month = hiddenNextCal.getMonth();
            }

            _addHiddenCalendar() {
                
            }

            // param val: Date, only the year and month values are relevant
            _setVisibleCalendar(val) {

            }

            //----- public methods

            //----- getters and setters

            /**
             * @param {Date} val
             */
            set startDate(val) {

            }

            /**
             * @param {Date} val
             */
            set endDate(val) {

            }
        }

        window.customElements.define('calendar-carousel-component', CalendarCarousel);
})()