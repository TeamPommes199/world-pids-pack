include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/polish_pkp.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        let arrival_text = arrival_first.routeNumber()

        for(let customMsg of customMsgs) {
            if(customMsg.includes(arrival_first.routeNumber(), ":")) {
                arrival_text = customMsg.replace(arrival_first.routeNumber() + ":", "")
            }
        }

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stops_at = ""
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
            let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
            let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;

            if (stops[i] != null && stops[i] !== arrival_first.destination()) {
                stops_at = ""
                stops_at = stops_at + stops[i].replace("|", " ")
            }

            if (stops[i_2] != null && stops[i_2] !== arrival_first.destination()) {
                stops_at = stops_at + ", " + stops[i_2].replace("|", " ")
            }

            if (stops[i_3] != null && stops[i_3] !== arrival_first.destination()) {
                stops_at = stops_at + ", " + stops[i_3].replace("|", " ")
            }

            Text.create("arrival_first stops")
                .text(stops_at)
                .pos(37, 23)
                .size(pids.width + 10, 12)
                .wrapText()
                .scale(0.65)
                .color(0xFFFFFF)
                .draw(ctx);
        }

        Text.create("arrival_first Number Text")
            .text(arrival_text)
            .scale(0.65)
            .pos(1, pids.height - 18)
            .size(49, 30)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        routeName = Text.create("arrival_first Name Text")
            .scale(0.65)
            .pos(37, pids.height - 18)
            .size(130, 30)
            .scaleXY()
            .color(0xFFFFFF)

        if (arrival_first.routeName().indexOf("||") < 1) {
            routeName.text(arrival_first.routeName())
        } else {
            routeName.text(arrival_first.routeName().substring(0, arrival_first.routeName().indexOf("||")))
        }

        routeName.draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .scale(1.3)
            .pos(40, 3)
            .size(pids.width - 64, 9)
            .scaleXY()
            .color(0xFFFFFF)
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
            .pos(2, 3)
            .size(60, 30)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }