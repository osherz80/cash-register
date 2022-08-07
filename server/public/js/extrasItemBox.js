class ExtraItemBox {
    constructor(_extraName,_dstContainer){
        this.extraName = _extraName;
        this.dstContainer = _dstContainer;
    }
    render(){
        let extraBox = document.createElement('div');
            extraBox.setAttribute('id', this.extraName);
            extraBox.classList.add(this.extraName, "menue_item")
            extraBox.innerHTML = this.extraName.replace(/[_]/g, " ");
            extraBox.addEventListener('click', addExtraToItem);
            this.dstContainer.appendChild(extraBox);
    }
}