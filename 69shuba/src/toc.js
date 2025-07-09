load('libs.js');
load('config.js');

function execute(url) {
    let book_id = "";
    if (url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1) {
        book_id = url.match(/\/(\d+)\/?$/)[1];
    } else {
        const regex = /\/(\d+)\.htm/;
        const match = url.match(regex);
        book_id = match[1];
    }
    let response = fetch(`${BASE_URL}/book/${book_id}/`);
    if (response.ok) {
        let doc = response.html('gbk');

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
    }
    return null;
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
