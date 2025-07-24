load('libs.js');
load('config.js');
load('gbk.js');
load('common.js');

function execute(url) {
    try {
        let isSTV = url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1;
        const bookid = extractBookId(url, isSTV);
        url = buildFinalUrl(bookid);

        var browser = Engine.newBrowser(); // Khởi tạo browser
        browser.launch(url, 7000); // Mở trang web với timeout, trả về Document object

        browser.callJs(`
            const div = document.createElement('div');
            div.id = 'div-book-infor';
            div.setAttribute('tagsData', bookinfo?.tags || '');
            document.body.append(div);
        `, 100); // Gọi Javascript function trên trang với waitTime, trả về Document object

        let doc = browser.html(); // Trả về Document object của trang web
        browser.close();

        if (text(doc, 'div.booknav2 > h1 > a') == '') return Response.error(url);

        const genres = buildGenres(doc);
        const comments = [{
            title: "评论",
            input: bookid,
            script: "comment.js"
        }];

        return Response.success({
            name: text(doc, 'div.booknav2 > h1 > a'),
            cover: doc.select("div.bookimg2 > img")?.attr("src") ?? DEFAULT_COVER,
            author: text(doc, 'div.booknav2 > p:nth-child(2) > a'),
            description: $.Q(doc, 'div.navtxt > p')?.html() ?? '',
            detail: $.QA(doc, 'div.booknav2 p', { m: x => x.text(), j: '<br>' }) + `<br>书籍编号: ${bookid}<br>`,
            host: BASE_URL,
            suggests: [{
                title: "同作者",
                input: encodeAuthorUrl($.Q(doc, 'div.booknav2 > p:nth-child(2) > a')?.attr("href")),
                script: "author.js"
            }],
            genres,
            comments
        });
    } catch (error) {
        return Response.error(`fetch ${url} failed: ${error.message}`);
    }
}

function buildFinalUrl(bookid) {
    return `${BASE_URL}/book/${bookid}.htm`;
}

function buildGenres(doc) {
    const genres = [];

    const mainGenreEl = $.Q(doc, 'div.booknav2 > p:nth-child(3) > a');
    genres.push({
        title: mainGenreEl?.text()?.trim() || "没有标签",
        input: mainGenreEl?.attr("href") ?? "https://www.69shuba.com/novels/class/0.htm",
        script: "classify.js"
    });

    const tagStr = doc.select("#div-book-infor")?.attr('tagsData') ?? '';
    tagStr.split("|").forEach(tag => {
        if (tag) {
            genres.push({
                title: tag,
                input: `/${tag}/{0}/`,
                script: "gen2.js"
            });
        }
    });

    return genres;
}

function encodeAuthorUrl(url) {
    if (!url) return "";
    const baseUrl = "https://www.69shuba.com/modules/article/author.php?author=";
    let author = GBK.encode(url.replace(baseUrl, ""));
    return baseUrl + author;
}