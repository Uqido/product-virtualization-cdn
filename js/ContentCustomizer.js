
document.addEventListener('DOMContentLoaded', ()=>initCallbacks(), false);

if (typeof modelviewer === "undefined") {
    window.modelviewer = document.getElementsByTagName("model-viewer")[0];
}

modelviewer.addEventListener("worklet-created", (event) => {
    if (typeof worker === "undefined") {
        window.worker = event.detail.worklet;
    }else {
        worker = event.detail.worklet;
    }
})

const buttons=document.getElementsByClassName("color-button")

function clearSelected() {
    for (let button of buttons) {
        button.classList.remove("selected")
    }
}

function colorToArray(color) {
    return color.replace(/[^\d,]/g, '').split(',').map(value => value / 255);
}

let NameToColor;

function initCallbacks() {
    for (let button of buttons) {
        button.onclick = onClickCallback;
    }
}

function onClickCallback(event) {
    if (worker === undefined) return;
    if (NameToColor === undefined) return;

    const found=NameToColor.find(elem => Object.keys(elem)[0]===event.target.id)

    if (found === undefined) return;

    const colorString=Object.values(found)[0]

    let color = colorToArray(colorString);
    worker.postMessage({type: "change-color", payload: color})
    clearSelected()
    event.target.classList.add("selected")
}



function assignColorToButton(buttonNameAndColor) {
    console.log(buttonNameAndColor)
    NameToColor=buttonNameAndColor;
}


function initializeCustomizerOnMaterials(materialsName) {
    if (modelviewer === undefined) return;

    modelviewer.innerHTML +=`<script type="experimental-scene-graph-worklet"  allow="material-properties;messaging">

        console.log('Hello from the scene graph worklet!');

        let materials=[]
    
        self.addEventListener('model-change', () => {
            for(let matName of [${materialsName.map(elem=> '"'+elem+'"')}]){
                materials.push(model.materials.find(mat=> mat.name===matName));
            }
        });
    
        self.addEventListener('message', (event) => {
            /*if(event.data.type==="toggle-visibility"){
                if(ColoredMat.visible===true){
                    console.log('Become invisible');
                    ColoredMat.setVisible(false);
                }else{
                    console.log('Become visible');
                    ColoredMat.setVisible(true);
                }
            }else */if(event.data.type==="change-color"){
                console.log('Changing color to:', event.data.payload);
                for(let mat of materials){
                    mat.pbrMetallicRoughness.setBaseColorFactor(event.data.payload);
                }
            }
        });
</script>`
}
