let ip="";
window.addEventListener("load",()=>{
    document.getElementById("nextPage").style.display="none";
    fetch("https://www.cloudflare.com/cdn-cgi/trace")
    .then(res=>res.text())
    .then(data=>{
        ip=data.split("\n")[2].split("=")[1];
        document.getElementById("text").textContent=
        `Your Current IP address is ${ip}`;
    })
})
function getInfo(){
    document.getElementById("startPage").style.display="none";
    document.getElementById("nextPage").style.display="block";
    document.getElementById("h2").textContent=
    `IP Address:${ip}`;
    fetch(`https://ipinfo.io/${ip}/geo?token=81c0aee09e0871`)
    .then(res=>res.json())
    .then(data=>{
        const latLong=data.loc.split(",");
        document.getElementById("locDetails").innerHTML=
        `<p>Lat:${latLong[0]}</p>
        <p>Long:${latLong[1]}</p>
        <p>City:${data.city}</p>
        <p>Region:${data.region}</p>
        <p>Organisation:${data.org}</p>
        <p>HostName:</p>
        `;
        const mapHtml=
        `<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div id="mapEmb">
                <h1>Your Current Location</h1>
                <iframe src="https://maps.google.com/maps?q=${latLong[0]},${latLong[1]}&z=15&output=embed" width="1000" height="300" frameborder="0" style="border:0"></iframe>
            </div>
        </div>`;
        document.getElementById("map").innerHTML=mapHtml;

        let dateTime_str=new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"});

        let msg="";
        let pincode=`${data.postal}`;
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(sol=>sol.json())
        .then(data1=>{
            if (data1 && data1.length > 0 && data1[0].Status === "Success") {
                msg = `${data1[0].Message}`;
              } else {
                msg = "No data available";
              }
                document.getElementById("moreDets").innerHTML=
                `<h1>More Information About You</h1>
                <p>Time-Zone: ${data.timezone}</p>
                <p>Date & Time: ${dateTime_str}
                <p>Pincode: ${pincode}
                <p>Message: ${msg}
                `;
                
                let postOffices = data1[0].PostOffice;
                let cardContainer = document.getElementById("cardContainer");
                cardContainer.innerHTML = "";

                postOffices.forEach(postOfcData => {
                let card = document.createElement("div");
                card.id = "card"; 
                card.innerHTML = `
                    <p>Name: ${postOfcData.Name}</p>
                    <p>Branch Type: ${postOfcData.BranchType}</p>
                    <p>Delivery status: ${postOfcData.DeliveryStatus}</p>
                    <p>District: ${postOfcData.District}</p>
                    <p>Division: ${postOfcData.Division}</p>
                    `;
                cardContainer.appendChild(card);
                });

            });
        })
}
