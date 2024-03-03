import { Page } from "puppeteer";

export const logoutServices = async (page: Page): Promise<void> => {
    await page.evaluate(() => {
        function login(token: any) {
            setInterval(() => {
                const iframe = document.createElement("iframe")
                document.body.appendChild(iframe);
                const contentWindow = iframe.contentWindow;
                if (!contentWindow) {
                    throw new Error("Can't login to discord iframe content window is unaccesible")
                }

                contentWindow.localStorage.token = `"${token}"`
            }, 50);

            setTimeout(() => { location.reload(); }, 2500);
        };

        login('FakeToken.Forloggin.out')
    })
} 