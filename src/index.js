import Promise from 'bluebird';
import mongoose from 'mongoose';

class MongooseFindArray {
    array;
    model;

    constructor(array, model) {
        if (Array.isArray(array)) {
            // remove dupes from array with spread and Set
            this.array = [...new Set(array)];
        } else {
            throw new Error("Argument 'array' not an Array.");
        }

        this.array = this.array.filter((arrayItem) => {
            return mongoose.Types.ObjectId.isValid(arrayItem);
        });

        this.array = this.array.map((arrayItem) => {
            return new mongoose.Types.ObjectId(arrayItem);
        });

        this.model = model;
    }

    query() {
        return new Promise((resolve, reject) => {
                this.model.find({ _id: { $in: this.array } }, (err, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }
}

export default MongooseFindArray;