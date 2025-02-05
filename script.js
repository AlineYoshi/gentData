const url = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingDiv = document.getElementById("parkingData");

async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`http error: ${response.status}`);
        }
        const data = await response.json();
        const mijnParkings = data.results;
        console.log(mijnParkings);
        displayData(mijnParkings);
    } catch (error){
        console.error("er ging iets fout met het verkrijgen van de data", error);
        parkingDiv.innerHTML = `<p style = "color:red;">Oei, het werkt even niet. We werken er nu aan.</p>`;
    } finally {
        console.log("getData finished");
    }
};

function displayData(mijnParkings) {
    console.log(mijnParkings);
    mijnParkings.forEach(mijnParking => {
        // const bezetting = mijnParkings.occupation;
        // const capaciteit = mijnParkings.totalcapacity;
        // const naam = mijnParkings.name;
        // const isopen = mijnParkings.isopennow;
        const {occupation, totalcapacity, name, isopennow} = mijnParking;
        let status = isopennow ? "Open" : "Closed";
        // if (isopennow === 1) {
        //     status = "Open";
        // } else {
        //     status = "Closed";
        // }

        console.log(`naam: ${name} | bezetting: ${occupation} | capaciteit: ${totalcapacity} | open: ${status}`);
        const parkingCard = document.createElement("div");
        parkingCard.className = "parking";
        parkingCard.innerHTML = `
            <h2>${name}</h2>
            <p>naam: ${name}</p>
            <p>bezetting: ${occupation}</p>
            <p>capaciteit: ${totalcapacity} </p>
            <p>open: ${status}</p>
        `;
        parkingDiv.appendChild(parkingCard);
        // we maken divs voor de html
    });
};

getData(); 