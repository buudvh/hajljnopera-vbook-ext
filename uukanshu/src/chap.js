load('libs.js');
function execute(url) {
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            let elm = doc.select("div.readcotent bbb font-normal");
            let htm = elm.html();
            htm = cleanHtml(htm);
            return Response.success(htm);
        }
        return null;
    } catch (error) {
        return Response.success(error.message);
    }
}