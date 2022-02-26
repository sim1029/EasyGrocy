# EasyGrocy API Documentation

## Auth
* `POST`    `/login`
  * Requires `email`, `password`, fields in `json` body.
  * Returns a `json` with `access_token` containing the unique access token.
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
  * If user is not found or password is incorrect returns HTTP `400 Bad Request`.

* `POST`    `/register`
  * Requires `email`, `password`, and `name` fields in `json` body.
  * Returns a `json` with `access_token` containing the unique access token.
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
  * If user already is registered, returns HTTP `400 Bad Request`.
  * If one or more fields isn't filled out, returns HTTP `400 Bad Request`.

* `POST`    `/logout`
  * Logs out user.
  * Returns a `json` with `message` indicating sucessful logout.

## Group
* `GET`     `/api/group/<int:group_id>`
  * Returns the `group` with the given `group_id`.
  * Returns a `json` body with `group` field containing the associated group fields.
    * Ex:

        ```json
        {
            group={
                'id': 1,
                'name': 'OurHouse',
            }
        }
        ```
  * If user making the request is not in the group, returns a HTTP `401 Unauthorized`.
  * If `group_id` is invalid, returns a HTTP `400 Bad Request`.
* `POST`     `/api/group/<int:group_id>`
  * Modifies the fields associated with the `group` with the given `group_id`.
  * Returns a `json` body with a message indicating successful modification.
  * If user making the request is not in the group, returns a HTTP `401 Unauthorized`.
  * If `group_id` is invalid, returns a HTTP `400 Bad Request`.
* `POST`     `/api/group/<int:group_id>/add_user/<int:user_id>`
  * Adds the user with the given `user_id` to the group.
  * Returns a `json` body with a message indicating successful addition.
  * If `group_id` or `user_id` is invalid, returns a HTTP `400 Bad Request`.
* `GET`     `/api/group/<int:group_id>/users`
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
* `GET`     `/api/group/<int:group_id>/items`
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
* `GET`     `/api/user/<int:user_id>`
  * Returns information associated with the given user.
  * Returns a `json` body with `user` field containing the associated user fields.
    * Ex:

        ```json
        {
            user={
                'id': 1,
                'email': 'example@gmail.com',
                'name': 'Simon',
            }
        }
        ```
  * If `user_id` is invalid, returns a HTTP `400 Bad Request`.
* `GET`     `/api/user/<int:user_id>/groups`
  * Returns all `group`s that a `user` is in.
  * Returns a `json` body with `groups` field being a list of `group` information.
    * Ex:

        ```json
        {
            groups=[
                {
                    'id': 1,
                    'name': 'OurHouse',
                }
            ]
        }
        ```
  * If `user_id` is invalid, returns a HTTP `400 Bad Request`.
* `DELETE`     `/api/user/<int:user_id>`
  * Deletes a given user.
  * Returns a `json` body with a message indicating successful deletion.
  * If user making the request does not match `user_id` , returns a HTTP `401 Unauthorized`.
  * If `user_id` is invalid, returns a HTTP `400 Bad Request`.

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
