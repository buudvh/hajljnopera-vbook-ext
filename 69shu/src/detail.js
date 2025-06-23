load('libs.js');
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace("/txt/","/book/")
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let genres = [];
        genres.push({
            title: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
            input: decodeURIComponent($.Q(doc, 'div.booknav2 > p:nth-child(2) > a').attr('href')),
            script: "gen2.js"
        })

        let tag = doc.select("#tagul");
        let elms = tag.select("a");
        elms.forEach(element => {
            genres.push({
                title: element.text().trim(),
                input: BASE_URL + element.attr('href'),
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