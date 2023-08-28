import { generateView } from "../../generators/generateView.js";

export const buttonContainer = (currentKey, prev, depth) => {
    const columnContainer = $("<div>");
    columnContainer.addClass("d-flex border border-2 rounded my-2 mx-1");

    const inputButtonEl = $("<button>");
    inputButtonEl.addClass("btn btn-transparent border border-0 text-break");
    inputButtonEl.text(currentKey);
    inputButtonEl.attr("id", depth ? `routeInput-${depth.toString()}` : "route-input-url");

    const closeBtn = $("<button>");
    closeBtn.attr("type", 'button');
    closeBtn.addClass("btn-close");
    closeBtn.attr("ariaLabel", 'Close');
    closeBtn.css("fontSize", "10px");
    closeBtn.on('click', () => {
        let prevData;
        if (prev) {
            const buttonArr = $("#mainURLBtnContainer div");
            const arrowElArr = $(".bi.bi-arrow-right")

            if (prev.data.constructor === Map) {
                if (prev.dataType === "object") {
                    prevData = Object.fromEntries(prev.data);
                } else {
                    throw `Uncaught data type: ${prev.dataType}`;
                }
            } else {
                prevData = prev.data;
            }

            for (const index in buttonArr) {
                if (index >= depth) {
                    buttonArr[index].remove();
                    arrowElArr[index - 1].remove();
                }
            }

            const viewSelect = $("#view-select");
            viewSelect.value = prev.viewType;
            viewSelect.on('change', evt => {
                // create key selector
                const keySelectorEl = $('#key-selector');
                const indexListCont = $("#data-list-container");
                const dataListCont = $("#index-list-container");
                const tableEl = $("#table");
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

                generateView(false, prevData, listType, prev.dataType);
            });

            generateView(false, prevData, prev.viewType, prev.dataType);
        }
        // remove initial URL BUTTON
        else {
            const submitBtn = $("#submit");

            if ($("#route-input-url").is(':hidden')) {
                $("#route-input-url").show()
                $("#route-search-btn").show()
                $("#route-input-url").val('');
            }

            $("#additional-container")?.remove();
            $("#mainURLBtnContainer")?.remove();
            $("#index-list-container")?.remove();
            $("#data-list-container")?.remove();
            $("#table")?.remove();
            $("#spinner")?.remove();
            $("#submit").prop('disabled', true).hide();
        }
    });

    columnContainer.append(inputButtonEl);
    columnContainer.append(closeBtn);

    return columnContainer;
}