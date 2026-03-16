import { test, expect } from '@playwright/test';

test('ReqRes API Automation', async ({ request }) => {

    let userId;

    const headers = {
        "x-api-key": "pub_108f70c2b25451934d74c5ed7411165b26dc9cb8ecff75828dd4aaf309f09662",
        "Content-Type": "application/json"
    };

    // Step 1: Create user
    const createResponse = await request.post("https://reqres.in/api/users", {
        headers: headers,
        data: {
            name: "Sanket",
            job: "QA Engineer"
        }
    });

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    userId = createBody.id;

    console.log("Created User ID:", userId);

    // Step 2: Get existing user details
    const getResponse = await request.get("https://reqres.in/api/users/2", {
        headers: headers
    });

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    expect(getBody.data.id).toBe(2);

    console.log("Fetched User:", getBody);

    // Step 3: Update user
    const updateResponse = await request.put(`https://reqres.in/api/users/${userId}`, {
        headers: headers,
        data: {
            name: "Sanket Padam",
            job: "Senior QA Engineer"
        }
    });

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();
    expect(updateBody.name).toBe("Sanket Padam");

    console.log("Updated User:", updateBody);

});