// gets all direct descendent of ancestor
//let ancestor = document.getElementById('main_menue');
//let descendents = ancestor.children;// switch .children to .getElementsByTagName('*') to get all childrens includes nested childrens



let counter = 0;
let pass = "1234";
localStorage.setItem('isLoggedIn',false);

const checkPass = () => {
    let input = document.getElementById('login_password_input').value
    let a;
    if(input === pass){
        document.getElementById('login_block').classList.toggle("hide",true);
        document.getElementById('all_container').classList.toggle("hide",false);
        document.getElementById('fluid').style.display = "block";
        localStorage.setItem('isLoggedIn',true);
        loggedIn = true;
    }else {
         if(input.includes(' '))input.replace(' ','_');
        // let char;
        // for(let i = 0; i < input.length; i++){
        //     char = input.charAt(i);
        //     if(input.includes(" "))input.replace(input.charAt(i),"_")
        
        console.log(input) 
        console.log(input.includes(' ')) 
    }
    //alert("incorrect password");
} 

let menues = {
    1: ".hot_beverages_menue",
    2: ".juice_menue",
    3: ".iced_menue",
    42069: ".item_instructions"
};

// let items = {

//     hot_item: {
//         capuchino: 15,
//         americano: 14,
//         espreso: 10
//     },

//     juice_item: {
//         fresh_orange_juice: 16,
//         fresh_apple_juice: 14,
//         fresh_pomegranate_juice: 18
//     },

//     iced_item: {
//         slushy_iced_coffe: 19,
//         slushy_diet_iced_coffe: 19,
//         slushy_iced_cohocolate: 19
//     }
// };


let items;
axios.get(`http://localhost:3000/items`)
 .then(response => {
     console.log(response.data);
 });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const toggle = () => {

    let target = document.getElementById(sessionStorage.getItem('mainMenueBox'));
    if (target !== null) {
        target.style.borderBottom = "none";
        target.style.transform = "none";
    }
    
    if (event.target.parentElement.id === 'main_menue') {
        sessionStorage.setItem('mainMenueBox', event.target.id);
        target = document.getElementById(sessionStorage.getItem('mainMenueBox'));//updating the element to the current clicked element from last clicked
        target.style.borderBottom = " 3px solid blue";
        target.style.transform = "scale(1.1)"
    }

    let lastMenue = sessionStorage.getItem('lastMenue');
    if (lastMenue !== null) document.querySelector(lastMenue).classList.toggle("hide", true);

    let cls = event.srcElement.classList[0];
    let element = document.querySelector(menues[cls]);
    if (cls !== "42069") sessionStorage.setItem('lastMenue', menues[cls]);//saving the last visited menu for toggling later
    element.classList.toggle("hide", false);


    // document.getElementById(event.target.id).style.borderBottom = " 3px solid blue";
    // document.getElementById(event.target.id).style.transform = "scale(1.1)"
};

const addToggleToMain = () => {
    let ancestor = document.getElementById('main_menue');
    let descendents = ancestor.children;
    let i, child;
    for (i = 0; i < descendents.length; ++i) {
        child = descendents[i];
        child.addEventListener("click", toggle);
    }
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
                if (key2 === itemId) {
                    itemPrice = items[key][key2];
                    break;
                }
            }
            break;
        }
    }
    if (itemPrice === undefined) return;
    
    let item = document.createElement('div');
    item.setAttribute('id', "item_" + counter);
    item.classList.add("42069", "sum_item");
    
    let itemName = document.createElement('div');
    itemName.setAttribute('id', "item_" + counter + "_name");
    itemName.classList.add("42069", "sum_item_name", "sum_item_property");
    itemName.innerHTML = event.target.innerHTML;
    
    let price = document.createElement('div');
    price.setAttribute('id', "item_" + counter + "_price");
    price.classList.add("42069", "sum_item_price", "sum_item_property");
    price.innerHTML = itemPrice;
    
    let amount = document.createElement('div');
    amount.setAttribute('id', "item_" + counter + "_amount");
    amount.classList.add("42069", "sum_item_amount", "sum_item_property");
    amount.innerHTML = 1;
    
    let itemDetails = document.createElement('div');
    itemDetails.setAttribute('id', "item_" + counter + "_details");
    itemDetails.classList.add("42069", "sum_item_details", "sum_item_property");
    
    item.appendChild(itemName);
    item.appendChild(price);
    item.appendChild(amount);
    item.appendChild(itemDetails);
    item.addEventListener("click", clickedSumItem);
    
    addEventToChildrens(item, "click", toggle);
    addEventToChildrens(item, "click", clickedSumItem);
    
    itemsSum.appendChild(item);
    
    let sum = Number(document.getElementById('span_sum').innerHTML);
    let mult = Number(document.getElementById("item_" + counter + "_amount").innerHTML);
    let totalItems = Number(document.getElementById('total_items_span').innerHTML);
    sum += itemPrice * mult;
    document.getElementById('span_sum').innerHTML = sum;
    totalItems += mult;
    document.getElementById('total_items_span').innerHTML = totalItems;

    
};


// going down the recieved element DOM and finding and adding event listener to the last childs in the dom 
//if the element have no childrens the recived element getting the event listener
//(the event & function to trigger recievd in the function parameters)
// working only on div tags!!!
const addEventToChildrens = (element, event, func) => {
    let childrensArr = element.children;
    if(childrensArr.length === 0)element.addEventListener(event, func);
    let i, child;
    for (i = 0; i < childrensArr.length; i++) {
        child = childrensArr[i];
        if(child.tagName !== "DIV")continue;
        if (child.children.length > 0) addEventToChildrens(child, event, func);
        else child.addEventListener(event, func);
    }
};

// highlighting the last clicked item & saving his id for further use
const clickedSumItem = () => {
    let lastItem = sessionStorage.getItem('lastClickedItemId');
    if (lastItem !== null) document.getElementById(lastItem).style.background = "white";
    
    if (event.target.parentElement.id === "items") {
        sessionStorage.setItem('lastClickedItemId', event.target.id);
    } else {
        sessionStorage.setItem('lastClickedItemId', event.target.parentElement.id);
    }
    
    lastItem = sessionStorage.getItem('lastClickedItemId');
    document.getElementById(lastItem).style.background = "aliceblue";
};

// removing the recived elemnt from the DOM
const deleteElement = (element) => {
    element.parentElement.removeChild(element);
};

// removing the last clicked sum  item & his extras/childrens from the items sum & updating the sum to pay
const removeSumItem = () => {
    let itemId = sessionStorage.getItem('lastClickedItemId');
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
    sessionStorage.removeItem('lastClickedItemId');
    document.querySelector(sessionStorage.getItem('lastMenue')).classList.toggle("hide", false);
    document.getElementById(sessionStorage.getItem('mainMenueBox')).style.borderBottom = " 3px solid blue";
    document.getElementById(sessionStorage.getItem('mainMenueBox')).style.transform = "scale(1.1)";
    document.querySelector(".item_instructions").classList.toggle("hide", true);
};


const addInstructions = () => {
    let id = sessionStorage.getItem('lastClickedItemId');
    let element = document.getElementById(id + "_details");
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
    if (isInside === true) {
        event.target.style.border = "";
        let j = event.target.id;
        let y = id + "_details";
        document.getElementById(y).removeChild(document.getElementById(j));
    } else {
        let inst = document.createElement('div');
        inst.setAttribute("id", event.target.id);
        inst.classList.add("42069");
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
        // inst.classList.add("42069");
        // inst.innerHTML = ">>> " + event.target.innerHTML;
        
        // let divdiv = element.children[element.children.length - 1];
        // divdiv.appendChild(inst);
        
    };
    
addToggleToMain();

if(localStorage.getItem('isLoggedIn')== true){
    document.getElementById('login_block').classList.toggle("hide",true);
        document.getElementById('all_container').classList.toggle("hide",false);
        document.getElementById('fluid').style.display = "block";
}

let descendents = document.getElementById('dynamic_menue').children;
for(let i = 0; i < descendents.length; i++){
    let descendent = descendents[i];
    if(descendent.id === "item_instructions")continue;
    addEventToChildrens(descendent, "click", addItem);
}

descendents = document.getElementById('item_instructions').children;
for(let i = 0; i < descendents.length; i++){
    let descendent = descendents[i];
    if(descendent.id === 'delete_item')continue;
    addEventToChildrens(descendent, "click", addInstructions);
}
document.querySelector(".delete_item").addEventListener("click", removeSumItem);

// menues[5] = "fff";
// console.log(menues);