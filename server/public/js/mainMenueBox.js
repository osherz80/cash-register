class MainMenueBox {
    constructor(_menue) {
        this.menue = _menue;
    }
    render() {
         //creating the menue boxes in the main menue
         let text = this.menue.replace(/[_]/g, " ").replace('menue', '');
         let menueBox = document.createElement('div');
         menueBox.setAttribute('id', this.menue + '_box');
         menueBox.classList.add(this.menue + '_box', 'main_menue_box');
         menueBox.addEventListener('click', mainToggle);
         menueBox.innerHTML = text;

         mainMenue.appendChild(menueBox);  
     }
}