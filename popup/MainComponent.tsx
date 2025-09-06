import { useEffect, useState } from "react";
import Select from "react-select";

interface Option {
  readonly value: string;
  readonly label: string;
}

const replaceUrlOptions: Array<Option> = [
  {
    value: "fxtwitter.com",
    label: "fxtwitter",
  },
  {
    value: "vxtwitter.com",
    label: "vxtwitter",
  },
];

async function saveChange(newValue?: string) {
  if (newValue)
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
