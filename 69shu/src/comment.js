load('config.js');
function execute(bookid, next) {
    if (!next) next = "0"
    let response = fetch("http://14.225.254.182/io/comment/webComments", {
        method: 'POST',
        body: JSON.stringify({
            "start": next,
            "objectid": bookid,
            "objecttype": "69shu"
        })
    });
    if (response.ok) {
        let doc = response.html();
        let comments = [];
        let listCmtElm = doc.select('div.flex')
        listCmtElm.forEach(function (e) {
            comments.push({
                name: e.select('div.sec-bot a').text(),
                content: e.select('div.sec-top').text(),
            });
        });

        var nextpage = parseInt(next, 100) + listCmtElm.length;
        if (listCmtElm.length > 0) {
            return Response.success(comments, nextpage + "");
        }

        return Response.success(comments, null);
    }

    return null;
}