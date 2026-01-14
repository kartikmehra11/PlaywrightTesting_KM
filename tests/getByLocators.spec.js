import test, { expect } from "@playwright/test";

test('Playwright Special Locators',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/')


    //getbyLabel does not works correctly on textboxes sometimes (because id or name is not interlinked sometimes with the input field) !!
    await page.getByLabel("Check me out if you Love IceCreams!").click() //auto identifies label click 
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")

    
    //getbyPlaceholder
    await page.getByPlaceholder("Password").fill("12425364")

    //getByRole
    await page.getByRole("button",{name:'Submit'}).click()

    //getByText
    const text = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(text).toBeTruthy()

    //getbyLink
    await page.getByRole("link",{name:'Shop'}).click()

    //filter to find unique out of same tagname
    await page.locator('app-card').filter({hasText:"Nokia Edge"}).getByRole("button").click()

    await page.getByText("Checkout").click()
   
})