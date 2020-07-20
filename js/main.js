let contentRoot;
let indexesContentRoot;

function getContentRoot(){
    contentRoot=document.getElementById("modelContentRoot")
}

function getIndexesContentRoot() {
    indexesContentRoot=document.getElementById("IndexesContentRoot")
}

function instantiateModelContent(srcUrl,assetName){
    const element = document.createElement("a");
    element.classList.add("image-element");
    element.style.backgroundImage=`url('img/index/${assetName}.jpg')`;
    element.href=`${srcUrl}/${assetName}.html`;
    contentRoot.appendChild(element);
}

function instantiateIndexContent(srcUrl,indexName){
    const element = document.createElement("a");
    element.classList.add("image-element");
    element.style.backgroundImage=`url('img/index/indexes/${indexName}.jpg')`;
    element.href=`${srcUrl}`;
    indexesContentRoot.appendChild(element);
}

function isLocalhost(){
    return !window.location.host.replace(":8080", "").replace(/localhost|127\.0\.0\.1/i, '');
}

function parseJson(json){
    let baseurl = json.baseUrl;
    if(isLocalhost()){
        console.log("Is Localhost!")
        baseurl="";
    }else{
        console.log("Is not Localhost!")
    }
    console.log("Base Url:"+baseurl);
    var assets=json.assets;
    getContentRoot();
    getIndexesContentRoot();
    for(asset of assets){
        instantiateModelContent(`${baseurl}`,asset);
    }

    console.log(json.indexes)
    if(indexesContentRoot!=null && json.indexes!=null){
        for(index of json.indexes){
            instantiateIndexContent(`${index.url}`,index.name);
        }
    }

}


function loadJson(){
    //read json
    fetch("./assets.json")
    .then(response => response.json())
    .then(json => parseJson(json))
}

loadJson();
