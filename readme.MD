## Логин пользователя
## HTTP POST https://link-shorter6.herokuapp.com/login 

Body


```javaScript

{
    "email": "",    //обязательное поле
    "password":""   //обязательное поле, длина не менее 8 символов
}

```

Response 201

```javaScript
{
    "message": "Вы успешно авторизировалилсь!"

}
```

Response 400
```javaScript
{
    "message": "Неправильно введены почта или пароль"

}
```

Response 500
```javaScript
{
    "message": "Необработанная ошибка сервера"

}
```