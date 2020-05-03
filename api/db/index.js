// Implements DB communication logic
const MongoClient = require('mongodb').MongoClient;
class DbService {
    constructor() {
        this.connectToDb(process.env.DBConnectionString);
    }
    async connectToDb(DBConnectionString, dbName = 'test') {
        try {
            const client = await MongoClient.connect(DBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            this.db = client.db(dbName);
        } catch (error) {
            throw error;
        }
    }
    async saveProject(data, collection = 'projects') {
        return new Promise(async (resolve, reject) => {
            await this.db.collection(collection).updateOne(
                {
                    title: data.title
                },
                {
                    $currentDate: { "created_at": { $type: "date" } },
                    $set: {
                        description: data.description
                    },
                    $setOnInsert: {
                        title: data.title
                    }
                },
                { upsert: true },
                function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
        });
    }
    async findProject(title, collection = 'projects') {
        return new Promise(async (resolve, reject) => {
            let query = {};
            if (title) {
                query.title = title;
            }
            await this.db.collection(collection).find(query, { projection: { _id: 0, title: 1, description: 1 } }).toArray(function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result)
            });
        });
    }
}


// singleton
module.exports = new DbService();