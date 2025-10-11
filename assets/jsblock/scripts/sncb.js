include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/sncb.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2) + ";" + pids.getCustomMessage(3);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    let arrival_first = pids.arrivals().get(0);
    let arrival_number_pos = pids.width - 5
    if(arrival_first != null) {
        let arrival_text = arrival_first.routeNumber()

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stops_at = ""
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;

            for (let x = 0; i < stops.length; i++) {
                stops_at += stops[i].replace("|", " ")
                if (i !== (stops.length - 1)) {
                    stops_at += ", "
                }
            }

            Text.create("text")
                .text("Ce train s'arrête à:")
                .pos(4, 28)
                .size(pids.width - 6, 4)
                .scaleXY()
                .scale(0.8)
                .color(0xFFFFFF)
                .draw(ctx);

            Text.create("arrival_first stops")
                .text(stops_at + ".")
                .pos(4, 32)
                .size(pids.width - 6, 4)
                .scaleXY()
                .scale(0.8)
                .color(0xFFFFFF)
                .draw(ctx);
        }

        Text.create("arrival_first Number Text")
            .text(arrival_text)
            .rightAlign()
            .scale(1.1)
            .pos(arrival_number_pos, -8)
            .size(75, 30)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .scale(1.1)
            .pos(4, 5)
            .size(pids.width - 20, 30)
            .scaleXY()
            .color(0xFFFF00)
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
            .color(0xFFFFFF)
            .pos(4, 3)
            .size(60, 30)
            .draw(ctx);

        for (let customMsg of customMsgs) {
            if (customMsg.includes(arrival_first.routeNumber(), ":")) {
                let customMsg_r = customMsg.replace(arrival_first.routeNumber() + ":", "")
                Text.create("Custom Text")
                    .text(TextUtil.cycleString(customMsg_r))
                    .pos(3, 42)
                    .size(pids.width - 6, 4)
                    .scaleXY()
                    .scale(0.8)
                    .color(0xFFFFFF)
                    .draw(ctx);
            }
        }
    }

    for(let i = 1; i < 2; i++) {
        let rowY = pids.height - 5.5;
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            let etas = arrival.departureTime()
            let deviation = arrival.deviation()
            let late_eta = etas - deviation
            late_eta = new Date(late_eta)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
            Text.create("arrival")
            .text("Train suivant : " + late_time + " " + TextUtil.cycleString(arrival.destination()))
            .pos(4, rowY)
            .size(pids.width - 10, 4)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);
        }
    }
}

function dispose(ctx, state, pids) {
  }