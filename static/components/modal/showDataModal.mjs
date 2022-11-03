import { expandedDataView } from "../displayTable/dataColumn/dataCol.mjs";
/**
 * 
 * @param {*} header 
 * @param {*} body 
 */
export const showDataModal = (header, data) => {
    const dataModal = document.querySelector("#submit-modal");
    const getDataUL = document.querySelector("#dataUL");
    dataModal.hidden = false;
    if (getDataUL) {
        getDataUL.remove()
    }

    const dataModalTitle = document.querySelector("#dataModalTitle");
    const dataModalBody = document.querySelector("#dataModalBody");

    const listContainer = document.createElement("ul");
    listContainer.id = "dataUL";

    dataModalTitle.textContent = header;
    expandedDataView(data, listContainer); 

    dataModal.addEventListener("hide.bs.modal", () => {
        dataModalTitle.textContent = '';
    })

    dataModalBody.appendChild(listContainer);
}