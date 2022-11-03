import { generateView } from "./generateView.mjs";
import { getDataFromURL } from "../utils/getDataFromURL.mjs";
import { createTable } from "../Launch/createTable.mjs";
import { inputTransformer } from "../components/input/inputTransformer.mjs";
import { buttonContainer } from "../components/input/buttonContainer.mjs";

export const viewGenerator = () => {
    const submitEl = document.querySelector("#table-form");
    const selectEl = document.querySelector("#table-select");
    const routeInput = document.querySelector("#route-input-url");
    const tableSearchBtn = document.querySelector("#table-search-btn")
    const routeBtn = document.querySelector("#route-search-btn");

    let tableName;

    /** FUNCTION DEFS **/
    const handleSubmit = (el) => {
        let inputArr = [];

        for (let i of el.target) {
            if (i.id.substring(0, 5) === "index") {
                let row = parseInt(i.id[6]);
                let col = parseInt(i.id[13]);
                if (col === 0) {
                    inputArr[row] = []

                }
                inputArr[row][col] = i.value;
            }
        }
        return false;
    }

    const getTableFromDatabase = async (listType) => {
        try {
            const getResponse = await fetch("/get_table", {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: tableName })
            })

            if (getResponse.ok) {
                const returnData = await getResponse.json();
                const data = typeof(returnData.data) === "string" ? JSON.parse(returnData.data) : returnData.data;
                let key = returnData.key;
                const metaData = returnData.meta_data;
                const tableType = returnData.type;

                // generate meta table
                const tableContainer = document.querySelector("#metaTableContainer");
                const headers = ["Table Name", "URL", "Type", "Creation Date"]
                const tableEl = createTable(headers, metaData);
                tableContainer.appendChild(tableEl);
                
                let dataType;
            
                // check if array
                if (data.constructor === Array) {
                    dataType = "array";
                }
                else if (typeof(data) === "object") {
                    dataType = "object";
                }

                if (!key) key = true;
                generateView(key, data, tableType, dataType);
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    /** EVENTS */

    routeInput.onchange = () => {
        const routeInputErrMsgEl = document.querySelector("#routeInputErrMsg");
        routeInputErrMsgEl.textContent = '';

        if (routeInput.value === '' || routeInput.value.match(/\s/g)) {
            routeBtn.disabled = true;
        }
        else {
            routeBtn.disabled = false;
        }
    }

    if (selectEl) {
        selectEl.onchange = evt => {
            tableName = evt.target.value;
            tableSearchBtn.disabled = false;
        }


        tableSearchBtn.onclick = () => {
            
            const indexListCont = document.querySelector("#data-list-container");
            const dataListCont = document.querySelector("#index-list-container");
            const table = document.querySelector("#table");

            // check if data-list-container and index-list-container exist and then remove
            if (indexListCont && dataListCont) {
                indexListCont.remove();
                dataListCont.remove();
            }

            if (table) {
                table.remove();
            }

            document.querySelector("#route-input-group").hidden = true;
            document.querySelector("#ORHeader").hidden = true;
            getTableFromDatabase()
        }
    }

    routeBtn.onclick = (evt) => {
        const indexListCont = document.querySelector("#data-list-container");
        const dataListCont = document.querySelector("#index-list-container");
        const table = document.querySelector("#table");

        if (indexListCont && dataListCont) {
            indexListCont.remove();
            dataListCont.remove();
        }

        if (table) {
            table.remove();
        }

        getDataFromURL(evt);

        //replace url input and append with button
        const inputTransformerObj = inputTransformer(true);
        const buttonContainerObj = buttonContainer(routeInput.value);
        inputTransformerObj.appendChild(buttonContainerObj);

        if (selectEl) {
            document.querySelector("#ORHeader").hidden = true;
            tableSearchBtn.hidden = true;
            selectEl.hidden = true;
        }
    }

    submitEl.onsubmit = (evt) => handleSubmit(evt);
}