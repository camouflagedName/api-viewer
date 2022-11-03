export const generateHeaders = (unorderedIndexEl, unorderedDataEl) => {
    const indexHeaderList = document.createElement("li");
    indexHeaderList.className = "list-group-item bg-primary";

    const indexHeaderEl = document.createElement("h3");
    indexHeaderEl.className = "text-center text-light"
    indexHeaderEl.textContent = "INDEX";

    indexHeaderList.appendChild(indexHeaderEl);

    const dataHeaderList = document.createElement("li");
    dataHeaderList.className = "list-group-item bg-primary";

    const dataHeaderEl = document.createElement("h3");
    dataHeaderEl.className = "text-center text-light"
    dataHeaderEl.textContent = "DATA";
    
    dataHeaderList.appendChild(dataHeaderEl);

    unorderedIndexEl.appendChild(indexHeaderList);
    unorderedDataEl.appendChild(dataHeaderList);
}