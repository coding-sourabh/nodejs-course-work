const doWorkCallback = (callback) => {
    setTimeout(()=>{
        // callback('This is error !', undefined);
        callback(undefined, "yoooo")
    } , 2000);
}

doWorkCallback((error, result)=>{
    if(error) return console.log(error);
    console.log(result);
})