export const dataCol = (rowNum, data, key, hash) => {

    const inputEl = document.createElement("div");
    inputEl.className = "form-control d-flex flex-column";

    // if hash view
    if (key || key === false) {
        const valImgContainer = document.createElement("div");
        valImgContainer.className = "d-flex";
    
        const valContainer = document.createElement("h6");
        valContainer.textContent = JSON.stringify(key);
        valContainer.className = "col text-center m-0";
    
        const symbolContainer = document.createElement("div");
        const symbol = document.createElement("i");
        symbol.className = "bi bi-arrows-expand";
        symbolContainer.appendChild(symbol);

    
        const dataContainer = document.createElement("div");
        dataContainer.id = `data-container-${rowNum}`;
        //dataContainer.textContent = JSON.stringify(data);

        const listContainer = document.createElement("ul");

        for (key in data) {
            let entry = data[key];
            const listItem = document.createElement("li");
            listItem.className = "dropdown-item";

            const boldItem = document.createElement("strong");
            boldItem.textContent = `${key}: `

            listItem.appendChild(boldItem);

            const spanItem = document.createElement("span");
            if (typeof(entry) === "object") {
                entry = JSON.stringify(entry);
            }
            spanItem.textContent = `${entry}`;

            listItem.appendChild(spanItem);

            listContainer.appendChild(listItem);
        }

        dataContainer.appendChild(listContainer);
        dataContainer.hidden = true;

        inputEl.onclick = () => {
            if (dataContainer.hidden === true) {
                dataContainer.hidden = false;
                symbol.className = "bi bi-arrows-collapse";
            }
            else {
                dataContainer.hidden = true;
                symbol.className = "bi bi-arrows-expand";
            }
        }
    
        valImgContainer.appendChild(valContainer);
        valImgContainer.appendChild(symbolContainer);
        inputEl.appendChild(valImgContainer);
        inputEl.appendChild(dataContainer);
        
    }

    // if list view
    else {
        // this will take up the left side
        const valContainer = document.createElement("div");
        valContainer.id = `value-container-${rowNum}`;
        valContainer.className = "col"
        
        // expand/collapse button will take up 1 col on right
        let symbolContainer = null;

        if (typeof(data) === "object") {
            inputEl.className = "form-control d-flex";

            symbolContainer = document.createElement("div");
            symbolContainer.className = "col-1 m-auto text-center";
            const symbol = document.createElement("i");
            symbol.className = "bi bi-arrows-expand";
            symbolContainer.appendChild(symbol);

            const valHeader = document.createElement("div");
            const firstKey = Object.keys(data)[0];
            const secondKey = Object.keys(data)[1];
            const firstEntry = JSON.stringify(data[firstKey]);
            let headerString = `${firstKey}: ${firstEntry}, ${secondKey}...`
            valHeader.textContent = headerString;
            valHeader.className = "col text-center m-0 fs-6";
            valContainer.appendChild(valHeader);

            const listContainer = document.createElement("ul");
            listContainer.hidden = true;

            for (key in data) {

                let entry = data[key];
                const listItem = document.createElement("li");
                listItem.className = "dropdown-item";

                const boldItem = document.createElement("strong");
                boldItem.textContent = `${key}: `

                listItem.appendChild(boldItem);

                const spanItem = document.createElement("span");
                if (typeof(entry) === "object") {
                    entry = JSON.stringify(entry);
                }
                spanItem.textContent = `${entry}`;

                listItem.appendChild(spanItem);

                listContainer.appendChild(listItem);

            }
            valContainer.appendChild(listContainer);
            
            //inputEl.appendChild(valContainer);
            inputEl.onclick = () => {
                if (valHeader.hidden === false) {
                    valHeader.hidden = true;
                    listContainer.hidden = false;
                    symbol.className = "bi bi-arrows-collapse";
                }
                else {
                    valHeader.hidden = false;
                    listContainer.hidden = true;
                    symbol.className = "bi bi-arrows-expand";
                }
            }
        }

        else {
            valContainer.textContent = JSON.stringify(data);
            valContainer.className = "text-center";
        }
        

        inputEl.appendChild(valContainer);
        if (symbolContainer) {
            inputEl.appendChild(symbolContainer);
        }
    }

    if (!hash) {
        const dataListEl = document.createElement("li");
        dataListEl.className = "list-group-item list-group-item-primary";
        dataListEl.appendChild(inputEl);

        return dataListEl;
    }

    return inputEl;
}