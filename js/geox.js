
var contentRoot;

function getContentRoot(){
    contentRoot=document.getElementById("modelContentRoot")
    
}

function instantiateModelContent(srcUrl){
    var modelHtml=`
                    <div class="lp-element lp-code" id="lp-code-40" style="width: 300px; height: 300px;">
                            <iframe src="${srcUrl}" frameborder="0" allowfullscreen="" scrolling="no" style="width: 300px; height: 300px;"></iframe>
                    </div>
                    `
    contentRoot.innerHTML+=modelHtml
}

function isLocalhost(){
    if( !window.location.host.replace( /localhost|127\.0\.0\.1/i, '' ) ){ 
        return false; 
    }
    return true;
}

function parseJson(json){
    var baseurl=json.baseUrl;
    if(isLocalhost())
        baseurl="";
    var assets=json.assets_shoes;
    getContentRoot();
    for(asset of assets){
        instantiateModelContent(`${baseurl}/${asset}.html`);
    }
}


function loadJson(){
    //read json
    fetch("./assets.json")
    .then(response => response.json())
    .then(json => parseJson(json))
}

loadJson();