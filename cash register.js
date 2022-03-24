// gets all direct descendent of ancestor
let ancestor = document.getElementById('main_menue');
let descendents = ancestor.children;// switch .children to .getElementsByTagName('*') to get all childrens includes nested childrens
let counter = 0;



const menues = {
    1: ".hot_beverages_menue",
    2: ".juice_menue",
    3: ".iced_menue",
    69: ".item_instructions"
};

const items = {
    
    hot_item:{
      capuchino: 15,
      americano: 14,
      espreso: 10
    },
    
    juice_item:{
        fresh_orange_juice: 16,
        fresh_apple_juice: 14,
        fresh_pomegranate_juice: 18
    },
        
    iced_item:{
        slushy_iced_coffe: 19,
        slushy_diet_iced_coffe: 19,
        slushy_iced_cohocolate: 19
    }
};

const toggle = () => {
    let i, child;
    for (key in menues) {
        document.querySelector(menues[key]).classList.toggle("hide_menue", true);
    }

    for (i = 0; i < descendents.length; ++i) {
        child = descendents[i];
        child.style.borderBottom = "none";
        child.style.transform = "none";
    }

    let cls = event.srcElement.classList[0];
    let element = document.querySelector(menues[cls]);
    element.classList.toggle("hide_menue", false);
    
    document.getElementById(event.target.id).style.borderBottom = " 3px solid blue";
    document.getElementById(event.target.id).style.transform = "scale(1.1)"
};

const addToggle = () => {
    let i, child;
    for (i = 0; i < descendents.length; ++i) {
        child = descendents[i];
        child.addEventListener("click", toggle);
    }
    addAddItem(document.getElementById('dynamic_menue'));
};



const addItem = () => {
    counter++;
    let itemsSum = document.getElementById('items');
    let clas = event.srcElement.classList[0];
    let itemId = event.srcElement.id;
    let itemPrice;

    for(key in items){
        if(clas === key){
            for(key2 in items[key]){
                if(key2 === itemId)itemPrice = items[key][key2]
            }
        }
    }
    if(itemPrice === undefined)return;

    let item = document.createElement('div');
    item.setAttribute('id',"item" + counter);
    item.classList.add("69","sum_item");

    let itemName = document.createElement('div');
    itemName.classList.add("69","sum_item_name","sum_item_property");
    itemName.innerHTML = event.target.innerHTML;

    let price = document.createElement('div');
    price.classList.add("69","sum_item_price","sum_item_property");
    price.innerHTML = itemPrice;

    let amount = document.createElement('div');
    amount.setAttribute('id',"amount");
    amount.classList.add("69","sum_item_amount","sum_item_property");
    amount.innerHTML = 1;

    item.appendChild(itemName);
    item.appendChild(price);
    item.appendChild(amount);
    let i;
    for(i = 0; i < item.children.length; i++){
        item.children[i].addEventListener("click",toggle);
        item.children[i].addEventListener("click",saveId);
    }
    itemsSum.appendChild(item);

    let sum = Number(document.getElementById('span_sum').innerHTML);
    let mult = Number(document.getElementById('amount').innerHTML);
    let totalItems = Number(document.getElementById('total_items_span').innerHTML);
    sum += itemPrice * mult;
    document.getElementById('span_sum').innerHTML = sum;
    totalItems += mult;
    document.getElementById('total_items_span').innerHTML = totalItems;


};

const addAddItem = (element) => {
    let childrensArr = element.children;
    let i, child;
    for(i = 0; i < childrensArr.length; i++){
        child = childrensArr[i];
        if(child.children.length > 0)addAddItem(child);
        else child.addEventListener("click",addItem);
    }
};

let idToSave;

const saveId = () => {
  idToSave = event.target.parentElement.id;
};


const deleteItem = () => {
    //let subtract = document.getElementById
    document.getElementById(idToSave).remove();
};

document.querySelector(".delete_item").addEventListener("click",deleteItem);