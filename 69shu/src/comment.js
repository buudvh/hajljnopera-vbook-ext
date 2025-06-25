load('config.js');
function execute(bookid, next) {
    if (!next) next = "0"
    let response = fetch("http://14.225.254.182/io/comment/webComments", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
        comments.push({
            name: "LOG BUG",
            content: "bookid: " + bookid + " next: " + next + " listCmtElm: " + listCmtElm.length,
        });
        listCmtElm.forEach(function (e) {
            comments.push({
                name: e.select('div.sec-bot a').text(),
                content: e.select('div.sec-top').text(),
            });
        });

        var nextpage = e.select('#cmtwd').attr('data-start');
        if (listCmtElm.length > 0) {
            return Response.success(comments, nextpage + "");
        }

        return Response.success(comments, null);
    }

    return Response.success([{
        name: "LOG BUG",
        content: "bookid: " + bookid + " next: " + next + "  status: " + response.status,
    }], null);
}