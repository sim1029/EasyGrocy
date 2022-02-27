# EasyGrocy

<img src="/assets/icon.png" alt="EasyGrocy Logo" width="200"/>

## Description

Easy Grocy is a cross platform application aimed to supply students with one place to manage their grocery needs. Users can join squads where they will be able to coordinate a collective grocery list.

### Inspiration
This project was inspired by our own struggles related to living in a college apartment. Grocery trips at the University of Pittsburgh are never an easy task because students have to go off campus to find a store which often involves coordinating bus trips. Therefore, it can be really frustrating to realize you missed an item because your roommate finished it. Or your roommate was just at the store and could have grabbed something that you or the apartment needed.

From our experience, college students are terrible at coordinating with one another. And something like grocery shopping is something that cannot be avoided. Our app aims to make the process less burdensome for everyone.

### What it does
This application allows users to join squads where they can collectively manage a shared grocery list. Items can be added, edited, and deleted by users in the group. After an item is added, users can control its status (in stock, needed). This allows for people to indicate if the apartment is out of something with the touch of a button. Additionally, when shopping users can mark off items as they find them.

Items in the list can also be attributed to a certain person or group of people. So for example, if you added paper towels to the list, you would say that's for everyone in the apartment. But if you needed something for just yourself, you could mark that as being just for you.

## Tech Stack

### Backend
On the backend, we used the Flask web framework to create the API that serves the frontend. 
This API is frontend-agnostic, so it could be used for any number of frontend implementations without a single modification.
For authentication, we use JWT tokens. Frontend implementations just have to store the JWT token that is supplied when the user logs in,
and supply this token in the HTTP request header when using any of the API endpoints.

We deployed this Flask application onto a standard Ubuntu DigitalOcean Droplet. 
This server was configured with Nginx and Gunicorn to serve the Flask application.

We also used CloudFlare, which has a myriad of useful features, but the most important for us was quickly
getting a free SSL certificate.
Our application now only uses HTTPS, so the connection between any user and the API is secure.

### Frontend
We use React-Native in the frontend so that we could deploy the application to the Web, iOS, and Android
with only one Javascript code base. We are awaiting App Store approval to put EasyGrocy in the iOS App Store.

## API Documentation
The Flask API is fully documented, which can be found in [`backend/api.md`](https://github.com/sim1029/EasyGrocy/blob/main/backend/api.md).
