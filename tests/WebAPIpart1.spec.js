const { test, request, expect } = require("@playwright/test");

const loginPayload = {userEmail: "kartik+test@gmail.com", userPassword: "Admin@123"}
const orderPayload = {orders: [{country: "India", productOrderedId: "68a961719320a140fe1ca57c"}]}

let token;
let orderId;
test.beforeAll(async()=>{
    //Login API
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:loginPayload
        }
    )
    await expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token
    console.log('Response------>',token);


    //Order API
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data:orderPayload,
        headers:{
            'Authorization':token,
            'Content-type': 'application/json'
        }        
    }
)

    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0]
     console.log('Order Id----->',orderId);
})



test('API test',async({page})=>{


    //Injecting token for login
   await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token)
     await page.goto("https://rahulshettyacademy.com/client/")

    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles);
    await page.locator("[routerlink*='/myorders']").click();
     await page.locator('tbody').waitFor();
     await expect(page.getByText(orderId)).toBeTruthy()

})