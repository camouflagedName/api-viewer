export const indexCol = (val) => {
    const indexListEl = document.createElement("li");
    indexListEl.className = "list-group-item list-group-item-primary"

    const indexListValEl = document.createElement("input");
    indexListValEl.className = "form-control text-center"
    indexListValEl.value = val;
    indexListValEl.disabled = true;

    indexListEl.appendChild(indexListValEl);

    return indexListEl;
}