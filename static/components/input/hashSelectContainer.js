export const selectContainer = (viewSelectEl) => {
    // create container for view selector and key selector
    const addtlContEl = document.createElement("div");
    addtlContEl.id = "additional-container";
    addtlContEl.className = "col col-md-3 mx-3 my-auto";

    if (viewSelectEl) {
        addtlContEl.appendChild(viewSelectEl);
    }

    return addtlContEl;
}