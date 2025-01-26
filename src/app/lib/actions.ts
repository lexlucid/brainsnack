'use server'

import { account } from "@/app/lib/appwrite";
 
export async function handleLogin(formData: FormData){
    const email = formData.get("email") as string
    const password = formData.get("password") as string
  
    const promise = account.createEmailPasswordSession(email, password);
  
    promise.then(function (response) {
        // console.log(response); // Success
        console.log("logged in!")
    }, function (error) {
        console.log(error); // Failure
    });
    console.log(email, password)
}