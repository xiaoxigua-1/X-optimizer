/**
 * @type {import('extension').FileConfig}
 *
 * This example demonstrates how to use the excludeBrowserFlags option
 * to disable specific default browser flags like hiding scrollbars or muting audio.
 */
const config = {
  browser: {
    firefox: {
      browserFlags: ["--devtools", "--new-instance"],
      excludeBrowserFlags: [],
      startingUrl: "about:debugging#/runtime/this-firefox",
    },
  },
};

export default config;
