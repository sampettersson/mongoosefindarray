# mongoosefindarray
Simple module to ease querying an Array of mongoose id's.

## Usage (ES6):
```javascript
import MongooseFindArray from 'mongoosefindarray';

let mongooseFindArray = new MongooseFindArray(
  arrayOfIds,
  mongooseModel
);

mongooseFindArray.query().then((result) => {
    console.log(result);
});
```