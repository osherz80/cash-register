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

    hot_item: {
        capuchino: 15,
        americano: 14,
        espreso: 10
    },

    juice_item: {
        fresh_orange_juice: 16,
        fresh_apple_juice: 14,
        fresh_pomegranate_juice: 18
    },

    iced_item: {
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
    if (cls !== "69") localStorage.setItem('lastMenue', menues[cls]);//saving the last visited menu for toggling after deleting an item from the items sum
    element.classList.toggle("hide_menue", false);

    if (document.getElementById(event.target.id).parentElement !== document.getElementById('main_menue')) return;

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

    for (key in items) {
        if (clas === key) {
            for (key2 in items[key]) {
                if (key2 === itemId) itemPrice = items[key][key2]
            }
        }
    }
    if (itemPrice === undefined) return;

    let item = document.createElement('div');
    item.setAttribute('id', "item_" + counter);
    item.classList.add("69", "sum_item");

    let itemName = document.createElement('div');
    itemName.classList.add("69", "sum_item_name", "sum_item_property");
    itemName.innerHTML = event.target.innerHTML;

    let price = document.createElement('div');
    price.setAttribute('id', "item_" + counter + "_price");
    price.classList.add("69", "sum_item_price", "sum_item_property");
    price.innerHTML = itemPrice;

    let amount = document.createElement('div');
    amount.setAttribute('id', "item_" + counter + "_amount");
    amount.classList.add("69", "sum_item_amount", "sum_item_property");
    amount.innerHTML = 1;

    let itemDetails = document.createElement('div');
    itemDetails.setAttribute('id', "item_" + counter + "_details");
    itemDetails.classList.add("69", "sum_item_details", "sum_item_property");

    item.appendChild(itemName);
    item.appendChild(price);
    item.appendChild(amount);
    item.appendChild(itemDetails);
    let i;
    for (i = 0; i < item.children.length; i++) {
        item.children[i].addEventListener("click", toggle);
        item.children[i].addEventListener("click", clickedSumItem);
    }
    itemsSum.appendChild(item);

    let sum = Number(document.getElementById('span_sum').innerHTML);
    let mult = Number(document.getElementById("item_" + counter + "_amount").innerHTML);
    let totalItems = Number(document.getElementById('total_items_span').innerHTML);
    sum += itemPrice * mult;
    document.getElementById('span_sum').innerHTML = sum;
    totalItems += mult;
    document.getElementById('total_items_span').innerHTML = totalItems;


};

const addAddItem = (element) => {
    let childrensArr = element.children;
    let i, child;
    for (i = 0; i < childrensArr.length; i++) {
        child = childrensArr[i];
        if (child.children.length > 0) addAddItem(child);
        else child.addEventListener("click", addItem);
    }
};


const clickedSumItem = () => {
    lastItem = localStorage.getItem('itemIdDelete');
    if (lastItem !== null) document.getElementById(lastItem).style.background = "white";
    localStorage.setItem('itemIdDelete', event.target.parentElement.id);
    document.getElementById(event.target.parentElement.id).style.background = "aliceblue";
};


const deleteElement = (element) => {
    element.parentElement.removeChild(element);
};

const removeSumItem = () => {
    let itemId = localStorage.getItem('itemIdDelete');
    let element = document.getElementById(itemId);
    let price = Number(document.getElementById(itemId + "_price").innerHTML);
    let amount = Number(document.getElementById(itemId + "_amount").innerHTML);
    let sum = Number(document.getElementById('span_sum').innerHTML);
    let totalItems = Number(document.getElementById('total_items_span').innerHTML);
    sum -= price;
    totalItems -= amount;
    deleteElement(element);
    document.getElementById('span_sum').innerHTML = sum;
    document.getElementById('total_items_span').innerHTML = totalItems;
    localStorage.removeItem('itemIdDelete');
    document.querySelector(localStorage.getItem('lastMenue')).classList.toggle("hide_menue", false);
    document.querySelector(".item_instructions").classList.toggle("hide_menue", true);
};

document.querySelector(".delete_item").addEventListener("click", removeSumItem);

const addInstructions = () => {
    let id = localStorage.getItem('itemIdDelete');
    let element = document.getElementById(id+"_details");
    let i;
    let isInside = null;
    let num = Number(event.target.classList[0]);
    let sum = Number(document.getElementById('span_sum').innerHTML);
    for (i = 0; i < element.children.length; i++) {
        let child = element.children[i]
        if (child.id === event.target.id) {
            sum -= num; 
    document.getElementById('span_sum').innerHTML = sum;
            element.removeChild(child);
            return;
        }
    }
    if(isInside === true){
event.target.style.border = "";
            let j = event.target.id;
            let y = id + "_details";
            document.getElementById(y).removeChild(document.getElementById(j));
    }else{
            let inst = document.createElement('div');
    inst.setAttribute("id", event.target.id);
    inst.classList.add("69");
    inst.innerHTML = ">>> " + event.target.innerHTML;

    element.appendChild(inst);

    
    sum += num; 
    document.getElementById('span_sum').innerHTML = sum;
    //let divdiv = element.children[element.children.length - 1];
        }
    // if (event.target.style.border == "") event.target.style.border = "2px solid blue"
    // else {
    //     event.target.style.border = "";
    //     let j = event.target.id;
    //     let y = id + "_details";
    //     document.getElementById(y).removeChild(document.getElementById(j));
    //     return;
    // }

    // let inst = document.createElement('div');
    // inst.setAttribute("id", event.target.id);
    // inst.classList.add("69");
    // inst.innerHTML = ">>> " + event.target.innerHTML;

    // let divdiv = element.children[element.children.length - 1];
    // divdiv.appendChild(inst);

};