load("language_list.js");

function execute(text, from, to, apiKey) {
    return translateContent(text, from, to, 0);
}

function createPrompt(text){
    return "Cho bạn đoạn văn bản: \"" + text + "\".\n"
       + "Hãy dịch đoạn văn bản đó thành Tiếng Việt (Vietnamese) với các điều kiện sau:\n"
       + "- Tuân thủ chặt chẽ bối cảnh và sắc thái ban đầu.\n"
       + "- Sự lưu loát tự nhiên như người bản xứ.\n"
       + "- Không có thêm giải thích/diễn giải.\n"
       + "- Bảo toàn thuật ngữ 1:1 cho các thuật ngữ/danh từ riêng.\n"
       + "Chỉ in ra bản dịch mà không có dấu ngoặc kép.";

  }

function translateContent(text, from, to, retryCount) {
    if (retryCount > 2) return null;
    let requestBody = {
        contents: [{ parts: [{ text: createPrompt(text) }] }]
    };
    let response = fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDEYuEepJBjHvsDA36Pv74QeMc8wyKbArA", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });
    if (response.ok) {
        let result = response.json();
        if (result && result.candidates && result.candidates.length > 0) {
            let translatedText = result.candidates[0].content.parts[0].text;
            return Response.success(translatedText.trim());
          } else {
            return translateContent(text, from, to, retryCount + 1);
          }
    }
    return translateContent(text, from, to, retryCount + 1);
}