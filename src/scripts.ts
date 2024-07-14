function sendQuery() {
    const userInput = document.getElementById('userInput') as HTMLTextAreaElement;
    let messageText = userInput.value.trim();

    if (messageText !== "") {
        displayMessage(messageText, 'userMessage');

        // 로딩 애니메이션 추가
        const loadingMessageId = displayLoadingAnimation();

        // 여기서 서버에 요청을 보내고 응답을 받을 수 있습니다.
        // 예시로 서버 응답을 직접 추가해보겠습니다.
        setTimeout(() => {
            const responseText = "서버 응답 예시입니다.";
            updateMessage(loadingMessageId, responseText, 'serverMessage');
        }, 2000);

        userInput.value = "";
        adjustTextareaHeight(userInput);
    }
}

function displayMessage(text: string, className: string) {
    const chatContainer = document.getElementById('chatContainer') as HTMLDivElement;
    const message = document.createElement('div');
    message.textContent = text;
    message.className = `message ${className}`;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function displayLoadingAnimation(): string {
    const chatContainer = document.getElementById('chatContainer') as HTMLDivElement;
    const message = document.createElement('div');
    const messageId = `loading-${Date.now()}`; // 고유 ID 생성
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loadingSpinner';
    message.className = 'message loadingMessage';
    message.id = messageId;
    message.appendChild(loadingSpinner);
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return messageId;
}

function updateMessage(messageId: string, text: string, className: string) {
    const message = document.getElementById(messageId) as HTMLDivElement;
    if (message) {
        message.textContent = text;
        message.className = `message ${className}`;
    }
}

function adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

document.getElementById('sendButton')?.addEventListener('click', sendQuery);

document.getElementById('userInput')?.addEventListener('input', function() {
    adjustTextareaHeight(this as HTMLTextAreaElement);
});

document.getElementById('userInput')?.addEventListener('keydown', function(event) {
    const userInput = this as HTMLTextAreaElement;
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendQuery();
    } else if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault();
        const cursorPosition = userInput.selectionStart;
        userInput.value = userInput.value.substring(0, cursorPosition) + '\n' + userInput.value.substring(cursorPosition);
        userInput.selectionStart = userInput.selectionEnd = cursorPosition + 1;
        adjustTextareaHeight(userInput);
    }
});

// 초기 높이 설정
window.onload = () => {
    const userInput = document.getElementById('userInput') as HTMLTextAreaElement;
    adjustTextareaHeight(userInput);
};
