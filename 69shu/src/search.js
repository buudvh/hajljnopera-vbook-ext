load('libs.js');
function execute(key, page) {
    let arrKey = key.split("&");
    const STVHOST = "http://14.225.254.182";
    const SHU69_HOST = "https://www.69shuba.com/"
    if (!page) page = '1';
    let sort = 'viewday';
    if (arrKey.length == 2) {
        sort = arrKey[1];
    }
    let url = STVHOST + '/io/searchtp/searchBooks/?find=&findinname=' + arrKey[0] + '&sort=' + sort + '&host=69shu&minc=0&tag=&p=' + page;
    let response = fetch(url);
    function toCapitalize(sentence) {
        const words = sentence.split(" ");

        return words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    if (response.ok) {
        let doc = response.html()
        let next = parseInt(page, 10) + 1;
        let el = doc.select("a.booksearch")
        let data = [];
        el.forEach(e => {
            let stv_story_link = e.select("a").first().attr("href");
            let bookid = stv_story_link.split("/")[4];
            data.push({
                name: toCapitalize(e.select(".searchbooktitle").first().text()),
                link: SHU69_HOST + "book/" + bookid + ".htm",
                cover: e.select("img").first().attr("src") || "https://static.sangtacvietcdn.xyz/img/bookcover256.jpg",
                description: e.select(" div > span.searchtag").last().text(),
                host: ""
            })
        });

        return Response.success(data, next.toString());
    }
    return null;
}