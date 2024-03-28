export default (bot) => {
  let render = '';

  if (bot.statut !== 'none') {
    render = `
    <div>
      <button class="button-bot mb-3">
        <div>
          <div class="row g-0 align-items-center">
            <div class="col-md-3">
              <img src="${bot.img}" class="img-fluid rounded-start card-img-top" alt="...">
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
      <div class="popup" style="display: none;">
        <img src="https://icones.pro/wp-content/uploads/2022/10/icone-robot-violet.png" />
        <h4>${bot.title} | Commandes</h4>
        <div class="popup-content">
          <p>${bot.commandes}</p>
        </div>
      </div>
    </div>
    `;
  }

  return render;
};
