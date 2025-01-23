function execute(url) {
    let bid = url.match(/\d+/)[0];
    let response = fetch('https://book.qq.com/book-chapter/'+bid);
    if (response.ok) {
        // let json = response.json().data;
        // let novelList = [];
        // json.forEach(e => {
        //     if(e.free != 0) let stt = '【Free】 ';
        //     else stt = '【VIP】 ';
        //     novelList.push({
        //         name: stt + e.chapterName,
        //         url: url+'/'+e.cid,
        //         host: "http://book.qq.com"
        //     })
        // });
        // return Response.success(novelList);
        let novelList = [];
        doc.select(".list-a a").forEach(e => {
            novelList.push({
                name: e.select("span").text(),
                url: e.attr("href"),
                host: "http://book.qq.com"
            })
        })

        return Response.success(novelList);
    }
    return null;
}