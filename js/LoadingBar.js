const mviewer = document.getElementsByTagName("model-viewer")[0];


if(mviewer) {
    mviewer.classList.add("no-default-loading");
    mviewer.innerHTML += `<div class="iframe-loader" id="loading-bar">
        Loading 0%
    <div style="width: 0%;"></div>
        </div>`;

    const progress = document.getElementById('loading-bar');


    mviewer.addEventListener("progress", function (event) {
        const percent = parseInt(event.detail.totalProgress) * 100;
        console.log(percent);
        if (percent === 100) {
            progress.classList.add("hidden");
        }

        progress.innerHTML = `Loading ${percent}%
                                <div style="width: ${percent}%;"></div>
                                `

    });
}
