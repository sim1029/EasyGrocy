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

* `Put`    `/<inn:group_id>/update_item`
  * Takes the item_id and json with the changes. If a field is not being changes leave that field in the json object empty

  * on completion returns successful message
        ** Ex:

        ```json
        {
           changes =[
                {
                    'name': 'choccy milk',
                    'price': self.price,
                    'quantity': '',
                    'expiration': '',
                    'purchased': '',
                    'link': '',
                    'group_id': '',

                }
            ]
        }
        ```
    * returns bad_request if item is not found
    * nothing happens when no changes are mad## Item

* `post`    `/<inn:group_id>/create_item`
  * Takes a json item with the proper fields and makes a new field
  * on completion returns successful message
        ** Ex:

        ```json
        {
            item =[
                {
                    'name': 'choccy milk',
                    'price': self.price,
                    'quantity': '3',
                    'expiration': 'tuesday',
                    'purchased': 'not yet',
                    'link': 'adultwebsite.com',
                    'group_id': '69',
                }
            ]
        }
        ```
    * returns bad_request if item is not found

* `delete`    `/<inn:group_id>/delete_item`
  * Takes the item_id and deletes that item
  * on completion returns successful message
        ** Ex:

        ```json
        {
           id =[
                {
                    'id': 123,

                }
            ]
        }
        ```
    * returns bad_request if item is not found
