load('libs.js');
load('config.js');
load('gbk.js');

function execute(url) {
    try {
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

        // let response = fetch(url);
        // if (!response.ok) {
        //     return Response.error(`fetch ${url} failed: status ${response.status}`);
        // }

        // let doc = response.html('gbk');

        var browser = Engine.newBrowser(); // Khởi tạo browser
        browser.launch(url, 4000); // Mở trang web với timeout, trả về Document object
        let strTags = browser.callJs(createDocInforDiv, 500); // Gọi Javascript function trên trang với waitTime, trả về Document object
        let doc = browser.html(); // Trả về Document object của trang web
        browser.close();

        let genres = [];
        genres.push({
            title: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').text().trim() || "没有标签",
            input: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').attr("href") || "https://www.69shuba.com/novels/class/0.htm",
            script: "classify.js"
        });

        genres.push({
            title: strTags,
            input: `/${strTags}/{0}/`, 
            script: "gen2.js"
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
    } catch (error) {
        return Response.error(`fetch ${url} failed: ${error.message}`);
    }
}

function getTags(doc) {
    return doc.select("#div-book-infor").attr('tagsData') || '';
}

function getTags() {
    return bookinfo.tags
}

function encodeAuhtorUrl(url) {
    const baseUrl = "https://www.69shuba.com/modules/article/author.php?author=";
    let author = GBK.encode(url.replace(baseUrl, ""));
    return baseUrl + author;
}