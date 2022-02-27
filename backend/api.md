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
  * Logs out `current_user`.
  * Requires JWT token.
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
                'code': 'aZjkA12D',
            }
        }
        ```
  * Requires JWT token.
  * If `current_user` is not in the group, returns a HTTP `401 Unauthorized`.
  * If `group_id` is invalid, returns a HTTP `400 Bad Request`.
* `PUT`     `/api/group/<int:group_id>`
  * Modifies the fields associated with the `group` with the given `group_id`.
  * Returns a `json` body with a message indicating successful modification.
  * Requires JWT token.
  * If `current_user` is not in the group, returns a HTTP `401 Unauthorized`.
  * If `group_id` is invalid, returns a HTTP `400 Bad Request`.
* `POST`     `/api/group/create_group`
  * Creates a new `group` with the given `name` supplied in the `json` request.
  * Adds `current_user` to the new `group` if successful.
  * Returns a `json` body with `group` field being newly made `group`.
    * Ex:

        ```json
        {
            group={
                'id': 1,
                'name': 'OurSquad',
                'code': 'aZjkA12D',
            }
        }
        ```
  * Requires JWT token.
  * If `json` request is invalid, returns a HTTP `400 Bad Request`.
* `POST`     `/api/group/join_group/<str:group_code>`
  * Adds the `current_user` to the group with the given `group_code`
  * Returns a `json` body with `group` field being the `group` that was just joined.
  * Requires JWT token.
  * If `group_code` is invalid, returns a HTTP `400 Bad Request`.
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
  * Requires JWT token.
  * If `current_user` is not in the group, returns HTTP `401 Unauthorized`.
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
  * Requires JWT token.
  * If `current_user` is not in the group, returns HTTP `401 Unauthorized`.
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
  * Requires JWT token.
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
  * Requires JWT token.
  * If `user_id` is invalid, returns a HTTP `400 Bad Request`.
* `DELETE`     `/api/user/<int:user_id>`
  * Deletes a given user.
  * Returns a `json` body with a message indicating successful deletion.
  * Requires JWT token.
  * If `current_user` does not match `user_id` , returns a HTTP `401 Unauthorized`.
  * If `user_id` is invalid, returns a HTTP `400 Bad Request`.

## Item
* `GET`    `/api/item/<int:item_id>`
  * Returns a `json` object with the fields of the item with the given `item_id`.
    * Ex:

        ```json
        {
            item={
                    'id': 1,
                    'name': 'Milk',
                    'price': 5,
                    'quantity': 2,
                    'expiration': '',
                    'purchased': 1,
                    'link': '',
                    'group_id': 1,
            }
        }
        ```
  * Requires JWT token.
  * If `item_id` is invalid, returns a HTTP `400 Bad Request`.
* `PUT`    `/api/item/<int:item_id>`
  * Takes a `json` object that contains the fields to change:
    * Fields: `name`, `price`, `quantity`, `purchased`, `link`, `expiration` 
  * Requires JWT token.
  * Returns a `json` body with a message indicating successful modification.
  * If `item_id` is invalid, returns a HTTP `400 Bad Request`.
* `POST`    `/api/item/create_item`
  * Takes a `json` object that contains the fields of the new item
    * Required: `name`, `group_id`
    * Optional: `price`, `quantity`, `purchased`, `expiration`, `link`
  * Returns a `json` body with `item` field being the newly made item.
    * Ex:

        ```json
        {
            item={
                    'id': 1,
                    'name': 'Milk',
                    'price': 5,
                    'quantity': 2,
                    'expiration': '',
                    'purchased': 1,
                    'link': '',
                    'group_id': 1,
            }
        }
        ```
  * Requires JWT token.
  * Associates newly created item with `current_user`.
  * If required `json` fields are not present, returns a HTTP `400 Bad Request`.

* `DELETE`    `/api/item/<int:group_id>`
  * Deletes the item with given `item_id`.
  * Returns a `json` body with a message indicating successful deletion.
  * Requires JWT token.
  * If `current_user` is not associated with the item, returns a HTTP `401 Unauthorized`.
  * If `item_id` is invalid, returns a HTTP `400 Bad Request`.
