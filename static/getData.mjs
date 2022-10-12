import { createViewSelect } from "./createViewSelect.mjs";
import { generateView } from "./generateView.mjs";

export const getData = async (evt) => {
    evt.preventDefault();
    const inputEl = document.querySelector("#route-input");
    const addtlCont = document.querySelector("#additional-container");

    if (addtlCont) {
        addtlCont.remove();
    }

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
            let dataType;
            
            // check if array
            if (getData.constructor === Array) {
                dataType = "array";
            }
            else if (typeof(getData) === "object") {
                dataType = "object";
            }
                
                // create container for view selector and key selector
                const addtlCont = document.createElement("div");
                addtlCont.id = "additional-container";
                addtlCont.className = "col mx-3";

                // create view selector
                const viewSelect = createViewSelect();

                viewSelect.onchange = evt => {
                    // create key selector
                    const keySelectorEl = document.querySelector('#key-selector');
                    const tableEl = document.querySelector("#table");
            
                    if (keySelectorEl) {
                        keySelectorEl.remove();
                    }
            
                    if (tableEl) {
                        tableEl.remove();
                    }
                    
                    const listType = evt.target.value;

                    generateView(false, getData, listType, dataType)
                }

                addtlCont.appendChild(viewSelect);

                // insert with route input
                const routeSelCont = document.querySelector("#route-input-container");
                routeSelCont.appendChild(addtlCont);
/* 
                // on submit
                formEl.onsubmit = (evt) => {
                    evt.preventDefault();
                    sendData(keyVar, getData);

                }
 */
                

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