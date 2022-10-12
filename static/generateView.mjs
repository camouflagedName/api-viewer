import { selectKey } from "./selectKey.mjs";
import { tableGenerator } from "./tableGenerator.mjs";
import { indexCol } from "./indexCol.mjs";
import { dataCol } from "./dataCol.mjs";
import { generateHeaders } from "./generateHeaders.mjs";
import { addArrow } from "./addArrow.mjs";

export const generateView = (remove, data, viewType = "List", dataType) => {
    const keyContainer = document.querySelector("#key-container");
    const indexContainer = document.querySelector("#index-container")
    const dataListContainerEl = document.querySelector("#data-list-container");
    const indexListContainerEl = document.querySelector("#index-list-container");
    const addtlContainer = document.querySelector("#additional-container");
    const viewCont = document.querySelector("#view-container");

    if (dataListContainerEl) {
        dataListContainerEl.remove();
    }

    if (indexListContainerEl) {
        indexListContainerEl.remove();
    }

    let rowCount = 0;
    if (viewType === "List") {
        const unorderedIndexEl = document.createElement("ul");
        unorderedIndexEl.className = "list-group col";
        unorderedIndexEl.id = "index-list-container";
    
        const unorderedDataEl = document.createElement("ul");
        unorderedDataEl.className = "list-group col";
        unorderedDataEl.id = "data-list-container";

        generateHeaders(unorderedIndexEl, unorderedDataEl);

        if (dataType === "array") {
            for (const row of data) {
                // index column
                const indexListEl = indexCol(rowCount);

                // data column
                const dataListEl = dataCol(rowCount, row)

                // append both columns to respective ul's
                unorderedIndexEl.appendChild(indexListEl);
                unorderedDataEl.appendChild(dataListEl);

                rowCount++;
            }
        }
        else if (dataType === "object") {
            for (const row in data) {
                const indexListEl = indexCol(row);
                const dataListEl = dataCol(rowCount, data[row])

                unorderedIndexEl.appendChild(indexListEl);
                unorderedDataEl.appendChild(dataListEl);

                rowCount++;
            }
        }

        indexContainer.appendChild(unorderedIndexEl);
        keyContainer.appendChild(unorderedDataEl);

        submit("list", data);
    }

    else if (viewType === "Hash") {


        // display key chooser drop down
        const selectKeyEl = selectKey(data);
        addtlContainer.appendChild(selectKeyEl);
        
        selectKeyEl.onchange = () => {
            const indexColToRemove = document.querySelector("#index-list-container");
            const dataColToRemove = document.querySelector("#data-list-container");
            // remove previous data/index cols
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
            unorderedDataEl.className = "list-group col";
            unorderedDataEl.id = "data-list-container";

            generateHeaders(unorderedIndexEl, unorderedDataEl);

            const key = selectKeyEl.value;
            const val = data[0][key]
            let hash = 0;
            let hashMod = 0;
            let listArr = [];

            const hashMap = new Map();

            let collisionCount = 0;
            //let collisionIterator = 0;
            let longestCollision = 0;
    
            if (typeof (val) === "string" || typeof (val) === "boolean") {
                for (const row in data) {
                    let hashEntry = {
                        val: {},
                        next: null
                    }
                    // turn string into hash
                    hash = hashFunction(data[row][key]);
                    hashMod = hash % data.length;
                    hashEntry.val = data[row];

                    // check if hash value exists
                    if (hashMap.has(hashMod)) {
                        let hashObject = hashMap.get(hashMod);
                        // insert hashEntry into hashObject
                        const hashReturn = updateHashEntry(hashObject, hashEntry);
                        if (hashReturn > longestCollision) 
                        {
                            longestCollision = hashReturn;
                        }

                        hashMap.set(hashMod, hashObject)
                        collisionCount++;
                    }
                    else {
                        hashMap.set(hashMod, hashEntry)
                    }
                    
                }

                for (const [hashKey, val] of hashMap) {
                    const indexColEntry = indexCol(hashKey);
                    unorderedIndexEl.appendChild(indexColEntry);

                    // check if val.next exists
                    if (val.next) {
                        const dataListEl = document.createElement("li");
                        dataListEl.className = "list-group-item list-group-item-primary";
                        
                        // create more columns
                        const entry = createDataCols(val, key, hashKey);
                        dataListEl.appendChild(entry);
                        unorderedDataEl.appendChild(dataListEl);
                        
                    }
                    else {
                        const dataColEntry = dataCol(hashKey, val.val, val.val[key]);
                        unorderedDataEl.appendChild(dataColEntry);
                    }
                }
            }
            else {
                for (const row in data) {
                    hash = data[row][key] % data.length;
                    listArr[hash] = data[row];
                    hashMap.set(hash, data[row])
                }

                for (const [hashKey, val] of hashMap) {
                    const indexColEntry = indexCol(hashKey);
                    unorderedIndexEl.appendChild(indexColEntry);

                    const dataColEntry = dataCol(hashKey, val, val[key]);
                    unorderedDataEl.appendChild(dataColEntry);

                }
            }

            indexContainer.appendChild(unorderedIndexEl);
            keyContainer.appendChild(unorderedDataEl);

            // place in "view-generator" or "addtlContainer"
            const table = tableGenerator(key, data, collisionCount, longestCollision);
            viewCont.appendChild(table);
            submit("hash", hashMap, key);
        }
    }
}

const submit = (viewType, data, key) => {
    const submitBtn = document.querySelector("#submit");
    submitBtn.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = `Submit ${viewType}`;

    submitBtn.onclick = () => {
        sendData();
    }

    const sendData = async () => {
        let allData;
        if (viewType === "hash") {
            data = Object.fromEntries(data);
            console.log(data)
            allData = {type: viewType, key: key, data: data};
        }

        else if (viewType === "list") {
            allData = {type: viewType, data: data[0]};
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
                const response = await sendData.json()
                console.log(response)
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
        value = value + string.charCodeAt(i)*power;
        power = power / 10;
    }

    return value;
}


/**
 * 
 * @param {*} hashEntry {
 *      val: object,
 *      next: pointer
 * }
 */
const updateHashEntry = (hashObject, hashEntry, count = 0) => {
    count++;
    if (hashObject.next) {
        return updateHashEntry(hashObject.next, hashEntry, count);
    }

    hashObject.next = hashEntry;
    return count;
}

const createDataCols = (valObj, key, row) => {
    const inputContainer = document.createElement("div");
    inputContainer.className = "d-flex";
    let inputEl;

    while (valObj) {
        inputEl = dataCol(row, valObj.val, valObj.val[key], true)

/* 
        inputEl = document.createElement("input");
        inputEl.className = "form-control text-center mx-3";
        inputEl.value = JSON.stringify(valObj.val[key]);
    
 */

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