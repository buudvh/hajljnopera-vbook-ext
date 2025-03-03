var host69yuedu = 'http://23.225.121.243';
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
    // let pageList = getListPageToc(url);
    // var data = [];
    // pageList.forEach(function (e) {
    //     let response = fetch(url);
    //     if (response.ok) {
    //         let doc = response.html();
    //         var elems = doc.select('div.section-box')[1].select('a');
    //         elems.forEach(function (e) {
    //             data.push({
    //                 name: formatName(e.text()),
    //                 url: e.attr('href'),
    //                 host: host69yuedu
    //             })
    //         });
    //     }
    // });
    // return data;
    let response = fetch(url);
    var data = [];
    if (response.ok) {
        let doc = response.html();
        var elems = doc.select('div.section-box')[1].select('a');
        elems.forEach(function (e) {
            data.push({
                name: formatName(e.text()),
                url: e.attr('href'),
                host: host69yuedu
            })
        });
    }
    return data;
}

function getListPageToc(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();;
        var data = [];
        var menu = doc.select("div.listpage > span.middle > select").first();
        menu.select("option").forEach(function (e) {
            data.push(host69yuedu + e.attr("value"));
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
    let doc = response.html();
    let data = {
        name: doc.select("div.info > div > h1").html() || 'No name',
        cover: doc.select("div.imgbox > img").attr("src") || "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
        author: doc.select("div.fix > p:nth-child(1)").html().replace('作者：', '') || 'Unknow',
        description: doc.select("div.desc").html() || '',
        detail: $.QA(doc, 'div.fix p', { m: x => x.text(), j: '<br>' }) || '',
    }
    return data;
}