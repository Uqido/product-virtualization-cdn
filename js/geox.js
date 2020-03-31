
var contentRoot;

function getContentRoot() {
    contentRoot = document.getElementById("modelContentRoot")

}

function instantiateModelContent(view360url, model3Durl) {
    var modelHtml = `
                    <div>
                    <p class="lp-element lp-code" id="lp-code-40" style="width: 300px; height: 300px;">
                            <iframe src="${view360url}" frameborder="0" allowfullscreen="" scrolling="no" style="width: 300px; height: 300px;"></iframe>
                    </p>
                    <div id="view-3d-model" class="product-details">
                        <div class="first-line">
                            <span class="colors">1
                                colore
                            </span>
                            <div class="category">SCARPE CASUAL</div>
                        </div>
                        <a title="SYMBOL UOMO"
                            class="tile_product-name">
                            SYMBOL UOMO
                        </a>
                        <div class="pdp-price">
                            <div class="pdp-price__details">
                                <span class="pdp_price__label">Prezzo</span>
                            </div>
                            <div class="pdp-price__final">
                                <span class="price-currency">€</span>99,90
                            </div>
                        </div>
                    </div>
                    <script>
                        const button = document.getElementById('view-3d-model');

                        button.addEventListener("click", function () {
                            window.open("${model3Durl}", "_blank")
                        }, true)
                    </script>
                    </div>
                    `
    contentRoot.innerHTML += modelHtml
}

function isLocalhost() {
    if (!window.location.host.replace(/localhost|127\.0\.0\.1/i, '')) {
        return false;
    }
    return true;
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