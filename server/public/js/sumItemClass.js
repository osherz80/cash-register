class SumItem {
    constructor(_name, _price, _type,_counter) {
        this.name = _name;
        this.price = _price;
        this.type = _type;
        this.counter = _counter;
    }
    render() {
        let item = document.createElement('div');
        item.setAttribute('id', "item_" + this.counter);
        item.classList.add("sum_item", this.type);

        let nameDiv = document.createElement('div');
        nameDiv.setAttribute('id', "item_" + this.counter + "_name");
        nameDiv.classList.add("sum_item_name", "sum_item_property");
        nameDiv.innerHTML = this.name;

        let priceDiv = document.createElement('div');
        priceDiv.setAttribute('id', "item_" + this.counter + "_price");
        priceDiv.classList.add("sum_item_price", "sum_item_property");
        priceDiv.innerHTML = this.price;

        let amountDiv = document.createElement('div');
        amountDiv.setAttribute('id', "item_" + this.counter + "_amount");
        amountDiv.classList.add("sum_item_amount", "sum_item_property");
        amountDiv.innerHTML = 1;

        let itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.setAttribute('id', "item_" + this.counter + "_details");
        itemDetailsDiv.classList.add("sum_item_details", "sum_item_property");

        item.appendChild(nameDiv);
        item.appendChild(priceDiv);
        item.appendChild(amountDiv);
        item.appendChild(itemDetailsDiv);
        item.addEventListener("click", clickedSumItem);

        addEventToChildrens(item, "click", clickedSumItem);

        itemsSum.appendChild(item);
    }
}