import { Client, Databases, Account, Query} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);

let promise = databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_MEETINGS_ID,
    [
        Query.select(['meeting_title', 'meeting_id'])
    ]
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});

export { ID } from 'appwrite';