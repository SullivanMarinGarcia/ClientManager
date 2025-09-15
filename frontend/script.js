const api = "http://localhost:8080/api/clients";

async function fetchClients() {
    try{
        const response = await fetch(api);
        const clients = await response.json();
        const clientList = document.getElementById("ClientList");

        clients.forEach(client => {
            const li = document.createElement("li");
            li.textContent = `${client.name} - ${client.email} - ${client.phoneNumber} - ${client.address}`;
            clientList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching clients:", error);
    }
}

fetchClients();