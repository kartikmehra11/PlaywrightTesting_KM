const { test, expect } = require("@playwright/test");

test('Client App Login',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/")
    const productName = "ZARA COAT 3"
    const email = page.locator("[type='email']")
    const password = page.locator("#userPassword")
    const products = page.locator(".card-body")

    await email.fill("kartik+test@gmail.com")
    await password.fill("Admin@123")

    await page.locator("#login").click()

    await page.locator(".card-body b").first().waitFor();
    await page.waitForLoadState('networkidle')
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles);
    
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if(await products.nth(i).locator('b').textContent() === productName)
        {

            //add to card button

            await products.nth(i).locator("text=Add to cart").click()
             break;
        }
        
    }
    await expect(page.locator('text = Product Added to cart')).toBeVisible();

    await page.locator("[routerlink='/dashboard/cart']").click();
     await page.locator('div li').first().waitFor();
      
    // const cartItem = await page.locator(".cartSection h3").textContent()
    // await expect(cartItem).toBe(productName)

     const cartItem = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
     await expect(cartItem).toBeTruthy()

     await page.locator('text=Checkout').click()


    // place order page

    await page.locator("[value='4542 9931 9292 2293']").fill('124215 4214124') //fill card details
    await page.locator('select').first().selectOption('05');
    await page.locator('select').last().selectOption('25');
    await page.locator('input.input.txt').nth(1).fill('321')
     await page.locator('input.input.txt').nth(2).fill('Kartik Mehra')

    // await page.locator('.input txt').nth(2).fill('Kartik Mehra')

    await page.locator("[placeholder*='Country']").pressSequentially('ind')  // enter one by one letter
    const options = page.locator('.ta-results');
    await options.waitFor() //wait until loaded
    
    const optionsCount = await options.locator('button').count();

    for (let i = 0; i < optionsCount; i++) {

        const text = await options.locator('button').nth(i).textContent();
        if (text === ' India')
           {
            await options.locator('button').nth(i).click();
            break;
           }
    }

    const emailLabel = await page.locator('.user__name label').textContent();
    const emailTextbox = await page.locator('.user__name input').first().inputValue();

    console.log("Logging already present---->",await emailLabel);
     console.log("Logging input value---->",await emailTextbox);
    
    
    await expect(emailLabel).toBe(emailTextbox)
    await page.locator('.action__submit').click()

    //orders page
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ') //match exact text with spaces

    
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()  //getting order id from parent css to child
   
    // const orderIDOnly = await orderId.replaceAll('|','').replaceAll(' ','')
    // console.log(orderIDOnly);
    
    await page.locator("[routerlink*='/myorders']").first().click();
    await page.locator('tbody').waitFor() //wait until table loaded
    const ordersList = await page.locator("tbody tr");
    const orderCount = await ordersList.count();
    await console.log(orderCount);
    
    for (let i = 0; i < orderCount; i++) {
        
        const rowordersID = await ordersList.nth(i).locator('th').textContent();
        await console.log("Matching with this orderid--->",rowordersID);
        
        if(orderId.includes(rowordersID)){

        console.log("Order found at index--->",i);

            await ordersList.nth(i).locator('button').first().click()  
            break;
        }
        else{
            console.log('Order Not found');  
        }
    }

    await page.pause()
   

    
})