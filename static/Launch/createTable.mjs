export const createTable = (uniqueLvl, cmpLvl, viability, collisionCount, longestCollision) => {
    const tableEl = document.createElement("table")
    tableEl.className = "table bg-secondary bg-gradient border border-primary text-light mt-3 mb-0"
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

    headRowEl.appendChild(rowHeadElOne)
    headRowEl.appendChild(rowHeadElTwo)
    headRowEl.appendChild(rowHeadElThree)
    headEl.appendChild(headRowEl)

    // body
    const cellOne = document.createElement("td");
    cellOne.textContent = Math.round((uniqueLvl + Number.EPSILON) * 100) / 100 + "%";
    cellOne.className = "text-center";
    
    const cellTwo = document.createElement("td");
    cellTwo.textContent = collisionCount;
    cellTwo.className = "text-center";

    const cellThree = document.createElement("td");
    cellThree.textContent = longestCollision;
    cellThree.className = "text-center";

    bodyRowEl.appendChild(cellOne)
    bodyRowEl.appendChild(cellTwo)
    bodyRowEl.appendChild(cellThree)
    bodyEl.appendChild(bodyRowEl)

    tableEl.appendChild(headEl)
    tableEl.appendChild(bodyEl)

    return tableEl
}