load('libs.js');
load('gbk.js');
function execute(url) {
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let htm = doc.select("#chapter-content").html();
            htm.select("h2").remove();
            htm = cleanHtml(htm);
            return Response.success(htm);
        }
        return null;
    } catch (error) {
        return Response.success(error.message);
    }
}