import { generateView } from "./generateView.mjs";

export const createViewSelect = (key, data) => {

    const viewSelect = document.createElement("select");
    viewSelect.id = "view-select";
    viewSelect.className = "form-select border border-5 border-secondary text-center fs-4";

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