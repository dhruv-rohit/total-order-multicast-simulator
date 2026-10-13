// Global sequence number
let sequenceNumber = 0;


// Store all multicast messages
let multicastMessages = [];


// Processes in our simulation
const processes = ["P1", "P2", "P3"];


// --------------------------------------------------
// MULTICAST MESSAGE
// --------------------------------------------------

function multicastMessage() {

    const sender = document.getElementById("sender").value;

    const messageInput = document.getElementById("message");

    const messageText = messageInput.value.trim();


    // Check empty message
    if (messageText === "") {

        alert("Please enter a message.");

        return;
    }


    // Increase sequence number
    sequenceNumber++;


    // Create message object
    const message = {

        id: sequenceNumber,

        sender: sender,

        text: messageText

    };


    // Store message
    multicastMessages.push(message);


    // Deliver message to every process
    deliverMessage(message);


    // Add event log
    addLog(
        `${sender} multicast "${messageText}" with sequence number ${sequenceNumber}`
    );


    // Clear input
    messageInput.value = "";
}


// --------------------------------------------------
// DELIVER MESSAGE TO ALL PROCESSES
// --------------------------------------------------

function deliverMessage(message) {

    processes.forEach(function(process) {

        const messageContainer =
            document.getElementById(`messages-${process}`);


        // Remove "No messages yet"
        const emptyMessage =
            messageContainer.querySelector(".empty");

        if (emptyMessage) {
            emptyMessage.remove();
        }


        // Create message element
        const messageElement =
            document.createElement("div");

        messageElement.classList.add("message");


        messageElement.innerHTML = `
            <strong>
                #${message.id} - ${message.text}
            </strong>

            Sender: ${message.sender}
        `;


        // Add message
        messageContainer.appendChild(messageElement);

    });


    // Update total order
    updateTotalOrder();
}


// --------------------------------------------------
// UPDATE TOTAL ORDER
// --------------------------------------------------

function updateTotalOrder() {

    const orderContainer =
        document.getElementById("total-order");


    orderContainer.innerHTML = "";


    multicastMessages.forEach(function(message) {

        const orderElement =
            document.createElement("div");

        orderElement.classList.add("order-item");


        orderElement.innerHTML =
            `#${message.id} ${message.text}`;


        orderContainer.appendChild(orderElement);

    });
}


// --------------------------------------------------
// EVENT LOG
// --------------------------------------------------

function addLog(text) {

    const logContainer =
        document.getElementById("event-log");


    // Remove initial message
    const emptyMessage =
        logContainer.querySelector(".empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }


    const logElement =
        document.createElement("div");

    logElement.classList.add("log-item");


    const time =
        new Date().toLocaleTimeString();


    logElement.innerHTML =
        `<strong>${time}</strong> - ${text}`;


    logContainer.prepend(logElement);
}


// --------------------------------------------------
// RESET SIMULATION
// --------------------------------------------------

function resetSimulation() {

    sequenceNumber = 0;

    multicastMessages = [];


    processes.forEach(function(process) {

        const container =
            document.getElementById(`messages-${process}`);


        container.innerHTML =
            `<p class="empty">No messages yet</p>`;

    });


    document.getElementById("total-order").innerHTML =
        `<p class="empty">No messages multicast yet</p>`;


    document.getElementById("event-log").innerHTML =
        `<p class="empty">Simulation events will appear here.</p>`;


    document.getElementById("message").value = "";

}