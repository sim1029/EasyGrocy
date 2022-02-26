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

## Item
