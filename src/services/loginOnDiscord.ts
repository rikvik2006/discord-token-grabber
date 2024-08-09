import { Page } from "puppeteer";
import { path, createCursor, ClickOptions } from "ghost-cursor";
import { randomRange } from "../helpers/randomRange.js";
import { waitForDebugger } from "inspector";
import { getTokenController } from "../controllers/getTokenController.js";

export const loginOnDiscord = async (page: Page, credential: string) => {
    await page.goto("https://discord.com/login")
    const cursor = createCursor(page);

    const clickOptions: ClickOptions = {
        hesitate: randomRange(200, 900),
        waitForClick: randomRange(20, 100),
        moveDelay: randomRange(20, 50)
    }
    await page.waitForSelector(".wrapper__2d9b1")

    try {
        // await page.waitForSelector("button.button_afdfd9.lookLink__93965", { timeout: 3000 })
        const addAccountButton = await page.$("button.button_afdfd9.lookLink__93965");

        if (addAccountButton) {
            await cursor.click(addAccountButton, clickOptions);
        }
    } catch (err) {
        console.log(err);
    }

    const form = await page.waitForSelector("form.authBoxExpanded_e57789")
    if (!form) throw new Error("unable to select form element Selector: form.authBoxExpanded_e57789")

    const emailInput = await form.$("input.inputDefault__80165[name='email']")
    const passwordInput = await form.$("input.inputDefault__80165[name='password']")

    if (!emailInput) throw new Error("unable to select emailInput element. Selector: input.inputDefault__80165[name='email']")
    if (!passwordInput) throw new Error("unable to select passwordInput element. Selector: input.inputDefault__80165[name='password']")

    console.log(`⭐ Credential: ${credential}`)
    const credentialSplit = credential.trim().split(":")
    // console.log(`⭐ Credential split: ${credentialSplit}`)
    const userMail = credentialSplit[0]
    const userPassword = credentialSplit[1]
    await cursor.click(emailInput, clickOptions);
    await emailInput.type(userMail);
    await cursor.click(passwordInput, clickOptions);
    await passwordInput.type(userPassword);

    await form.waitForSelector("button.marginBottom8_f4aae3.button__47891");
    const loginButton = await form.$("button.marginBottom8_f4aae3.button__47891");

    if (!loginButton) throw new Error("unable to select the login button Selector: button.marginBottom8_f4aae3.button__47891")

    await cursor.click(loginButton, clickOptions);
    // const errorLabelNewLoginPosition: boolean = await form.$eval(
    //     "label.label__5447e span.errorMessage__8c3f5",
    //     (element: HTMLSpanElement | undefined) => element ? true : false
    // )

    const errorLabelNewLoginPosition = await page.$("label.label__5447e span.errorMessage__8c3f5")

    console.log(`🛟 Error Label: ${errorLabelNewLoginPosition}`)

    if (errorLabelNewLoginPosition) {
        console.log("📦 Dentro al if per gestire l'errore della label")
    } else {
        await getTokenController(page)
    }
}   