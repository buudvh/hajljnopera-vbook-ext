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
                var elems = doc.select("a[id]");
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
                page = parseInt(page) + 1;
            }
        }
        while (temp.length != 0);
        return Response.success(charpters);
    } catch (error) {
        return Response.success([{
            name: error.message,
            url: "",
            host: "",
        }]);
    }
}