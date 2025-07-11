function toCapitalize(sentence) {
    const words = sentence.split(" ");

    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}

function extractBookId(url, isSTV) {
    const match = isSTV
        ? url.match(/\/(\d+)\/?$/)
        : url.match(/\/(\d+)\.htm/);
    if (!match) throw new Error("Book ID not found in URL");
    return match[1];
}

function text(doc, selector) {
    return $.Q(doc, selector)?.text()?.trim() ?? '';
}