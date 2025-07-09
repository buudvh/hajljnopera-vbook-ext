load('config.js');
load('libs.js');
function execute(url) {
    try {
        url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

        let response = fetch(url, {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
            }
        });

        let doc;
        if (response.ok) {
            doc = response.html('gbk');
        } else if (response.status == 403) {
            var browser = Engine.newBrowser();
            doc = browser.launch(url, 4000);
        } else {
            return Response.success(`fetch ${url} failed: status ${response.status}`);
        }

        var htm = doc.select(".txtnav")
        htm.select(".contentadv").remove()
        htm.select(".bottom-ad").remove()
        htm.select(".txtinfo").remove()
        htm.select("#txtright").remove()
        htm.select("h1").remove()
        htm = htm.html()
        htm = cleanHtml(htm)
            .replace(/^第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace('(本章完)', '')
            ;

        return Response.success(htm);
    } catch (error) {
        return Response.success(`fetch ${url} failed: ${error.message}`);
    }
}