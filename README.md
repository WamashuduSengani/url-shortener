# URL Shortening Service

This is a basic URL shortening service implemented using Node.js, Express.js, and MongoDB.

## Table of Contents

1. [Setup](#setup)
2. [Running the Server](#running-the-server)
3. [API Endpoints](#api-endpoints)
4. [Error Handling](#error-handling)
5. [Unit Tests](#unit-tests)
6. [Technologies Used](#technologies-used)


## Setup

1. **Clone the repository:**

   ```bash
   `git clone https://github.com/WamashuduSengani/url-shortener.git`
   cd url-shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   - Install MongoDB if you haven't already.
   - Create a directory named data in the project's root directory to store MongoDB data: Run this command `mkdir data`
   - Start an instance of MongoDB using the following command while inside the project directory:

    ```bash
    mongod --dbpath ./data
    ```

    This command starts MongoDB with the data directory `./data` relative to the current directory.

4. **Create a `.env` file:**

   Create a `.env` file in the root directory and add the following:

   ```
   MONGODB_URI=mongodb://127.0.0.1/url-shortener
   PORT=6000
   ```

## Running the Server

To start the server, run:

```bash
npm start
```

## API Endpoints

**Shorten a URL:**

- URL: /api/url/shorten
- Method: POST
- Request Body: {
  "originalUrl": `"www.a24group.com"`
  }
- Response: {
  "\_id": "66142ba52cc6645075cd282d",
  "originalUrl": `"www.a24group.com"`,
  "shortUrl": "dkZwv98H4",
  "createdAt": "2024-04-08T17:38:45.385Z",
  "\_\_v": 0
  } 

**Redirect to Original URL**

- URL: `/:shortUrl`
- Method: GET
- Response: Redirects to the original URL if found.

**How to Use in Postman**

1. Open Postman: 
    - If you don't have Postman installed, you can download it here.

2. Send a POST request to shorten a URL:
    - Set the request URL to `http://localhost:6000/api/url/shorten`.
    - Set the request method to POST.
    - In the request body, add a JSON object with the key originalUrl and the value as the long URL you want to shorten (e.g., 
    { 

        "originalUrl": "https://www.a24group.com" 
    
    }  
    ).
    - Click on the "Send" button to send the request.

3. Retrieve the shortened URL:

    - Once you send the request, you'll receive a JSON response containing the shortened URL.
    - Copy the shortUrl value from the response.

4. Redirect to the original URL:

    - Open a new tab in your browser.
    - Paste the shortened URL (e.g., `http://localhost:6000/E9k1P4`) into the address bar and press Enter.
      You'll be redirected to the original URL.

## Error Handling

- Invalid URLs: Returns a 400 error with a message.
- Server Errors: Returns a 500 error with a message.

## Unit Tests

Unit tests can be found in the test directory. You can run the tests using:

```bash
npm test
```

## Technologies Used

- Node.js
- Express
- MongoDB
- JavaScript
- Jest (for testing)
