load('libs.js');
load('config.js');

function execute(url, page) {
    page = page || '1';
    url = String.format(BASE_URL + "/tag" + url, page);

    try {
        let response = fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
                'Accept': 'text/html',
                'Accept-Language': 'vi-VN,vi;q=0.9',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (response.ok) {
            let doc = response.html('gbk');
            var data = [];
            var elems = doc.select("ul#article_list_content li")
            elems.forEach(function (e) {
                data.push({
                    name: e.select("h3").text().trim(),
                    link: e.select("h3 a").attr('href'),
                    cover: e.select("img").attr("data-src") || DEFAULT_COVER,
                    description: $.Q(e, '.zxzj > p').text().replace('最近章节', ''),
                    host: BASE_URL
                })
            })
            var next = parseInt(page, 10) + 1;
            return Response.success(data, next.toString());
        }
        return null;
    } catch (e) {
        return success({
            name: url,
            link: "",
            cover: DEFAULT_COVER,
            description: "",
            host: BASE_URL
        }, 10);
    }
}