class Record {
    constructor(record) {
        this.record = record;
    }

    createRecord() {
        let recordHolder = document.createElement('div');
        recordHolder.classList.add('record_holder');

        let name = document.createElement('p');
        name.classList.add('record_costumer_name');
        name.innerHTML = `<b>name: ${this.record.name}</b>`;

        let cost = document.createElement('p');
        cost.innerText = `cost: ${this.record.cost}`;

        let detailes = document.createElement('details');

        let summary = document.createElement('summary');
        summary.innerHTML = `<b>Detailes</b>`
        detailes.appendChild(summary);
        for (key in this.record.detailes) {
            if (typeof this.record.detailes[key] === 'object') {
                for (key2 in this.record.detailes[key]) {
                    if (typeof this.record.detailes[key][key2] === 'object') {
                        let extrasDetailes = document.createElement('details');
                        let extrasSummary = document.createElement('summary');
                        extrasSummary.innerHTML = `<b>Extras Detailes</b>`;
                        extrasDetailes.appendChild(extrasSummary);

                        for (let extra in this.record.detailes[key][key2]) {
                            let extraDet = document.createElement('p');
                            extraDet.innerHTML = `<p>${extra}: ${this.record.detailes[key][key2][extra]}</p>`;
                            extrasDetailes.appendChild(extraDet);
                        }

                        detailes.appendChild(extrasDetailes);

                    } else {
                        let itemDetailes = document.createElement('p');
                        itemDetailes.innerHTML = `<p>${key2}: ${this.record.detailes[key][key2]}</p>`;
                        if(key2 === 'name') {
                            itemDetailes.style.borderTop="2px solid rebeccapurple"
                        }
                        detailes.appendChild(itemDetailes);
                    }
                }


            } 
        }

        recordHolder.appendChild(name);
        recordHolder.appendChild(cost);
        recordHolder.appendChild(detailes);
        
        return recordHolder;
    }
}