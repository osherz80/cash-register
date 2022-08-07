 class ItemBox{
     constructor(_menues,_menue,_item,_dstContainer){
         this.menues = _menues;
         this.menue = _menue;
         this.item = _item;
         this.dstContainer = _dstContainer;
     }

     render(){
         //creating the items inside each items menue
         let currentItem = document.createElement('div');
         currentItem.setAttribute('id', this.item);
         currentItem.classList.add(this.item, this.menue.replace('menue', 'item'), 'menue_item', this.menues[this.menue][this.item].type);
         currentItem.innerHTML = this.item.replace(/[_]/g, ' ');
         currentItem.addEventListener('click', addItemToSum);
         this.dstContainer.appendChild(currentItem);
     }
 }
