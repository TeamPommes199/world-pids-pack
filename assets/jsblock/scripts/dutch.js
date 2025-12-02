include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/dutch.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];

    let arrival_first = pids.arrivals().get(0);
    let arrival_number_pos = pids.width - 1
    if(arrival_first != null) {
        let arrival_text = arrival_first.routeNumber()

        for(let customMsg of customMsgs) {
            if(customMsg.includes(arrival_first.routeNumber(), ":")) {
                arrival_text = customMsg.replace(arrival_first.routeNumber() + ":", "")
            }
            if(customMsg.includes("sign: yes")) {
                Texture.create("Background")
                    .texture("jsblock:custom_directory/dutch_sign.png")
                    .size(20, 10)
                    .pos(pids.width - 21, 1)
                    .draw(ctx);

                arrival_number_pos = pids.width - 21
            }
        }

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stops_at = ""
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
            let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

            if (stops[i] != null && stops[i] != arrival_first.destination()) {
                stops_at = "via "
                stops_at = stops_at + stops[i].replace("|", " ")
            }

            if (stops[i_2] != null && stops[i_2] != arrival_first.destination()) {
                stops_at = stops_at + " en " + stops[i_2].replace("|", " ")
            }

            Text.create("arrival_first stops")
                .text(stops_at)
                .pos(4, 18)
                .size(pids.width - 6, 30)
                .scaleXY()
                .scale(0.8)
                .color(0x002b6d)
                .draw(ctx);
        }

        Text.create("arrival_first Number Text")
            .text(arrival_text)
            .rightAlign()
            .scale(1.1)
            .pos(arrival_number_pos, -10)
            .size(75, 30)
            .scaleXY()
            .color(0x002b6d)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .scale(1.1)
            .pos(4, 3)
            .size(pids.width - 20, 30)
            .scaleXY()
            .color(0x002b6d)
            .draw(ctx);

        let etas = arrival_first.departureTime()
        let deviation = arrival_first.deviation()
        let late_eta = etas - deviation
        late_eta = new Date(late_eta)
        let late_hours = late_eta.getHours()
        let late_minutes = late_eta.getMinutes()
        let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
        Text.create("arrival_first ETA")
            .text(late_time)
            .scale(1.1)
            .color(0x002b6d)
            .pos(4, 3)
            .size(60, 30)
            .draw(ctx);

        let cars = arrival_first.cars()
        let end = false
        for (let i = 0; i < cars.length; i++) {
            let car_id = cars[i].getVehicleId()
            let carTerms = ["cab", "for", "back"]
            let sizeX = 19.5
            let sizeY = 9.5
            let position = (pids.width / 2) - (9.75 * cars.length) + (19.5 * i)
            if (19.5 * cars.length > 132) {
                let scale = 132 / (19.5 * cars.length)
                position = (pids.width / 2) - (9.75 * cars.length * scale) + (19.5 * i * scale)
                sizeX = sizeX * scale
                sizeY = sizeY * scale
            }


            if (i === 0) {
                end = true
                Texture.create("Next Background")
                    .texture("jsblock:custom_directory/dutch_cab_1.png")
                    .size(sizeX, sizeY)
                    .pos(position, pids.height - 22)
                    .draw(ctx);
                continue
            }

            if (i + 1 === cars.length) {
                end = false
                Texture.create("Next Background")
                    .texture("jsblock:custom_directory/dutch_cab_2.png")
                    .size(sizeX, sizeY)
                    .pos(position, pids.height - 22)
                    .draw(ctx);
                continue
            }

            if (carTerms.some(term => car_id.includes(term)) && !end) {
                end = true
                Texture.create("Next Background")
                    .texture("jsblock:custom_directory/dutch_cab_1.png")
                    .size(sizeX, sizeY)
                    .pos(position, pids.height - 22)
                    .draw(ctx);
            } else if (carTerms.some(term => car_id.includes(term)) && end) {
                end = false
                Texture.create("Next Background")
                    .texture("jsblock:custom_directory/dutch_cab_2.png")
                    .size(sizeX, sizeY)
                    .pos(position, pids.height - 22)
                    .draw(ctx);
            } else {
                Texture.create("Next Background")
                    .texture("jsblock:custom_directory/dutch_trailer.png")
                    .size(sizeX, sizeY)
                    .pos(position, pids.height - 22)
                    .draw(ctx);
            }
        }
    }

    for(let i = 1; i < 2; i++) {
        let rowY = pids.height - 6.5;
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            Texture.create("Next Background")
                .texture("jsblock:custom_directory/dutch_next.png")
                .size(pids.width, pids.height)
                .draw(ctx);

            Text.create("text")
                .text("Hierna/")
                .pos(2, rowY)
                .size(20, 5)
                .scaleXY()
                .color(0xFFFFFF)
                .draw(ctx);

            Text.create("text italic")
                .text("next:")
                .pos(22, rowY)
                .size(15, 5)
                .scaleXY()
                .italic()
                .color(0xFFFFFF)
                .draw(ctx);

            Text.create("arrival")
            .text(arrival.routeNumber() + " " + TextUtil.cycleString(arrival.destination()))
            .pos(56, rowY)
            .size(pids.width - 57, 5)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

            let etas = arrival.departureTime()
            let deviation = arrival.deviation()
            let late_eta = etas - deviation
            late_eta = new Date(late_eta)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
            Text.create("arrival ETA")
            .text(late_time)
            .color(0xFFFFFF)
            .pos(38, rowY)
            .leftAlign()
            .size(19, 5)
            .scaleXY()
            .draw(ctx);
        }
    }
}

function dispose(ctx, state, pids) {
  }