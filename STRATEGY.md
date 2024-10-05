1. Fetch data from API

   ```json
   {
     "id": 1,
     "name": "Leanne Graham",
     "username": "Bret",
     "email": "Sincere@april.biz",
     "address": {
       "street": "Kulas Light",
       "suite": "Apt. 556",
       "city": "Gwenborough",
       "zipcode": "92998-3874",
       "geo": {
         "lat": "-37.3159",
         "lng": "81.1496"
       }
     },
     "phone": "1-770-736-8031 x56442",
     "website": "hildegard.org",
     "company": {
       "name": "Romaguera-Crona",
       "catchPhrase": "Multi-layered client-server neural-net",
       "bs": "harness real-time e-markets"
     }
   }
   ```

2. Get table headers

   ```js
   [
     "id", // ................1
     "name", // ..............1
     "username", // ..........1
     "email", // .............1
     {
       address: [
         "street", // ........2
         "suite", // .........2
         "city", // ..........2
         "zipcode", // .......2
         {
           geo: [
             "lat", // .......3
             "lng", // .......3
           ],
         },
       ],
     },
     "phone", // .............1
     "website", // ...........1
     {
       company: [
         "name", // ..........2
         "catchPhrase", // ...2
         "bs", // ............2
       ],
     },
   ];
   ```

| id  | name          | username | email             | street      | suite    | city        | zipcode    | lat      | lng     | phone                 | website       | company name    | company catchPhrase                    | company bs                  |
| --- | ------------- | -------- | ----------------- | ----------- | -------- | ----------- | ---------- | -------- | ------- | --------------------- | ------------- | --------------- | -------------------------------------- | --------------------------- |
| 1   | Leanne Graham | Bret     | Sincere@april.biz | Kulas Light | Apt. 556 | Gwenborough | 92998-3874 | -37.3159 | 81.1496 | 1-770-736-8031 x56442 | hildegard.org | Romaguera-Crona | Multi-layered client-server neural-net | harness real-time e-markets |
