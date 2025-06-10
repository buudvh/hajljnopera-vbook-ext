load('libs.js');
load('gbk.js');
function execute(url) {
    let charpters = [];
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            var elems = doc.select("a[id]");
            elems.forEach(function (e) {
                charpters.push({
                    name: e.select("h3").text(),
                    url: e.attr('href'),
                    host: "",
                });
            })
        }
        return Response.success(charpters);
    } catch (error) {
        return Response.success([{
            name: error.message,
            url: "",
            host: "",
        }]);
    }
}