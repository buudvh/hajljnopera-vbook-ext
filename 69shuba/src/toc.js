load('libs.js');
load('config.js');
load('common.js')

function execute(url) {
    try {
        let isSTV = url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1;
        const book_id = extractBookId(url, isSTV);

        var browser = Engine.newBrowser(); // Khởi tạo browser
        browser.launch(`${BASE_URL}/book/${book_id}/`, 5000);
        let doc = browser.html(); // Trả về Document object của trang web
        browser.close();

        var data = [];
        var elems = $.QA(doc, 'div.catalog > ul > li > a:not(#bookcase)');

        if (!elems.length) return trySTV(url);

        elems.forEach(function (e) {
            data.push({
                name: formatName(e.text()),
                url: e.attr('href'),
                host: BASE_URL,
                id: e.attr('data-num')
            })
        });

        // data = data.reverse();

        return Response.success(data);
    } catch (error) {
        return Response.error(`fetch ${url} failed: ${error.message}`);
    }
}

function formatName(name) {
    const re = /^(\d+)\.第(\d+)章\s*/;
    let result = name.replace(re, '第$2章 ');

    const lastParenIndex = Math.max(result.lastIndexOf('('), result.lastIndexOf('（'));
    if (lastParenIndex !== -1) {
        result = result.slice(0, lastParenIndex);
    }

    const onlyBracket = /^第\d+章\s*【[^】]*】?\s*$/;
    if (onlyBracket.test(result)) {
        return result.trim();
    }

    result = result.replace(/【.*$/, '');

    return result.trim();
}

function trySTV(url) {
    try {
        const result = [];
        let isSTV = url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1;
        const book_id = extractBookId(url, isSTV);
        url = `${STVHOST}/index.php?ngmar=chapterlist&h=69shu&bookid=${book_id}&sajax=getchapterlist`;
        let response = fetch(url);

        if (!response.ok) return Response.success([{
            name: `fetch ${url} failed: status ${response.status}`,
            url: "",
            host: "",
            id: ""
        }]);


        let objData = JSON.parse(response.text())

        if (objData.code != '1') return Response.success([{
            name: `fetch ${url} failed: x.code = ${objData.code}`,
            url: "",
            host: "",
            id: ""
        }]);

        const chapters = objData.data.split("-//-");

        for (let i = 0; i < chapters.length; i++) {
            const [_, chapterId, chapterName] = chapters[i].split("-/-");
            result.push({
                name: chapterName.trim().replace(/([\t\n]+|<br>| )/g, ""),
                url: `${BASE_URL}/txt/${book_id}/${chapterId}`,
                host: ``,
                id: chapterId
            })
        }

        return Response.success(result);
    } catch (error) {
        throw error;
    }

}