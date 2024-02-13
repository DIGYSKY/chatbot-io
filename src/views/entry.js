export default () => (`
<div class="chat-window">
<div class="chat-messages">
    <!-- Messages échangés -->
    <div class="message received">Message reçu</div>
    <div class="message sent">Message envoyé</div>
</div>
<div class="message-input">
    <input type="text" placeholder="Entrez votre message...">
    <button>Envoyer</button>
</div>
</div>
`);
