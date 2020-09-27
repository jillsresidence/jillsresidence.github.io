// This script will be executed at the very last, after the document has been parsed and loaded
'use strict';

(function(){

    let d = document;

    /*****
    hotelres.modalController.init({
        modalBackground: d.getElementById('modalBackground')
       ,modalBtnClose: d.getElementById('modalBtnClose')
   }, true);
   *****/

    hotelres.calendarController.init({
         calStart: d.getElementById('calStart')
        ,calEnd: d.getElementById('calEnd')
        ,calIconCheckIn: d.getElementById('calIconCheckIn')
        ,calIconCheckOut: d.getElementById('calIconCheckOut')
        ,checkInSelect: d.getElementById('checkInSelect')
        ,checkOutSelect: d.getElementById('checkOutSelect')
        ,modalCalendarsContainer: d.getElementById('modalCalendarsContainer')
        ,modalBackground: d.getElementById('modalBackground')
        ,checkInContainer: d.getElementById('checkInContainer')
        ,checkOutContainer: d.getElementById('checkOutContainer')
    });


         
})();

