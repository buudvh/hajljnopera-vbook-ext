load('libs.js');
load('config.js');

function execute(url) {
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html('gbk');
            var data = [];
            var elems = doc.select("div.newbox li")
            elems.forEach(function (e) {
                data.push({
                    name: e.select("h3").text().trim(),
                    link: e.select("h3 a").attr('href'),
                    cover: e.select("img").attr("data-src") || "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
                    description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                    host: BASE_URL
                })
            })
            return Response.success(data);
        }
        return null;
    } catch (e) {
        return success({
            name: url + " - " + e.message,
            link: "",
            cover: "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
            description: "",
            host: BASE_URL
        });
    }
}