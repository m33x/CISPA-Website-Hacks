function init() {

    // Lightmode
    if (document.domain == 'cispa.de') {
        console.log("CISPA Lightmode: Switching on the light ...");
        // Switch on the light
        if(document.body.classList.contains("darkmode") == true) {
            document.getElementById('darkmodeSwitch').click();
        }
        console.log("CISPA Lightmode: Done.");
    }

    // Tickets
    if (document.domain == 'tickets.cispa.de') {
        console.log("CISPA Ticket Fix: Adding age of the ticket ...");
        let ticket_creation_date = document.getElementsByClassName("Age");
        // We skip the header
        for (let i = 1; i < ticket_creation_date.length; i++) {
            // Parse internal date: 07.11.2024 17:31
            let day = ticket_creation_date[i].title.slice(0,2);
            let month = ticket_creation_date[i].title.slice(3,5);
            let year = ticket_creation_date[i].title.slice(6,10);
            let hour = ticket_creation_date[i].title.slice(11,13);
            let minute = ticket_creation_date[i].title.slice(14,16);
            let ticket_date_str = year+'-'+month+'-'+day+' '+hour+':'+minute;
            let ticket_age = dhm(Date.now() - Date.parse(ticket_date_str));
            let days = ticket_age[0];
            let hours = ticket_age[1];
            // Change color
            if (days < 14) {
                ticket_creation_date[i].style.color = "green"; // green
                ticket_creation_date[i].innerText = days + "d " + hours + "h 😇";
            } else if (days >= 14 && days < 28) {
                ticket_creation_date[i].style.color = "#A66D05"; // yellow
                ticket_creation_date[i].innerText = days + "d " + hours + "h 🥹";
            } else if (days >= 28 && days < 56) {
                ticket_creation_date[i].style.color = "#F21616"; // orange
                ticket_creation_date[i].innerText = days + "d " + hours + "h 😭";
            } else if (days >= 56) {
                ticket_creation_date[i].style.color = "#591521"; // red
                ticket_creation_date[i].innerText = days + "d " + hours + "h 🫣";
            }
        }
        console.log("CISPA Ticket Fix: Done.");
    }
}

// https://stackoverflow.com/questions/8528382/javascript-show-milliseconds-as-dayshoursmins-without-seconds
function dhm (ms) {
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    return [days, hours];
}

init();