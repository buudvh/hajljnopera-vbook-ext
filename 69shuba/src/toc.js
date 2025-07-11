load('libs.js');
load('config.js');

function execute(url) {
    try {
        let isSTV = url.indexOf("sangtacviet") !== -1 || url.indexOf("14.225.254.182") !== -1;
        const book_id = extractBookId(url, isSTV);

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
        return Response.error(`fetch ${url} failed: status ${response.status}`);
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
