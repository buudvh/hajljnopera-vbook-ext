function execute(url) {
    let bid = url.match(/\d+/)[0];
    let response = fetch('https://book.qq.com/book-chapter/'+bid);
    if (response.ok) {
        let doc = response.html();
        let novelList = [];
        doc.select('li.list:not([style*="display: none"])').forEach(e => {
            novelList.push({
                name: e.select("span").text(),
                url: "https:" + e.select("a").attr("href"),
                host: ""
            });
        });

        novelList = novelList.reverse();

        return Response.success(novelList);
    }
    return null;
}