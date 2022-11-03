export const spinner = () => {

    //container div
    const divEl = document.createElement("div");
    divEl.id = "spinner";
    divEl.className = "spinner-border text-primary";
    const role = document.createAttribute("role");
    role.value = "status";
    divEl.setAttributeNode(role);

    //span element
    const spanEl = document.createElement("span");
    spanEl.className = "visually-hidden";
    spanEl.textContent = "Loading...";
    divEl.appendChild(spanEl);

    return divEl;
}