const { test } = require("@playwright/test");

test("Popup Handle",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await  page.locator("#alertbtn").click()
    page.on("dialog",dialog=>dialog.accept)  //ialog.dismiss to pick false value
    await page.locator("#mousehover").hover()

    //framelocator

    const framePage = page.frameLocator("#courses-iframe")
    await framePage.locator("li a[href*='lifetime-access']:visible").click() //will check the visible and click (hidden is not clicked)

    await framePage.locator(".text h2").waitFor()
    const subscribersText = await framePage.locator(".text h2").textContent()
    await console.log("Text Content---->",subscribersText);

    await console.log("Splitting Subscribers Count---->",subscribersText.split(" ")[1]);
    
})