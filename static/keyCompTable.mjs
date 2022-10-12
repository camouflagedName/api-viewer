
export const keyCompTable = tempArr => {
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
    const viability = uniqueLvl / cmpLvl;

    //create mini-table
    const table = createTable(uniqueLvl, cmpLvl, viability)

    return table;
}