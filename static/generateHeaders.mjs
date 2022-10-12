export const generateHeaders = (unorderedIndexEl, unorderedDataEl) => {
    const indexHeaderList = document.createElement("li");
    indexHeaderList.className = "list-group-item list-group-item-primary";

    const indexHeaderEl = document.createElement("h3");
    indexHeaderEl.className = "text-center"
    indexHeaderEl.textContent = "INDEX";

    indexHeaderList.appendChild(indexHeaderEl);

    const dataHeaderList = document.createElement("li");
    dataHeaderList.className = "list-group-item list-group-item-primary";

    const dataHeaderEl = document.createElement("h3");
    dataHeaderEl.className = "text-center"
    dataHeaderEl.textContent = "DATA";
    
    dataHeaderList.appendChild(dataHeaderEl);

    unorderedIndexEl.appendChild(indexHeaderList);
    unorderedDataEl.appendChild(dataHeaderList);
}