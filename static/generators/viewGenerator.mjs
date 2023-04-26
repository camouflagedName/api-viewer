import { generateView } from "./generateView.mjs";
import { getDataFromURL } from "../utils/getDataFromURL.mjs";
import { createTable } from "../Launch/createTable.mjs";
import { inputTransformer } from "../components/input/inputTransformer.mjs";
import { buttonContainer } from "../components/input/buttonContainer.mjs";

export const viewGenerator = () => {
    const $submitEl = $("#table-form");
    const $routeInput = $("#route-input-url");
    const $tableSearchBtn = $("#table-search-btn");
    const $routeBtn = $("#route-search-btn");
    let tableName;

    /** FUNCTION DEFS **/
    const handleSubmit = (el) => {
        let inputArr = [];

        for (let i of el.target) {
            if (i.id.substring(0, 5) === "index") {
                let row = parseInt(i.id[6]);
                let col = parseInt(i.id[13]);
                if (col === 0) {
                    inputArr[row] = []

                }
                inputArr[row][col] = i.value;
            }
        }
        return false;
    }

    const getTableFromDatabase = async () => {
        try {
            const getResponse_delete = await fetch("/get_table", {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: tableName })
            });

            const getResponse = await $.ajax({
                url: "/get_table",
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ name: tableName })
            });

            if (getResponse) {
                //const returnData = await getResponse.json();
                const data = typeof (getResponse.data) === "string" ? JSON.parse(getResponse.data) : getResponse.data;
                let key = getResponse.key;
                const metaData = getResponse.meta_data;
                const tableType = getResponse.type;

                // generate meta table
                const $tableContainer = $("#metaTableContainer");
                const headers = ["Table Name", "URL", "Type", "Creation Date"]
                const tableEl = createTable(headers, metaData);
                $tableContainer.append(tableEl);

                let dataType;

                // check if array
                if (data.constructor === Array) {
                    dataType = "array";
                }
                else if (typeof (data) === "object") {
                    dataType = "object";
                }

                if (!key) key = true;
                generateView(key, data, tableType, dataType);
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    /** EVENTS */

    $routeInput.on('change', () => {
        const $routeInputErrMsgEl = $("#routeInputErrMsg");
        $routeInputErrMsgEl.text('');

        if ($routeInput.val() === '' || $routeInput.val().match(/\s/g)) {
            $routeBtn.prop('disabled', true);
        }
        else {
            $routeBtn.prop('disabled', false);
        }
    });

    if ($("#table-select")) {
        $("#table-select").on('change', evt => {
            tableName = evt.target.value;
            $tableSearchBtn.prop('disabled', false);
        });


        $tableSearchBtn.on('click', () => {

            const $indexListCont = $("#data-list-container");
            const $dataListCont = $("#index-list-container");
            const $table = $("#table");

            // check if data-list-container and index-list-container exist and then remove
            if ($indexListCont && $dataListCont) {
                $indexListCont.remove();
                $dataListCont.remove();
            }

            if ($table) {
                $table.remove();
            }

            $("#route-input-group").hide();
            $("#ORHeader").hide();
            getTableFromDatabase()
        });
    }

    $routeBtn.on('click', (evt) => {
        const $indexListCont = $("#data-list-container");
        const $dataListCont = $("#index-list-container");
        const $table = $("#table");

        if ($indexListCont && $dataListCont) {
            $indexListCont.remove();
            $dataListCont.remove();
        }

        if ($table) {
            $table.remove();
        }

        getDataFromURL(evt);

        //replace url input and append with button
        const inputTransformerObj = inputTransformer(true);
        const buttonContainerObj = buttonContainer($routeInput.val());
        inputTransformerObj.append(buttonContainerObj);

        if ($("#table-select")) {
            $("#ORHeader").hide();
            $tableSearchBtn.hide()
            $("#table-select").hide();
        }
    });

    $submitEl.on('submit', () => handleSubmit());
}