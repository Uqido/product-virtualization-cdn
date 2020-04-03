
var contentRoot;

function getContentRoot() {
    contentRoot = document.getElementById("modelContentRoot")

}

function instantiateModelContent(view360url, model3Durl, assetName) {
    var modelHtml;
    var price;
    switch(assetName){
        case "GeoxBeige":
            assetName = "Scarpa Beige";
            price = "109,90";
            break;
        case "GeoxBlu1":
            assetName = "Scarpa Blu 1";
            price = "79,90";
            break;
        case "GeoxBlu2":
            assetName = "Scarpa Blu 2";
            model3Durl = "VirtualShoe1.html";
            price = "84,90";
            break;
        case "GeoxBordeaux":
            assetName = "Scarpa Bordeaux";
            price = "104,90";
            break;
        case "GeoxRossoOro":
            assetName = "Scarpa Rosso-oro";
            price = "69,90";
            model3Durl = "VirtualShoe2.html";
            break;
        case "Leopardata":
            price = "119,90";
            break;
        case "Stivaletto":
            model3Durl = "VirtualShoe3.html";
            price = "99,90";
            break;
    }
    if (assetName == "Scarpa Blu 2" || assetName == "Scarpa Rosso-oro" || assetName == "Stivaletto"){
        modelHtml = `
                    <li class="grid-tile col col-sm-6 col-lg-4">
                        <div class="product-tile-container">
                            <div class="product-image 360view-container" style="min-height: 300px; background-color:#f2f2f2;">
                                    <iframe class="360view-frame" src="${view360url}" frameborder="0" allowfullscreen="" scrolling="no" 
                                            style="width: 100%; min-height: 300px; height: 100%;"></iframe>
                            </div>
                            <a href="${model3Durl}" target="_blank" class="product-details">
                                <div class="first-line">
                                    <span class="colors">1
                                        colore
                                    </span>
                                    <div class="category">SCARPE CASUAL</div>
                                </div>
                                <div title="${assetName}" class="tile_product-name">
                                    ${assetName}
                                </div>
                                <div class="pdp-price">
                                    <div class="pdp-price__details">
                                        <span class="pdp_price__label">Prezzo</span>
                                    </div>
                                    <div class="pdp-price__final">
                                        <span class="price-currency">€</span>${price}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                    `
    }
    else{
        modelHtml = `
                    <li class="grid-tile col col-sm-6 col-lg-4">
                        <div class="product-tile-container">
                            <div class="product-image 360view-container" style="min-height: 300px; background-color:#f2f2f2;">
                                    <iframe class="360view-frame" src="${view360url}" frameborder="0" allowfullscreen="" scrolling="no" 
                                            style="width: 100%; min-height: 300px; height: 100%;"></iframe>
                            </div>
                            <a target="_blank" class="product-details">
                                <div class="first-line">
                                    <span class="colors">1
                                        colore
                                    </span>
                                    <div class="category">SCARPE CASUAL</div>
                                </div>
                                <div title="${assetName}" class="tile_product-name">
                                    ${assetName}
                                </div>
                                <div class="pdp-price">
                                    <div class="pdp-price__details">
                                        <span class="pdp_price__label">Prezzo</span>
                                    </div>
                                    <div class="pdp-price__final">
                                        <span class="price-currency">€</span>${price}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                    `
    }
    contentRoot.innerHTML += modelHtml
}

function isLocalhost() {
    if( !window.location.host.replace(":8080","").replace( /localhost|127\.0\.0\.1/i, '' ) ){ 
        return true; 
    }
    return false;
}

function parseJson(json) {
    var baseurl = json.baseUrl;
    if (isLocalhost())
        baseurl = "";
    var assets = json.assets_shoes;
    getContentRoot();
    for (asset of assets) {
        instantiateModelContent(`${baseurl}/${asset}.html`,`${baseurl}/${asset}Model.html`,asset);
    }
}


function loadJson() {
    //read json
    fetch("./assets.json")
        .then(response => response.json())
        .then(json => parseJson(json))
}

loadJson();