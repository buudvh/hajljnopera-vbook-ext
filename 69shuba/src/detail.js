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
        browser.launch(url, 3000); // Mở trang web với timeout, trả về Document object
        let doc = browser.callJs(createDocInforDiv, 1000); // Gọi Javascript function trên trang với waitTime, trả về Document object
        browser.close();

        let genres = [];
        genres.push({
            title: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').text().trim() || "没有标签",
            input: $.Q(doc, 'div.booknav2 > p:nth-child(3) > a').attr("href") || "https://www.69shuba.com/novels/class/0.htm",
            script: "classify.js"
        });

        let objBookInfor = getBookInfor(doc);
        if (objBookInfor?.tags) {
            tags = objBookInfor.tags.split("|")
            tags.forEach(function (tag) {
                genres.push({
                    title: tag,
                    input: `/${tag}/{0}/`, 
                    script: "gen2.js"
                });
            })
        }

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

function getBookInfor(doc) {
    return JSON.parse(doc.select("#div-book-infor").attr('book-infor'))
}

function createDocInforDiv() {
    const divTag = document.createElement('div');
    divTag.setAttribute('book-infor', JSON.stringify(bookinfo))
    divTag.id = "div-book-infor"
    document.body.append(divTag)
}

function encodeAuhtorUrl(url) {
    const baseUrl = "https://www.69shuba.com/modules/article/author.php?author=";
    let author = GBK.encode(url.replace(baseUrl, ""));
    return baseUrl + author;
}