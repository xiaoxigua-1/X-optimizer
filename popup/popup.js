async function changeHost(hostName) {
  await chrome.storage.sync.set({ host: hostName });
}

async function getSettingHosts() {
  const result = await chrome.storage.sync.get(["host"]);

  return result.host;
}

document.addEventListener("DOMContentLoaded", async () => {
  const host = await getSettingHosts();

  document.querySelector(".dd-button").innerText = `Select ${host}`;
});

document.querySelectorAll(".dd-menu > li").forEach((element) =>
  element.addEventListener("click", async (event) => {
    const selectHost = event.target.innerText;

    changeHost(selectHost);
    document.querySelector(".dd-button").innerText = `Select ${selectHost}`;
  }),
);
