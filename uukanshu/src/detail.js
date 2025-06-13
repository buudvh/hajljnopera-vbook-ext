function execute(url) {
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            return Response.success({
                name: doc.select("h1").first().text(),
                cover: doc.select("div.bookcover img").first().attr("src"),
                author: doc.select("div.bookinfo a").first().text(),
                description: "",
                detail: "",
                host: "",
                lastChapter: "",
                tocUrl: ""
            });
        }
        return Response.success({
            name: "BUG",
            cover: "",
            author: "",
            description: "fail to fetch",
            detail: "",
            host: "",
            lastChapter: "",
            tocUrl: ""
        });
    } catch (error) {
        return Response.success({
            name: "BUG",
            cover: "",
            author: "",
            description: error.message,
            detail: "",
            host: "",
            lastChapter: "",
            tocUrl: ""
        });
    }
}