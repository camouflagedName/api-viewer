export const addArrow = (size = "40") => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "col-1 p-0 d-flex align-content-center"

    const nodeArrow = document.createElement("I");
    nodeArrow.className = "bi bi-arrow-right p-0 d-flex align-items-center";
    nodeArrow.style.fontSize = `${size}px`;

    return nodeArrow;
}