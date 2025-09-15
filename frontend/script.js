const api = "http://localhost:8080/api/clients";

const createClientForm = document.getElementById("createClientForm");

async function fetchClients() {
    try{
        const response = await fetch(api);
        const clients = await response.json();
        const clientList = document.getElementById("ClientList");
        clientList.innerHTML = "";

        clients.forEach(client => {
            const li = document.createElement("li");
            li.textContent = `${client.name} - ${client.email} - ${client.phoneNumber} - ${client.address}`;
            clientList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching clients:", error);
    }
}

async function createClient(Client) {
    try {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Client)
        });
        if (response.ok) {
            fetchClients();
        }
    } catch (error) {
        console.error("Error creating client:", error);
    }
}

createClientForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const address = document.getElementById("address").value;
    const newClient = { name, email, phoneNumber, address };
    createClient(newClient);
    this.reset();
});

fetchClients();