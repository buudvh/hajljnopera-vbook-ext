var host69yuedu = 'https://www.69yuedu.net';
function getChap69yuedu(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        if (doc.html().includes("vip='69shu")) {
            var browser = Engine.newBrowser() // Khởi tạo browser
            doc = browser.launch(url, 4000)
        }
        var htm = $.Q(doc, '.content', { remove: ['h1', 'div'] }).html();

        htm = cleanHtml(htm)
            .replace(/^ *第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace('(本章完)', '')
            ;
    }
    return htm.replace(/<br\s*\/?>|\n/g, "<br><br>");
}
function getToc69yuedu(url) {
    let rid = url.replace("https://www.69yuedu.net/article/", "").replace(".html", "")
    url = url.replace(".html", ".json")
    console.log(rid)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.json('gbk');
        var data = [];
        var elems = doc.items;
        elems.forEach(function (e) {
            data.push({
                name: formatName(e.n),
                url: "https://www.69yuedu.net/r/" + rid +"/" + e.cid + ".html",
                host: host69yuedu
            })
        });
        return data;
    }
}
function formatName(name) {
    var re = /^(\d+)\.第(\d+)章/;
    return name.replace(re, '第$2章');
}
function getDetail69yuedu(url) {
    let response = fetch(url);
    let doc = response.html('gbk');
    let data = {
        name: doc.select("div.info > div > h1").html() || document.querySelector('div.info > div > h1').innerHTML || 'No name',
        cover: doc.select("div.imgbox > img").attr("src") || "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
        author: doc.select("div.fix > p:nth-child(1)").html().replace('作者：', '') || 'Unknow',
        description: doc.select("div.desc").html() || document.querySelector('div.desc').innerHTML || '',
        detail: $.QA(doc, 'div.fix p', { m: x => x.text(), j: '<br>' }) || '',
    }
    return data;
}