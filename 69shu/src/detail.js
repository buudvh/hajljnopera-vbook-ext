load('libs.js');
load('config.js');
load('gbk.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace("/txt/","/book/")
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');
        let genres = [];

        genres.push({
            title: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
            input: encodeAuhtorUrl($.Q(doc, 'div.booknav2 > p:nth-child(2) > a').attr("href")),
            script: "author.js"
        })

        var elms = doc.select('div.infotag a');
        if(elms.length == 0) {
            genres.push({
				title: "No Tags",
				input: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').attr("href"),
				script: "gen.js"
			})
        }
        elms.forEach(function(e) {
			genres.push({
				title: e.text().trim(),
				input: e.attr('href').replace("/tag/", "/") + "/{0}/",
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

function encodeAuhtorUrl(url){
    const baseUrl = "https://www.69shuba.com/modules/article/author.php?author=";
    let author = GBK.encode(url.replace(baseUrl, ""));
    return baseUrl + author;
}