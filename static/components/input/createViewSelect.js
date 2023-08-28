export const createViewSelect = () => {

    const viewSelect = document.createElement("select");
    viewSelect.id = "view-select";
    viewSelect.className = "form-select border border-3 border-primary border-opacity-75 text-center fs-4";

    const defaultOpt = document.createElement("option");
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    defaultOpt.textContent = "Select table type..."

    const listOpt = document.createElement("option");
    listOpt.value = "List";
    listOpt.textContent = "List";

    const hashOpt = document.createElement("option");
    hashOpt.value = "Hash";
    hashOpt.textContent = "Hash";

    viewSelect.appendChild(defaultOpt);
    viewSelect.appendChild(listOpt);
    viewSelect.appendChild(hashOpt);

    return viewSelect;
}