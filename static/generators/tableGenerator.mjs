import { createTable } from "../Launch/createTable.mjs";

/**
 * Takes in facts about hashmap collisions, passes data and headers to table generator, and returns table (parent node and children).
 * @param {*} value 
 * @param {*} data 
 * @param {*} collisionCount 
 * @param {*} longestCollision 
 * @returns 
 */
export const tableGenerator = (key, data, collisionCount, longestCollision) => {
    let keyVar;
    keyVar = key;


    $("#table")?.remove()

    let uniqueLvlPercentage = "100%";
    if (key) {
        let tempArr = JSON.parse(JSON.stringify(data))
        let index = 0;
        let cmpLn = 0;

        // at end of each loop, tempArr holds vals that diff from curr value
        for (const firstIndex in tempArr) {
            let count = index + 1;
            let remove = false;

            while (count < tempArr.length) {
                let currItem = tempArr[index][keyVar];
                let nextItem = tempArr[count][keyVar];

                if (currItem === nextItem) {
                    remove = true;
                    if (typeof (tempArr[count][keyVar]) === "number") {
                        cmpLn += tempArr[count][keyVar];
                    }
                    else if (tempArr[count][keyVar] === null) {
                        cmpLn += 0;
                    }
                    else {
                        cmpLn += tempArr[count][keyVar].toString().length;
                    }

                    tempArr.splice(count, 1)
                }
                else {
                    count++;
                }
            }
            if (typeof (tempArr[index][keyVar]) === "number") {
                cmpLn += tempArr[index][keyVar];
            }
            else if (tempArr[index][keyVar] === null) {
                cmpLn += 0;
            }
            else {
                cmpLn += tempArr[index][keyVar].toString().length;
            }
            if (remove) {
                tempArr.splice(index, 1)
            }
            else {
                index++;
            }
        }

        const cmpLvl = cmpLn / data.length;
        const uniqueLvl = tempArr.length / data.length * 100;
        uniqueLvlPercentage = (Math.round((uniqueLvl + Number.EPSILON) * 100) / 100).toString() + "%";
        const viability = uniqueLvl / cmpLvl;
    }

    //create mini-table
    const dataArray = [uniqueLvlPercentage, collisionCount, longestCollision];
    const headerArray = ["Uniquity", "Collisions", "Longest Collision"];
    const table = createTable(headerArray, dataArray)

    return table;
}