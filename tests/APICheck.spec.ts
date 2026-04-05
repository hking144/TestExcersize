import { test, expect } from '@playwright/test';
import { getUser } from './helpers/RegisterUser';

const USER = 'validUser1';

test('Get User Good Creds', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
        form: {
            email: getUser(USER).email,
            password: getUser(USER).password
        }
    });

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.message).toBe('User exists!');
    expect(response.status()).toBe(200);
});

test('Get User Missing Creds', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
        form: {
            // no email here
            password: getUser(USER).password
        }
    });

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    expect(responseBody.responseCode).toBe(400);
});

test('Get User Bad Creds', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
        form: {
            email: "123123123123xdfswedfesfvxdfvdxfesf",
            password: "123123123dwadaw3e23q4esdf123xvxdfvdxfesf"
        }
    });

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.message).toBe('User not found!');
    expect(responseBody.responseCode).toBe(404);
});

test('Delete User', async ({ request }) => {
    const response = await request.delete('/api/deleteAccount', {
        form: {
            email: getUser(USER).email,
            password: getUser(USER).password
        }
    });

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.message).toBe('Account deleted!');
    expect(responseBody.responseCode).toBe(200);
});