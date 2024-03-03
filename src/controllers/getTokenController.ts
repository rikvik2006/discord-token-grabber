import { Page, TimeoutError } from "puppeteer";
import { getTokenServices } from "../services/getTokenServices.js";
import { logoutServices } from "../services/logoutServices.js";

// Variabile declaration for token getter on browser context 
declare var webpackChunkdiscord_app: any;
declare var m: any;

export const getTokenController = async (page: Page) => {
    try {
        await page.waitForSelector(".wrapper_d281dd div.childWrapper__01b9c", {
            timeout: 7000
        })
        const token = await getTokenServices(page);
        console.log(`⭐ Token: ${token}`)

        await logoutServices(page)
    } catch (err) {
        if (!(err instanceof TimeoutError)) throw new Error("an error is occured in getTokenController")


    }

}