document.addEventListener("copy", async (text) => {
  const copyText = text.target.outerText;
  const host = await chrome.storage.sync.get(["host"]);

  if (copyText.match(/https:\/\/x.com\/./)) {
    await navigator.clipboard.writeText(copyText.replace("x.com", host.host));
  }
});
