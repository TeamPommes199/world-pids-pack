include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    // Hintergrund zeichnen
    Texture.create("Background")
        .texture("jsblock:assets/dutch/dutch_2.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let customMsgs = [
        pids.getCustomMessage(0), 
        pids.getCustomMessage(1), 
        pids.getCustomMessage(2), 
        pids.getCustomMessage(3)
    ];

    // --- NEU: Seiten-Logik (Pagination) ---
    let page = 1; // Standardmäßig Seite 1
    for (let customMsg of customMsgs) {
        if (customMsg != null && customMsg.includes("page:")) {
            let parsedPage = parseInt(customMsg.replace("page:", "").trim());
            if (!isNaN(parsedPage) && parsedPage >= 1) {
                page = parsedPage;
            }
        }
    }

    let rowsPerPage = 7; // Wir wollen 7 Züge pro Seite

    // Schleife durch die Ankünfte für die berechnete Seite
    for (let i = rowsPerPage * (page - 1); i < rowsPerPage * page; i++) {
        let arrival = pids.arrivals().get(i);
        
        // Der relative Index (0 bis 6) sorgt dafür, dass die Zeilen 
        // auch auf Seite 2 wieder oben auf dem Display anfangen.
        let relativeRow = i - rowsPerPage * (page - 1);
        let rowOffset = relativeRow * 10; 

        if (arrival != null) {
            let arrival_text = arrival.routeNumber();

            // Custom Message Check für diesen Zug
            for (let customMsg of customMsgs) {
                if (customMsg != null && customMsg.includes(arrival.routeNumber() + ":")) {
                    arrival_text = customMsg.replace(arrival.routeNumber() + ":", "");
                }
            }

            // --- ZIEL (Destination) ---
            Text.create("Arrival Destination " + i)
                .text(TextUtil.cycleString(arrival.destination()))
                .scale(0.5)
                .pos(20, 1 + rowOffset) 
                .size(pids.width - 20, 30)
                .scaleXY()
                .color(0x002b6d)
                .draw(ctx);

            // --- HALTESTELLEN (via ... en ...) ---
            if (pids.station() && arrival.route()) {
                let stops = arrival.route().getPlatforms().toArray().map((p) => p.stationName);
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let stops_at = "";

                let stopIndex1 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
                let stopIndex2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

                if (stops[stopIndex1] != null && stops[stopIndex1] != arrival.destination()) {
                    stops_at = "via " + stops[stopIndex1].replace("|", " ");
                }
                if (stops[stopIndex2] != null && stops[stopIndex2] != arrival.destination()) {
                    stops_at = stops_at + " en " + stops[stopIndex2].replace("|", " ");
                }

                Text.create("Arrival Stops " + i)
                    .text(stops_at)
                    .pos(20, 8 + rowOffset) 
                    .size(pids.width * 1.6, 30)
                    .scaleXY()
                    .scale(0.3)
                    .color(0x002b6d)
                    .draw(ctx);
            }

            // --- LINIENNUMMER ---
            Text.create("Arrival Number " + i)
                .text(TextUtil.cycleString(arrival_text))
                .leftAlign()
                .scale(0.4)
                .pos(102, 2.8 + rowOffset)
                .size(75, 30)
                .scaleXY()
                .color(0x002b6d)
                .draw(ctx);

            // --- ZEIT (ETA) ---
            let etas = arrival.departureTime();
            let deviation = arrival.deviation();
            let late_eta = new Date(etas - deviation);
            let late_time = late_eta.getHours().toString().padStart(2, '0') + ":" + late_eta.getMinutes().toString().padStart(2, '0');
            
            Text.create("Arrival ETA " + i)
                .text(TextUtil.cycleString(late_time))
                .scale(0.5)
                .color(0x002b6d)
                .pos(2, 6.2 + rowOffset)
                .size(60, 30)
                .draw(ctx);

            // --- BAHNSTEIG ---
            Text.create("Platform Number " + i)
                .text(TextUtil.cycleString(arrival.platformName()))
                .scale(0.7)
                .pos(95.25, 7.8 + rowOffset)
                .centerAlign()
                .size(12, 10)
                .scaleXY()
                .color(0x002b6d)
                .draw(ctx);
        }
    }

    // Uhrzeit (ganz oben rechts)
    let date = new Date();
    let time = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');

    Text.create("Clock")
        .text(time)
        .color(0xFFFFFF)
        .pos(pids.width - 10, 1.1)
        .scale(0.31)
        .leftAlign()
        .draw(ctx);
}

function dispose(ctx, state, pids) {
}