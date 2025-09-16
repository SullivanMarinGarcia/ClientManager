const api = "http://localhost:8080/api/clients";

const createClientForm = document.getElementById("createClientForm");
const cancelEditButton = document.getElementById("cancelEdit");
const editClientButton = document.getElementById("editClientButton");
const currentClientIdSpan = document.getElementById("currentClientId");

const editNameInput = document.getElementById("editName");
const editEmailInput = document.getElementById("editEmail");
const editPhoneNumberInput = document.getElementById("editPhoneNumber");
const editAddressInput = document.getElementById("editAddress");

async function fetchClients() {
    try{
        const response = await fetch(api);
        const clients = await response.json();
        const clientList = document.getElementById("ClientList");
        clientList.innerHTML = "";

        clients.forEach(client => {
            const li = document.createElement("li");
            li.textContent = `${client.name} - ${client.email} - ${client.phoneNumber} - ${client.address}`;
            

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteClient(client.id);
            });

            const editButton = document.createElement("button");
            editButton.textContent = "Edit Client";
            editButton.addEventListener("click", () => {
                currentClientIdSpan.textContent = client.id;
                createClientForm.hidden = true;
                editClientForm.hidden = false;
            });
            

            li.appendChild(editButton);
            li.appendChild(deleteButton);
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

async function deleteClient(clientId) {
    try{

        const response = await fetch(`${api}/${clientId}`, {
            method: "DELETE"
        });
        if (response.ok){
            fetchClients();
        }

    } catch (error) {
        console.error("Error deleting client:", error);
    }
}

async function updateClient(clientId, updatedClient) {
    try {

        const response = await fetch(`${api}/${clientId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedClient)
        });

        if (response.ok) {
            
            editClientForm.hidden = true;
            createClientForm.hidden = false;
            fetchClients();
        }
    } catch (error) {
        console.error("Error updating client:", error);
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

cancelEditButton.addEventListener("click", function() {
    editClientForm.hidden = true;
    createClientForm.hidden = false;
});

editClientForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const clientId = currentClientIdSpan.textContent;

    const updatedClient = {
        name: editNameInput.value,
        email: editEmailInput.value,
        phoneNumber: editPhoneNumberInput.value,
        address: editAddressInput.value
    };
    
    updateClient(clientId, updatedClient);

});


fetchClients();