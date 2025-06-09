load('libs.js');
load('gbk.js');
function execute(url, page) {
    try {
        if (!page) page = '1';
        let inputUrl = url + '?page=' + page;
        let response = fetch(inputUrl);
        if (response.ok) {
            let doc = response.html();
            var data = [];
            var elems = $.QA(doc, 'a.items-center');
            if (!elems.length) return Response.error(url);
            elems.forEach(function (e) {
                data.push({
                    name: bookData.book_name,
                    link: e.attr('href'),
                    cover: $.QA(e, 'img').attr('src'),
                    description: $.QA(e, 'div > div:nth-child(2)').text(),
                    author: "",
                    kind: ""
                })
            })
            let next_page = parseInt(page) + 1;
            return Response.success(data, next_page.toString());
        }
        return null;
    } catch (e) { 
        return Response.error(e);
    }

}