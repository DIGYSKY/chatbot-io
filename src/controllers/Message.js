const Message = class {
  constructor() {
    this.run();
  }

  inputMessage() {
    const form = document.getElementById('imput-user');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const messageValue = document.getElementById('message-user').value;
      const unsetMessageValue = document.getElementById('message-user');
      const messageDiv = document.querySelector('.message');

      if (messageValue !== '') {
        unsetMessageValue.value = '';
        this.addMessage(0, messageValue);
        // this.saveMessage(0, messageValue);
        messageDiv.scrollTop = messageDiv.scrollHeight;
      }
    });
  }

  // saveMessage(who, message) {

  // }

  addMessage(who, message) {
    const messageBox = document.getElementById('message-box');

    if (who === 0) {
      messageBox.innerHTML += `
        <div class="user-message">
          <p>${message}</p>
        </div>
      `;
    }
  }

  run() {
    this.inputMessage();
  }
};

export default Message;
