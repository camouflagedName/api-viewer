import { generateView } from "../../generators/generateView.mjs";

export const buttonContainer = (currentKey, prev, depth) => {
    const columnContainer = document.createElement("div");
    columnContainer.className = "d-flex border border-2 rounded my-2 mx-1";

    const inputButtonEl = document.createElement("button");
    inputButtonEl.className = "btn btn-transparent border border-0 text-break";
    inputButtonEl.textContent = currentKey;


    inputButtonEl.id = depth ? `routeInput-${depth.toString()}` : "route-input-url";


    const closeBtn = document.createElement("button");
    const type = document.createAttribute("type");
    type.value = "button";
    closeBtn.setAttributeNode(type);
    closeBtn.className = "btn-close";
    closeBtn.ariaLabel = "Close";
    closeBtn.style.fontSize = "10px";
    closeBtn.onclick = () => {
        let prevData;
        if (prev) {
            const buttonArr = document.querySelectorAll("#mainURLBtnContainer div");
            const arrowElArr = document.querySelectorAll(".bi.bi-arrow-right")

            if (prev.data.constructor === Map) {
                if (prev.dataType === "object") {
                    prevData = Object.fromEntries(prev.data);
                } else {
                    throw `Uncaught data type: ${prev.dataType}`;
                }
            } else {
                prevData = prev.data;
            }

            for (const index in buttonArr) {
                if (index >= depth) {
                    buttonArr[index].remove();
                    arrowElArr[index - 1].remove();
                }
            }

            const viewSelect = document.querySelector("#view-select");
            viewSelect.value = prev.viewType;
            viewSelect.onchange = evt => {
                // create key selector
                const keySelectorEl = document.querySelector('#key-selector');
                const indexListCont = document.querySelector("#data-list-container");
                const dataListCont = document.querySelector("#index-list-container");
                const tableEl = document.querySelector("#table");
                const listType = evt.target.value;

                if (indexListCont && dataListCont) {
                    indexListCont.remove();
                    dataListCont.remove();
                }

                if (keySelectorEl) {
                    keySelectorEl.remove();
                }

                if (tableEl) {
                    tableEl.remove();
                }

                generateView(false, prevData, listType, prev.dataType);
            }

            generateView(false, prevData, prev.viewType, prev.dataType);
        }
        // remove initial URL BUTTON
        else {
            const routeInputURL = document.querySelector("#route-input-url");
            const routeSearchBtn = document.querySelector("#route-search-btn");
            const addtlCont = document.querySelector("#additional-container");
            const urlBtnCont = document.querySelector("#mainURLBtnContainer");
            const indexCont = document.querySelector("#index-list-container");
            const dataCont = document.querySelector("#data-list-container");
            const table = document.querySelector("#table");
            const spinner = document.querySelector("#spinner");
            const submitBtn = document.querySelector("#submit");

            if (routeInputURL.hidden === true) {
                routeInputURL.hidden = false;
                routeSearchBtn.hidden = false;
                routeInputURL.value = '';
            }

            addtlCont.remove();
            urlBtnCont.remove();
            indexCont.remove();
            dataCont.remove();
            if (table) {
                table.remove();
            }
            if (spinner) {
                spinner.remove();
            }

            submitBtn.disabled = true;
            submitBtn.hidden = true;

        }
    }

    columnContainer.appendChild(inputButtonEl);
    columnContainer.appendChild(closeBtn);

    return columnContainer;
}