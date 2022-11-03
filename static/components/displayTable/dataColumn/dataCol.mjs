import { showDataModal } from "../../modal/showDataModal.mjs";

export const dataCol = (rowNum, data, key, hasCollision) => {
    const inputEl = document.createElement("div");
    inputEl.className = "form-control d-flex flex-column";
    inputEl.id = rowNum

    const toggleAttr = document.createAttribute("data-bs-toggle");
    toggleAttr.value = "modal";

    const targetAttr = document.createAttribute("data-bs-target");
    targetAttr.value = "#dataModal";

    const valContainer = document.createElement("div");
    valContainer.id = `value-container-${rowNum}`;
    valContainer.className = "col";

    // if hashing an array
    if (key || key === false) {
        manageObjectEntry(data, inputEl, valContainer, key);
    }

    // if list view or hashing a single object
    else {
        if (typeof (data) === "object" && data !== null && Object.keys(data).length > 1) {
            manageObjectEntry(data, inputEl, valContainer)
        } else {
            if (data && typeof (data === "object") && data.constructor !== Array && Object.keys(data).length === 1) {
                const dataKey = Object.keys(data)[0]
                if (typeof (data[dataKey] !== null && data[dataKey]) === "object") {
                    if (data[dataKey].constructor === Array && data[dataKey].length === 0) {
                        manageBasicEntry(valContainer, inputEl, data[dataKey]);
                    } else {
                        manageObjectEntry(data[dataKey], inputEl, valContainer);
                    }
                } else {
                    manageBasicEntry(valContainer, inputEl, data[dataKey]);
                }
            } else {
                manageBasicEntry(valContainer, inputEl, data);
            }  
        }
    }

    if (!hasCollision) {
        const dataListEl = document.createElement("li");
        dataListEl.className = "list-group-item list-group-item-primary";
        dataListEl.appendChild(inputEl);

        return dataListEl;
    }

    return inputEl;
}

export const expandedDataView = (data, listCont, marginCount = 0) => {

    for (const dataKey in data) {
        let entry = data[dataKey];
        const boldItem = document.createElement("strong");
        const listItem = document.createElement("li");
        listItem.className = "dropdown-item";
        listItem.appendChild(boldItem);

        if (typeof (entry) === "object") {
            
            const margin = 15 * marginCount;
            boldItem.textContent = `${dataKey}: {`;
            boldItem.style.marginLeft = `${margin.toString()}px`
            listCont.appendChild(listItem);
            marginCount++;
            expandedDataView(entry, listCont, marginCount);

            const endBracket = document.createElement("div");
            endBracket.textContent = "}";
            endBracket.style.marginLeft = `${margin.toString()}px`
            listCont.appendChild(endBracket);

            marginCount--;
        } else {

            boldItem.textContent = `${dataKey}: `

            if (entry.length > 100) {
                entry = entry.slice(0, 99) + "..."
            }

            const spanItem = document.createElement("span");
            spanItem.textContent = `${entry}`;

            const margin = 15 * marginCount;
            listItem.style.marginLeft = `${margin.toString()}px`
            listItem.appendChild(boldItem);
            listItem.appendChild(spanItem);

            listCont.appendChild(listItem);
        }
    }
}

/**
 * Handles entries that contain object within an object
 * @param {*} data 
 * @param {*} inputEl 
 */
const manageObjectEntry = (data, inputEl, valContainer, key) => {
    inputEl.className = "form-control d-flex";
    inputEl.setAttribute("data-bs-toggle", "modal");
    inputEl.setAttribute("data-bs-target", "#dataModal");

    // generate expand symbol
    const symbol = document.createElement("i");
    symbol.className = "bi bi-box-arrow-up-right";

    const symbolContainer = document.createElement("div");
    symbolContainer.className = "col-1 m-auto text-center";
    symbolContainer.appendChild(symbol);

    // generate header
    const headerContainer = createListHeader(data, key);
    valContainer.appendChild(headerContainer);

    const listContainer = document.createElement("ul");
    listContainer.hidden = true;

    // view data in entry when data bucket is expanded
    //expandedDataView(data, listContainer);

    // valContainer.appendChild(listContainer);

    // TODO: remove ref to listContainer and add "show" to modal

    
    inputEl.onclick = () => {
        const dataModal = document.querySelector("#dataModal");
        showDataModal(key, data)
        
        /*
        if (headerContainer.hidden === false) {
            headerContainer.hidden = true;
            
            listContainer.hidden = false;
            symbol.className = "bi bi-arrows-collapse";
        } else {
            headerContainer.hidden = false;
            listContainer.hidden = true;
            symbol.className = "bi bi-arrows-expand";
        }
        */
    }
    inputEl.append(valContainer, symbolContainer);
    //inputEl.appendChild(symbolContainer);    
}

const createListHeader = (data, key) => {
    const valHeader = document.createElement("div");
    valHeader.className = "col text-center text-break m-0 fs-6";
    let headerString;
    if (key) {
        valHeader.textContent = JSON.stringify(key);
    }
    else if (data.constructor === Array && data.length === 0) {
        valHeader.textContent = JSON.stringify(data);
    }
    else {
        const firstKey = Object.keys(data)[0];
        const secondKey = Object.keys(data)[1];
        const firstEntry = JSON.stringify(data[firstKey]);
        
        if (secondKey) {
            if (firstEntry.length > 20) {
                headerString = `${firstKey}: ${firstEntry.slice(0, 20) + "..."}, ${secondKey}...`
            } else {
                headerString = `${firstKey}: ${firstEntry}, ${secondKey}...`
            }
        } else {
            if (firstEntry && firstEntry.length > 20) {
                headerString = `${firstKey}: ${firstEntry.slice(0, 20) + "..."}`
            } else {
                headerString = `${firstKey}: ${firstEntry}`
            }
        }
        valHeader.textContent = headerString;
    }

    return valHeader;
}

const manageBasicEntry = (valCont, inputEl, data) => {
    valCont.textContent = JSON.stringify(data);
    valCont.className = "text-center text-break";
    inputEl.appendChild(valCont); 
}