console.log("kuru");

let kuru_image = new Image();

const ThumbnailSearchQuery = "ytd-thumbnail:not(.ytd-video-preview, .ytd-rich-grid-slim-media) a > yt-image > img.yt-core-image:only-child:not(.yt-core-attributed-string__image-element),.ytp-videowall-still-image:not([style*='extension:'])";
let SourceUrl = null;

try {
    SourceUrl = browser.runtime.getUrl("./superior.gif");
} catch(err){
    console.error(err);
    SourceUrl = "https://github.com/AmashiM/KuruExtention/tree/main/chrome/assets/superior.gif";
}


function applyThumbnail(thumbnailElement){
    if(thumbnailElement.hasAttribute("data-kuru-loaded")){
        return;
    }
    if (thumbnailElement.nodeName == "IMG") {
        const overlayImage = document.createElement("img");
        overlayImage.src = SourceUrl;
        overlayImage.style.position = "absolute";
        overlayImage.style.bottom = "0";
        overlayImage.style.left = "0";
        overlayImage.style.width = "50%";
        overlayImage.style.height = "auto";
        overlayImage.style.zIndex = "0";
        thumbnailElement.style.position = "relative";
        thumbnailElement.parentElement.appendChild(overlayImage);
    } else if (thumbnailElement.nodeName == "DIV") {
        thumbnailElement.style.backgroundImage = `url("${overlayImageURL}"), ` + thumbnailElement.style.backgroundImage;
    }
    thumbnailElement.setAttribute("data-kuru-loaded", "");
}

    
function applyThumbnailToImages(){
    document.querySelectorAll(ThumbnailSearchQuery).forEach(thumbnailElement => applyThumbnail(thumbnailElement));
}


if(SourceUrl != null){
    kuru_image.src = SourceUrl;
    kuru_image.onload = () => {
        setInterval(applyThumbnailToImages, 100);
    }
} else {
    console.log("source url is null");
}