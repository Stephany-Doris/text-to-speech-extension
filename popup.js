let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let tabId;

playButton.addEventListener("click", playTextToSpeech);
stopButton.addEventListener("click", stopTextToSpeech);

function playTextToSpeech() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: playArticleContent,
    });
  });
}

function stopTextToSpeech() {
  if (tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: stopArticleContent,
    });
  }
}

function playArticleContent() {
  let articleElement = document.querySelector("article");
  if (articleElement) {
    let text = articleElement.textContent;
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
}

function stopArticleContent() {
  speechSynthesis.cancel();
}
