export const closeProcess = function (cb: Function) {
    if (process.platform === "win32") {
        const rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("SIGINT", () => cb());
        rl.on('SIGTERM', () => cb());
    }

    process.on('SIGINT', () => cb());
    process.on('SIGTERM', () => cb());
};