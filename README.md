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
          "error": false,
          "message": "Login successful",
          "loginResult": {
              "userId": "1",
              "username": "Arif Faizin",
              "email: : "ariffaizin@gmail.com",
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
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
    * **status code :** 200 </br>
      **body :**
      ```
      {
          "error": false,
          "message": "User created successfully"
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
          "error": false,
          "message": "Data spices fetched successfully",
          "spicesResult": [
              {
                  "spiceId": "1",
                  "name": "Jahe",
                  "latin_name": "Zingiber officinale",
                  "image": "https://storage.googleapis.com/spices-image/ginger/jahe%20(11).jpeg",
                  "description": "Jahe adalah tumbuhan yang rimpangnya sering digunakan sebagai rempah-rempah dan bahan baku pengobatan tradisional. Rimpangnya berbentuk jemari yang menggembung di ruas-ruas tengah. Rasa dominan pedas yang dirasakan dari jahe disebabkan oleh senyawa keton bernama zingeron. Jahe termasuk dalam famili Zingiberaceae.",
                  "benefits": [
                       "Meredakan batuk",
                       "Mengurangi resiko penyakit jantung",
                       "Menjaga kestabilan kadar gula darah",
                       "Meredakan Nyeri Haid",
                       "Mengatasi Masalah Pencernaan"
                  ]
              },
              {
                  "spiceId": "2",
                  "name": "Kunyit",
                  "latin_name": "Curcuma domestica",
                  "image": "https://storage.googleapis.com/spices-image/kunyit/kunyit%20(6).jpg",
                  "description": "Kunyit atau kunir adalah termasuk salah satu tanaman rempah-rempah dan obat asli dari wilayah Asia Tenggara. Tanaman ini kemudian mengalami penyebaran ke daerah Malaysia, Indonesia, Australia bahkan Afrika.",
                  "benefits": [
                       "Mencegah penyakit jantung",
                       "Mencegah kanker",
                       "Mengatasi gangguan saluran pencernaan",
                       "Membantu meningkatkan fungsi imunitas tubuh"
                  ]
              }
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
          "error": false,
          "message": "Prediction image successfully",
          "predictionResult": {
                  "accuracy": "100%",
                  "spiceId": "1",
                  "name": "Jahe",
                  "latin_name": "Zingiber officinale",
                  "image": "https://storage.googleapis.com/spices-image/ginger/jahe%20(11).jpeg",
                  "description": "Jahe adalah tumbuhan yang rimpangnya sering digunakan sebagai rempah-rempah dan bahan baku pengobatan tradisional. Rimpangnya berbentuk jemari yang menggembung di ruas-ruas tengah. Rasa dominan pedas yang dirasakan dari jahe disebabkan oleh senyawa keton bernama zingeron. Jahe termasuk dalam famili Zingiberaceae.",
                  "benefits": [
                      "Meredakan batuk",
                      "Mengurangi resiko penyakit jantung",
                      "Menjaga kestabilan kadar gula darah",
                      "Meredakan Nyeri Haid",
                      "Mengatasi Masalah Pencernaan"
                  ]
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