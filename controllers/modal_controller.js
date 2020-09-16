window.hotelres.modalController = (function(){

    //----- state -----
    let _content;
    let _isCloseButtonEnabled;

    //----- elements -----
    let _modalBackground;
    let _modalBtnClose;


    //----- event listeners -----
    function _addEventListeners() {
        if(_modalBtnClose) {
            _modalBtnClose.addEventListener('click', hideModal);
        }
    }

    //----- public methods -----
    function init(els, isCloseButtonEnabled) {
        _modalBackground = els.modalBackground;
        _modalBtnClose = els.modalBtnClose;
        _isCloseButtonEnabled = isCloseButtonEnabled ? isCloseButtonEnabled : false;
        _addEventListeners();
    }

    // param: {el, left, top}
    function showModal(param){
        if(param.el) {
            _content = param.el;
            _content.classList.add('foreground');

            if(param.left && param.top) {
                _content.style.position = 'fixed';
                _content.style.top = param.top;
                _content.style.left = param.left;
            }
        }

        _modalBackground.classList.add('midground');
        _modalBackground.classList.remove('hidden');
    }

    function hideModal() {
        _modalBackground.classList.add('hidden');
        _modalBackground.classList.remove('midground');

        if(_content) {
            _content.classList.remove('foreground');

            if(_content.style.position) {
                _content.style.position = 'auto';
                _content.style.top = '';
                _content.style.left = '';
            }
        }
    }

    return {
         init: init
        ,showModal: showModal
        ,hideModal: hideModal
    }
})();