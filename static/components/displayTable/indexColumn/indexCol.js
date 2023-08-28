import { generateView } from "../../../generators/generateView.js";
import { buttonContainer } from "../../input/buttonContainer.js";
import { dropdownMenu } from "./dropdownMenu.js";

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

    const indexListEl = $("<li>");
    indexListEl.addClass("list-group-item list-group-item-primary");

    const divValEl = $("<div>");
    divValEl.addClass("form-control text-center d-flex");

    const indexListValEl = $("<div>");
    indexListValEl.addClass("col");
    indexListValEl.text(index);
    indexListValEl.prop('disabled', true);

    divValEl.append(indexListValEl);

    if (dataType === "array" || dataType === "object") {
        const divBtnEl = $("<div>");
        divBtnEl.addClass("dropdown col-1");

        const expandEl = $("<i>");
        expandEl.addClass("bi bi-arrows-angle-expand");

        if (viewType === "list" || viewType === "List" || (innerData.next && innerData.next === null)) {
            expandEl.on('click', () => {
                depth++;
                const keySelectorEl = $('#key-selector');
                const routeInputEl = $("#route-input-url");

                if (keySelectorEl) {
                    keySelectorEl.remove();
                }

                // update the input container
                const mainURLBtnContainer = $("#mainURLBtnContainer");
                if (mainURLBtnContainer) {
                    const nextArrow = $("<i>");
                    nextArrow.addClass("bi bi-arrow-right d-flex my-auto fs-5");
                    mainURLBtnContainer.append(nextArrow);

                    const prev = {
                        data: data,
                        viewType: viewType,
                        dataType: prevDataType,
                    }
                    const subURL = buttonContainer(index, prev, depth);
                    mainURLBtnContainer.append(subURL);
                }

                const viewSelect = $("#view-select");
                if (viewSelect) {
                    viewSelect.on('change', evt => {
                        // create key selector
                        const listType = evt.target.value;

                        $('#key-selector')?.remove();
                        $("#data-list-container")?.remove();
                        $("#index-list-container")?.remove();
                        $("#table")?.remove();

                        generateView(false, innerData, listType, dataType, depth);
                    });
                }

                generateView(false, innerData, viewType, dataType, depth);
            });
            divValEl.append(expandEl);
        } else {
            const dropdownBtn = $("<button>");
            dropdownBtn.addClass("btn btn-transparent dropdown-toggle p-0 border border-0");
            dropdownBtn.attr('type', 'button');
            dropdownBtn.attr('data-bs-toggle', 'dropdown');

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

            divValEl.append(dropdownBtn);
            divValEl.append(dropdownMenuEl);
        }
    }
    indexListEl.append(divValEl);

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