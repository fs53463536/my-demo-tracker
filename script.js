const shipments = {
    "DEMO_7403_FOTKO2P9": {
        recipient: "Demo Recipient",
        destination: "Johannesburg, South Africa",
        status: "In Transit"
    }
};

function trackShipment() {
    const code = document.getElementById("trackingCode").value;
    const shipment = shipments[code];

    if (shipment) {
        document.getElementById("trackingResult").innerHTML =
            "<h3>Shipment Found</h3>" +
            "<p><strong>Tracking Number:</strong> " + code + "</p>" +
            "<p><strong>Recipient:</strong> " + shipment.recipient + "</p>" +
            "<p><strong>Destination:</strong> " + shipment.destination + "</p>" +
            "<p><strong>Status:</strong> " + shipment.status + "</p>";
    } else {
        alert("Demo tracking number not found.");
    }
}