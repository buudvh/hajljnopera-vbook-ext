load('libs.js');
load('gbk.js');
function execute(url) {
    try {
        if (url.indexOf('muc-luc') == -1) url = url + '/muc-luc';
        if (!page) page = '1';
        let inputUrl = url + '?page=' + page;
        let response = fetch(inputUrl);
        if (response.ok) {
            let doc = response.html();
            var data = [];
            var elems = doc.select("a[id]");
            if (elems.length) return Response.error(url);
            elems.forEach(function (e) {
                data.push({
                    name: e.select("h3").text(),
                    url: e.attr('href'),
                    host: "",
                })
            })
            let next_page = parseInt(page) + 1;
            return Response.success(data, next_page.toString());
        }
        return null;
    } catch (error) {
        return Response.success([{
            name: error.message,
            url: "",
            host: "",
        }], 0);
    }
}