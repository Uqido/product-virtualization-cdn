class UqidoModelViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
<model-viewer id="modelViewer"
              class='model-viewer' ar autoplay camera-controls src='models/ManiciAR.glb'
              ios-src='models/ManiciAR.usdz' alt='' noloop
              exposure="0.6" shadow-intensity="1.5" shadow-softness="0.8" quick-look-browsers="safari chrome">
    <script src="js/LoadingBar.js"></script>
    <div class="unselectable" id="hotspot-button" slot="hotspot-button" data-position="-0.07 0.085 0" data-normal="0 1 0">
        <div class="unselectable" style="display: flex;transform: translateX(50%)">
            <div style="width: 2px; height: 100px; background-color: #6ca0cf"></div>
            <div class="unselectable text-white" style="height: 30px;margin-left:8px;margin-top:-4px;max-width: 200px;font-size: medium;">EASY & SAFE DETACHING BUTTON</div>
        </div>
    </div>
    <div class="unselectable" id="hotspot-grip" slot="hotspot-grip" data-position="-0.2 0.03 0" data-normal="0 1 0">
        <div class="unselectable" style="display: flex;">
            <div class="unselectable text-white" style="height: 30px;margin-left:8px;margin-top:-4px;max-width: 200px;font-size: medium;">FULL AND ROUND BACK FOR PERFECT GRIP</div>
        </div>
    </div>
    <div class="viewer-bottom">
        <div id="colorBlack" class="clickable color-button selected" style="background-color: rgb(10,10,10);"></div>
        <div id="colorRed" class="clickable color-button" style="background-color: rgb(231,15,8);"></div>
        <div id="colorGrey" class="clickable color-button" style="background-color: rgb(85,84,84);"></div>
        <div id="move_camera" class="clickable" style="background-image: url(img/Move.png);"></div>
    </div>
    <script src="js/ContentCustomizer.js"></script>
    <script>
        initializeCustomizerOnMaterials(["Manico_mat"])

        assignColorToButton([{colorBlack: 'rgb(10,10,10)'}, {colorRed: 'rgb(231,15,8)'},
            {colorGrey: 'rgb(85,84,84)'}]);

        const cameraSwitch = document.getElementById('move_camera');

        const positions = ["35deg 65deg 105%", "-60deg 65deg 105%", "180deg 65deg 105%"];

        const annotations=[document.getElementById("hotspot-button"),document.getElementById("hotspot-grip")];
        for (let annotation of annotations) {
            annotation.style.display="none";
        }

        const positionToAnnotation={0:[],1:["hotspot-grip"],2:["hotspot-button"]};

        let cameraIndex = 0;

        cameraSwitch.onclick = rotateCamera;

        function rotateCamera() {
            cameraIndex = (++cameraIndex) % positions.length;

            const toEnable = positionToAnnotation[cameraIndex];

            for (let annotation of annotations) {
                annotation.style.display="none";
                if(toEnable.includes(annotation.id)){
                    annotation.style.display="block";
                }
            }


            modelViewer.cameraOrbit = positions[cameraIndex];
        }

        console.log(window.changeColor);

        if(typeof window.changeColor==="undefined"){
            window.changeColor=function (color) {
                let arraycolor=colorToArray(color);
                worker.postMessage({type: "change-color", payload: arraycolor})
            }
        }

        if(typeof window.rotate==="undefined"){
            window.rotate=function () {
                rotateCamera();
            }
        }

        window.addEventListener("message",receiveMessage,false);

        function receiveMessage(event) {
            if(!event.data)
                return;
            const action = JSON.parse(event.data);
            if(!action.action)
                return;
            if(action.action==="changeColor"){
                changeColor(action.data);
            }else if(action.action==="changeCamera"){
                rotateCamera();
            }
        }

    </script>
</model-viewer>
<script type="module" src="js/model-viewer/dist/model-viewer-new.js"></script>`
    }
}

window.customElements.define('uqido-model-viewer', UqidoModelViewer);
