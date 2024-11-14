
let resize = false;

function resizeAll(/*loading*/) {
    var cropElements = document.getElementsByClassName('crop-height-50-percents');
    for (i = 0; i < cropElements.length; i++) {

        // if (loading) {
        //     cropElements[i].style.visibility = 'hidden';
        //     cropElements[i].parentElement.style.aspectRatio = "16 / 9"
        // }

        cropElements[i].style.height = "unset";
        // force reflow
        // ref: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        console.log(cropElements[i].offsetHeight);
    }
    resize = true;
    setTimeout(() => {
        if (resize) {
            var cropElements = document.getElementsByClassName('crop-height-50-percents');
            for (i = 0; i < cropElements.length; i++) {
                console.log("setting height to ", (cropElements[i].offsetHeight / 2.) + "px")
                cropElements[i].style.height = (cropElements[i].offsetHeight / 2.) + "px";
                // if (loading) {
                    cropElements[i].style.visibility = 'visible';
                    cropElements[i].parentElement.style.aspectRatio = "unset"
                // }
            }
            var loadingElements = document.getElementsByClassName('crop-height-50-percents-loading');
            for (i = 0; i < loadingElements.length; i++) {
                loadingElements[i].style.display = "none";
            }
            resize = false;
        }
    }, 100)

}

window.onload = () => {
    console.log("loading..")
    resizeAll(/*true*/);
}

window.onresize = () => {
    console.log("resizing..")
    resizeAll(/*false*/);
}

window.onorientationchange = () => {
    console.log("orientationchange..")
    resizeAll(/*false*/);
}
