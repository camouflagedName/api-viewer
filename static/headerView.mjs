export const headerView = () => {
    const unorderedIndexEl = document.createElement("ul");
    unorderedIndexEl.className = "list-group col";
    unorderedIndexEl.id = "index-list-container";

    const indexHeaderList = document.createElement("li");
    indexHeaderList.className = "list-group-item list-group-item-primary";

    const indexHeaderEl = document.createElement("h3");
    indexHeaderEl.className = "text-center"
    indexHeaderEl.textContent = "INDEX";

    const unorderedDataEl = document.createElement("ul");
    unorderedDataEl.className = "list-group col";
    unorderedDataEl.id = "data-list-container";

    const dataHeaderList = document.createElement("li");
    dataHeaderList.className = "list-group-item list-group-item-primary";

    const dataHeaderEl = document.createElement("h3");
    dataHeaderEl.className = "text-center"
    dataHeaderEl.textContent = "DATA";

    indexHeaderList.appendChild(indexHeaderEl);
    unorderedIndexEl.appendChild(indexHeaderList);
    dataHeaderList.appendChild(dataHeaderEl);
    unorderedDataEl.appendChild(dataHeaderList);
}