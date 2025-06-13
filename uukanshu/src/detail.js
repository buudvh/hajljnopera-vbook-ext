
function execute(url) {
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            return Response.success({
                name: doc.select("h1").text(),
                cover: doc.select("img.thumbnail").attr("src"),
                author: doc.select("p.booktag > a").text(),
                description: doc.select("div.bookintro").text(),
                detail: doc.select("p.booktime").text(),
                host: "",
                lastChapter: "",
                tocUrl: ""
            });
        }
        return null;
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