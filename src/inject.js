var timeoutFromMessage = null;

//This function was changed from the original code.
WAPI.waitNewMessages(false, (data) => {
    data.forEach((message) => {
        //fetch API to send and receive response from server
        body = {};
        body.text = message.body;
        body.type = 'message';
        body.user = message.from._serialized;
        //body.original = message;

        console.log(message);
        console.log(`CONTENT: ${message.content}`);

        if (message.type == "chat" || message.type == 'sticker' ) {
            //message.isGroupMsg to check if this is a group
            if (message.isGroupMsg) {
                const chatId = message.chatId && message.chatId._serialized;
                const authorId = message.author && message.author._serialized;
                console.log(message.authorId);
                if (chatId === 'XXXXXXXXXXXXXXXXXXXXXXXX' && (authorId === 'XXXXXXXXXXXXXXXXXXXXX' || authorId === 'XXXXXXXXXXXXXXXXX')) {
                  console.log('entrou na verificação');
                  const chat = WAPI.getChatById('XXXXXXXXXXXXXXXXX');
                  const userBanned = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
                  const chatParticipants = chat.groupMetadata.participants;
                  const userInGroup = chatParticipants.reduce( (res, currVal) => {
                    console.log(currVal);
                    if (currVal.id._serialized === userBanned) {
                      res = false;
                    }
                    return res; 
                  }, true)
                  console.log(userInGroup);
                  if (!userInGroup) {
                    seeUserBanned(1);
                  } 
                }
                return;
            }
            // WAPI.sendSeen(message.from._serialized);
            // WAPI.sendMessage2(message.from._serialized, response);
        }
    });
});




function seeUserBanned(second){
  console.log(`entrou aqui na seeUserBanned -- ${second}` );
  if (second < 90){
    clearTimeout(timeoutFromMessage);
    timeoutFromMessage = setTimeout(() => {
      const chat = WAPI.getChatById('5517991179223-1537668747@g.us');
      const userBanned = '5517997161902@c.us';
      const chatParticipants = chat.groupMetadata.participants;
      let teste = false;
      const wasUserBanned = chatParticipants.reduce( (res, currVal) => {
                              if (currVal.id._serialized === userBanned) {
                                res = false;
                              }
                              return res; 
                          }, true)
      console.log(wasUserBanned);
      if (!wasUserBanned) {
        console.log('Not banned yet');
        return seeUserBanned(second+1);
      } else {
        clearTimeout(timeoutFromMessage);
        timeoutFromMessage = null;
        console.log('banned');
        return 'banido';
      }
    }, 2000);
  } else {
    timeoutFromMessage = null;
  }
}

WAPI.addOptions = function () {
    var suggestions = "";
    intents.smartreply.suggestions.map((item) => {
        suggestions += `<button style="background-color: #eeeeee;
                                margin: 5px;
                                padding: 5px 10px;
                                font-size: inherit;
                                border-radius: 50px;" class="reply-options">${item}</button>`;
    });
    var div = document.createElement("DIV");
    div.style.height = "40px";
    div.style.textAlign = "center";
    div.style.zIndex = "5";
    div.innerHTML = suggestions;
    div.classList.add("grGJn");
    var mainDiv = document.querySelector("#main");
    var footer = document.querySelector("footer");
    footer.insertBefore(div, footer.firstChild);
    var suggestions = document.body.querySelectorAll(".reply-options");
    for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i];
        suggestion.addEventListener("click", (event) => {
            // console.log(event.target.textContent);
            window.sendMessage(event.target.textContent).then(text => console.log(text));
        });
    }
    mainDiv.children[mainDiv.children.length - 5].querySelector("div > div div[tabindex]").scrollTop += 100;
}