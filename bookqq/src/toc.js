function execute(url) {
    let bid = url.match(/\d+/)[0];
    let response = fetch('https://book.qq.com/book-chapter/'+bid);
    if (response.ok) {
        let doc = response.html();
        let novelList = [];
        doc.select(".list").forEach(e => {
            if (e.css("display") !== "none") {
                novelList.push({
                    name: e.select("span").text(),
                    url: e.select("a").attr("href"),
                    host: "https:"
                });
            }
        })

        novelList = novelList.reverse();

        return Response.success(novelList);
    }
    return null;
}