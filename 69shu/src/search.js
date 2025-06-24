load('libs.js');
function execute(key, page) {
    const STVHOST = "http://14.225.254.182";
    const SHU69_HOST = "https://www.69shuba.com/"
    if (!page) page = '1';
    let response = fetch(STVHOST + '/?find=&findinname=' + key + '&host=69shu&minc=0&tag=&p=' + page);
    function toCapitalize(sentence) {
        const words = sentence.split(" ");

        return words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    if (response.ok) {
        let doc = response.html()
        let next = doc.select(".pagination").select("li.active + li").text()
        let el = doc.select("#searchviewdiv a.booksearch")
        let data = [];
        el.forEach(e => {
            let stv_story_link = e.select("a").first().attr("href");
            let bookid = stv_story_link.split("/")[3];
            data.push({
                name: toCapitalize(e.select(".searchbooktitle").first().text()),
                link: SHU69_HOST + "book/" + bookid + ".htm",
                cover: e.select("img").first().attr("src"),
                description: e.select(" div > span.searchtag").last().text(),
                host: ""
            })
        });
        return Response.success(data, next)
    }
    return null;
}