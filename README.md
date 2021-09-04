<!-- @format -->

# Okra API Test

A Simple API Implementation for Okra Code Test.

# Description

This comes with fixing the bug in Core Service, Troubleshooting found in `src/troubleshooting.js`, Question 1 - Consuiming API's and Question 2 - Creating Logic.

# Installation

### Step 1

Clone or download this repository to your machine:

- Clone the repo: `git clone https://github.com/bytesfield/okra-test.git`
- [Download from Github](https://github.com/bytesfield/okra-test/archive/refs/heads/main.zip).

### Step 2

`npm install` to install all application dependencies.

Update Environment variables, rename `.env.example` to `.env` and update `APP_PORT` to your desired port default is `3000`, also `APP_ENV` to `production` or `test` depending on your environment default is `test`.

### Step 3

Start your development server : `npm start` this serves the application to default `localhost:3000`

### Step 4

For Testing you can run `npm test`

Open Postman run the Api endpoints. Documentation can be accessed below

# Documentation

The API documentation is hosted on [Postman Doc](https://documenter.getpostman.com/view/10912779/U16gNmS6)

### OR

_To Test the Troubleshoot code to see result run the following command on your terminal_
`node src/troubleshooting.js`

```javascript
//Result
User =>  { id: '573839293', name: 'Dami Banwo' }
Accounts  => [
  {
    id: '3084202491',
    name: 'Core Savings',
    act_no: 1933849303,
    connected: true,
    connected_apps: [ 'catch-a-ride-app', 'budget-core-app' ]
  },
  {
    id: '3084202492',
    name: 'Current Account',
    act_no: 2844908489,
    connected: false,
    connected_apps: []
  }
]
```

### Question 1 (Solution)

```javascript
//ENDPOINT
http://localhost:3000/api/transaction/refund

//BODY
{
    "company_id": "484929849",
    "customer_id": "573839293",
    "amount": 200
}

//RESPONSE
{
    "status": "Success",
    "statusCode": 200,
    "message": "Refund Processed Successfully",
    "data": [
        {
            "status": "success",
            "amount": 200
        },
        {
            "initialBalance": {
                "amount": 50325884,
                "currency": "NGN"
            }
        },
        {
            "currentBalance": {
                "amount": 50328684,
                "currency": "NGN"
            }
        }
    ]
}
```

### Question 2 (Solution)

```javascript
//ENDPOINT
http://localhost:3000/api/auth/login

//BODY
{
    "username" : "okra_user",
    "password" : "okra_pass"
}

//RESPONSE
{
    "status": "success",
    "message": "Logic Processed Successfully",
    "data": {
        "id": "573839293",
        "name": "Dami Banwo",
        "wallet_balance_before": "293884",
        "wallet_balance_after": "200321284",
        "logout_message": "okra-logout-bingo"
    }
}
```

# Contribution

Find me on
<a href="https://twitter.com/SaintAbrahams/">Twitter.</a>
<a href="https://www.linkedin.com/in/abraham-udele-246003130/">Linkedin.</a>

# License

Source codes is license under the MIT license.
