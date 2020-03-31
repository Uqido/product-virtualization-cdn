
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
    if( !window.location.host.replace(":8080","").replace( /localhost|127\.0\.0\.1/i, '' ) ){ 
        return true; 
    }
    return false;
}

function parseJson(json){
    var baseurl=json.baseUrl;
    if(isLocalhost()){
        console.log("Is Localhost!")
        baseurl="";
    }else{
        console.log("Is not Localhost!")
    }
    console.log("Base Url:"+baseurl);
    var assets=json.assets;
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