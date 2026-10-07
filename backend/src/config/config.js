
if(!process.env.MONGO_URI){
    console.log("Please provide database url");
}
if(!process.env.JWT_SECRET){
    console.log("Please provide jwt token secret");
}
if(!process.env.GOOGLE_CLIENT_ID){
    console.log("Please provide google client id for auth function");
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    console.log("Please provide google client secret for auth function");
}
if(!process.env.GOOGLE_CALLBACK_URL){
    console.log("Please provide google callback url for call auth process");
}
export const config={
    PORT:process.env.PORT || 8080,
    MONGODB_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL
}