# BDO-Umaru-bot
## Discord.js bot for scraping black desert market queue and coupons
  Сurrently dev and support only russian region

## Запуск
  Для запуска необходимо указать в `config.json` токен, префикс и опционально изменить место хранения данных.

## Используемые для скрапинга данных ресурсы
  Все действующие купоны берутся с сайта [Орбиты-Игр](https://orbit-games.com/)  
  Очередь аукциона берется с [Velia Inn](https://veliainn.com/)  

## Настройка на сервере
  Самый базовый функционал доступен сразу по команде `!start`. Создается категория и два канала в ней, в которые постятся купоны и регистрируемые на аукционе V БС, V бижутерия Маноса и Деборики с упоминанием созданных ролей. Чтобы добавить свои предметы для отслеживания используется команда `!track <add | list | remove | edit>`. Узнать айди предметов можно на [кодексе](https://bdocodex.com/ru/). У бота отсутвует вайтлист на сервера, так что если решите использовать в личных целях на публичном сервере, обязательно реализуйте эту проверку. Это можно сделать в методах [`ready`](https://github.com/exi66/BDO-Umaru-bot/blob/cca059c600dde5fde71854ed53ff8154c70de51b/index.js#L17) и [`guildCreate`](https://github.com/exi66/BDO-Umaru-bot/blob/cca059c600dde5fde71854ed53ff8154c70de51b/index.js#L22).

## Опробовать
[Ссылка-приглашение бота](https://discord.com/api/oauth2/authorize?client_id=673909884806365184&permissions=8&scope=bot). Хостится за копейку, по-этому функционал команды `!track` доступен только vip-серверам. Может быть будет установлен лимит на кол-во серверов и включена функция.
