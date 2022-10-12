import { createTable } from "./Launch/createTable.mjs";

export const selectKey = (data) => {
    const addtlContainer = document.querySelector("#additional-container")
    const selectEl = document.createElement("select");
    selectEl.className = "form-select mt-3 border border-5 border-secondary text-center";
    selectEl.id = 'key-selector';
    // on select, add value to var


    // create default option
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Choose key..."
    selectEl.appendChild(defaultOption);

    // place keys in drop down
    for (const key in data[0]) {
        if (typeof (data[0][key]) === "boolean" || typeof (data[0][key]) === "number" || typeof (data[0][key]) === "string") {
            const optionEl = document.createElement("option");
            optionEl.value = key;
            optionEl.textContent = key;
            selectEl.appendChild(optionEl);
        }
    }

    return selectEl;
}