import { Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import HCaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { closeAboutBlank } from "../helpers/closeAboutBlank.js";
import { loginOnDiscord } from "./loginOnDiscord.js";
import fs from "fs";

export const createBrowser = async () => {
    const isProductionEnv = process.env.PRODUCTION;
    const executablePath = process.env.EXECUTABLE_PATH;
    const userDataDir = process.env.USER_DATA_DIR;
    const captchaSolverApiKey = process.env.CAPTCHA_SOLVER_API_KEY

    if (isProductionEnv == undefined) {
        throw new Error("You need to specirty a deploymed status (Production or Developing). Expected: Boolean")
    }

    if (!executablePath) {
        throw new Error("You need to specify an executable path")
    }

    if (!userDataDir) {
        throw new Error("You need to specify a user data dir")
    }

    if (!captchaSolverApiKey) {
        throw new Error("You need to specify captcha solver ì'api key")
    }

    const isProduction = isProductionEnv == "true" ? true : false

    let browser: Browser
    console.log(`🔗 Executable path: ${executablePath}`)
    try {
        puppeteer.default.use(StealthPlugin());
        puppeteer.default.use(HCaptchaPlugin.default({
            provider: {
                id: "2captcha",
                token: captchaSolverApiKey
            },
            visualFeedback: true,
        }))

        browser = await puppeteer.default.launch({
            executablePath: executablePath,
            userDataDir: userDataDir,
            headless: isProduction,
            devtools: !isProduction,
            defaultViewport: isProduction ? { width: 2560, height: 1440 } : null,
            args: ["--start-maximized"]
        })

        const page = await browser.newPage();
        const pages = await browser.pages();
        await closeAboutBlank(pages);

        const buffer = fs.readFileSync("./data/loginInfo.txt");
        const credentials = buffer.toString('utf-8').split("\n");

        for (let credential of credentials) {
            await loginOnDiscord(page, credential);
        }
    } catch (err) {
        console.log(err);
    }
}