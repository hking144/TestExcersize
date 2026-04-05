import type { Page } from '@playwright/test';
import env from '../../EnviroParameters.json';

/** Must match a key under `users` in EnviroParameters.json (e.g. validUser, invalidUser). */
export const USER = 'validUser';

export type UserRecord = {
  username: string;
  email: string;
  password: string;
  first_name: string,
  last_name: string,
  address: string,
  country: string,
  state: string,
  city: string,
  zipcode: string,
  mobile_number: string

  days: string,
  months: string,
  years: string,

  card_num: string,
  card_name: string,
  ccv: string,
  exp: string,
  year: string
};

type EnvFile = {
  users: Record<string, UserRecord>;
};

const { users } = env as EnvFile;

export function getUser(userName: string): UserRecord {
  const user = users[userName];
  if (!user) {
    throw new Error(
      `Unknown user "${userName}". Available: ${Object.keys(users).join(', ')}`
    );
  }
  return user;
}

export async function signUp(page: Page): Promise<void> {
  const{username,email } = getUser(USER);
  await page.locator('[data-qa="signup-name"]').fill(username);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

}
export async function signUpFromHome(page: Page): Promise<void> {
  await page.locator('a[href="/login"]').click();
  
  const{username,email } = getUser(USER);
  await page.locator('[data-qa="signup-name"]').fill(username);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

}
export async function logIn(page: Page): Promise<void> {
  const{password,email } = getUser(USER);
  await page.locator('[data-qa="login-email"]').fill(email);
  await page.locator('[data-qa="login-password"]').fill(password);
  await page.locator('[data-qa="login-button"]').click();

}
export async function registerNew(page: Page): Promise<void> {
  const { password, days, months, years, first_name, last_name, address, country, state, city, zipcode, mobile_number } = getUser(USER);

  // Account Information
  await page.locator('[data-qa="password"]').fill(password);
  await page.locator('[data-qa="days"]').selectOption(days);
  await page.locator('[data-qa="months"]').selectOption(months);
  await page.locator('[data-qa="years"]').selectOption(years);

  // Address Information
  await page.locator('[data-qa="first_name"]').fill(first_name);
  await page.locator('[data-qa="last_name"]').fill(last_name);
  await page.locator('[data-qa="address"]').fill(address);
  await page.locator('[data-qa="country"]').selectOption(country);

  await page.locator('[data-qa="state"]').fill(state);
  await page.locator('[data-qa="city"]').fill(city);
  await page.locator('[data-qa="zipcode"]').fill(zipcode);
  await page.locator('[data-qa="mobile_number"]').fill(mobile_number);

  // Submit
  await page.locator('[data-qa="create-account"]').click();
  console.log("Success: account created");
  await page.locator('[data-qa="continue-button"]').click();

}

export async function FillCardDetails(page: Page): Promise<void> {
  const { card_name, card_num, ccv, exp, year} = getUser(USER);

  await page.locator('[data-qa="name-on-card"]').fill(card_name);
  await page.locator('[data-qa="card-number"]').fill(card_num);
  await page.locator('[data-qa="cvc"]').fill(ccv);
  await page.locator('[data-qa="expiry-month"]').fill(exp);
  await page.locator('[data-qa="expiry-year"]').fill(year);

  await page.locator('[data-qa="pay-button"]').click();

}

export async function deleteUser(page: Page): Promise<void> {
  const deleteBtn = page.getByText('Delete Account');
  await deleteBtn.click();
  await page.locator('[data-qa="continue-button"]').click();
  console.log("Useer deleted");
}
