import { expandedDataView } from "../displayTable/dataColumn/dataCol.js";
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

/* 
export const showDataModal = (header, data) => {
    const $dataModal = $("#submit-modal");
    const $getDataUL = $("#dataUL");
    const $dataModalTitle = $("#dataModalTitle");
    const $dataModalBody = $("#dataModalBody");
    const $listContainer = $("<ul>");

    $listContainer.attr('id', 'dataUL');
    $dataModal.show();
    $getDataUL?.remove()
    $dataModalTitle.text(header);
    expandedDataView(data, $listContainer); 

    $dataModal.on("hide.bs.modal", () => $dataModalTitle.text(''));

    $dataModalBody.append($listContainer);
}

 */