
const renderLinks = (context) => {
    const links = []
    for (let link of context.config.footer) {
        links.push(context.localize(link.html))
    }
    return links.join("&nbsp;&nbsp;|&nbsp;&nbsp;")
}

const renderFooter = (context) => {
    return `
    <!--Footer-->
    <footer class="container-fluid bg-body-tertiary">
        <div>
            <div class="row">
                <!--Copyright-->
                <div class="py-3 my-3 text-center container-fluid">
                    ${renderLinks(context)}              
                </div>
        
            </div>
        </div>
    </footer>`
}

module.exports = {
    renderFooter
}
