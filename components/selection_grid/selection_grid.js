(function(){

	const template = document.createElement('template');
	template.innerHTML = 
		`<div class="selection-grid">
			<div class="selection-grid-previous"> Prev </div>
			<div class="selection-grid-content"><!-- grid options here --></div>
			<div class="selection-grid-next"> Next </div>		
		</div>`;

	class SelectionGrid extends HTMLElement{
		
		constructor(){
			super();
		}
		
		connectedCallback(){
			this.appendChild(template.content.cloneNode(true));
			this._state = {
				 options: []
				,selected: null
			};
			
			// elements
			this._el = {
				grid: this.querySelector('.selection-grid')
				,content: this.querySelector('.selection-grid-content')
				,prev: this.querySelector('.selection-grid-previous')
				,next: this.querySelector('.selection-grid-next')
			};
			
			this._render();
			this._addEventListeners();
		}
		
		disconnectedCallback(){
			this._removeEventListeners();
		}
		
		//----- private methods
		
		
		_render(){
			// clear all options
			this._el.content.innerHTML = '';
			
			let optionEl = document.createElement('div');
			optionEl.classList.add('grid-option');
			
			this._state.options.forEach((opt, i) => {
				optionEl.innerText = opt;
				this._el.content.appendChild(optionEl.cloneNode(true));
			});	
		}
		
		_onOptionClick(evt){
			if(evt.target.classList.contains('grid-option')){
				// send a custom event
			}
		}
		
		_addEventListeners(){
			this._onOptionClickBound = this._onOptionClick.bind(this);
			this._el.grid.addEventListener('click', this._onOptionClickBound);
		}
		
		_removeEventListeners(){
			this._el.grid.removeEventListener('click', this._onOptionClickBound);
		}
		
		_setOptions(val){
			this._state.options = [...val];
			this._render();
		}
		
		_clearOptions(){
			this._state.options = [];
		}
		
		//----- getters and setters
		
		get selected(){
			return this._state.selected;
		}
		
		set options(val){
			this._setOptions(val);
		}
	}

	window.customElements.define('selection-grid-component', SelectionGrid);

})()