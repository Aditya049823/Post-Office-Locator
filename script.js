window.addEventListener("load",()=>{
    fetch("https://www.cloudflare.com/cdn-cgi/trace")
    .then(res=>res.text())
    .then(data=>{
        const ip=data.split("\n")[2].split("=")[1];
        document.getElementById("text").textContent=
        `Your Current IP address is ${ip}`;
    })
})
