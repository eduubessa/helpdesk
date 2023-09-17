import mongoose from 'mongoose';

export default class Database {

    __construct()
    {
        const MONGO_URL = `mongodb://localhost:27017`

        mongoose.Promise = Promise;
        mongoose.connect(MONGO_URL);
        mongoose.connection.on('error', (error: Error) => {
            console.error(error);
        });


    }
}
