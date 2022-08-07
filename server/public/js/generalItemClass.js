class GeneralItem {
    constructor(_for,_price,_counter){
        this.for = _for;
        this.price = _price;
        this.counter = _counter;
    }
    render(){
        let generalItem = document.createElement('div');
        generalItem.id = "general_item_" + this.counter;
        generalItem.classList.add("general_sum_item", "sum_item");

        let nameDiv = document.createElement('div');
        nameDiv.id = "general_item_" + this.counter + "_name";
        nameDiv.classList.add("general_item_name", "sum_item_property");
        nameDiv.innerHTML = this.for;

        let priceDiv = document.createElement('div');
        priceDiv.setAttribute('id', "general_item_" + this.counter + "_price");
        priceDiv.classList.add("general_item_price", "sum_item_property");
        priceDiv.innerHTML = this.price;

        let amountDiv = document.createElement('div');
        amountDiv.setAttribute('id', "general_item_" + this.counter + "_amount");
        amountDiv.classList.add("general_item_amount", "sum_item_property");
        amountDiv.innerHTML = 1;

        let itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.setAttribute('id', "general_item_" + this.counter + "_details");
        itemDetailsDiv.classList.add("general_item_details", "sum_item_property");

        generalItem.appendChild(nameDiv);
        generalItem.appendChild(priceDiv);
        generalItem.appendChild(amountDiv);
        generalItem.appendChild(itemDetailsDiv);
        generalItem.addEventListener("click", clickedSumItem);

        addEventToChildrens(generalItem, "click", clickedSumItem);

        itemsSum.appendChild(generalItem);
    }
}