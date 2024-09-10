document.getElementById("flowerForm").innerHTML = `
<iframe id="flowerIframe" 
    style="border: none; width: 100%;"
    src="/pub/account">
</iframe>`

const frame = document.getElementById("flowerIframe")

function autoresizeFrame() {
    if (frame.contentWindow.document.body) {
        const height = frame.contentWindow.document.body.offsetHeight
        frame.style.height = height
        const width = frame.contentWindow.document.body.offsetWidth
        frame.style.width = width
    }
}

const auto_resize_timer = window.setInterval("autoresizeFrame()", 400)
