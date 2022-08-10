---
Congestion Tax Application
---

`*` Author: Rachana Rajendra

`*` The application is based on NestJs framework and the datastore is connected to GCP datastore.  
 `*` The application is not only dedicated for calcuting congestion tax particular to city, but can be enhanced further to multiple cities in Sweden.  
 `*` The application server listens at port 4000  
 `*` The application has been tested with minimal possible unit test cases  
 `*` Pre-requisites:

> - The system should have installed with latest version of npm
> - Cloud login credentials, Datastore and API services enabled at GCP Account
> - Datastore should have updated with tax data

`*` ToDo:

> - write corner unit test cases
> - integrate application with swagger for api documetation
> - API versioning
> - make this application run through docker

Api to calculate congestion tax for a vehicle on specific dates

```
POST /api/congestiontax/<vehicleType>/calculate_tax
payload: {
  "dates": [
    "2013-01-14 21:00:00",
    "2013-01-15 21:00:00",
    "2013-02-07 06:23:27",
    "2013-02-07 15:27:00",
    "2013-02-08 06:27:00",
    "2013-02-08 06:20:27",
    "2013-02-08 14:35:00"
  ],
  "cityCode": "got",
  "year": 2013
}

response:
  {
    "cityCode": "got",
    "year": 2013,
    "totalTax": "21 SEK",
    "vehicleType": "Car"
  }
```

`*` Anymore information, please reach out to me at rachana.r017@gmail.com
