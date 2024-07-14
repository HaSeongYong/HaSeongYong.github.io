var _a, _b, _c;
function sendQuery() {
    var userInput = document.getElementById('userInput');
    var messageText = userInput.value.trim();
    if (messageText !== "") {
        displayMessage(messageText, 'userMessage');
        // 로딩 애니메이션 추가
        var loadingMessageId_1 = displayLoadingAnimation();
        // 여기서 서버에 요청을 보내고 응답을 받을 수 있습니다.
        // 예시로 서버 응답을 직접 추가해보겠습니다.
        setTimeout(function () {
            var responseText = "서버 응답 예시입니다.";
            updateMessage(loadingMessageId_1, responseText, 'serverMessage');
        }, 2000);
        userInput.value = "";
        adjustTextareaHeight(userInput);
    }
}
function displayMessage(text, className) {
    var chatContainer = document.getElementById('chatContainer');
    var message = document.createElement('div');
    message.textContent = text;
    message.className = "message ".concat(className);
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
function displayLoadingAnimation() {
    var chatContainer = document.getElementById('chatContainer');
    var message = document.createElement('div');
    var messageId = "loading-".concat(Date.now()); // 고유 ID 생성
    var loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loadingSpinner';
    message.className = 'message loadingMessage';
    message.id = messageId;
    message.appendChild(loadingSpinner);
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return messageId;
}
function updateMessage(messageId, text, className) {
    var message = document.getElementById(messageId);
    if (message) {
        message.textContent = text;
        message.className = "message ".concat(className);
    }
}
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = "".concat(textarea.scrollHeight, "px");
}
(_a = document.getElementById('sendButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', sendQuery);
(_b = document.getElementById('userInput')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', function () {
    adjustTextareaHeight(this);
});
(_c = document.getElementById('userInput')) === null || _c === void 0 ? void 0 : _c.addEventListener('keydown', function (event) {
    var userInput = this;
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendQuery();
    }
    else if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault();
        var cursorPosition = userInput.selectionStart;
        userInput.value = userInput.value.substring(0, cursorPosition) + '\n' + userInput.value.substring(cursorPosition);
        userInput.selectionStart = userInput.selectionEnd = cursorPosition + 1;
        adjustTextareaHeight(userInput);
    }
});
// 초기 높이 설정
window.onload = function () {
    var userInput = document.getElementById('userInput');
    adjustTextareaHeight(userInput);
};
