document.addEventListener("copy", async (e) => {
  const target = e.target as HTMLElement | null;
  const copyText = target?.outerText ?? "";
  const result = await chrome.storage.sync.get(["replaceUrl"]);

  if (copyText.match(/https:\/\/x.com\/./)) {
    await navigator.clipboard.writeText(
      copyText.replace("x.com", result.replaceUrl),
    );
  }
});
