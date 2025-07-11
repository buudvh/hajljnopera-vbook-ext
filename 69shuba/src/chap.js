load('config.js');
load('libs.js');
function execute(url) {
    try {
        url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

        let response = fetch(url);

        let doc;
        // if (response.ok) {
        //     doc = response.html('gbk');
        // } else if (response.status == 403) {
        //     var browser = Engine.newBrowser(); // Khởi tạo browser
        //     doc = browser.launch(url, 4000);
        //     browser.close();
        // } else {
        //     return Response.error(`fetch ${url} failed: status ${response.status}`);
        // }
        var browser = Engine.newBrowser(); // Khởi tạo browser
        browser.launch(url, 4000); // Mở trang web với timeout, trả về Document object
        browser.callJs(testJS, 500); // Gọi Javascript function trên trang với waitTime, trả về Document object
        doc = browser.html(); // Trả về Document object của trang web
        browser.close();

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
        return Response.error(`fetch ${url} failed: ${error.message}`);
    }
}

function testJS(){
    document.body.innerHTML = "<div class='txtnav'>Hello, World!</div>";
}