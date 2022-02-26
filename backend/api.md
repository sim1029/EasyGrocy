# EasyGrocy API Documentation

## Group

* `GET` `/api/group/<int:group_id>/users`
  * Returns the list of all users associated with the given `group_id`.
  * Returns a `json` body with `users` field being a list of `user` information.
    * Ex:

        ```json
        {
            users=[
                {
                    'id': 1,
                    'email': 'example@gmail.com',
                    'name': 'Simon',
                }
            ]
        }
        ```

  * If user is not in the group, returns HTTP `401 Unauthorized`.
  * If `group_id` is invalid, returns a HTTP `400 Bad Request`.
* `GET` `/api/group/<int:group_id>/items`
  * Returns the list of all items associated with the given `group_id`.
  * Returns a `json` body with `items` field being a list of `item` information.
    * Ex:

        ```json
        {
            items=[
                {
                    'id': 1,
                    'name': 'Milk',
                    'price': 5,
                    'quantity': 2,
                    'expiration': '',
                    'purchased': 1,
                    'link': '',
                    'group_id': 1,
                }
            ]
        }
        ```

  * If user is not in the group, returns HTTP `401 Unauthorized`.
  * If `group_id` is invalid, returns a HTTP `400 Bad Request`.

## User

* `POST`    `/login`
  * Takes email and password as parameters
  * Returns a `json` with `access_token` containing the unique access token
    * Ex:

        ```json
        {
           response =[
                {
                    'access_token': 123,
                }
            ]
        }
        ```

  * If user is not found or password is incorrect returns HTTP `400 Unauthorized`

* `POST`    `/register`
  * Takes email, password, and name as parameters
  * Returns a `json` with `access_token` containing the unique access token
    * Ex:

        ```json
        {
           response =[
                {
                    'access_token': 123,
                }
            ]
        }
        ```

  * If one or more fields isn't filled out returns HTTP `400 Unauthorized`

* `POST`    `logout`
  * Unsets JWT for the user
  * Returns a `json` with `message` indicating sucessful logout

## Item
