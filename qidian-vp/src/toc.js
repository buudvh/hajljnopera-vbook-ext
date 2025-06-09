load('libs.js');
load('gbk.js');
function execute(url) {
    let page = "1";
    charpters = [];
    temp = [];
    try {
        do {
            temp = [];
            if (url.indexOf('muc-luc') == -1) url = url + '/muc-luc';
            let inputUrl = url + '?page=' + page;
            let response = fetch(inputUrl);
            if (response.ok) {
                let doc = response.html();
                var data = [];
                var elems = doc.select("a[id]");
                if (elems.length) return Response.error(url);
                elems.forEach(function (e) {
                    charpters.push({
                        name: e.select("h3").text(),
                        url: e.attr('href'),
                        host: "",
                    });
                    temp.push({
                        name: e.select("h3").text(),
                        url: e.attr('href'),
                        host: "",
                    });
                })
                let next_page = parseInt(page) + 1;
                return Response.success(data, next_page.toString());
            }
        }
        while (temp.length != 0);
        return null;
    } catch (error) {
        return Response.success([{
            name: error.message,
            url: "",
            host: "",
        }], 0);
    }
}