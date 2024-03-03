import { Page } from "puppeteer";

// Variabile declaration for token getter on browser context 
declare var webpackChunkdiscord_app: any;
declare var m: any;

export const getTokenController = async (page: Page) => {
    await page.waitForSelector(".wrapper_d281dd div.childWrapper__01b9c")

    const token: string = await page.evaluate(() => {
        const token = (
            webpackChunkdiscord_app.push(
                [
                    [''],
                    {},
                    (e: any) => {
                        m = [];
                        for (let c in e.c)
                            m.push(e.c[c])
                    }
                ]
            ),
            m
        ).find(
            (m: any) => m?.exports?.default?.getToken !== void 0
        ).exports.default.getToken()

        return token as string
    })

    console.log(`⭐ Token: ${token}`)

}