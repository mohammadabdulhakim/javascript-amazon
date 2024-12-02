const xhl = new XMLHttpRequest();

xhl.addEventListener("load",()=>{
    console.log(xhl.response)
})

xhl.open("GET", "https://supersimplebackend.dev")
xhl.send();