import { generateView } from "./generateView.mjs";
import { createViewSelect } from "./createViewSelect.mjs";
import { getData } from "./getData.mjs";

export const viewGenerator = () => {
    const submitEl = document.querySelector("#table-form");
    const selectEl = document.querySelector("#table-select");
    const routeInput = document.querySelector("#route-input");
    const tableSearchBtn = document.querySelector("#table-search-btn")
    const routeBtn = document.querySelector("#route-search-btn");
    const viewSelectEl = document.querySelector("#view-select");
    const viewCont = document.querySelector("#view-container");
    
    let tableName;

    /**  FUNCTION DEFS **/
    const handleSubmit = (el) => {
        let inputArr = [];
        
        for (let i of el.target) {
            if (i.id.substring(0, 5) === "index")
            {
                let row = parseInt(i.id[6]);
                let col = parseInt(i.id[13]);
                if (col === 0) {
                    inputArr[row] = []
                    
                }
                inputArr[row][col] = i.value;
            }                
        }
        console.log(inputArr)

        return false;
    }

    const getTable = async (listType) => {
        try {
            const getResponse = await fetch("/get_table", {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: tableName})
            })

            if (getResponse.ok) {
                const returnData = await getResponse.json();
                const data = JSON.parse(returnData.data);
                const key = returnData.key;

                const addtlCont = document.createElement("div");
                addtlCont.id = "additional-container";
                addtlCont.className = "col mx-3";

                const viewSelCont = document.querySelector("#table-select-container");

        
                const viewSelect = createViewSelect();
        
                viewSelect.onchange = evt => {
                    const keySelectorEl = document.querySelector('#key-selector');
                    const tableEl = document.querySelector("#table");
            
                    if (keySelectorEl) {
                        keySelectorEl.remove();
                    }
            
                    if (tableEl) {
                        tableEl.remove();
                    }
                    
                    const listType = evt.target.value;
                    generateView(key, data, listType)
                }
                
                addtlCont.appendChild(viewSelect);
                viewSelCont.appendChild(addtlCont)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    // events

    routeInput.onchange = () => {
        if (routeInput.value === '' || routeInput.value.match(/\s/g)) {
            routeBtn.disabled = true;
        }
        else {
            routeBtn.disabled = false;
        }
    }

    selectEl.onchange = evt => {
        tableName = evt.target.value;
        tableSearchBtn.disabled = false;
    }

    tableSearchBtn.onclick = () => {
        // check if data-list-container exists and then remove
        // check if index-list-container exists and then remove
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

        document.querySelector("#route-input-group").hidden = true;
        document.querySelector("#ORHeader").hidden = true;
        getTable()
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

        document.querySelector("#ORHeader").hidden = true;
        tableSearchBtn.hidden = true;
        selectEl.hidden = true;
        getData(evt);
    }

    submitEl.onsubmit = (evt) => handleSubmit(evt);
}