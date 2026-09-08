const shipments = {
    "DEMO_7403_FOTKO2P9": {
        recipient: "Demo Recipient",
        destination: "Johannesburg, South Africa",
        status: "In Transit"
    }
};


// Load saved shipments
const savedShipments = localStorage.getItem("shipments");

if (savedShipments) {
    Object.assign(shipments, JSON.parse(savedShipments));
}


// =========================
// TRACK SHIPMENT
// =========================

function trackShipment() {

    const code =
        document.getElementById("trackingCode").value.trim();

    const shipment = shipments[code];

    if (!shipment) {
        alert("Demo tracking number not found.");
        return;
    }


    const statuses = [
        "Processing",
        "Picked Up",
        "In Transit",
        "Arrived",
        "Delivered"
    ];


    const currentIndex =
        statuses.indexOf(shipment.status);


    let timeline = "";


    statuses.forEach(function(status, index) {

        let className = "";

        if (index < currentIndex) {
            className = "completed";
        }

        else if (index === currentIndex) {
            className = "active";
        }


        timeline +=
            '<div class="timeline-item ' + className + '">' +

                '<div class="timeline-dot"></div>' +

                '<div class="timeline-content">' +

                    '<strong>' +
                    status +
                    '</strong>' +

                '</div>' +

            '</div>';
    });


    document.getElementById("trackingResult").innerHTML =

        '<div class="shipment-result">' +


            '<div class="shipment-header">' +

                '<h3>AeroVanta Shipment Tracking</h3>' +

                '<p>' +
                'Tracking Number: ' +
                code +
                '</p>' +

            '</div>' +


            '<div class="shipment-body">' +


                '<div class="shipment-grid">' +


                    '<div class="info-card">' +

                        '<h4>Sender Information</h4>' +

                        '<p>International Shipping Department</p>' +

                        '<p>Global Operations</p>' +

                    '</div>' +


                    '<div class="info-card">' +

                        '<h4>Receiver Information</h4>' +

                        '<p>' +
                        shipment.recipient +
                        '</p>' +

                        '<p>' +
                        shipment.destination +
                        '</p>' +

                    '</div>' +


                    '<div class="info-card">' +

                        '<h4>Shipment Details</h4>' +

                        '<p><strong>Tracking:</strong> ' +
                        code +
                        '</p>' +

                        '<p><strong>Service:</strong> International Freight</p>' +

                    '</div>' +


                    '<div class="info-card">' +

                        '<h4>Current Status</h4>' +

                        '<p>' +
                        shipment.status +
                        '</p>' +

                        '<p><strong>Location:</strong> In Transit</p>' +

                    '</div>' +


                '</div>' +


                '<div class="status-panel">' +

                    '<h4>Shipment Status</h4>' +

                    '<strong>' +
                    shipment.status +
                    '</strong>' +

                '</div>' +


                '<h4 class="section-title">' +
                'Shipment Progress' +
                '</h4>' +


                '<div class="timeline">' +

                    timeline +

                '</div>' +


            '</div>' +

        '</div>';
}


// =========================
// CREATE SHIPMENT
// =========================

function createShipment() {

    const tracking =
        document.getElementById("adminTracking").value.trim();

    const recipient =
        document.getElementById("adminRecipient").value.trim();

    const destination =
        document.getElementById("adminDestination").value.trim();

    const status =
        document.getElementById("adminStatus").value;


    if (!tracking || !recipient || !destination) {

        alert("Please complete all shipment fields.");

        return;
    }


    shipments[tracking] = {

        recipient: recipient,

        destination: destination,

        status: status

    };


    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );


    alert("Shipment created successfully!");


    document.getElementById("adminTracking").value = "";

    document.getElementById("adminRecipient").value = "";

    document.getElementById("adminDestination").value = "";

    document.getElementById("adminStatus").value = "Processing";
}


// =========================
// UPDATE SHIPMENT STATUS
// =========================

function updateShipmentStatus() {

    const tracking =
        document.getElementById("updateTracking").value.trim();

    const newStatus =
        document.getElementById("updateStatus").value;


    if (!shipments[tracking]) {

        alert("Shipment not found.");

        return;
    }


    shipments[tracking].status = newStatus;


    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );


    alert("Shipment status updated successfully!");


    document.getElementById("updateTracking").value = "";

    document.getElementById("updateStatus").value = "Processing";
}