const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve("yooo");
        reject("This is error !");
        
    } , 2000);
})

doWorkPromise
.then((result)=>{
    console.log("success", result);
})
.catch((error)=>{
    console.log("Error ! :", error);
})