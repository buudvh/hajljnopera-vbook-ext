load("language_list.js");

const apiKey = 'AIzaSyDbnKy2efzF2bW4Lw6jHV5FAaIJt9SiINM';

function execute(text, from, to, apiKey) {
    return translateContent(text, from, to, 0);
}

function createPrompt(text){
    return `Cho bạn đoạn văn bản: "${text}".
                 Hãy dịch đoạn văn bản đó thành Tiếng Việt (Vietnamese) với các điều kiện sau:
                 - Tuân thủ chặt chẽ bối cảnh và sắc thái ban đầu.
                 - Sự lưu loát tự nhiên như người bản xứ.
                 - Không có thêm giải thích/diễn giải.
                 - Bảo toàn thuật ngữ 1:1 cho các thuật ngữ/danh từ riêng.
                 Chỉ in ra bản dịch mà không có dấu ngoặc kép.`;
  }

function translateContent(text, from, to, retryCount) {
    if (retryCount > 2) return null;
    let requestBody = {
        contents: [{ parts: [{ text: createPrompt(text) }] }]
    };
    let response = fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });
    if (response.ok) {
        let result = response.json();
        if (result && result.candidates && result.candidates.length > 0) {
            let translatedText = result.candidates[0].content.parts[0].text;
            Response.success(translatedText.trim());
          } else {
            return translateContent(text, from, to, retryCount + 1);
          }
        return Response.success(trans.trim());
    }
    return translateContent(text, from, to, retryCount + 1);
}