// =========================
// SHIPMENT DATABASE
// =========================

const shipments = {
    "AV-2026-000001": {
        sender: "Sample Sender",
        senderCountry: "South Africa",
        senderLocation: "Johannesburg",
        recipient: "Sample Recipient",
        country: "South Africa",
        destination: "Johannesburg",
        airport: "O.R. Tambo International Airport",
        package: "Parcel",
        weight: "5",
        status: "In Transit"
    }
};


// =========================
// LOAD SAVED SHIPMENTS
// =========================

const savedShipments = localStorage.getItem("shipments");

if (savedShipments) {
    try {
        Object.assign(
            shipments,
            JSON.parse(savedShipments)
        );
    } catch (error) {
        console.log(
            "Saved shipment data could not be loaded."
        );
    }
}


// =========================
// GENERATE TRACKING NUMBER
// =========================

function generateTrackingNumber() {

    const year = new Date().getFullYear();

    let tracking;

    do {

        const randomNumber = Math.floor(
            100000 + Math.random() * 900000
        );

        tracking =
            "AV-" +
            year +
            "-" +
            randomNumber;

    } while (shipments[tracking]);

    return tracking;
}


// =========================
// TRACK SHIPMENT
// =========================

function trackShipment() {

    const trackingInput =
        document.getElementById("trackingCode");

    const result =
        document.getElementById("trackingResult");

    if (!trackingInput || !result) {
        return;
    }

    const code =
        trackingInput.value.trim().toUpperCase();


    if (!code) {

        result.innerHTML = `
            <div class="shipment-result">

                <div class="shipment-body">

                    <h3>
                        Please enter a tracking number
                    </h3>

                    <p>
                        Enter your AeroVanta tracking
                        number above and try again.
                    </p>

                </div>

            </div>
        `;

        return;
    }


    const shipment = shipments[code];


    if (!shipment) {

        result.innerHTML = `
            <div class="shipment-result">

                <div class="shipment-header">

                    <h3>
                        Shipment Not Found
                    </h3>

                    <p>
                        Tracking Number: ${code}
                    </p>

                </div>


                <div class="shipment-body">

                    <h4>
                        Please check your tracking number
                    </h4>

                    <p>
                        We could not find a shipment
                        matching the tracking number
                        you entered.
                    </p>

                </div>

            </div>
        `;

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


    // =========================
    // SHIPMENT PROGRESS
    // =========================

    let timeline = "";


    statuses.forEach(
        function(status, index) {

            let className = "";


            if (index < currentIndex) {

                className = "completed";

            }


            if (index === currentIndex) {

                className = "active";

            }


            timeline += `
                <div class="timeline-item ${className}">

                    <div class="timeline-dot"></div>

                    <div class="timeline-content">

                        <strong>
                            ${status}
                        </strong>

                        <span>
                            ${
                                index < currentIndex
                                ? "Completed"
                                : index === currentIndex
                                ? "Current shipment status"
                                : "Pending"
                            }
                        </span>

                    </div>

                </div>
            `;
        }
    );


    // =========================
    // SHIPMENT HISTORY
    // =========================

    let history = "";


    statuses.forEach(
        function(status, index) {

            if (index <= currentIndex) {

                history += `
                    <div style="
                        padding:15px 0;
                        border-bottom:1px solid #e5eaf0;
                    ">

                        <strong style="
                            color:#123d6b;
                        ">

                            ${status}

                        </strong>

                        <p style="
                            margin:5px 0 0;
                            color:#687789;
                        ">

                            Shipment record updated

                        </p>

                    </div>
                `;
            }
        }
    );


    // =========================
    // TRACKING RESULT
    // =========================

    result.innerHTML = `

        <div class="shipment-result">


            <div class="shipment-header">

                <h3>
                    AeroVanta Shipment Tracking
                </h3>

                <p>
                    Tracking Number: ${code}
                </p>

            </div>


            <div class="shipment-body">


                <div class="status-panel">

                    <h4>
                        Current Status
                    </h4>

                    <strong>
                        ${shipment.status}
                    </strong>

                    <p style="
                        margin-top:10px;
                        color:#687789;
                    ">

                        Shipment tracking information
                        is available.

                    </p>

                </div>


                <h4 class="section-title">
                    Shipment Information
                </h4>


                <div class="shipment-grid">


                    <div class="info-card">

                        <h4>
                            Sender Information
                        </h4>

                        <p>

                            <strong>
                                Name:
                            </strong>

                            ${shipment.sender}

                        </p>

                        <p>

                            <strong>
                                Country:
                            </strong>

                            ${shipment.senderCountry}

                        </p>

                        <p>

                            <strong>
                                Location:
                            </strong>

                            ${shipment.senderLocation}

                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Receiver Information
                        </h4>

                        <p>

                            <strong>
                                Name:
                            </strong>

                            ${shipment.recipient}

                        </p>

                        <p>

                            <strong>
                                Country:
                            </strong>

                            ${shipment.country}

                        </p>

                        <p>

                            <strong>
                                Destination:
                            </strong>

                            ${shipment.destination}

                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Transportation
                        </h4>

                        <p>

                            <strong>
                                Nearest Airport:
                            </strong>

                            ${shipment.airport}

                        </p>

                        <p>

                            <strong>
                                Service:
                            </strong>

                            International Freight

                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Package Details
                        </h4>

                        <p>

                            <strong>
                                Package Type:
                            </strong>

                            ${shipment.package}

                        </p>

                        <p>

                            <strong>
                                Weight:
                            </strong>

                            ${shipment.weight} kg

                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Destination
                        </h4>

                        <p>

                            <strong>
                                Country:
                            </strong>

                            ${shipment.country}

                        </p>

                        <p>

                            <strong>
                                City:
                            </strong>

                            ${shipment.destination}

                        </p>

                    </div>


                </div>


                <h4 class="section-title">
                    Shipment Progress
                </h4>


                <div class="timeline">

                    ${timeline}

                </div>


                <h4 class="section-title">
                    Shipment Route
                </h4>


                <div class="info-card">

                    <p>

                        <strong>
                            Origin:
                        </strong>

                        ${shipment.senderLocation},
                        ${shipment.senderCountry}

                    </p>

                    <p>

                        <strong>
                            Transit:
                        </strong>

                        International Transportation

                    </p>

                    <p>

                        <strong>
                            Destination:
                        </strong>

                        ${shipment.destination},
                        ${shipment.country}

                    </p>

                </div>


                <h4 class="section-title">
                    Shipment History
                </h4>


                <div class="info-card">

                    ${history}

                </div>


                <h4 class="section-title">
                    Parcel Information
                </h4>


                <div class="shipment-grid">


                    <div class="info-card">

                        <h4>
                            Package Type
                        </h4>

                        <p>
                            ${shipment.package}
                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Weight
                        </h4>

                        <p>
                            ${shipment.weight} kg
                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Delivery Mode
                        </h4>

                        <p>
                            International Freight
                        </p>

                    </div>


                    <div class="info-card">

                        <h4>
                            Tracking Status
                        </h4>

                        <p>
                            ${shipment.status}
                        </p>

                    </div>


                </div>


            </div>

        </div>
    `;
}


// =========================
// CREATE SHIPMENT
// =========================

function createShipment() {

    const senderElement =
        document.getElementById("adminSender");

    const senderCountryElement =
        document.getElementById("adminSenderCountry");

    const senderLocationElement =
        document.getElementById("adminSenderLocation");

    const recipientElement =
        document.getElementById("adminRecipient");

    const countryElement =
        document.getElementById("adminCountry");

    const destinationElement =
        document.getElementById("adminDestination");

    const airportElement =
        document.getElementById("adminAirport");

    const packageElement =
        document.getElementById("adminPackage");

    const weightElement =
        document.getElementById("adminWeight");

    const statusElement =
        document.getElementById("adminStatus");


    if (
        !senderElement ||
        !senderCountryElement ||
        !senderLocationElement ||
        !recipientElement ||
        !countryElement ||
        !destinationElement ||
        !airportElement ||
        !packageElement ||
        !weightElement ||
        !statusElement
    ) {
        return;
    }


    const sender =
        senderElement.value.trim();

    const senderCountry =
        senderCountryElement.value.trim();

    const senderLocation =
        senderLocationElement.value.trim();

    const recipient =
        recipientElement.value.trim();

    const country =
        countryElement.value.trim();

    const destination =
        destinationElement.value.trim();

    const airport =
        airportElement.value.trim();

    const packageType =
        packageElement.value.trim();

    const weight =
        weightElement.value.trim();

    const status =
        statusElement.value;


    if (
        !sender ||
        !senderCountry ||
        !senderLocation ||
        !recipient ||
        !country ||
        !destination ||
        !airport ||
        !packageType ||
        !weight
    ) {

        alert(
            "Please complete all shipment fields."
        );

        return;
    }


    const tracking =
        generateTrackingNumber();


    shipments[tracking] = {

        sender: sender,

        senderCountry: senderCountry,

        senderLocation: senderLocation,

        recipient: recipient,

        country: country,

        destination: destination,

        airport: airport,

        package: packageType,

        weight: weight,

        status: status

    };


    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );


    alert(
        "Shipment created successfully!\n\n" +
        "Tracking Number: " +
        tracking
    );


    senderElement.value = "";

    senderCountryElement.value = "";

    senderLocationElement.value = "";

    recipientElement.value = "";

    countryElement.value = "";

    destinationElement.value = "";

    airportElement.value = "";

    packageElement.value = "";

    weightElement.value = "";

    statusElement.value = "Processing";
}


// =========================
// UPDATE SHIPMENT STATUS
// =========================

function updateShipmentStatus() {

    const trackingElement =
        document.getElementById("updateTracking");

    const statusElement =
        document.getElementById("updateStatus");


    if (
        !trackingElement ||
        !statusElement
    ) {
        return;
    }


    const tracking =
        trackingElement.value.trim().toUpperCase();


    const newStatus =
        statusElement.value;


    if (!tracking) {

        alert(
            "Please enter a tracking number."
        );

        return;
    }


    if (!shipments[tracking]) {

        alert(
            "Shipment not found."
        );

        return;
    }


    shipments[tracking].status =
        newStatus;


    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );


    alert(
        "Shipment status updated successfully!"
    );


    trackingElement.value = "";

    statusElement.value =
        "Processing";
}


// =========================
// SUPPORT CHAT
// =========================

function toggleChat() {

    const chatBox =
        document.getElementById("chatBox");


    if (!chatBox) {
        return;
    }


    chatBox.classList.toggle("open");
}


// =========================
// CHAT RESPONSES
// =========================

function chatMessage(type) {

    const response =
        document.getElementById("chatResponse");


    if (!response) {
        return;
    }


    if (type === "tracking") {

        response.innerHTML =
            "Please enter your AeroVanta tracking number in the Track & Trace section.";

    }


    else if (type === "services") {

        response.innerHTML =
            "AeroVanta provides air freight, ocean freight, road transportation and warehousing services.";

    }


    else if (type === "support") {

        response.innerHTML =
            "For support enquiries, please contact support@aerovantalogistics.com.";

    }


    response.style.display =
        "block";
}
