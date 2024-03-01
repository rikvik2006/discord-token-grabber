import { Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { closeAboutBlank } from "../helpers/closeAboutBlank.js";

export const createBrowser = async () => {
    const isProductionEnv = process.env.PRODUCTION;
    const executablePath = process.env.EXECUTABLE_PATH;
    const userDataDir = process.env.USER_DATA_DIR;

    if (isProductionEnv == undefined) {
        throw new Error("You need to specirty a deploymed status (Production or Developing). Expected: Boolean")
    }

    if (!executablePath) {
        throw new Error("You need to specify an executable path")
    }

    if (!userDataDir) {
        throw new Error("You need to specify a user data dir")
    }

    const isProduction = isProductionEnv == "true" ? true : false

    let browser: Browser
    try {
        puppeteer.default.use(StealthPlugin());
        browser = await puppeteer.default.launch({
            executablePath: executablePath,
            userDataDir: userDataDir,
            headless: isProduction,
            devtools: !isProduction,
            defaultViewport: isProduction ? { width: 2560, height: 1440 } : null,
            args: ["--start-maximized"]
        })

        const page = await browser.newPage();
        const pages = await browser.pages()
        await closeAboutBlank(pages)


    } catch (err) {
        console.log(err);
    }
}