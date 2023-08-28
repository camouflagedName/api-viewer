import { buttonContainer } from "../../input/buttonContainer.js";
import { generateView } from "../../../generators/generateView.js";

export const dropdownMenu = (itemsArr, prev, viewType, depth) => {
    const unorderedEl = document.createElement("ul");
    unorderedEl.className = "dropdown-menu";

    let count = 0;
    for (const item of itemsArr) {
        count++;
        const listItem = document.createElement("li");
        listItem.className = "dropdown-item";
        listItem.textContent = `Column ${count} - LIST`;
        listItem.onclick = () => {
            depth++;
            const keySelectorEl = document.querySelector('#key-selector');
            if (keySelectorEl) {
                keySelectorEl.remove();
            }

            // add columns to url input bar
            const mainURLBtnContainer = document.querySelector("#mainURLBtnContainer");
            if (mainURLBtnContainer) {
                const divContainer = document.createElement("div");
                divContainer.className = "d-flex flex-row";
                const nextArrow = document.createElement("i");
                nextArrow.className = "bi bi-arrow-right d-flex my-auto fs-5";
                divContainer.appendChild(nextArrow);
                const key = Object.keys(item)
                const subURL = buttonContainer(key[0], prev, depth);
                divContainer.appendChild(subURL);
                
                mainURLBtnContainer.appendChild(divContainer);
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

                    generateView(false, item, listType, typeof(item), depth);
                }
            }

            generateView(false, item, viewType, typeof(item), depth);
        }

        unorderedEl.appendChild(listItem);
    }

    return unorderedEl;
}