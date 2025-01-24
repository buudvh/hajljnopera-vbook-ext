function execute(url) {
    if(!url.endsWith("/")) url = url + "/";
    url = url.replace('m.biquge345.com', 'www.biquge345.com');
    let response = fetch(url);
    let data = "";
    if (response.ok) {
        let doc = response.html();
        doc.select(".posterror").remove();
        data = doc.select("#txt").text()
                    .replace('\n','<br>')
                    .replace(/^第\d+章.*?<br>/, '');
    }

    if (data !== null && data !== '') 
        return Response.success(data);
    
    return null;
}