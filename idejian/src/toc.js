load('config.js');
async function execute(url) {
    let page = 1;
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    const match = url.match(/book\/(\d+)/);
    const bookId = match ? match[1] : null;
    let data = [];
    
    
    while(true){
        let requestUrl = `${BASE_URL}/catelog/${bookId}/1/?page=${page}`;
        const response = await fetch(requestUrl);

        if (!response.ok) break;

        const json = await response.json();
        let htmlText = json.html;

        if (!htmlText || htmlText.length === 0) break;

        page++;

        // Parse HTML string thành DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const links = doc.querySelectorAll('li a');

        links.forEach(link => {
            data.push({
                name: link.textContent.trim(),
                url: BASE_URL + link.getAttribute('href'),
                host: BASE_URL
            });
        });
    }
    

    return null;
}