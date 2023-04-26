export const spinner = () => {

    //container div
    const $divEl = $("<div>");
    $divEl.attr('id', 'spinner');
    $divEl.attr('role', 'status');
    $divEl.addClass("spinner-border text-primary");

    //span element
    const $spanEl = $("<span>");
    $spanEl.addClass("visually-hidden");
    $spanEl.text("Loading...");

    $divEl.append($spanEl);

    return $divEl;
}