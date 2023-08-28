import { addNodeBtn } from "./addNodeBtn.js";

export const addKeyEl = (indexCount, nodeCount = 0) => {
    const inputEl = document.createElement("input");

    inputEl.className = "col form-control border border-5 border-primary fs-3 text-center";
    inputEl.id = `index-${indexCount} node-${nodeCount}`;
    inputEl.style.lineHeight = "5rem";

    //const nodeBtn = addNodeBtn(container, indexCount);
    //container.appendChild(nodeBtn)

    return inputEl;
}