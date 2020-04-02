
var contentRoot;

function getContentRoot() {
    contentRoot = document.getElementById("modelContentRoot")

}

function instantiateModelContent(view360url, model3Durl) {
    var modelHtml = `
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
                                <div title="SYMBOL UOMO" class="tile_product-name">
                                    SYMBOL UOMO
                                </div>
                                <div class="pdp-price">
                                    <div class="pdp-price__details">
                                        <span class="pdp_price__label">Prezzo</span>
                                    </div>
                                    <div class="pdp-price__final">
                                        <span class="price-currency">€</span>99,90
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                    `
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
        instantiateModelContent(`${baseurl}/${asset}.html`,`${baseurl}/${asset}Model.html`);
    }
}


function loadJson() {
    //read json
    fetch("./assets.json")
        .then(response => response.json())
        .then(json => parseJson(json))
}

loadJson();