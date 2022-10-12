import { newIndex } from "../static/createContainer.mjs";
import { viewGenerator } from "./viewGenerator.mjs";

const init = () => {
    // const containerEl = document.querySelector("#table-container")
    // containerEl.appendChild(newIndex())
}

// document.onload = newIndex()


const tableSelectEl = document.querySelector("#table-select");
if (tableSelectEl) {
    viewGenerator();
}