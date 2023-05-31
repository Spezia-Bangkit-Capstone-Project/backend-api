# Backend for Spezia Application

This repository is a repository as backend API for Spezia Application that writted using NodeJs Framework (ExpressJs)

# Documentation

## A. API
### Base Url : 
https://spezia-app-352214.et.r.appspot.com/
### Endpoint 
* **Login**
  * **Endpoint :** `/login`
  * **Method :** `POST`
  * **Body :** </br>
    `email` as `string`</br>
    `password` as `string`
  * **response :** </br>
    * **status code :** 200 </br>
      **body :**
      ```
      {
          "error": Boolean,
          "message": String,
          "data": {
              "userId": String,
              "username": String,
              "email: : String,
              "token": String
          }
      }
      ```

* **Register**
  * **Endpoint :** `/register`
  * **Method :** `POST`
  * **Body :** </br>
    `username` as `string` </br>
    `email` as `string` </br>
    `password` as `string`
  * **Response :** </br>
    * **body :**
      ```
      {
          "error": Boolean,
          "message": String
      }
      ```

* **Dictionary**
  * **Endpoint :** `/spices`
  * **Method :** `GET`
  * **Header :** </br>
    `Authorization` : `Bearer <token>`
  * **Response :** </br>
    * **status code :** 200 </br>
      **body :**
      ```
      {
          "error": Boolean,
          "message": String,
          "data": [
              {
                  "spiceId": String,
                  "name": String,
                  "latin_name": String,
                  "image": String,
                  "description": String,
                  "benefits": Array
              },
          ]
      }
      ```

* **Scan Image**
  * **Endpoint :** `/spices/scan`
  * **Method :** `POST`
  * **Header :** </br>
    `Content-Type` : `multipart/form-data` </br>
    `Authorization` : `Bearer <token>` 
  * **Body :** </br>
    `image` as `file`
  * **Response :** </br>
    * **status code :** 200 </br>
      **body :**
      ```
      {
          "error": Boolean,
          "message": String,
          "data": {
                  "confidence": String,
                  "spiceId": String,
                  "name": String,
                  "latin_name": String,
                  "image": String,
                  "description": String,
                  "benefits": Array
          }
      }
      ```
  

## B. Deployment on Google Cloud Platform
For our backend API, we use Google App Engine to deploy and running our application

1. Create Cloud SQL on Google Cloud Console
   
2. Choose MySQL as database engine and database version is MySQL 8.0

3. Create database and import all data from Google Cloud Storage
   
4. Open Google Cloud Shell and clone this repository
   ```
   git clone --branch flask-api https://github.com/Spezia-Bangkit-Capstone-Project/ML-Spezia.git
   ```

5. Move to the directory
   ```
   cd flask-api/
   ```
   
6. Create file `app.yaml` to write configuration for prediction image application
    ```
    touch app.yaml
    ```

7. Write all configuration and environment variables on this file
   
8. Before deploy to Google App Engine, update model that available on this folder
   ```
   gsutil cp <gsutil URI> .
   ```
   
9. Deploy our application on Google App Engine
    ```
    gcloud app deploy
    ```

10. After deployed them, copy the url link provided when deploying the application 
    
11. Next, back to root directory
    ```
    cd ..
    ```
    
12. Clone this repository  
    ```
    git clone https://github.com/Spezia-Bangkit-Capstone-Project/backend-api.git
    ```

13. Move to the directory
    ```
    cd backend-api/
    ```

14. Import all node module that we use
    ```
    npm install
    ```

15. Create file `app.yaml` to write configuration for our application
    ```
    touch app.yaml
    ```

16. Write all configuration and environment variables on this file

17. Edit a script on `package.json` to run our application
    ```
    "start": "node index.js"
    ```

18. Deploy our application on Google App Engine
    ```
    gcloud app deploy
    ```
