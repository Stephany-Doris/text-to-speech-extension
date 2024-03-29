chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getArticleContent") {
      let articleElement = document.querySelector("article");
      if (articleElement) {
        let text = articleElement.textContent;
        sendResponse({ content: text });
      } else {
        sendResponse({ content: null });
      }
    }
  });
  