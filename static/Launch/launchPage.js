import { createTable } from "./createTable.mjs";

const formEl = document.querySelector("form")

const getData = async (evt) => {
    evt.preventDefault();
    const inputEl = document.querySelector("#route-input");
    const URL = inputEl.value;

    const sendData = async (key, data) => {
        const allData = {key: key, data: data}
        try {
            const sendData = await fetch("/hash_data", {
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

    try {
        let getResponse = await fetch(URL);
        
        if (getResponse.ok)
        {
            let getData = await getResponse.json();
            
            // check if array
            if (getData.constructor === Array) {
                let keyVar;
                const inputContainer = document.querySelector("#input-container")
                // create select element
                const selectEl = document.createElement("select");
                selectEl.className = "form-select mt-3 border border-5 border-secondary"
                // on select, add value to var
                selectEl.onchange = () => {
                    const prevTable = document.querySelector("#table")
                    if (prevTable) {
                        prevTable.remove()
                    }
                    keyVar = selectEl.value;
                    let tempArr = JSON.parse(JSON.stringify(getData))
                    let index = 0;
                    let cmpLn = 0;

                    // at end of each loop, tempArr holds vals that diff from curr value
                    for (const firstIndex in tempArr) {
                        let count = index + 1;
                        let remove = false;
                        
                        while (count < tempArr.length) {
                            let currItem = tempArr[index][keyVar];
                            let nextItem = tempArr[count][keyVar];

                            if (currItem === nextItem){
                                remove = true;
                                if (typeof(tempArr[count][keyVar]) === "number") {
                                    cmpLn += tempArr[count][keyVar];
                                }
                                else if (tempArr[count][keyVar] === null) {
                                    cmpLn += 0;
                                }
                                else {
                                    cmpLn += tempArr[count][keyVar].toString().length; 
                                }
                                
                                tempArr.splice(count, 1)   
                                                               
                            }
                            else {
                                count++;
                            }
                        }
                        if (typeof(tempArr[index][keyVar]) === "number") {
                            cmpLn += tempArr[index][keyVar];
                        }
                        else if (tempArr[index][keyVar] === null) {
                                    cmpLn += 0;
                                }   
                        else {
                            cmpLn += tempArr[index][keyVar].toString().length; 
                        } 
                        if (remove) {
                            tempArr.splice(index, 1)
                        }
                        else {
                            index++;
                        }
                        
                    }

                    const cmpLvl = cmpLn / getData.length;
                    const uniqueLvl = tempArr.length / getData.length * 100;
                    const viability = uniqueLvl / cmpLvl;

                    //create mini-table
                    const table = createTable(uniqueLvl, cmpLvl, viability)
                    inputContainer.appendChild(table)
                }

                // creat default option
                const defaultOption = document.createElement("option");
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.textContent = "Choose key..."
                selectEl.appendChild(defaultOption);

                // place keys in drop down
                for (const key in getData[0]) {
                    console.log(getData[0][key])
                    if (typeof(getData[0][key]) === "boolean" || typeof(getData[0][key]) === "number" || typeof(getData[0][key]) === "string") {
                        const optionEl = document.createElement("option");
                        optionEl.value = key;
                        optionEl.textContent = key;
                        selectEl.appendChild(optionEl);
                    }
                }

                // add drop down to input-container
                inputContainer.appendChild(selectEl);

                // on submit
                formEl.onsubmit = (evt) => {
                    evt.preventDefault();
                    sendData(keyVar, getData);
                    // console.log(keyVar)
                }
                    // cycle through array
                
            }
            else {
                console.log("no")
            }
            // check if array
            // if array
                // place indices in drop down
                // user selects key (for its value) or creates their own value ??
                // each value of selected key is sent through hash ??
            // else
                // indices are sent through hash ??
        }

        else {
            throw `${URL} is not valid route`;
        }

    }

    catch (error) {
        console.log(error);
    }

}

formEl.onsubmit = (evt) => getData(evt);