load('libs.js');
load('config.js');
load('gbk.js');

function execute(url) {
    let bookid = "";
    if (url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1) {
        bookid = url.match(/\/(\d+)\/?$/)[1];
        url = BASE_URL + "/book/" + bookid + ".htm";
    } else {
        url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
        url = url.replace("/txt/", "/book/")
        const regex = /\/(\d+)\.htm/;
        const match = url.match(regex);
        bookid = match[1];
    }

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html('gbk');

        let genres = [];
        genres.push({
            title: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').text().trim() || "没有标签",
            input: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').attr("href") || "https://www.69shuba.com/novels/class/0.htm",
            script: "classify.js"
        });

        let comments = [];

        comments.push({
            title: "评论",
            input: bookid,
            script: "comment.js"
        });

        return Response.success({
            name: $.Q(doc, 'div.booknav2 > h1 > a').text(),
            cover: doc.select("div.bookimg2 > img").attr("src") || DEFAULT_COVER,
            author: $.Q(doc, 'div.booknav2 > p:nth-child(2) > a').text().trim(),
            description: $.Q(doc, 'div.navtxt > p').html(),
            detail: $.QA(doc, 'div.booknav2 p', { m: x => x.text(), j: '<br>' }) + '<br>' + '书籍编号: ' + bookid + '<br>',
            host: BASE_URL,
            suggests: [
                {
                    title: "同作者",
                    input: encodeAuhtorUrl($.Q(doc, 'div.booknav2 > p:nth-child(2) > a').attr("href")),
                    script: "author.js"
                }
            ],
            genres: genres,
            comments: comments
        })
    }
    return null;
}

function encodeAuhtorUrl(url) {
    const baseUrl = "https://www.69shuba.com/modules/article/author.php?author=";
    let author = GBK.encode(url.replace(baseUrl, ""));
    return baseUrl + author;
}

function getBookInfor(doc) {
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