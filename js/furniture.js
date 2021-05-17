var contentRoot;

function getContentRoot() {
    contentRoot = document.getElementById("modelContentRoot")
}

function instantiateModelContent(view360url, model3Durl, assetName) {
    var modelHtml;
    var category;
    var price;
    switch (assetName) {
        case "PoltronaPolpetta":
            assetName = "Poltrona Polpetta";
            category = "POLTRONA";
            price = "399,00";
            break;
        case "FuturismChair":
            assetName = "Futurism Chair";
            category = "SEDIA";
            price = "199,00";
            break;
        case "Pianta":
            assetName = "Pianta";
            category = "PIANTA";
            price = "29,00";
            break;
        case "MarbleSink":
            assetName = "Lavello in marmo";
            category = "BAGNO";
            price = "999,00";
            break;
        case "MarbleTable":
            assetName = "Tavolo in marmo";
            category = "TAVOLO";
            price = "999,00";
            break;
        case "Vallentuna":
            assetName = "Vallentuna";
            category = "DIVANO";
            price = "699,00";
            break;
        
    }
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
                                <div class="category">${category}</div>
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
    contentRoot.innerHTML += modelHtml
}

function isLocalhost() {
    if (!window.location.host.replace(":8080", "").replace(/localhost|127\.0\.0\.1/i, '')) {
        return true;
    }
    return false;
}

function parseJson(json) {
    var baseurl = json.baseUrl;
    if (isLocalhost())
        baseurl = "";
    var assets = json.assets_forniture;
    getContentRoot();
    for (asset of assets) {
        instantiateModelContent(`${baseurl}/furniture/${asset}.html`, `${baseurl}/furniture/${asset}.html`, asset);
    }
}

function loadJson() {
    //read json
    fetch("./assets.json")
        .then(response => response.json())
        .then(json => parseJson(json))
}

loadJson();