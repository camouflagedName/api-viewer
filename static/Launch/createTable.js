/** NEEDS TO BE MOVED TO DIFF FOLDER
 * Takes in array of headers and entries and returns a table element with headers and row of data
 * @param {*} headers 
 * @param {*} entries 
 * @returns 
 */

export const createTable = (headers, entries) => {
    const tableEl = document.createElement("table")
    tableEl.className = "table table-info border border-3 border-primary border-opacity-75 mt-3 mb-0"
    tableEl.id = "table"
    const headEl = document.createElement("thead")
    const bodyEl = document.createElement("tbody")
    const headRowEl = document.createElement("tr")
    const bodyRowEl = document.createElement("tr")


    // header
    const rowHeadElOne = document.createElement("th");
    rowHeadElOne.textContent = "Uniquity";
    rowHeadElOne.className = "text-center";
    
    const rowHeadElTwo = document.createElement("th");
    rowHeadElTwo.textContent = "Collisions";
    rowHeadElTwo.className = "text-center";

    const rowHeadElThree = document.createElement("th");
    rowHeadElThree.textContent = "Longest Collision";
    rowHeadElThree.className = "text-center";

    for (const entry of headers) {
        const rowHeadEl = document.createElement("th");
        rowHeadEl.textContent = entry;
        rowHeadEl.className = "text-center";
        headRowEl.appendChild(rowHeadEl)
    }
    headEl.appendChild(headRowEl)

    // body
    const cellOne = document.createElement("td");
    cellOne.className = "text-center";
    
    const cellTwo = document.createElement("td");
    cellTwo.className = "text-center";

    const cellThree = document.createElement("td");
    cellThree.className = "text-center";

    for (const entry of entries) {
        const cellData = document.createElement("td");
        cellData.textContent = entry;
        cellData.className = "text-center";
        bodyRowEl.appendChild(cellData)
    }
    bodyEl.appendChild(bodyRowEl);

    tableEl.appendChild(headEl);
    tableEl.appendChild(bodyEl);

    return tableEl;
}