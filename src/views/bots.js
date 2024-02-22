export default (bot) => (`
<button class="button-bot mb-3">
<div>
  <div class="row g-0 align-items-center">
    <div class="col-md-3">
      <img
        src="https://static.vecteezy.com/ti/vecteur-libre/p1/10054157-chat-bot-robot-avatar-en-cercle-forme-ronde-isole-sur-fond-blanc-illustrationle-de-stock-technologie-ai-futuriste-aide-communication-conversation-concept-dans-un-style-plat-vectoriel.jpg"
        class="img-fluid rounded-start card-img-top" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body m-3">
        <h5 class="card-title">Chatbot | ${bot.title}</h5>
        <p class="card-text">${bot.description}</p>
        <p class="${bot.statut ? 'text-success' : 'text-danger'}">${bot.statut ? 'Bot online' : 'Bot offline'}</p>
      </div>
    </div>
  </div>
</div>
</button>
`);
