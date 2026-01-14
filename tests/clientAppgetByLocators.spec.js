const { test, expect } = require("@playwright/test");

test('Client App Login',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/")
    const productName = "ZARA COAT 3"
    const email = page.getByPlaceholder('email@example.com')
    const password = page.getByPlaceholder("enter your passsword")
    const products = page.locator(".card-body")

    await email.fill("kartik+test@gmail.com")
    await password.fill("Admin@123")
    await page.getByRole("button",{name:'Login'}).click()

    
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor();

   

    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles);
    
    //filter
    await products.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to cart"}).click()
    
    await expect(page.locator('text = Product Added to cart')).toBeVisible();

     await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click()
     await page.locator('div li').first().waitFor();
      
    // const cartItem = await page.locator(".cartSection h3").textContent()
    // await expect(cartItem).toBe(productName)

     const cartItem = await page.getByText("ZARA COAT 3").isVisible()
     await expect(cartItem).toBeTruthy()

     await page.getByRole("button",{name:"Checkout"}).click()


    // place order page

    await page.getByRole("textbox").first().fill('124215 4214124') //fill card details
    await page.getByRole("combobox").first().selectOption('05');
    await page.getByRole("combobox").nth(1).selectOption('25');
    await page.getByRole("textbox").nth(1).fill('321')
    await page.getByRole("textbox").nth(2).fill('Kartik Mehra')

    // await page.locator('.input txt').nth(2).fill('Kartik Mehra')

    await page.getByPlaceholder("Select Country").pressSequentially('ind')  // enter one by one letter
    
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    
 

    const emailLabel = await page.locator('.user__name label').textContent();
    const emailTextbox = await page.locator('.user__name input').first().inputValue();

    console.log("Logging already present---->",await emailLabel);
     console.log("Logging input value---->",await emailTextbox);
    
    
    await expect(emailLabel).toBe(emailTextbox)
    await page.getByText('Place Order').click();

    //orders page
    await expect(page.getByText('Thankyou for the order.')).toBeVisible() //match exact text with spaces

    
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()  //getting order id from parent css to child
   
    // const orderIDOnly = await orderId.replaceAll('|','').replaceAll(' ','')
    // console.log(orderIDOnly);
    
    await page.getByRole("button",{name:"ORDERS"}).click();
    await page.locator('tbody').waitFor() //wait until table loaded
    await expect(page.getByRole("rowheader",{name:orderId})).toBeTruthy()
   

    
})