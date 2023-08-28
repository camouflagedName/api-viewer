/**
 * Returns a select html element filled with options.
 * @param {*} data 
 * @param {*} dataType 
 * @returns 
 */

export const selectKey = (data, dataType) => {
    const selectEl = document.createElement("select");
    selectEl.className = "form-select mt-3 border border-3 border-primary border-opacity-75 text-center";
    selectEl.id = 'key-selector';
    // on select, add value to var


    // create default option
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    
    selectEl.appendChild(defaultOption);

    // place keys in drop down
    if (dataType === "array") {
        defaultOption.textContent = "Choose key..."
        for (const key in data[0]) {
            if (typeof (data[0][key]) === "boolean" || typeof (data[0][key]) === "number" || typeof (data[0][key]) === "string") {
                const optionEl = document.createElement("option");
                optionEl.value = key;
                optionEl.textContent = key;
                selectEl.appendChild(optionEl);
            }
        }
    }
    else if (dataType === "object") {
        defaultOption.textContent = "Choose one:"

        const optionKeyEl = document.createElement("option");
        optionKeyEl.value = "key";
        optionKeyEl.textContent = "Hash by key";
        selectEl.appendChild(optionKeyEl);

        const optionValEl = document.createElement("option");
        optionValEl.value = "value";
        optionValEl.textContent = "Hash by value";
        selectEl.appendChild(optionValEl);
    }

    return selectEl;
}