/**
 * Replaces URL Input Element and makes the URL interactive
 */
export const inputTransformer = (remove) => {
    const routeInputGroup = $("#route-input-group");
    let mainContainer;
    if (remove) {
        if ($("#route-input-url").is(':visible')) {
            $("#route-input-url").hide();
            $("#route-search-btn").hide();
        }

        //main container
        mainContainer = $("<div>");
        mainContainer.addClass("d-flex flex-column flex-md-row bg-white col rounded border border-primary border-opacity-75 border-3");
        mainContainer.attr('id', "mainURLBtnContainer");

        routeInputGroup.append(mainContainer);        
    }

    return mainContainer;
}