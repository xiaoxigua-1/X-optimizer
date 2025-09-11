import { useEffect, useState } from "react";
import Select from "react-select";
import ReplaceUrls from "../replace_urls.json";

interface Option {
  readonly value?: string;
  readonly label: string;
}

const replaceUrlOptions: Array<Option> = ReplaceUrls as Array<Option>;

async function saveChange(newValue?: string) {
  await chrome.storage.sync.set({
    replaceUrl: newValue,
  });
}

async function findReplaceUrl(findValue: string) {
  return replaceUrlOptions.findIndex(({ value }) => value === findValue);
}

export default function MainComponent() {
  const [replaceUrl, setReplaceUrl] = useState<Option>();

  useEffect(() => {
    (async () => {
      const result = await chrome.storage.sync.get(["replaceUrl"]);

      setReplaceUrl(
        result.replaceUrl
          ? replaceUrlOptions[await findReplaceUrl(result.replaceUrl)]
          : replaceUrlOptions[0],
      );
    })();
  }, []);

  return (
    <div>
      {replaceUrl ? (
        <Select
          options={replaceUrlOptions}
          onChange={(newValue) => {
            saveChange(newValue?.value);
          }}
          defaultValue={replaceUrl}
        />
      ) : null}
    </div>
  );
}
