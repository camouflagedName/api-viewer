import { addKeyEl } from "./addKeyEl.js";
import { addArrow } from "./addArrow.js";

export const addNodeBtn = (container, count, nodeCount = 0) => {
    const btnContainer = document.createElement("div");
    btnContainer.className = "col-1 p-0 d-flex align-content-center"

    const nodeBtn = document.createElement("button");

    nodeBtn.className = "btn btn-transparent border border-0 p-0 text-start";

    const nodeBtnImg = document.createElement("I");
    nodeBtnImg.className = "bi bi-plus-circle-fill text-success fs-1";

    nodeBtn.appendChild(nodeBtnImg);
    btnContainer.appendChild(nodeBtn)

    nodeBtn.onclick = () => {
        nodeCount++;
        nodeBtn.remove();
        btnContainer.remove()

        const arrow = addArrow();
        container.appendChild(arrow);

        const newInputEl = addKeyEl(count, nodeCount);
        container.appendChild(newInputEl);

        const newBtn = addNodeBtn(container, count, nodeCount);
        container.appendChild(newBtn)
    }

    return btnContainer;
}