//  dependencies
//    js/enums.js
//    controllers/modal_controller.js

window.hotelres.calendarController = (function(){
    
    //----- state -----
    let _startDate;
    let _endDate;

    //----- elements -----
    let _calStart;
    let _calEnd;
    let _calIconCheckIn;
    let _calIconCheckOut;
    let _checkInSelect;
    let _checkOutSelect;
    let _checkInContainer;
    let _checkOutContainer;
    let _modalBackground;
    let _modalCalendarsContainer;

    //----- dependencies -----

    //----- private methods -----
    function _initModalCalendars(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();

        _calStart.init({year:year, month:month, selectedStartDate:null, selectedEndDate:null});
        _calEnd.init({year:year, month:month + 1, selectedStartDate:null, selectedEndDate:null});
    }

    function _initCalendarIcons(){
        _calIconCheckOut.value = null;
        _calIconCheckIn.value = null;
    }

    function _addEventListeners(){
        _calStart.addEventListener('dateSelected', onDateSelected);
        _calEnd.addEventListener('dateSelected', onDateSelected);

        _checkInContainer.addEventListener('click', onSelectCheckInDate);
        _checkOutContainer.addEventListener('click', onSelectCheckOutDate);
    }

    function _setStartDate(val) {
        _startDate = val;
        _updateSelectedStartDate();

        if(_endDate) {
            _setEndDate(null);
        }
    }

    function _setEndDate(val) {
        _endDate = val;
        _updateSelectedEndDate();
        _hideModalCalendars();
    }

    function _setDates(val){
        if( ! _startDate){			
            _setStartDate(val);
            
        } else {
            
            if(_startDate > val){
                _setStartDate(val);
            } else {
                _setEndDate(val);
            }
            
        }
    }

    function _dateString(dte) {
        return `${DAY_STRING[dte.getDay()]} ${MONTH_STRING[dte.getMonth()]} ${dte.getDate()} ${dte.getFullYear()}`;
    }

    function _updateSelectedStartDate() {
        _calIconCheckIn.value = _startDate;
        _checkInSelect.innerText = _startDate? _dateString(_startDate) : '';

        _calStart.startDate = _startDate;
        _calEnd.startDate = _startDate;
    }

    function _updateSelectedEndDate() {
        _calIconCheckOut.value = _endDate;
        _checkOutSelect.innerText = _endDate ? _dateString(_endDate) : '';
        _calEnd.endDate = _endDate;
        _calStart.endDate = _endDate;
    }

    function _showModalCalendars() {
        _modalBackground.classList.remove('hidden');
        _modalCalendarsContainer.classList.remove('hidden');
    }

    function _hideModalCalendars() {
        _modalBackground.classList.add('hidden');
        _modalCalendarsContainer.classList.add('hidden');
    }

    //----- event listeners -----

    function onDateSelected(evt){
        let e = evt;
        _setDates(evt.detail);

        let calToUpdate = evt.target === _calStart ? _calEnd : _calStart;
        calToUpdate.setDates({startDate: _startDate, endDate: _endDate});

    }

    function onSelectCheckInDate(evt) {
        _startDate = null;
        _endDate = null;
        _updateSelectedStartDate();
        _updateSelectedEndDate();

        _initModalCalendars();
        _showModalCalendars();
    }

    function onSelectCheckOutDate(evt) {
        _endDate = null;
        _updateSelectedEndDate();
        _showModalCalendars();
    }

    //----- public methods -----
    function init(els){
        _calStart = els.calStart;
        _calEnd = els.calEnd;
        _calIconCheckIn = els.calIconCheckIn;
        _calIconCheckOut = els.calIconCheckOut;
        _checkInSelect = els.checkInSelect;
        _checkOutSelect = els.checkOutSelect;
        _checkInContainer = els.checkInContainer;
        _checkOutContainer = els.checkOutContainer;
        _modalCalendarsContainer = els.modalCalendarsContainer;
        _modalBackground = els.modalBackground;

        _initModalCalendars();
        _initCalendarIcons();
        _addEventListeners();
    }  
    
    return{
        init: init
    };

})();

