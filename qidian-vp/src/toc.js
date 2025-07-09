load('config.js')
function execute(url) {
    let response = fetch(url + "/muc-luc");
    if (response.ok) {
        let doc = response.html();
        let elms = doc.select("#chapter-list a");
        const data = [];
        elms.forEach(e => {
            data.push({
                name: e.select("h3").text(),
                url: e.attr("href")
            });
        })
        return Response.success(data);
    }
    return null;
}