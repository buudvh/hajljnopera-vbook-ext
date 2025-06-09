load('libs.js');
load('gbk.js');
function execute(url) {
    try {
        let response = fetch(url);
        if (response.ok) {
            let doc = response.html();
            return Response.success({
                name: doc.select("h1").text(),
                cover: doc.select("img.w-44").attr("src"),
                author: doc.select("a.text-gray-400").text(),
                description: doc.select("div.#synopsis").text(),
                detail: "",
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
function replaceCover(coverUrl) {
    if (!coverUrl) return "";
    return coverUrl.replace(/(\d+)-tt/, '6-novel');
}
function javaGetString(str) {
    return str;
}
function javaTimeFormatUTC(timestamp, format, timezoneOffset) {
    const date = new Date(timestamp);
    const utcDate = new Date(date.getTime() + timezoneOffset * 3600 * 1000);
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0');
    const day = String(utcDate.getDate()).padStart(2, '0');
    return format.replace('yyyy', year).replace('MM', month).replace('dd', day);
}
function javaTimeFormat(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}