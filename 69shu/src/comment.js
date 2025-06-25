load('config.js');
function execute(bookid, next) {
    if (!next) next = "0"
    try {
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

            if (listCmtElm.length == 0) {
                return Response.success([{
                    name: "LOG BUG",
                    content: "bookid: " + bookid + " next: " + next + "  length: " + listCmtElm.length,
                }], null);
            }

            listCmtElm.forEach(function (elm) {
                comments.push({
                    name: elm.select('div.sec-bot a').text(),
                    content: elm.select('div.sec-top').text(),
                });
            });

            var nextpage = doc.select('#cmtwd').attr('data-start');
            if (listCmtElm.length > 0) {
                return Response.success(comments, nextpage + "");
            }

            return Response.success(comments, null);
        }

        return Response.success([{
            name: "LOG BUG",
            content: "bookid: " + bookid + " next: " + next + "  status: " + response.status,
        }], null);
    } catch (ex) {
        return Response.success([{
            name: "LOG BUG",
            content: "bookid: " + bookid + " next: " + next + "  exception: " + ex.message,
        }], null);
    }
}