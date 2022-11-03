/**
 * Replaces URL Input Element and makes the URL interactive
 */
export const inputTransformer = (remove) => {
    const routeInputGroup = document.querySelector("#route-input-group");
    let mainContainer;
    if (remove) {
        const routeInputURL= document.querySelector("#route-input-url");
        const routeSearchBtn = document.querySelector("#route-search-btn");
        if (routeInputURL.hidden === false) {
            routeInputURL.hidden = true;
            routeSearchBtn.hidden = true;
        }

       
        //main container
        mainContainer = document.createElement("div");
        mainContainer.className = "d-flex bg-white col rounded border border-primary border-opacity-75 border-3";
        mainContainer.id = "mainURLBtnContainer";

        routeInputGroup.appendChild(mainContainer);        
    }

    return mainContainer;
}