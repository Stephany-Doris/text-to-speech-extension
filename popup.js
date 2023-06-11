let utterance = new SpeechSynthesisUtterance();
let tabId;

let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let rateButton = document.getElementById("rate");

playButton.addEventListener("click", playTextToSpeech);
stopButton.addEventListener("click", stopTextToSpeech);
rateButton.addEventListener("input", onChangeRate);

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  let utterance = new SpeechSynthesisUtterance();
  utterance.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

function onChangeRate() {
  const rate = document.querySelector("#rate").value;
  let utterance = new SpeechSynthesisUtterance();
  utterance.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
}

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
  console.log({articleElement});
  if (articleElement) {
    let utterance = new SpeechSynthesisUtterance();
    let text = articleElement.textContent;
    utterance.text = text;
    speechSynthesis.speak(utterance);

    if(window.speechSynthesis.speaking){
      window.speechSynthesis.pause();
    }
    if(window.speechSynthesis.paused){
      window.speechSynthesis.resume();
    }
    // code to pause if utterance has been started
    // document.querySelector("#pause").addEventListener("click", () => {
    //   window.speechSynthesis.pause();
    // });
    // window.speechSynthesis.resume();
  }
}

function stopArticleContent() {
  console.log("stop");
  window.speechSynthesis.cancel();
}
