load('libs.js');
load('config.js');
load('encoding.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace("/txt/","/book/")
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let genres = [];
        genres.push({
            title: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
            input: decodeAuhtorUrl($.Q(doc, 'div.booknav2 > p:nth-child(2) > a').attr("href")),
            script: "author.js"
        })

        var elms = $.QA(doc, '.tagul > a');
        elms.forEach(element => {
            genres.push({
                title: element.text().trim(),
                input: element.attr('href').replace("/tag/", "/") + "/{0}/",
                script: "gen2.js"
            })
        });

        return Response.success({
            name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
            cover: doc.select("div.bookimg2 > img").attr("src") || "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
            author: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
            description: $.Q(doc, 'div.navtxt > p').html(),
            detail: $.QA(doc, 'div.booknav2 p', {m: x => x.text(), j: '<br>'}),
            host: BASE_URL,
            genres: genres,
        })
    }
    return null;
}

function decodeAuhtorUrl(url){
    const baseUrl = "https://www.69shuba.com/modules/article/author.php?author=";
    let author = encodeToGBKUrl(url.replace(baseUrl, ""));
    return baseUrl + author;
}

function encodeToGBKUrl(str) {
    const bytes = Encoding.convert(str, {
        to: 'GB2312',
        from: 'UNICODE',
        type: 'array'
    });

    let encoded = '';
    for (let i = 0; i < bytes.length; i++) {
        const hex = bytes[i].toString(16).toUpperCase();
        encoded += '%' + (hex.length === 1 ? '0' + hex : hex);
    }
    return encoded;
}