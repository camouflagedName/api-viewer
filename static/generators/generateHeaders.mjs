export const generateHeaders = ($unorderedIndexEl, $unorderedDataEl) => {
    const $indexHeaderList = $("<li>").addClass("list-group-item bg-primary");
    const $indexHeaderEl = $("<h3>").addClass("text-center text-light").text("INDEX");
    const $dataHeaderList = $("<li>").addClass("list-group-item bg-primary");
    const $dataHeaderEl = $("<h3>").addClass("text-center text-light").text("DATA");


    $indexHeaderList.append($indexHeaderEl);
    $unorderedIndexEl.append($indexHeaderList);
    $dataHeaderList.append($dataHeaderEl);
    $unorderedDataEl.append($dataHeaderList);
}