function execute(url, page) {
	url = url.replace('m.biquge345.com', 'www.biquge345.com');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        const data = [];

        doc.select(".right_border")[0].select("li").forEach(e => {
            data.push({
                name: e.select("h3.p2 a").first().text(),
                link: e.select("h3.p2 a").first().attr("href"),
                description: e.select("p.p3").first().text(),
                host: "http://www.biquge345.com"
            });
        });
        
        doc.select(".right_border")[0].select("li").forEach(e => {
            data.push({
                name: e.select("h3.p2 a").first().text(),
                link: e.select("h3.p2 a").first().attr("href"),
                description: '',
                host: "http://www.biquge345.com"
            });
        });

        doc.select(".right_border")[2].select("li").forEach(e => {
            data.push({
                name: e.select("span.name a").first().text(),
                link: e.select("span.name a").first().attr("href"),
                description: '',
                host: "http://www.biquge345.com"
            });
        });

        return Response.success(data)
    }
    return null;
}