import { Page } from "puppeteer";
import { path, createCursor, ClickOptions } from "ghost-cursor";
import { randomRange } from "../helpers/randomRange.js";

export const loginOnDiscord = async (page: Page) => {
    await page.goto("https://discord.com/login")
    const cursor = createCursor(page);

    await page.waitForSelector(".wrapper__2d9b1")
    await page.evaluate(() => {
        console.log(localStorage)
        localStorage.removeItem("MultiAccountStore")
    })
    await page.reload()

    const form = await page.waitForSelector("form.authBoxExpanded_e57789")
    if (!form) throw new Error("unable to select form element Selector: form.authBoxExpanded_e57789")

    const emailInput = await form.$("input.inputDefault__80165[name='email']")
    const passwordInput = await form.$("input.inputDefault__80165[name='password']")

    if (!emailInput) throw new Error("unable to select emailInput element. Selector: input.inputDefault__80165[name='email']")
    if (!passwordInput) throw new Error("unable to select passwordInput element. Selector: input.inputDefault__80165[name='password']")

    const clickOptions: ClickOptions = {
        hesitate: randomRange(200, 900),
        waitForClick: randomRange(20, 100),
        moveDelay: randomRange(20, 50)
    }
    await cursor.click(emailInput, clickOptions);


}   