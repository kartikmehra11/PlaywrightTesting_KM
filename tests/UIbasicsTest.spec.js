const { test, expect } = require("@playwright/test");

test("first playwrigt with Browser context", async ({browser})=> { // Name , Function
        
  //playwright code

  //broswer instance
  const context = await browser.newContext();     //you can pass cookies in arguments to open browser with stored sessions
    const page = await context.newPage(); 
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

});


 test.only("Page context without browser", async ({page})=> { // Name , Function    //test.only to run single test
        
  //playwright code
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
     console.log(await page.title());
  // await expect(page).toHaveTitle("Rahul Shetty Academy -s Login page")

  //css //xpath
  await page.locator('#username').fill('rahulshetty')  //id # 
    await page.locator("[type='password']").fill('learning')  //based on type
  await page.locator('.btn.btn-info.btn-md').click()   //based on class .
    

});

