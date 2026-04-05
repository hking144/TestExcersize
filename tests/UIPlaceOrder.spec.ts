import { test, expect, type Page } from '@playwright/test';
import { deleteUser, FillCardDetails, getUser, registerNew, signUp, USER, signUpFromHome } from './helpers/RegisterUser';
import { error } from 'node:console';

async function addItemGotoCart(page: Page): Promise<void> {
  const item = page.locator('.product-image-wrapper').filter({
    has: page.getByText('Premium Polo T-Shirts'),
  });
  await item.scrollIntoViewIfNeeded();
  await item.locator('.productinfo a.add-to-cart').first().hover();
  await item.locator('.productinfo a.add-to-cart').first().click();

  const cartBtn = page.getByText('view cart');
  await cartBtn.click();
}
async function gotoCart(page: Page): Promise<void> {
  await page.getByText('Cart').first().click();
}
async function atCartBuyLogin(page: Page): Promise<void> {
  //#region ityem in cart checks
  try {
    await expect(page).toHaveTitle(/Automation Exercise - Checkout/i);
  } catch {
    throw new Error('Failure: to go to cart');
  }
  console.log('Success: Navigated to cart');

  try {
    await expect(page.locator('#cart_info')).toContainText(/premium polo t-shirt/i);
  } catch {
    throw new Error('Failure: to find added item');
  }
  console.log('Success: Item in cart ');
  //#endregion

  Checkout(page);
  const loginBtn = page.getByText('Register / Login').last();
  await loginBtn.click();
}
async function atCartBuy(page: Page): Promise<void> {
  //#region ityem in cart checks
  try {
    await expect(page).toHaveTitle(/Automation Exercise - Checkout/i);
  } catch {
    throw new Error('Failure: to go to cart');
  }
  console.log('Success: Navigated to cart');

  try {
    await expect(page.locator('#cart_info')).toContainText(/premium polo t-shirt/i);
  } catch {
    throw new Error('Failure: to find added item');
  }
  console.log('Success: Item in cart ');
  //#endregion

  Checkout(page);
}
async function Checkout(page: Page) {
  const checkoutBtn = page.getByText('Proceed To Checkout');
  await checkoutBtn.click();
}


async function ConfirmPostalInfo(page: Page) {
  await expect(page.locator('#address_delivery .address_firstname.address_lastname'))
    .toContainText(getUser(USER).first_name + " " + getUser(USER).last_name);

}
async function EnterDescription(page: Page) {
  await page.locator('textarea.form-control').fill("test");
}
async function Purchase(page: Page) {
  await page.locator('.btn.btn-default').first().click();

}


test.describe('Automation at cart register', () => {
  test('Register while Checkout', async ({ page }) => {
    //#region Ad blocker
    // Define a list of common ad-related URL substrings
    const adBlockList = [
      'google-analytics',
      'doubleclick',
      'adzerk',
      'amazon-adsystem',
      'adnxs',
      'adsbygoogle',
      'moatads',
      'popads',
      'outbrain'
    ];

    // Set up the interceptor
    await page.route('**/*', (route) => {
      const url = route.request().url();

      // Check if the URL contains any of the strings in our block list
      if (adBlockList.some(adUrl => url.includes(adUrl))) {
        return route.abort();
      }

      // Otherwise, let the request through
      return route.continue();
      //#endregion
    });
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/i);

    await addItemGotoCart(page);
    await atCartBuyLogin(page);

    //#region Sign up checks
    await signUp(page);
    await registerNew(page);
    try {
      await expect(page.locator('.navbar-nav')).toContainText(getUser(USER).username);
    } catch {
      throw error('Failure: to recieve correct login ID ' + USER);
    }
    console.log('Success: recieved correct login ID ' + USER);
    //#endregion
    await gotoCart(page);
    await Checkout(page);

    await ConfirmPostalInfo(page);
    await EnterDescription(page)

    await Purchase(page);
    await FillCardDetails(page);

    await deleteUser(page);
  });
});

test.describe('Automation register first', () => {
  test('Register before Checkout', async ({ page }) => {
    //#region Ad blocker
    // Define a list of common ad-related URL substrings
    const adBlockList = [
      'google-analytics',
      'doubleclick',
      'adzerk',
      'amazon-adsystem',
      'adnxs',
      'adsbygoogle',
      'moatads',
      'popads',
      'outbrain'
    ];

    // Set up the interceptor
    await page.route('**/*', (route) => {
      const url = route.request().url();

      // Check if the URL contains any of the strings in our block list
      if (adBlockList.some(adUrl => url.includes(adUrl))) {
        return route.abort();
      }

      // Otherwise, let the request through
      return route.continue();
      //#endregion
    });
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/i);
    //#region Sign up checks
    await signUpFromHome(page);
    await registerNew(page);
    try {
      await expect(page.locator('.navbar-nav')).toContainText(getUser(USER).username);
    } catch {
      throw error('Failure: to recieve correct login ID ' + USER);
    }
    console.log('Success: recieved correct login ID ' + USER);
    //#endregion
    await addItemGotoCart(page);
    await atCartBuy(page);

    await Checkout(page);

    await ConfirmPostalInfo(page);
    await EnterDescription(page)

    await Purchase(page);
    await FillCardDetails(page);

    await deleteUser(page);
  });
});