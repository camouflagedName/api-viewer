import { createViewSelect } from "../components/input/createViewSelect.mjs";
import { generateView } from "../generators/generateView.mjs";
import { selectContainer } from "../components/input/hashSelectContainer.mjs";

export const getDataFromURL = async (evt) => {
    evt.preventDefault();
    const inputEl = document.querySelector("#route-input-url");
    const addtlCont = document.querySelector("#additional-container");

    if (addtlCont) {
        addtlCont.remove();
    }

    const URL = inputEl.value;

    try {
        let getResponse = await fetch(URL);

        if (getResponse.ok) {
            let getData = await getResponse.json();
            let dataType;

            // check if array
            if (getData.constructor === Array) {
                dataType = "array";
            }
            else if (typeof (getData) === "object") {
                dataType = "object";
            }
            // create view selector
            const viewSelect = createViewSelect();
            viewSelect.onchange = evt => {
                // create key selector
                const keySelectorEl = document.querySelector('#key-selector');
                const indexListCont = document.querySelector("#data-list-container");
                const dataListCont = document.querySelector("#index-list-container");
                const tableEl = document.querySelector("#table");
                const listType = evt.target.value;

                if (indexListCont && dataListCont) {
                    indexListCont.remove();
                    dataListCont.remove();
                }

                if (keySelectorEl) {
                    keySelectorEl.remove();
                }

                if (tableEl) {
                    tableEl.remove();
                }

                generateView(false, getData, listType, dataType);
            }

            const selectContainerEl = selectContainer(viewSelect);

            // insert with route input
            const routeSelCont = document.querySelector("#route-input-container");
            routeSelCont.appendChild(selectContainerEl);
        }

        else {
            throw `Route is invalid!`;
        }
    }
    catch (error) {
        const routeInputErrMsgEl = document.querySelector("#routeInputErrMsg");
        routeInputErrMsgEl.textContent = error;
        console.log(error);
    }
}