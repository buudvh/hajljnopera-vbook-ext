function execute(url) {
    let bid = url.match(/\d+/)[0];
    let response = fetch('https://book.qq.com/book-chapter/'+bid);
    if (response.ok) {
        // let doc = response.html();
        // let novelList = [];
        // doc.select(".list-a").forEach(e => {
        //     if(novelList.find(p => p.url == e.attr("href")) == undefined){
        //         novelList.push({
        //             name: e.select("span").text(),
        //             url: "https:" + e.attr("href"),
        //             host: ""
        //         });
        //     }
        // });

        // novelList = novelList.reverse();

        // return Response.success(novelList);

        let doc = parser.parseFromString(response.html(), "text/html");
        let novelList = [];

        doc.querySelectorAll(".list-a").forEach(e => {
            let url = "https:" + e.getAttribute("href");
            if (!novelList.find(p => p.url === url)) {
                novelList.push({
                    name: e.querySelector("span").textContent.trim(),
                    url: url,
                    host: ""
                });
            }
        });

        novelList = novelList.reverse();

        return Response.success(novelList);
    }
    return null;
}