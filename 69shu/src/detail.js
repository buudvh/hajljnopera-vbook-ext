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

        let bookInfor = getBookInfor(doc);
        if (bookInfor) {
            let tags = bookInfor.tags.split('|');
            for (let i = 0; i < tags.length; i++) {
                genres.push({
                    title: tags[i],
                    input: "/" + tags[i] + "/{0}/",
                    script: "gen2.js"
                })
            }
        }
        
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

function getBookInfor(doc){
    let start = doc.indexOf('var bookinfo =');
    if (start == -1) return null;
    const slice = html.slice(start);

    let bookinfoText = slice
        .replace(/^.*?=\s*/, '')       // bỏ phần "var bookinfo ="
        .replace(/;\s*$/, '')          // bỏ dấu ; ở cuối
        .split('</script>')[0];        // cắt nếu còn phần sau

    // Ép object thành JSON bằng replace
    bookinfoText = bookinfoText
        .replace(/(\w+):/g, '"$1":')   // key: → "key":
        .replace(/,\s*}/g, '}')        // bỏ dấu phẩy cuối
        .replace(/,\s*]/g, ']');

    return JSON.parse(bookinfoText);
}