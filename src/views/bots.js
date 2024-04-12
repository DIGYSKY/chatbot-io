export default (bot, action) => {
  let render = '';
  let botAction = '';

  action.forEach((element) => {
    if (bot.index !== 'all' && element.who.includes(bot.index)) {
      botAction += (`${element.name} | ${element.description} <br>`);
    }
  });

  if (bot.statut !== 'none') {
    render = `
    <div>
      <button class="button-bot mb-3">
        <div>
          <div class="row g-0 align-items-center">
            <div class="col-md-3">
              <img src="${bot.img}" class="img-fluid card-img-top" alt="...">
            </div>
            <div class="col-md-9">
              <div class="card-body m-8">
                <h5 class="card-title">Chatbot | ${bot.title}</h5>
                <p class="card-text">${bot.description}</p>
                <p class="${bot.statut ? 'text-success' : 'text-danger'}">${bot.statut ? 'Bot online' : 'Bot offline'}</p>
              </div>
            </div>
          </div>
        </div>
      </button>
      <div class="popup" style="display: none;">
        <img src="${bot.img}" />
        <h4>${bot.title} | Commandes</h4><br>
        <div class="popup-content">
          <p>${botAction}</p>
        </div>
      </div>
    </div>
    `;
  }

  return render;
};
