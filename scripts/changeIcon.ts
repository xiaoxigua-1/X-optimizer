const favicons = document.querySelector(
  'link[rel="shortcut icon"]',
) as HTMLLinkElement;

if (favicons) favicons.href = "//abs.twimg.com/favicons/twitter.2.ico";

function replaceLogo(logo: HTMLAnchorElement) {
  logo.innerHTML = `<img src="${chrome.runtime.getURL(
    "icons/twitter-icon-24.svg",
  )}" />`;
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      const logo = document.querySelector(
        `a[aria-label="X"]`,
      ) as HTMLAnchorElement;

      if (logo) {
        replaceLogo(logo);
        observer.disconnect();
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
