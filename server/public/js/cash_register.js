// gets all direct descendent of ancestor
//let ancestor = document.getElementById('main_menue');
//let descendents = ancestor.children;// switch .children to .getElementsByTagName('*') to get all childrens includes nested childrens
let counter = 0;
const fluid = document.getElementById('fluid');
const loaderContainer = document.getElementById('loader_container');
const mainMenue = document.getElementById('main_menue');
const dynamicMenue = document.getElementById('dynamic_menue');
let extrasMenue;
let foodExtrasContainer;
let drinkExtrasContainer;
const itemsSum = document.getElementById('items');
const sumDisp = document.getElementById('sum_display');
const itemsCounter = document.getElementById('total_items_display');
const adminLightBox = document.getElementById('admin_light_box');
const allContainer = document.getElementById('all_container');
const adminLoginBlock = document.getElementById('login_block');
const adminMenue = document.getElementById('admin_menue');
const secondaryContainer = document.getElementById('secondary_container');
const menuesManageBlock = document.getElementById('manage_menue_block');
const adminsManageBlock = document.getElementById('manage_admins_block');
const addMenueBlock = document.getElementById('add_menue_block');
const addItemBlock = document.getElementById('add_item_block');
const deleteMenueBlock = document.getElementById('delete_menue_block');
const deleteItemBlock = document.getElementById('delete_item_block');
let addItemSelect = document.getElementById('select_menue_to_update');
let deletMenueSelect = document.getElementById('select_menue_to_delete');
let deletItemMenueSelect = document.getElementById('select_menue_to_delete_item');
let deletItemSelect = document.getElementById('select_item_to_delete');
const addExtraBlock = document.getElementById('add_extra_block');
const deleteExtraBlock = document.getElementById('delete_extra_block');
let selectExtraType = document.getElementById('select_extra_type');
let deleteExtraMenueSelect = document.getElementById('select_menue_to_delete_extra');
let selectExtraToDelete = document.getElementById('select_extra_to_delete');
const generalLightBox = document.querySelector('.general_light_box');
const generalItemMenue = document.querySelector('.general_item_menue');

let menues;
let extras;
let sumToPay = 0;
let totalCost = 0;
const PORT = 3000;
const MY_URL = `http://localhost:${PORT}`;

// menues = {
//     hot_beverages_menue: {
//         capuchino: 15,
//         americano: 14,
//         espreso: 10,
//     },
//     juice_menue: {
//         fresh_orange_juice: 16,
//         fresh_apple_juice: 14,
//         fresh_pomegranate_juice: 18,
//     },
//     iced_menue: {
//         slushy_iced_coffe: 19,
//         slushy_diet_iced_coffe: 19,
//         slushy_iced_cohocolate: 19,
//     },
//     sandwiches_menue:{
//         omelet_sandwich:31,
//         avocado_sandwich:31,
//         tuna_sandwich:31
//     }
// }


// let a
// let b
// for (key in extras) {
//     a = key;
//     b = extras[key];
//     let c = a.replace(/[_ ]/, " ");
//     console.log(c);
//     // c = c.replace(/[^a-zA-Z0-9 ]/g, "");
//     c = c.replace(/[_]/g, "");
//     console.log(a, b, c);
// }




// axios.post(`${MY_URL}/post-menues`,{
//     menues
// })
// .then(response => {
//     console.log(menues);
// })
// .catch(error => {
//     console.log(`data POST failed ${error}`);
// })

// axios.post(`${MY_URL}/post-extras`,{
//     extras
// })
// .then(response => {
//     console.log(extras);
// })
// .catch(error => {
//     console.log(`data POST failed ${error}`);
// })


// axios.post(`${MY_URL}/post-admins`, {
//     admins
// })
//     .then(response => {
//         console.log(admins);
//     })
//     .catch(error => {
//         console.log(`admins POST failed ${error}`);
//     })

// .then((response) => {
//     let food = { type: "food" }
//     Object.assign(menues.hot_beverages_menue, { type: "drink" })
//     Object.assign(menues.iced_menue,{ type: "drink" })
//     Object.assign(menues.juice_menue,{ type: "drink" })
//     Object.assign(menues.sandwiches_menue,food)
//     for (key in menues) {
//         for (key2 in menues[key]) {
//             if(key2 == 'type')continue;
//             let p = menues[key][key2];
//             menues[key][key2] = {
//                 price: p,
//                 type: menues[key].type
//             }

//         }
//     }
//     axios.post(`${MY_URL}/update-menues`, {
//         menues
//     })

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get(`${MY_URL}/all-products`);
        menues = res.data.menues[0].menues;
        extras = res.data.extras[0].extras;
        createProductsMenues();
        createExtras();
        extrasMenue = document.getElementById('item_instructions_menue');
        foodExtrasContainer = document.getElementById('food_extras_container');
        drinkExtrasContainer = document.getElementById('drink_extras_container');
        CreateAdminMenueSelects();
        sessionStorage.clear();
        getUsdToIlsRate();
        fluid.classList.toggle('hide', false);
        loaderContainer.classList.toggle('hide', true);
    } catch (error) {
        console.log(`data GET failed ${error}`);
    }
})


let usdToIlsRate;
const MS_IN_HOUR = 100 * 60 * 60;
const HOURS_TO_UPDATE_RATE = 6;
const getUsdToIlsRate = async () => {
    try {
        const res = await axios.get(`https://api.frankfurter.app/latest?amount=1&from=USD&to=ILS`)
        usdToIlsRate = res.data.rates.ILS;
    } catch (err) {
        console.log(err);
    }
    setTimeout(getUsdToIlsRate, MS_IN_HOUR * HOURS_TO_UPDATE_RATE);
}



const addMenue = async () => {
    let menueType = document.querySelectorAll('[name="menueType"]');
    for (let i = 0; i < menueType.length; i++) {
        if (menueType[i].checked) {
            menueType = menueType[i].value;
            break;
        }
    }
    let newMenue = document.getElementById("menue_name_input");
    let newMenueItem = document.getElementById('new_menue_item_name_input');
    let newMenueItemPrice = document.getElementById('new_menue_item_price_input');
    if (newMenue.value.length == 0) {
        swal({
            title: "menu name missing",
            text: "insert new menue name",
            icon: "error",
            button: "Ok",
        });
        return;
    } else {
        newMenue = newMenue.value.replace(/[' ']/g, '_') + '_menue';
    }

    if (newMenueItem.value.length == 0) {
        swal({
            title: 'new item name missing',
            text: 'insert new item name',
            icon: 'error',
            buttons: 'OK'
        })
        return;
    } else newMenueItem = newMenueItem.value.replace(/[' ']/g, '_');

    if (Number(newMenueItemPrice.value) < 0 || newMenueItemPrice.value === '') {
        swal({
            title: 'wrong item price',
            text: 'item price must be present and greater than zero',
            icon: 'error',
            buttons: 'Ok'
        })
        return;
    } else newMenueItemPrice = Number(newMenueItemPrice.value);
    menues[newMenue] = {
        [newMenueItem]: {
            "price": newMenueItemPrice,
            "type": menueType
        },
        "type": menueType
    };
    try {
        const res = await axios.post(`${MY_URL}/update-menues`, { menues })
        if (res.statusText === "OK") {
            swal({
                title: 'success',
                text: 'menue added succesfully',
                icon: 'success',
                buttons: 'YAY',
            })
            createProductsMenues();
            CreateAdminMenueSelects();
        }
    } catch (error) {
        swal({
            title: 'adding new menue failed',
            text: error,
            icon: 'error',
            buttons: 'oof',
        })
    }
}

const deleteMenue = async () => {
    delete menues[document.getElementById('select_menue_to_delete').value];
    try {
        const result = await axios.post(`${MY_URL}/update-menues`, { menues })

        if (result.statusText === "OK") {
            createProductsMenues();
            CreateAdminMenueSelects();
            swal({
                title: 'success',
                text: 'deleted menu succesfully',
                icon: 'success',
                buttons: '😄'
            })
        }
    }
    catch (error) {
        swal({
            title: 'menu delete failed',
            text: error,
            icon: 'error',
            buttons: '😫'
        })
    }
}

const addNewItemToMenue = async () => {

    let newItemName = document.getElementById("item_name_input");
    let newItemPrice = document.getElementById('item_price_input');
    let menue = document.getElementById('select_menue_to_update').value;
    if (newItemName.value.length == 0) {
        alert("insert new item name");
        newItemName.focus();
        return;
    } else newItemName = newItemName.value.replace(/[' ']/g, '_');

    if (Number(newItemPrice.value) < 0) {
        alert("insert valid new item price");
        newItemPrice.focus();
        return;
    } else newItemPrice = Number(newItemPrice.value);
    menues[menue][newItemName] = { price: newItemPrice, type: menues[menue].type };
    try {
        const result = await axios.post(`${MY_URL}/update-menues`, { menues });
        if (result.statusText === "OK") {
            console.log('item res', result);
            alert('item added succesfully');
            createProductsMenues();

        }
    } catch (error) {
        console.log(`adding item failed ${error}`);
    }
}

const deleteItemFromMenue = async () => {
    if (Object.keys(menues[deletItemMenueSelect.value]).length === 1) {
        delete menues[deletItemMenueSelect.value];
    }
    else {
        delete menues[deletItemMenueSelect.value][deletItemSelect.value];
    }

    try {
        const result = await axios.post(`${MY_URL}/update-menues`, { menues })
        if (result.statusText === "OK") {
            console.log('item delete res', result);
            alert('item deleted succesfully');
            createProductsMenues();
        }
    } catch (error) {
        console.log(`delete item failed ${error}`);
    }
}

const addExtraToMenue = async () => {
    if (document.getElementById('extra_name_input').value.length === 0) {
        alert("insert new extra name");
        document.getElementById('extra_name_input').focus();
        return;
    }

    if (Number(document.getElementById('extra_price_input').value) < 0) {
        alert("insert valid new extra price");
        document.getElementById('extra_price_input').focus();
        return;
    }

    extras[document.getElementById('select_extra_type').value][document.getElementById('extra_name_input').value] =
        Number(document.getElementById('extra_price_input').value);

    try {
        const result = await axios.post(`${MY_URL}/update-extras`, { extras })
        if (result.statusText === "OK") {
            console.log('add extra res', response);
            alert('extra added succesfully');
            createExtras();
        }
    } catch (error) {
        console.log(`extra addition failed ${error}`);
    }
}

const deleteExtraFromMenue = async () => {
    delete extras[deleteExtraMenueSelect.value][selectExtraToDelete.value];
    try {
        const result = await axios.post(`${MY_URL}/update-extras`, { extras })
        if (result.statusText === "OK") {
            console.log('delete extra res', response);
            alert('extra deleted succesfully');
            createExtras();
        }
    } catch (error) {
        console.log(`extra delete failed ${error}`);
    }
}

const addAdmin = async () => {
    if (document.getElementById('new_user_name_input').value.length <= 3) {
        alert('username length must be greater than 3');
        return;
    }

    if (!document.getElementById('new_email_input').value.includes("@")) {
        alert("email must be valid")
        return;
    }

    if (document.getElementById('new_password_input').value.length < 8) {
        alert('Password length must be at least 8');
        return;
    }

    try {
        const result = await axios.post(`${MY_URL}/add-admin`, {
            userName: document.getElementById('new_user_name_input').value,
            password: document.getElementById('new_password_input').value,
            email: document.getElementById('new_email_input').value
        })

        if (result.statusText === "OK") {
            if (response.data.code === 11000) {
                console.log(response.data)
                alert('email already exist in the system admin not added');
            } else {
                alert('admin added succesfully');
            }
        }
    } catch (err) {
        console.log('admin addition failed', err);
        alert(err.response.data[0].message);
    }
}

const deleteAdmin = async () => {
    try {
        const result = await axios.post(`${MY_URL}/delete-admin`, {
            password: document.getElementById('delete_password_input').value,
            email: document.getElementById('delete_email_input').value,
        })

        if (result.statusText === "OK") {
            if (result.data.adminDeleted) {
                alert('admin deleted succesfully');
            }
            else alert(response.data.message);
        }
    } catch (err) {
        console.log('admin delete failed', err);
        alert(err.response.data[0].message);
    }
}

const checkLogin = async () => {
    adminMenuesStack.push('login_block');
    try {
        const result = await axios.post(`${MY_URL}/admin-authentication`, {
            password: document.getElementById('login_password_input').value,
            email: document.getElementById('login_email_input').value
        });
        if (result.statusText === "OK") {
            if (result.data.authorized) {
                adminLoginBlock.classList.toggle("hide", true);
                adminMenue.classList.toggle("hide", false);
                document.getElementById('admin_user_name').replaceChildren(result.data.adminName);
                document.getElementById('login_password_input').value = '';
                document.getElementById('login_email_input').value = '';
                sessionStorage.setItem('isLoggedIn', true);
                createLogOutBtn();
            } else alert(result.data.reason)
            console.log('is admin?', result.data.authorized);
        }
    } catch (error) {
        console.log(`admin authentication GET failed ${error}`);
    }
}

const createLogOutBtn = () => {
    let logOutBtn = document.createElement('button');
    logOutBtn.id = "admin_log_out_btn";
    logOutBtn.classList.add(logOutBtn.id, 'admin_Button');
    logOutBtn.innerText = 'log out'
    logOutBtn.addEventListener('click', logOutFunc)
    document.querySelector('.logout_btn_container').appendChild(logOutBtn);
}

const logOutFunc = () => {
    document.getElementById('admin_user_name').replaceChildren();
    goBackBack();
    sessionStorage.removeItem('isLoggedIn');
    logOutBtn.remove();
}


const changeSearcInputType = () => {
    document.querySelector('.to_date_search').classList.toggle('hide', true);

    if (document.querySelector('.search_records_select').value === 'date') {
        document.querySelector('.value_to_search_input').type = document.querySelector('.search_records_select').value;
        document.querySelector('.search_record_label').replaceChildren('from date:');
        document.querySelector('.to_date_search').classList.toggle('hide', false);
    } else {
        document.querySelector('.value_to_search_input').type = 'text';
        document.querySelector('.search_record_label').replaceChildren('value:');
    }
}

const searchRecord = async (/*pageFactor*/) => {
    document.querySelector('.recieved_records_container').replaceChildren();
    let field = document.querySelector('.search_records_select').value;
    let value = document.querySelector('.value_to_search_input').value;

    if (document.querySelector('.search_records_select').value === 'date') {
        field = 'createdAt';
        value = {
            $gte: new Date(document.querySelector('.value_to_search_input').value).toISOString(),
            $lt: new Date(document.querySelector('.to_date_input').value).toISOString(),
        }
    }
    try {
        const result = await axios.post(`${MY_URL}/search-record`, {
            // pageFactor,
            field,
            value
        })
        if (result.statusText === "OK") {
            result.data.forEach(record => {
                let newRecord = new Record(record);
                document.querySelector('.recieved_records_container').appendChild(newRecord.createRecord());
            })
        }
    } catch (err) {
        console.log(err);
    }
}

//adding options to a select element from the recieved object(the options values are the object keys)
const createSelect = (select, fromMenue) => {
    for (key in fromMenue) {
        let option = document.createElement('option');
        option.id = key + '_option';
        option.classList.add(key + '_option');
        option.value = key;
        option.innerHTML = key.replace(/[_]/g, ' ');
        select.appendChild(option);
    }
}

//adding options to the destination select element from the recieved object by iterating the source select options and-
//use them as object keys (the options values are the object keys values)
//the destination select element reseting to empty every function call then the function adding the options 
const createSelectFromSelect = (selectSrc, selectDst, fromMenue) => {
    selectDst.replaceChildren();
    for (item in fromMenue[selectSrc.value]) {
        let option = document.createElement('option');
        option.id = item + '_option';
        option.classList.add(item + '_option');
        option.value = item;
        option.innerHTML = item.replace(/[_]/g, ' ');
        selectDst.appendChild(option);
    }
}

// creating the select for the admin add/remove menue/item/extra
const CreateAdminMenueSelects = () => {
    deletMenueSelect.replaceChildren();
    
    createSelect(deletItemMenueSelect, menues);
    createSelectFromSelect(deletItemMenueSelect, deletItemSelect, menues);
    deletItemMenueSelect.addEventListener('change', () => {
        createSelectFromSelect(deletItemMenueSelect, deletItemSelect, menues);
        document.getElementById('type_option').remove();
    })

    createSelect(deletMenueSelect, menues);
    createSelect(addItemSelect, menues);

    createSelect(selectExtraType, extras);
    createSelect(deleteExtraMenueSelect, extras);
    createSelectFromSelect(deleteExtraMenueSelect, selectExtraToDelete, extras);
    deleteExtraMenueSelect.addEventListener('change', () => {
        createSelectFromSelect(deleteExtraMenueSelect, selectExtraToDelete, extras);
    })

    document.getElementById('type_option').remove();

}




// creating the menues dynamicly inside the dynamic menue and adding the items to a container for each menue
const createProductsMenues = () => {
    document.getElementById('main_menue').replaceChildren();

    for (menue in menues) {
        //creating the menue boxes in the main menue
        let nwMainMenueBox = new MainMenueBox(menue);
        nwMainMenueBox.render();

        //creating the items menues inside the dynamic menue
        let itemsMenue = document.createElement('div');
        itemsMenue.setAttribute('id', menue);
        itemsMenue.classList.add(menue, 'items_menue', 'hide');

        // creating the items container inside the menue div
        let itemsContainer = document.createElement('div');
        itemsContainer.setAttribute('id', menue.replace('menue', 'container'));
        itemsContainer.classList.add(menue.replace('menue', 'container'), 'menue_items_container');
        for (item in menues[menue]) {
            //creating the items inside each items menue
            if (item === "type") continue;
            else {
                let nwItemBox = new ItemBox(menues, menue, item, itemsContainer);
                nwItemBox.render();
            }
            itemsMenue.appendChild(itemsContainer);
            dynamicMenue.appendChild(itemsMenue);
        }
    }
}



const createExtras = () => {//(dynamic menue-(extras menue-(extras general container-(extras container by type-(extras items)))))
    if (document.getElementById('item_instructions_menue')) {
        document.getElementById('item_instructions_menue').remove();
    }

    const extrasMenuenw = document.createElement('div');//creating the extras div for the dynamic menue
    extrasMenuenw.setAttribute('id', 'item_instructions_menue');
    extrasMenuenw.classList.add('item_instructions_menue', 'items_menue', 'hide');

    for (key in extras) {
        let extra = document.createElement('div');//creating extras container inside the general container by extras type(expandable)
        extra.id = key + "_container";
        extra.classList.add(key + '_container', 'menue_items_container', 'extras_container', 'hide');
        for (key2 in extras[key]) {
            let nwExtraItemBox = new ExtraItemBox(key2, extra)
            nwExtraItemBox.render();
        }
        extrasMenuenw.appendChild(extra);
    }

    const extrasFooter = document.createElement('div');
    extrasFooter.id = 'extras_footer';
    extrasFooter.classList.add('extras_footer');
    extrasFooter.appendChild(createDeleteItemBtn());
    extrasFooter.appendChild(createItemCommentSection());

    extrasMenuenw.appendChild(extrasFooter);
    dynamicMenue.appendChild(extrasMenuenw);
}

const createDeleteItemBtn = () => {
    const deleteExtraBTN = document.createElement('div');
    deleteExtraBTN.id = 'delete_item_btn';
    deleteExtraBTN.classList.add('delete_item_btn', 'menue_item');
    deleteExtraBTN.innerHTML = 'delete item';
    deleteExtraBTN.addEventListener('click', removeSumItem);
    return deleteExtraBTN;
}

const createItemCommentSection = () => {
    const itemCommentsDiv = document.createElement('div');
    itemCommentsDiv.id = 'item_comments_div';
    itemCommentsDiv.classList.add('item_comments_div');

    const itemCommentsInput = document.createElement('input');
    itemCommentsInput.id = 'item_comments_input';
    itemCommentsInput.classList.add('item_comments_input', 'general_input');
    itemCommentsInput.placeholder = 'comment';

    const addCommentBtn = document.createElement('button');
    addCommentBtn.id = ('add_comment_btn');
    addCommentBtn.classList.add('add_comment_btn', 'system_btn');
    addCommentBtn.innerHTML = 'add comment';
    addCommentBtn.addEventListener('click', addItemComment);

    itemCommentsDiv.appendChild(addCommentBtn);
    itemCommentsDiv.appendChild(itemCommentsInput);

    return itemCommentsDiv;
}

const addItemComment = () => {
    let commentInput = document.getElementById('item_comments_input');
    if (commentInput.value.length === 0) return;
    let id = sessionStorage.getItem('lastClickedItemId');
    let detailsBlock = document.getElementById(id + "_details");
    let commentDiv = document.createElement('div');
    commentDiv.id = id + "_comment_" + counter;
    commentDiv.classList.add(commentDiv.id, "item_comment");
    commentDiv.innerHTML = commentInput.value;
    commentInput.value = null;
    commentDiv.addEventListener("click", changeItemComment);
    counter++;
    detailsBlock.appendChild(commentDiv);
}

const changeItemComment = () => {
    dynamicMenue.classList.toggle('hide', true);
    document.getElementById('change_comment_light_box').classList.toggle('hide', false);
    sessionStorage.setItem('lastClickedCommentId', event.target.id);
    let oldComment = document.getElementById(sessionStorage.getItem('lastClickedCommentId'));
    let newComment = document.getElementById('change_comment_input');
    newComment.value = oldComment.innerHTML;
}

//toggeling between menues and highlighting the current menue main menue box 
const mainToggle = () => {
    dynamicMenue.classList.toggle('hide', false);
    shutAllMenues();

    if (sessionStorage.getItem('lastMenueId')) {
        document.getElementById(sessionStorage.getItem('lastMenueId')).classList.toggle('hide', true);
    }

    let target = event.target;
    target.style.borderBottom = " 3px solid wheat";
    target.style.transform = "scale(1.1)";

    let menueKey = target.id.replace('_box', '');
    let currentMenue = document.getElementById(menueKey);
    currentMenue.classList.toggle('hide', false);
    sessionStorage.setItem('lastMenueId', currentMenue.id);
};

const shutAllMenues = () => {
    const dynamicMenuesArr = document.getElementById('dynamic_menue').children;

    for (let i = 0; i < dynamicMenuesArr.length; i++) {
        dynamicMenuesArr[i].classList.toggle('hide', true);
    }

    const menuesBoxesArr = document.getElementById('main_menue').children;

    for (let i = 0; i < menuesBoxesArr.length; i++) {
        menuesBoxesArr[i].style.borderBottom = "none"
        menuesBoxesArr[i].style.transform = "none"
    }
}

const addItemToSum = () => {
    for (key1 in menues) {
        if (key1 === event.target.parentElement.parentElement.id) {
            for (key2 in menues[key1]) {
                if (key2 === event.target.id) {
                    counter++;
                    let nwSumItem = new SumItem(event.target.innerHTML,
                        menues[key1][key2].price,
                        menues[key1][key2].type, counter);
                    nwSumItem.render();
                    let mult = Number(document.getElementById("item_" + counter + "_amount").innerHTML);
                    let totalItems = Number(itemsCounter.innerHTML);
                    sumToPay += menues[key1][key2].price * mult;
                    totalCost = sumToPay;
                    sumDisp.replaceChildren(sumToPay);
                    totalItems += mult;
                    itemsCounter.replaceChildren(totalItems);
                    break;
                }
            }
            break;
        }
    }
};


// going down the recieved element DOM and finding and adding event listener to the last childs in the dom 
//if the element have no childrens the recived element getting the event listener
//(the event & function to trigger recievd in the function parameters)
// working only on div tags!!!
const addEventToChildrens = (element, event, func) => {
    let childrensArr = element.children;
    if (childrensArr.length === 0) element.addEventListener(event, func);
    let i, child;
    for (i = 0; i < childrensArr.length; i++) {
        child = childrensArr[i];
        if (child.tagName !== "DIV") continue;
        if (child.children.length > 0) addEventToChildrens(child, event, func);
        else child.addEventListener(event, func);
    }
};

// highlighting the last clicked item & saving his id for further use
const clickedSumItem = () => {
    if (sessionStorage.getItem('lastClickedItemId')) {
        document.getElementById(sessionStorage.getItem('lastClickedItemId')).style.background = "white";
    }

    if (event.target.parentElement.id === "items") {
        sessionStorage.setItem('lastClickedItemId', event.target.id);
    } else {
        let checkId = event.target.parentElement.id
        while (document.getElementById(checkId).parentElement.id !== "items") {
            checkId = document.getElementById(checkId).parentElement.id;
        }
        sessionStorage.setItem('lastClickedItemId', checkId);
    }

    document.getElementById(sessionStorage.getItem('lastClickedItemId')).style.background = "aliceblue";
    document.getElementById('item_instructions_menue').classList.toggle('hide', false);

    document.getElementById(sessionStorage.getItem('lastClickedItemId')).classList
        .forEach((cls) => {
            if (cls === "food") {
                document.getElementById('food_extras_container').classList.toggle('hide', false);
                document.getElementById('drink_extras_container').classList.toggle('hide', true);
            }
            else if (cls === "drink") {
                document.getElementById('food_extras_container').classList.toggle('hide', true);
                document.getElementById('drink_extras_container').classList.toggle('hide', false);
            }
            else if (cls.includes("general")) {
                document.getElementById('food_extras_container').classList.toggle('hide', true);
                document.getElementById('drink_extras_container').classList.toggle('hide', true);
            }
        })

    document.getElementById(sessionStorage.getItem('lastMenueId')).classList.toggle('hide', true);
    document.getElementById(sessionStorage.getItem('lastMenueId') + '_box').style.border = "none";
    document.getElementById(sessionStorage.getItem('lastMenueId') + '_box').style.transform = "none";
};

const addExtraToItem = () => {
    let id = sessionStorage.getItem('lastClickedItemId');
    let detailsBlock = document.getElementById(id + "_details");
    let extraCost = findExtraPrice(event.target.id);
    let extraToCheck = isExtraExist(event.target.id);

    if (extraToCheck) {
        sumToPay -= extraCost;
        totalCost = sumToPay;
        sumDisp.innerHTML = sumToPay;
        detailsBlock.removeChild(extraToCheck);
    } else {
        let extra = document.createElement('div');
        extra.id = event.target.id;
        extra.innerHTML = ">>> with " + event.target.innerHTML;
        detailsBlock.appendChild(extra);
        sumToPay += extraCost;
        totalCost = sumToPay;
        sumDisp.innerHTML = sumToPay;
    }
}

const findExtraPrice = (extraName) => {
    let extraCost = 0;
    let extraFound = false;

    for (key in extras) {
        for (key2 in extras[key]) {
            if (key2 === extraName) {
                extraCost = extras[key][key2];
                extraFound = true;
                break;
            }
        }
        if (extraFound) break;
    }

    return extraCost
}

const isExtraExist = (extraName) => {
    let detailsBlock = document.getElementById(sessionStorage.getItem('lastClickedItemId') + "_details");
    let isExist = false;
    for (i = 0; i < detailsBlock.children.length; i++) {
        let child = detailsBlock.children[i]

        if (child.id === extraName) {
            isExist = true;
            break;
        }
    }

    return isExist;
}

const editComment = () => {
    let oldComment = document.getElementById(sessionStorage.getItem('lastClickedCommentId'));
    let newComment = document.getElementById('change_comment_input');
    oldComment.innerHTML = newComment.value;
    document.getElementById('change_comment_light_box').classList.toggle('hide', true);
    dynamicMenue.classList.toggle('hide', false);
}

const deleteComment = () => {
    document.getElementById(sessionStorage.getItem('lastClickedCommentId')).remove();
    sessionStorage.removeItem('lastClickedCommentId')
    document.getElementById('change_comment_light_box').classList.toggle('hide', true);
    dynamicMenue.classList.toggle('hide', false);
}

const exitCommentEditing = () => {
    document.getElementById('change_comment_light_box').classList.toggle('hide', true);
    dynamicMenue.classList.toggle('hide', false);
}

// removing the last clicked sum item & his extras/childrens from the items sum & updating the sum to pay
const removeSumItem = () => {
    const extrasArr = document.getElementById(sessionStorage.getItem('lastClickedItemId') + '_details').children;
    let extrasTotalCost = 0;
    let extraFound;
    if (extrasArr.length >= 1) {
        for (let i = 0; i < extrasArr.length; i++) {
            extraFound = false;
            for (key in extras) {
                for (key2 in extras[key]) {
                    if (key2 === extrasArr[i].id) {
                        extrasTotalCost += extras[key][key2];
                        extraFound = true;
                        break;
                    }
                }
                if (extraFound) break;
            }
        }
    }

    sumToPay -= Number(document.getElementById(sessionStorage.getItem('lastClickedItemId') + "_price").innerHTML);
    sumToPay -= extrasTotalCost;
    itemsCounter.innerHTML = (Number(itemsCounter.innerHTML) -
        Number(document.getElementById(sessionStorage.getItem('lastClickedItemId') + "_amount").innerHTML));
    document.getElementById(sessionStorage.getItem('lastClickedItemId')).remove();
    totalCost = sumToPay;
    sumDisp.innerHTML = sumToPay;
    sessionStorage.removeItem('lastClickedItemId');
    document.getElementById('item_instructions_menue').classList.toggle("hide", true);
    document.getElementById(sessionStorage.getItem('lastMenueId')).classList.toggle("hide", false);
    document.getElementById(sessionStorage.getItem('lastMenueId') + '_box').style.borderBottom = " 3px solid wheat";
    document.getElementById(sessionStorage.getItem('lastMenueId') + '_box').style.transform = "scale(1.1)";;
};

const openAddName = () => {
    allContainer.classList.toggle('hide', true);
    generalLightBox.classList.toggle('hide', false);
    document.querySelector(".customer_add_name_div").classList.toggle("hide", false);
    document.querySelector('.customer_name_input').innerHTML = document.querySelector('.customer_name_container').innerHTML;
}

const addName = () => {
    document.querySelector('.customer_name_container').innerHTML = document.querySelector('.customer_name_input').value;
    document.querySelector(".customer_add_name_div").classList.toggle("hide", true);
    generalLightBox.classList.toggle('hide', true);
    allContainer.classList.toggle('hide', false);
}

const openGeneralItemMenue = () => {
    shutAllMenues();
    generalItemMenue.classList.toggle('hide', false);
}

const addGeneralItem = () => {
    let reasonInput = document.getElementById('general_item_input');
    let priceInput = document.getElementById('general_item_price_input');
    if (reasonInput.value === '') {
        generalItemMenue.classList.toggle('hide', true);
        if (sessionStorage.getItem('lastMenueId')) {
            let lastMenue = document.getElementById(sessionStorage.getItem('lastMenueId'));
            lastMenue.classList.toggle('hide', false);
        }
        return;
    }
    let newGItem = new GeneralItem(reasonInput.value, priceInput.value, counter);
    newGItem.render();
    generalItemMenue.classList.toggle('hide', true);
    if (sessionStorage.getItem('lastMenueId')) {
        let lastMenue = document.getElementById(sessionStorage.getItem('lastMenueId'));
        lastMenue.classList.toggle('hide', false);
    }

    let mult = Number(document.getElementById("general_item_" + counter + "_amount").innerHTML);
    let totalItems = Number(itemsCounter.innerHTML);
    sumToPay += Number(priceInput.value) * mult;
    totalCost = sumToPay;
    sumDisp.innerHTML = sumToPay;
    totalItems += mult;
    itemsCounter.innerHTML = totalItems;
    counter++;
    reasonInput.value = '';
    priceInput.value = '';
}

const openDeleteOrder = () => {
    allContainer.classList.toggle("hide", true);
    generalLightBox.classList.toggle("hide", false);
    document.querySelector('.delete_order_div').classList.toggle("hide", false);
}

const confirmDeleteOrder = (answer) => {
    if (answer === "yes") {
        deleteOrder();
    }

    generalLightBox.classList.toggle("hide", true);
    document.querySelector('.delete_order_div').classList.toggle("hide", true);
    allContainer.classList.toggle("hide", false);
}

const deleteOrder = () => {
    shutAllMenues();
    currentCurrency = "ILS";
    sumToPay = 0;
    totalCost = 0;
    sumDisp.innerHTML = 0;
    itemsCounter.innerHTML = 0;
    sessionStorage.clear();
    itemsSum.innerHTML = '';
    document.querySelector('.customer_name_container').innerHTML = '';
    document.querySelector(".total_ILS_recieved_display").innerHTML = 0;
    document.querySelector(".total_USD_recieved_display").innerHTML = 0;
    sumToPayDisplay = document.querySelector(".cash_sum_display").innerHTML = 0;
    cashRecivedInput = document.querySelector(".cash_recived_input").innerHTML = 0;
}

// const delayOrder = () => {
//     let orderToDelay = {
//         costumer_Name: document.querySelector('.customer_name_container').innerHTML,
//         items_In_Cart: createOrderDetailes(),
//         cost: sumToPay,
//         items_Amount: itemsCounter.innerHTML
//     }

//     if (localStorage.getItem("delayedOrders")) {
//         let delayedOrders = JSON.parse(localStorage.getItem("delayedOrders"));
//         delayedOrders[Object.keys(delayedOrders).length + 1] = orderToDelay;
//         localStorage.setItem("delayedOrders", JSON.stringify(delayedOrders));
//     } else {
//         localStorage.setItem("delayedOrders", JSON.stringify(orderToDelay));
//     }
// }

const openPaymentDiv = () => {
    // let name = document.querySelector('.customer_name_container').innerHTML;

    // if (name === undefined || name === "") {
    //     alert("enter costumer name first");
    //     return;
    // }

    allContainer.classList.toggle('hide', true);
    generalLightBox.classList.toggle('hide', false);
    let finishOrderDiv = document.getElementById("finish_order_div");
    finishOrderDiv.classList.toggle("hide", false);
}


const openCashPayment = () => {
    document.getElementById("payment_btns_container").classList.toggle("hide", true);
    document.getElementById("cash_payment_div").classList.toggle("hide", false);
    document.querySelector(".convert_currencies_btns_div").classList.toggle("hide", false);
    document.querySelector('.cash_sum_display').innerHTML = sumDisp.innerHTML;
}

let currentCurrency = "ILS";
const convertToCurrency = (currencyToConvertTo) => {
    switch (currencyToConvertTo) {
        case "USD":
            if (!isSameCurrency(currencyToConvertTo)) {
                sumToPay /= usdToIlsRate;
                // sumToPay = Math.ceil(sumToPay);
                currentCurrency = "USD";
                document.querySelector(".currency_to_recieve").innerHTML = "&dollar;";
            }

            break;
        case "ILS":
            if (!isSameCurrency(currencyToConvertTo)) {
                sumToPay *= usdToIlsRate;
                // sumToPay = Math.ceil(sumToPay);
                currentCurrency = "ILS";
                document.querySelector(".currency_to_recieve").innerHTML = "&#8362;";
            }

            break;
        default:
            console.log("Error Unkonwn Currency")
            break;
    }

    sumDisp.innerHTML = sumToPay;
}

const isSameCurrency = (currencyToCheck) => {
    return currentCurrency === currencyToCheck;
}

const payCash = () => {
    let sumToPayDisplay = document.querySelector(".cash_sum_display");
    let totalCashRecivedDisplay;

    switch (currentCurrency) {
        case "USD":
            totalCashRecivedDisplay = document.querySelector(".total_USD_recieved_display");
            break;
        case "ILS":
            totalCashRecivedDisplay = document.querySelector(".total_ILS_recieved_display");
            break;
    }

    let totalCashRecived = Number(totalCashRecivedDisplay.innerHTML);
    let cashRecivedNow = Number(document.querySelector(".cash_recived_input").value);
    document.querySelector(".cash_recived_input").value = 0;
    sumToPay = Number(sumToPayDisplay.innerHTML);
    sumToPay -= cashRecivedNow;
    totalCashRecived += cashRecivedNow;
    totalCashRecivedDisplay.innerHTML = totalCashRecived;

    if (sumToPay <= 0) {
        sumToPayDisplay.innerHTML = 0;
        sumDisp.innerHTML = 0;
        sumToPay = 0;
        let costumerName = document.querySelector('.customer_name_container').innerHTML;
        finishOrder(costumerName, "Cash", totalCashRecived, totalCost);
    } else {
        sumToPayDisplay.innerHTML = sumToPay;
        sumDisp.innerHTML = sumToPayDisplay.innerHTML;
    }
}

paypal.Buttons({
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: sumToPay
                }
            }]
        });
    },

    onApprove: (data, actions) => {
        return actions.order.capture().then(function (orderData) {
            let costumerName = document.querySelector('.customer_name_container').innerHTML;
            finishOrder(costumerName, "Credit Card/Paypal", sumToPay, totalCost);
        });
    }
}).render('#paypal');

const createOrderDetailes = () => {
    let currentOrder = {};
    let items = itemsSum.children;

    for (let i = 0; i < items.length; i++) {
        const itemDetailes = items[i].children;
        const name = itemDetailes[0].innerHTML;
        const price = itemDetailes[1].innerHTML;
        const amount = itemDetailes[2].innerHTML;
        const extras = {};
        const extrasDiv = itemDetailes[3].children;

        for (let y = 0; y < extrasDiv.length; y++) {
            const key = extrasDiv[y].innerText.replace(/[>>>]/g, "");
            extras[key] = findExtraPrice(extrasDiv[y].id);
        }

        currentOrder[items[i].id] = {
            name,
            price,
            amount,
            extras,
        }
    }

    return currentOrder;
}

const closeAllPaymentsDivs = () => {
    allContainer.classList.toggle('hide', false);
    generalLightBox.classList.toggle('hide', true);
    let finishOrderDiv = document.getElementById("finish_order_div");
    finishOrderDiv.classList.toggle("hide", true);
    document.getElementById("cash_payment_div").classList.toggle("hide", true);
    document.getElementById("payment_btns_container").classList.toggle("hide", false);
    document.querySelector(".convert_currencies_btns_div").classList.toggle("hide", true);
    convertToCurrency("ILS");
}

const finishOrder = (costumerName, paymentMethod, totalCashReceived, cost) => {
    let detailes = createOrderDetailes();
    let change = totalCashReceived - cost;

    axios.post(`${MY_URL}/save-receipt`, {
        costumerName,
        paymentMethod,
        totalCashReceived,
        totalCost,
        change,
        detailes
    })
        .then((res) => {
            console.log(res);
            deleteOrder();
            closeAllPaymentsDivs();
        })
        .catch((err) => {
            console.log(err);
        })
}