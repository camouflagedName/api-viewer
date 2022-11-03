import { generateView } from "../../../generators/generateView.mjs";
import { buttonContainer } from "../../input/buttonContainer.mjs";
import { dropdownMenu } from "./dropdownMenu.mjs";

export const indexCol = (depth, data, index, viewType, parentData) => {
    // create a more global counter to id the url buttons by
    let dataType;
    let prevDataType;
    const innerData = viewType === "List" || viewType === "list" ? data[index] : data;

    if (innerData) {
        if (innerData.constructor === Array) {
            dataType = "array";
        } else if (typeof (innerData) === "object") {
            dataType = "object";
        }
    } else {
        dataType = null;
    }

    if (parentData) {
        if (parentData.constructor === Array) {
            prevDataType = "array";
        } else if (typeof (parentData) === "object") {
            prevDataType = "object";
        }
    }
    
    else {
        prevDataType = null;
    }

    const indexListEl = document.createElement("li");
    indexListEl.className = "list-group-item list-group-item-primary";

    const divValEl = document.createElement("div");
    divValEl.className = "form-control text-center d-flex";

    const indexListValEl = document.createElement("div");
    indexListValEl.className = "col";
    indexListValEl.textContent = index;
    indexListValEl.disabled = true;

    divValEl.appendChild(indexListValEl);

    if (dataType === "array" || dataType === "object") {
        const divBtnEl = document.createElement("div");
        divBtnEl.className = "dropdown col-1";

        const expandEl = document.createElement("i");
        expandEl.className = "bi bi-arrows-angle-expand";

        if (viewType === "list" || viewType === "List" || (innerData.next && innerData.next === null)) {
            expandEl.onclick = () => {
                depth++;
                const keySelectorEl = document.querySelector('#key-selector');
                const routeInputEl = document.querySelector("#route-input-url");

                if (keySelectorEl) {
                    keySelectorEl.remove();
                }

                // update the input container
                const mainURLBtnContainer = document.querySelector("#mainURLBtnContainer");
                if (mainURLBtnContainer) {
                    const nextArrow = document.createElement("i");
                    nextArrow.className = "bi bi-arrow-right d-flex my-auto fs-5";
                    mainURLBtnContainer.appendChild(nextArrow);

                    const prev = {
                        data: data,
                        viewType: viewType,
                        dataType: prevDataType,
                    }
                    const subURL = buttonContainer(index, prev, depth);
                    mainURLBtnContainer.appendChild(subURL);
                }

                const viewSelect = document.querySelector("#view-select");
                if (viewSelect) {
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
        
                        generateView(false, innerData, listType, dataType, depth);
                    }
                }

                generateView(false, innerData, viewType, dataType, depth);
            }
            divValEl.appendChild(expandEl);
        }
        else {
            const dropdownBtn = document.createElement("button");
            dropdownBtn.className = "btn btn-transparent dropdown-toggle p-0 border border-0";
            dropdownBtn.type = "button";
            const dropdownToggleAttr = document.createAttribute("data-bs-toggle");
            dropdownToggleAttr.value = "dropdown";
            dropdownBtn.setAttributeNode(dropdownToggleAttr);

            //create drop down of some sort then generate view based on what is selected
            let innerDataArr = [];
            if (dataType === "object" && innerData.val) {
                innerDataArr = parseToArray(innerData)
            } else if (dataType === "object") {
               innerDataArr.push(innerData)
            } else {
                innerDataArr = innerData;
            }

            const prev = {
                data: parentData,
                viewType: viewType,
                dataType: prevDataType,
            }
            const dropdownMenuEl = dropdownMenu(innerDataArr, prev, viewType, depth);

            divValEl.appendChild(dropdownBtn);
            divValEl.appendChild(dropdownMenuEl);
        }
    }
    indexListEl.appendChild(divValEl);

    return indexListEl;
}

/**
 * 
 * @param {object} dataObj 
 */
const parseToArray = (dataObj, objArray = []) => {
    objArray.push(dataObj.val)
    if (dataObj.next) {
        parseToArray(dataObj.next, objArray)
    }

    return objArray;
}