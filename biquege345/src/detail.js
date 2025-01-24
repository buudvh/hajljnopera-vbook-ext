function execute(url) {
    url = url.replace('m.biquge345.com', 'www.biquge345.com');
    // let response = fetch(url);
    // if (response.ok) {
    //     let doc = response.html();
    //     let coverImg = doc.select(".zhutu img").first().attr("src");
    //     if (coverImg.startsWith("/")) {
    //         coverImg = "http://www.biquge345.com" + coverImg;
    //     }
    //     let author = doc.select("span.x1 a").first().text();
    //     return Response.success({
    //         name: doc.select(".right_border h1").text(),
    //         cover: coverImg,
    //         author: author,
    //         description: doc.select("span.x3").first().text(),
    //         detail: '',
    //         host: "http://www.biquge345.com"
    //     });
    // }
    return Response.success({
        name: 'test',
        cover: 'test',
        author: 'test',
        description: 'test',
        detail: url,
        host: "http://www.biquge345.com"
    });
    // return null;
}