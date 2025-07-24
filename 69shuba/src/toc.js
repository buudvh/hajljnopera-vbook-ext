load('libs.js');
load('config.js');
load('common.js')

function execute(url) {
    try {
        let isSTV = url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1;
        const book_id = extractBookId(url, isSTV);

        var browser = Engine.newBrowser(); // Khởi tạo browser
        browser.launch(`${BASE_URL}/book/${book_id}/`, 4000);
        let doc = browser.html(); // Trả về Document object của trang web
        browser.close();

        var data = [];
        var elems = $.QA(doc, 'div.catalog > ul > li > a:not(#bookcase)');

        elems.forEach(function (e) {
            data.push({
                name: formatName(e.text()),
                url: e.attr('href'),
                host: BASE_URL,
                id: e.attr('data-num')
            })
        });

        data = data.reverse();

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
