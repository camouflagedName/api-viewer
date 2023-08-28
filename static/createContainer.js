import { addNodeBtn } from "./addNodeBtn.js";
import { addKeyEl } from "./addKeyEl.js";

export const createContainer = (indexCount = 0) => {
    const indexCont = document.querySelector("#index-container")
    const keyCont = document.querySelector("#key-container")

    const indexContainer = document.createElement("div");
    indexContainer.className = "d-flex flex-column";

    // build key row
    const inputContainer = document.createElement("div");
    inputContainer.className = "d-flex"

    // index input
    const indexEl = document.createElement("input");
    indexEl.className = "form-control border border-5 border-primary fs-3 text-center";
    indexEl.style.lineHeight = "5rem";
    indexEl.value = indexCount;

    // key input
    const inputEl = addKeyEl(indexCount);

    // add node button
    const nodeBtn = addNodeBtn(inputContainer, indexCount);


    // add row button
    const buttonEl = document.createElement("button");
    buttonEl.className = "col-11 btn btn-transparent border border-0 p-0";

    const btnImg = document.createElement("I");
    btnImg.className = "bi bi-plus-circle-fill text-success fs-1 d-flex justify-content-center align-items-start";

    buttonEl.appendChild(btnImg);
    buttonEl.onclick = () => {
        indexCount++;
        btnImg.remove();
        buttonEl.remove();
        const containerEl = document.querySelector("#key-container")
        containerEl.appendChild(createContainer(indexCount));
    }

    // index col
    indexCont.appendChild(indexEl);
    // key col
    inputContainer.appendChild(inputEl);
    inputContainer.appendChild(nodeBtn);

    keyCont.appendChild(inputContainer);
    keyCont.appendChild(buttonEl);

    return indexContainer;
}