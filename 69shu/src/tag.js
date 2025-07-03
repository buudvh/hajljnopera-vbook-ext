load('libs.js');
load('config.js');
function execute(tag, page) {
    let url = `${STVHOST}/io/searchtp/searchBooks/?find=&tag=${tag}&sort=update&host=69shu&minc=0&p=${page}`;
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
                cover: bookid.length == 5 ? `https://static.69shuba.com/files/article/image/${bookid.slice(0, 2)}/${bookid}/${bookid}s.jpg` : DEFAULT_COVER,
                description: e.select(" div > span.searchtag").last().text(),
                host: ""
            })
        });

        return Response.success(data, next.toString());
    }
    return null;
}