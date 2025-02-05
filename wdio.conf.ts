import path from "node:path";
export const config: WebdriverIO.Config = {
  runner: "local",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: "./tsconfig.json",
      transpileOnly: true,
    },
  },
  specs: ["src/specs/**/*.ts"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "vscode",
      browserVersion: "stable",
      "wdio:vscodeOptions": {
        // points to directory where extension package.json is located
        extensionPath: __dirname,
        // optional VS Code settings
        workspacePath: path.join(__dirname, "test-ws"),
        userSettings: {
          "editor.fontSize": 14,
        },
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      "vscode",
      {
        cachePath: path.join(__dirname, "..", ".wdio-vscode-service"),
      },
    ],
  ],

  framework: "mocha",
  reporters: ["spec"],
  // Setting this allows `vscode` auto attach a debugger if "Auto Attach: With Flag" is set
  execArgv: ["--inspect"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
