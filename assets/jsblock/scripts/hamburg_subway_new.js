function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/hamburg_subway_new.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let date = new Date;
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')

    Text.create("Clock")
        .text(time)
        .color(0xffffff)
        .pos(pids.width - 1, 5.5)
        .size(pids.width, 6)
        .scaleXY()
        .rightAlign()
        .draw(ctx);

    let arrival = pids.arrivals().get(0);
    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2)];
    if (arrival != null) {
        Texture.create("route color")
            .texture("jsblock:custom_directory/lrr_u_bahn.png")
            .pos(3.5, 2.5)
            .color(arrival.routeColor())
            .size(30, 12)
            .draw(ctx);

        Text.create("Number Text")
            .text(arrival.routeNumber())
            .centerAlign()
            .pos(18.5, 4)
            .size(20, 10)
            .scaleXY()
            .scale(1.15)
            .color(0xffffff)
            .draw(ctx);

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = "fährt sofort"
        } else if (eta < 1.5 && eta > 0.49) {
            eta = "in " + Math.round(eta) + " Minute"
        } else {
            eta = "in " + Math.round(eta) + " Minuten"
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xffffff)
            .pos(pids.width - 1, pids.height - 9)
            .size(pids.width, 8)
            .scaleXY()
            .rightAlign()
            .draw(ctx);

        let destination = TextUtil.cycleString(arrival.destination())
        let customMsg_r = "#//#"
        if (new Date().getSeconds() < 15 || new Date().getSeconds() > 30 && new Date().getSeconds() < 45) {
            for (let customMsg of customMsgs) {
                if (customMsg.includes(arrival.routeNumber(), ":")) {
                    customMsg_r = customMsg.replace(arrival.routeNumber() + ":", "")
                    destination = "Information"
                    Text.create("Custom Text")
                        .text(customMsg_r.replace("|", " "))
                        .pos(pids.width / 2, 22)
                        .color(0xffffff)
                        .centerAlign()
                        .size(pids.width - 30, 10)
                        .wrapText()
                        .draw(ctx);
                }
            }

            if (customMsg_r === "#//#") {
                if (pids.station() && arrival.route()) {
                    let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
                    let stops_at = ""
                    let stationClean = pids.station().getName().normalize("NFC").trim();
                    let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
                    let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
                    let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;

                    if (stops[i] != null && stops[i] != arrival.destination()) {
                        stops_at = ""
                        stops_at = "über  " + stops_at + stops[i].replace("|", " ")
                    }

                    if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
                        stops_at = stops_at + " - " + stops[i_2].replace("|", " ")
                    }

                    if (stops[i_3] != null && stops[i_3] != arrival.destination()) {
                        Text.create("Custom Text 3")
                            .text(stops[i_3].replace("|", " "))
                            .pos(pids.width / 2, 35.5)
                            .color(0xffffff)
                            .centerAlign()
                            .size(pids.width - 30, 10)
                            .scaleXY()
                            .draw(ctx);
                    }

                    Text.create("Custom Text")
                        .text(stops_at)
                        .pos(pids.width / 2, 22)
                        .color(0xffffff)
                        .centerAlign()
                        .size(pids.width - 30, 10)
                        .scaleXY()
                        .draw(ctx);
                }
            }
        } else {
            if (pids.station() && arrival.route()) {
                let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
                let stops_at = ""
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
                let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
                let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;

                if (stops[i] != null && stops[i] != arrival.destination()) {
                    stops_at = ""
                    stops_at = "über  " + stops_at + stops[i].replace("|", " ")
                }

                if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
                    stops_at = stops_at + " - " + stops[i_2].replace("|", " ")
                }

                if (stops[i_3] != null && stops[i_3] != arrival.destination()) {
                    Text.create("Custom Text 3")
                        .text(stops[i_3].replace("|", " "))
                        .pos(pids.width / 2, 35.5)
                        .color(0xffffff)
                        .centerAlign()
                        .size(pids.width - 30, 10)
                        .scaleXY()
                        .draw(ctx);
                }

                Text.create("Custom Text")
                    .text(stops_at)
                    .pos(pids.width / 2, 22)
                    .color(0xffffff)
                    .centerAlign()
                    .size(pids.width - 30, 10)
                    .scaleXY()
                    .draw(ctx);
            }
        }

        Text.create("destination")
            .text(destination)
            .pos(38, 2.5)
            .size(85.71, 10)
            .scaleXY()
            .scale(1.4)
            .color(0xffffff)
            .draw(ctx);
    } else {
        Text.create("BETRIEBSPAUSE")
            .text("BETRIEBSPAUSE")
            .pos(38, 2.5)
            .size(85.71, 10)
            .scaleXY()
            .scale(1.4)
            .color(0xffffff)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
}