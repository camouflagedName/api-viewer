import { selectKey } from "../components/input/selectKey.mjs";
import { tableGenerator } from "./tableGenerator.mjs";
import { indexCol } from "../components/displayTable/indexColumn/indexCol.mjs";
import { dataCol } from "../components/displayTable/dataColumn/dataCol.mjs";
import { generateHeaders } from "./generateHeaders.mjs";
import { addArrow } from "../addArrow.mjs";
import { spinner } from "../components/spinner.mjs";

export const generateView = (passedKey, data, viewType = "List", dataType, depthCount = 0) => {
    const keyContainer = document.querySelector("#key-container");
    const indexContainer = document.querySelector("#index-container")
    const addtlContainer = document.querySelector("#additional-container");
    const viewCont = document.querySelector("#view-container");

    let rowCount = 0;
    if (viewType === "List" || viewType === "list") {
        const spinnerEl = document.querySelector("#spinner");
        if (spinnerEl) {
            spinnerEl.remove();
        }

        // remove previous data/index cols
        const indexColToRemove = document.querySelector("#index-list-container");
        const dataColToRemove = document.querySelector("#data-list-container");

        if (indexColToRemove) {
            indexColToRemove.remove();
        }

        if (dataColToRemove) {
            dataColToRemove.remove();
        }
        const unorderedIndexEl = document.createElement("ul");
        unorderedIndexEl.className = "list-group col";
        unorderedIndexEl.id = "index-list-container";

        const unorderedDataEl = document.createElement("ul");
        unorderedDataEl.className = "list-group col-12 col-md";
        unorderedDataEl.id = "data-list-container";

        generateHeaders(unorderedIndexEl, unorderedDataEl);

        if (dataType === "array") {
            for (const row of data) {
                // data column
                const dataListEl = dataCol(rowCount, row)
                // index column
                const indexListEl = indexCol(depthCount, data, rowCount, viewType, data);

                // append both columns to respective ul's
                unorderedIndexEl.appendChild(indexListEl);
                unorderedDataEl.appendChild(dataListEl);

                rowCount++;
            }
        }
        else if (dataType === "object") {
            for (const row in data) {
                const dataListEl = dataCol(rowCount, data[row])
                const indexListEl = indexCol(depthCount, data, row, viewType, data);

                unorderedIndexEl.appendChild(indexListEl);
                unorderedDataEl.appendChild(dataListEl);

                rowCount++;
            }
        }

        indexContainer.appendChild(unorderedIndexEl);
        keyContainer.appendChild(unorderedDataEl);

        if (!passedKey) submit("list", data);
    }

    else if (viewType === "Hash" || viewType === "hash") {


        //retrieved from database
        if (passedKey) {
            const hashMap = new Map();

            for (const index in data) {
                const entry = data[index]
                hashMap.set(index, entry)
            }

            const unorderedIndexEl = document.createElement("ul");
            unorderedIndexEl.className = "list-group col";
            unorderedIndexEl.id = "index-list-container";

            const unorderedDataEl = document.createElement("ul");
            unorderedDataEl.className = "list-group col";
            unorderedDataEl.id = "data-list-container";

            generateHeaders(unorderedIndexEl, unorderedDataEl);
            hashParser(data, unorderedIndexEl, unorderedDataEl, hashMap, passedKey, viewType, depthCount);

            indexContainer.appendChild(unorderedIndexEl);
            keyContainer.appendChild(unorderedDataEl);

        }
        else {
            const spinnerEl = document.querySelector("#spinner");
            const spinnerContainer = document.querySelector("#spinnerContainer");

            //remove previous iteration of spinner
            if (spinnerEl) {
                spinnerEl.remove();
            }

            let unorderedIndexEl;
            let unorderedDataEl;
            let key;
            let collisionCount = 0;
            let longestCollision = 0;
            let hashMap;

            if (dataType === "array") {

                //add spinner
                const spinnerObj = spinner();
                spinnerContainer.appendChild(spinnerObj);

                // display key chooser drop down
                const selectKeyEl = selectKey(data, dataType);
                addtlContainer.appendChild(selectKeyEl);

                selectKeyEl.onchange = () => {
                    // remove spinner
                    const spinnerEl = document.querySelector("#spinner");
                    if (spinnerEl) {
                        spinnerEl.remove();
                    }

                    // remove previous data/index cols
                    const indexColToRemove = document.querySelector("#index-list-container");
                    const dataColToRemove = document.querySelector("#data-list-container");

                    if (indexColToRemove) {
                        indexColToRemove.remove();
                    }

                    if (dataColToRemove) {
                        dataColToRemove.remove();
                    }

                    unorderedIndexEl = document.createElement("ul");
                    unorderedIndexEl.className = "list-group col";
                    unorderedIndexEl.id = "index-list-container";

                    unorderedDataEl = document.createElement("ul");
                    unorderedDataEl.className = "list-group col";
                    unorderedDataEl.id = "data-list-container";

                    generateHeaders(unorderedIndexEl, unorderedDataEl);

                    key = selectKeyEl.value;
                    const val = data[0][key];

                    let hash = 0;
                    let hashMod = 0;

                    hashMap = new Map();

                    // create string hash
                    if (typeof (val) === "string" || typeof (val) === "boolean" || typeof (val) === "number") {
                        for (const row in data) {
                            let hashEntry = {
                                val: {},
                                next: null
                            }
                            // turn string into hash
                            if (typeof (val) === "string" || typeof (val) === "boolean") {
                                hash = hashFunction(data[row][key]);
                                hashMod = hash % data.length;
                            }
                            else {
                                hashMod = data[row][key] % data.length;
                            }

                            hashEntry.val = data[row];
                            // check if hash value exists
                            if (hashMap.has(hashMod)) {
                                let hashObject = hashMap.get(hashMod);

                                // insert hashEntry into hashObject
                                const hashReturn = updateHashEntry(hashObject, hashEntry);
                                if (hashReturn > longestCollision) {
                                    longestCollision = hashReturn;
                                }

                                hashMap.set(hashMod, hashObject)
                                collisionCount++;
                            }
                            else {
                                hashMap.set(hashMod, hashEntry)
                            }

                        }

                        // parse through hash to build the index / data table
                        hashParser(data, unorderedIndexEl, unorderedDataEl, hashMap, key, viewType, depthCount);
                    }

                    // loop that covers anything else that is not number/boolean/string
                    else {
                        for (const row in data) {
                            let hashEntry = {
                                val: {},
                                next: null
                            }
                            const dataVal = data[row]
                            hash = dataVal[key] % data.length;
                            hashMap.set(hash, data[row])

                            const dataColEntry = dataCol(hash, dataVal, dataVal[key]);
                            unorderedDataEl.appendChild(dataColEntry);

                            const indexColEntry = indexCol(depthCount, dataVal, hash, viewType, data);
                            unorderedIndexEl.appendChild(indexColEntry);

                        }
                    }
                    indexContainer.appendChild(unorderedIndexEl);
                    keyContainer.appendChild(unorderedDataEl);

                    // place in "view-generator" or "addtlContainer"
                    const table = tableGenerator(key, data, collisionCount, longestCollision);
                    viewCont.appendChild(table);
                }
            }
            else if (dataType === "object") {
                const indexColToRemove = document.querySelector("#index-list-container");
                const dataColToRemove = document.querySelector("#data-list-container");

                if (indexColToRemove) {
                    indexColToRemove.remove();
                }

                if (dataColToRemove) {
                    dataColToRemove.remove();
                }

                unorderedIndexEl = document.createElement("ul");
                unorderedIndexEl.className = "list-group col";
                unorderedIndexEl.id = "index-list-container";

                unorderedDataEl = document.createElement("ul");
                unorderedDataEl.className = "list-group col";
                unorderedDataEl.id = "data-list-container";

                generateHeaders(unorderedIndexEl, unorderedDataEl);

                for (const dataKey in data) {

                    const dataVal = data[dataKey];

                    //hash = dataVal[key] % data.length;
                    //hashMap.set(hash, data[row])
                    const bucketEntry = { [dataKey]: data[dataKey] }

                    const dataColEntry = dataCol(rowCount, bucketEntry);
                    unorderedDataEl.appendChild(dataColEntry);

                    const indexColEntry = indexCol(depthCount, dataVal, rowCount, viewType, data);
                    unorderedIndexEl.appendChild(indexColEntry);

                    rowCount++;
                }

                indexContainer.appendChild(unorderedIndexEl);
                keyContainer.appendChild(unorderedDataEl);

                // place in "view-generator" or "addtlContainer"
                const table = tableGenerator(key, data, collisionCount, longestCollision);
                viewCont.appendChild(table);
            }
            else {
                console.log("Uncaught dataType: ", dataType)
            }

            if (!passedKey) submit("hash", hashMap, key);
        }
    }
}


const submit = (viewType, data, key) => {
    const submitBtn = document.querySelector("#submit");
    submitBtn.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = `Submit ${viewType}`;

    submitBtn.onclick = () => {
        openModal(viewType, data, key);
    }
}

const openModal = (viewType, data, key) => {
    const modalEl = document.querySelector("#submit-modal");
    const modalSubmitBtn = document.querySelector("#modal-confirm");
    const modalInput = document.querySelector("#table-name");
    const routeInputEl = document.querySelector("#route-input-url");
    const URL = routeInputEl.value;

    modalEl.hidden = false;

    modalInput.onchange = () => {
        if (modalInput.value.length > 0) {
            const modalErrMsg = document.querySelector("#errorMsg")
            modalErrMsg.textContent = ""
            modalSubmitBtn.disabled = false;
        }
    }

    modalSubmitBtn.onclick = () => {
        sendData();
    }

    const sendData = async () => {
        let allData;
        if (viewType === "hash") {
            // canonize data to string format
            // otherwise, backend may alter syntax => difficult to reformat to JS when fetching data
            const dataObj = Object.fromEntries(data);
            const dataStr = JSON.stringify(dataObj)

            allData = { type: viewType, key: key, data: dataStr, name: modalInput.value, url: URL };
        }

        else if (viewType === "list") {
            const dataStr = JSON.stringify(data)
            allData = { type: viewType, data: dataStr, name: modalInput.value, url: URL };
        }

        try {
            const sendData = await fetch("/test", {
                method: "POST",
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allData)
            })

            if (sendData.ok) {

                const successMsg = document.querySelector("#successMsg");
                const modalClose = document.querySelector("#modalClose");
                const response = await sendData.json();

                if (response.ok) {
                    modalInput.value = '';
                    modalInput.hidden = true;
                    modalSubmitBtn.disabled = true;
                    modalSubmitBtn.hidden = true;
                    successMsg.hidden = false;
                    modalClose.textContent = "Close";
                    modalClose.onclick = () => {
                        location.reload();
                    }
                }
                else {
                    const modalErrMsg = document.querySelector("#errorMsg")
                    modalErrMsg.textContent = response.error
                }

            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

const hashFunction = (string) => {
    string = string.toString();
    string = string.toUpperCase();
    let value = 0;
    let power = 10 ** (string.length - 1);

    for (let i = 0, max = string.length; i < max; i++) {
        value = value + string.charCodeAt(i) * power;
        power = power / 10;
    }

    return value;
}

/**
 * @typedef {object} Hash
 * @property {object} val - data object
 * @property {object} next - pointer to next object
 */


/**
 * Updates Hash object. Returns number of collisions in a row.
 * @param {Hash} hashEntry  {@link Hash} object that contains an initial value and a pointer to another hashEntry object when collision occurs  
 * @param {Map} hashObject - hash map that will contain an initial object {@link hashEntry} and any collisions
 */


const updateHashEntry = (hashObject, hashEntry, count = 0) => {
    count++;
    if (hashObject.next) {
        return updateHashEntry(hashObject.next, hashEntry, count);
    }

    hashObject.next = hashEntry;
    return count;
}

/**
 * Returns a div container that contains at least one input element or more depending on the number of collisions
 * @param {Hash} valObj {@link Hash}
 * @param {string} key 
 * @param {number} row 
 * @returns HTMLDivElement
 */
const createDataCols = (valObj, key, row) => {
    const inputContainer = document.createElement("div");
    inputContainer.className = "d-flex";
    let inputEl;

    while (valObj) {
        inputEl = dataCol(row, valObj.val, valObj.val[key], true)

        inputContainer.appendChild(inputEl);

        // insert col with arrow
        if (valObj.next) {
            let arrowImg = addArrow("20");
            inputContainer.appendChild(arrowImg);
        }

        valObj = valObj.next;
    }

    return inputContainer;
}

/** 
 * Parses through hash to build li node elements
 * @param {HTMLUListElement} ulIndexElement
 * @param {HTMLUListElement} ulDataElement
 */
const hashParser = (prevData, ulIndexElement, ulDataElement, hashMap, key, viewType, depthCount) => {
    for (const [hashKey, val] of hashMap) {
        const indexColEntry = indexCol(depthCount, val, hashKey, viewType, prevData);
        ulIndexElement.appendChild(indexColEntry);

        // check if val.next exists => collision
        if (val.next) {
            const dataListEl = document.createElement("li");
            dataListEl.className = "list-group-item list-group-item-primary";

            // create more columns upon collision
            const entry = createDataCols(val, key, hashKey);
            dataListEl.appendChild(entry);
            ulDataElement.appendChild(dataListEl);
        }
        else {
            const dataColEntry = dataCol(hashKey, val.val, val.val[key]);
            ulDataElement.appendChild(dataColEntry);
        }
    }
}