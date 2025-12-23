include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/euston.png")
        .size(pids.height * 7.8, pids.height)
        .draw(ctx);

    let date = new Date;
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    Text.create("Clock")
        .text(time)
        .color(0xFFFFFF)
        .pos(pids.height * 0.5, pids.height / 2 - 4)
        .centerAlign()
        .draw(ctx);

    let posX = pids.height * 0.8
    for (let i = 0; i < 10; i++) {
        let arrival = pids.arrivals().get(i);

        if (arrival != null) {
            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            let etas = arrival.departureTime()
            let late_eta = new Date(etas)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');

            if (eta < 0.5 && eta > 0.04) {
                Texture.create("train info")
                    .texture("jsblock:custom_directory/euston_train_info_arrived.png")
                    .size(pids.height * 0.4, pids.height)
                    .pos(posX, 0)
                    .draw(ctx);

                Text.create("platform text")
                    .text("Platform")
                    .pos(posX + 1.5, 9.5333)
                    .scale(0.2)
                    .color(0xFFFFFF)
                    .draw(ctx);

                Text.create("platform")
                    .text(TextUtil.cycleString(arrival.platformName()))
                    .pos(posX + 1.5, 11.8)
                    .scale(0.4)
                    .color(0xFFFFFF)
                    .draw(ctx);
            } else if (eta < 0.05) {
                Texture.create("train info")
                    .texture("jsblock:custom_directory/euston_train_info_arrived.png")
                    .size(pids.height * 0.4, pids.height)
                    .pos(posX, 0)
                    .draw(ctx);

                Text.create("boarding")
                    .text("Boarding")
                    .pos(posX + 28.9, 1)
                    .scale(0.3)
                    .color(0xFFFFFF)
                    .rightAlign()
                    .draw(ctx);

                Text.create("platform text")
                    .text("Platform")
                    .pos(posX + 1.5, 9.5333)
                    .scale(0.2)
                    .color(0xFFFFFF)
                    .draw(ctx);

                Text.create("platform")
                    .text(TextUtil.cycleString(arrival.platformName()))
                    .pos(posX + 1.5, 11.8)
                    .scale(0.4)
                    .color(0xFFFFFF)
                    .draw(ctx);
            } else {
                Texture.create("train info")
                    .texture("jsblock:custom_directory/euston_train_info.png")
                    .size(pids.height * 0.4, pids.height)
                    .pos(posX, 0)
                    .draw(ctx);

                Text.create("platform text")
                    .text("Please wait")
                    .pos(posX + 1.5, 12)
                    .scale(0.2)
                    .color(0xFFFFFF)
                    .draw(ctx);
            }

            Text.create("eta")
                .text(late_time)
                .pos(posX + 1.5, 1)
                .scale(0.3)
                .color(0xFFFFFF)
                .draw(ctx);

            Text.create("arrival destination")
                .text(TextUtil.cycleString(arrival.destination()))
                .pos(posX + 1.5, 4.2)
                .size(pids.height * 1.2, 10)
                .scaleXY()
                .scale(0.3)
                .color(0xFFFFFF)
                .draw(ctx);

            if (pids.station() && arrival.route()) {
                let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
                let stops_at = ""
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

                if (stops[i] != null && stops[i] != arrival.destination()) {
                    stops_at = "via "
                    stops_at = stops_at + stops[i].replace("|", " ")
                }

                Text.create("arrival stop 1")
                    .text(stops_at)
                    .pos(posX + 1.5, 7.4)
                    .scale(0.2)
                    .size(pids.height * 1.5, 10)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);
            }

            Text.create("arrival routeNumber")
                .text(arrival.routeNumber())
                .pos(posX + (pids.height * 0.4 / 2), 18)
                .centerAlign()
                .scale(0.5)
                .size(pids.height * 0.75, 10)
                .scaleXY()
                .color(0xFFFFFF)
                .draw(ctx);

            if (pids.station() && arrival.route()) {
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let stops = arrival.route().getPlatforms().toArray().map(p => p.stationName);
                let currentIndex = stops.findIndex(s => s.normalize("NFC").trim() === stationClean);
                let nextStops = stops.slice(currentIndex + 1);
                let displayStops = [];

                if (nextStops.length <= 12) {
                    displayStops = nextStops;
                } else {
                    let step = (nextStops.length - 1) / 11;
                    for (let i = 0; i < 11; i++) {
                        let index = Math.round(i * step);
                        displayStops.push(nextStops[index].replace("|", " "));
                    }
                    displayStops.push(nextStops[nextStops.length - 1]);
                }

                if (displayStops.length > 0) {
                    Text.create("calling at")
                        .text("Calling at:")
                        .pos(posX + 1.5, 24)
                        .scale(0.2)
                        .color(0xFFFF00)
                        .draw(ctx);
                }

                for (let line = 0; line < displayStops.length; line++) {
                    let stop = TextUtil.cycleString(displayStops[line].normalize("NFC").trim());

                    Text.create("stop_line_" + line)
                        .text(stop)
                        .pos(posX + 1.5, 26.25 + 3 * line)
                        .scale(0.25)
                        .size(pids.height * 1.4, 10)
                        .scaleXY()
                        .color(0xFFFFFF)
                        .draw(ctx);
                }
            }

            Text.create("arrival destination")
                .text("This train has " + arrival.cars().length + " coaches")
                .pos(posX + 4.5, pids.height - 9)
                .scale(0.2)
                .size(pids.height * 1.5, 10)
                .marquee()
                .color(0xFFFF00)
                .draw(ctx);
        } else {
            Texture.create("train info")
                .texture("jsblock:custom_directory/euston_train_info.png")
                .size(pids.height * 0.4, pids.height)
                .pos(posX, 0)
                .draw(ctx);
        }

        posX += pids.height * 0.4
    }

    Texture.create("train info")
        .texture("jsblock:custom_directory/euston_further_departures.png")
        .size(pids.height * 0.8, pids.height)
        .pos(posX, 0)
        .draw(ctx);

    for (let i = 10; i < 17; i++) {
        let arrival = pids.arrivals().get(i);

        if (arrival != null) {
            let posY = 5.4889 + (i - 10) * 10.1333
            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            let etas = arrival.departureTime()
            let late_eta = new Date(etas)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');

            if (eta < 0.5) {
                Texture.create("platform status")
                    .texture("jsblock:custom_directory/lrr_u_bahn.png")
                    .size(pids.height * 0.79, 9.5)
                    .pos(posX, posY + 0.3)
                    .color(0x00D933)
                    .draw(ctx);

                Text.create("platform")
                    .text("Plat " + TextUtil.cycleString(arrival.platformName()))
                    .pos(posX + 41.25, posY + 1.5)
                    .centerAlign()
                    .scale(0.2)
                    .color(0xFFFFFF)
                    .draw(ctx);
            } else {
                Texture.create("platform status")
                    .texture("jsblock:custom_directory/lrr_u_bahn.png")
                    .size(7, 3)
                    .pos(posX + 37.75, posY + 0.7)
                    .color(0x0080FF)
                    .draw(ctx);

                Text.create("wait")
                    .text("wait")
                    .pos(posX + 41.25, posY + 1.5)
                    .centerAlign()
                    .scale(0.2)
                    .color(0xFFFFFF)
                    .draw(ctx);
            }

            Text.create("eta")
                .text(late_time)
                .pos(posX + 2, posY + 1.5)
                .scale(0.2333)
                .color(0xFFFFFF)
                .draw(ctx);

            Text.create("arrival destination")
                .text(TextUtil.cycleString(arrival.destination()))
                .pos(posX + 10, posY + 1.5)
                .scale(0.2333)
                .size(pids.height * 1.4, 10)
                .scaleXY()
                .color(0xFFFFFF)
                .draw(ctx);

            if (pids.station() && arrival.route()) {
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let stops = arrival.route().getPlatforms().toArray().map(p => p.stationName);
                let currentIndex = stops.findIndex(s => s.normalize("NFC").trim() === stationClean);
                let nextStops = stops.slice(currentIndex + 1);

                if (nextStops.length > 0) {
                    Text.create("calling at")
                        .text("Calling at:")
                        .pos(posX + 10, posY + 4.5)
                        .scale(0.2333)
                        .color(0xFFFF00)
                        .draw(ctx);
                }

                let stop = ""
                if (nextStops[0]) {stop = TextUtil.cycleString(nextStops[0].normalize("NFC").trim());}
                if (nextStops.length === 1) {
                    stop += " only"
                } else {
                    for (let line = 1; line < nextStops.length; line++) {
                        stop = stop + ", " + TextUtil.cycleString(nextStops[line].normalize("NFC").trim());
                    }
                }

                Text.create("stops")
                    .text(stop)
                    .pos(posX + 22, posY + 4.5)
                    .scale(0.2333)
                    .color(0xFFFFFF)
                    .marquee()
                    .draw(ctx);
            }
        }
    }

    posX += pids.height * 0.8

    Texture.create("fastest")
        .texture("jsblock:custom_directory/euston_fastest.png")
        .size(pids.height * 0.8, pids.height)
        .pos(posX, 0)
        .draw(ctx);

    let platforms = pids.arrivals().platforms()
    let stopsMap = {}

    for (let i = 0; i < platforms.length * 10; i++) {
        let arrival = pids.arrivals().get(i)
        if (arrival != null) {
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let stopping = arrival.route().getPlatforms().toArray().map(p => p.stationName);
            let currentIndex = stopping.findIndex(s => s.normalize("NFC").trim() === stationClean);

            let stops_of_arrival = stopping.slice(currentIndex + 1);
            let arrivalTimestamp = arrival.departureTime();
            let eta = (arrival.arrivalTime() - Date.now()) / 60000;

            for (let x = 0; x < stops_of_arrival.length; x++) {
                let destName = stops_of_arrival[x];

                if (!stopsMap[destName] || arrivalTimestamp < stopsMap[destName].rawTime) {
                    let late_eta = new Date(arrivalTimestamp)
                    let late_time = late_eta.getHours().toString().padStart(2, '0') + ":" +
                        late_eta.getMinutes().toString().padStart(2, '0');
                    let plat = (eta < 0.5) ? TextUtil.cycleString(arrival.platformName()) : "-";
                    let color = (eta < 0.5) ? 0x00D933 : 0x0080FF

                    stopsMap[destName] = {
                        "destination": destName,
                        "operator": arrival.routeNumber(),
                        "plat": plat,
                        "time": late_time,
                        "rawTime": arrivalTimestamp,
                        "color": color
                    };
                }
            }
        }
    }

    let stops = Object.values(stopsMap);
    stops.sort((a, b) => a["destination"].localeCompare(b["destination"]))
    let displayStops = []

    if (stops.length <= 16) {
        displayStops = stops
    } else {
        let step = (stops.length - 1) / 15;
        for (let i = 0; i < 15; i++) {
            let index = Math.round(i * step);
            displayStops.push(stops[index]);
        }
        displayStops.push(stops[stops.length - 1]);
    }

    for (let line = 0; line < displayStops.length; line++) {
        let stop = displayStops[line];
        let rawDestination = displayStops[line]["destination"] || "";
        let stopName = TextUtil.cycleString(rawDestination.replace("|", " ").normalize("NFC").trim());
        let posY = 16.2352 + ((pids.height - 12.5) / 17 * line)

        Texture.create("platform status")
            .texture("jsblock:custom_directory/lrr_u_bahn.png")
            .size(4.5, 3)
            .pos(posX + 43.4, posY - 0.8)
            .color(stop["color"])
            .draw(ctx);

        Text.create("stop_destination_" + line)
            .text(stopName)
            .pos(posX + 1.5, posY)
            .scale(0.25)
            .size(pids.height, 10)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("stop_operator_" + line)
            .text(stop["operator"])
            .pos(posX + 22.5, posY)
            .scale(0.25)
            .size(pids.height, 10)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("stop_plat_" + line)
            .text(stop["plat"])
            .pos(posX + 47.5, posY)
            .rightAlign()
            .scale(0.25)
            .size(pids.height * 0.2, 10)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("stop_time_" + line)
            .text(stop["time"])
            .pos(posX + pids.height * 0.8 - 1.5, posY)
            .rightAlign()
            .scale(0.25)
            .color(0xFFFFFF)
            .draw(ctx);
    }

    posX += pids.height * 0.8

    Texture.create("welcome")
        .texture("jsblock:custom_directory/euston_welcome.png")
        .size(pids.height * 0.6, pids.height)
        .pos(posX, 0)
        .draw(ctx);

    if (pids.station() != null) {
        Text.create("station name")
            .pos(posX + pids.height * 0.3, 32)
            .text(pids.station().getName().replace("|", " "))
            .color(0xFFFFFF)
            .scale(0.7)
            .size(pids.height * 0.75, 10)
            .scaleXY()
            .centerAlign()
            .draw(ctx)
    }

    posX += pids.height * 0.6

    Texture.create("arrivals")
        .texture("jsblock:custom_directory/euston_arrivals.png")
        .size(pids.height * 0.6, pids.height)
        .pos(posX, 0)
        .draw(ctx);

    for (let i = 0; i < 17; i++) {
        let arrival = pids.arrivals().get(i);

        if (arrival != null) {
            let posY = 16.2352 + ((pids.height - 12.5) / 17 * i)
            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            let etas = arrival.arrivalTime()
            let late_eta = new Date(etas)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');

            if (eta < 0.5) {
                Text.create("stop_from_station_" + i)
                    .text(TextUtil.cycleString(arrival.route().getPlatforms().toArray().map(p => p.stationName)[0]))
                    .pos(posX + 1.5, posY)
                    .scale(0.25)
                    .size(pids.height * 1.2, 10)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);

                Text.create("stop_plat_" + i)
                    .text(TextUtil.cycleString(arrival.platformName()))
                    .pos(posX + 33, posY)
                    .rightAlign()
                    .scale(0.25)
                    .color(0xFFFFFF)
                    .draw(ctx);

                Text.create("stop_time_" + i)
                    .text(late_time)
                    .pos(posX + pids.height * 0.6 - 1.5, posY)
                    .rightAlign()
                    .scale(0.25)
                    .color(0xFFFFFF)
                    .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {}