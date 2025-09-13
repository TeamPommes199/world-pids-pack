include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    let page = 1
    let pageMsg = customMsgs.find(item => item.includes("page:"))
    let arrival_first = pids.arrivals().get(0);
    if (pageMsg) {
        page = pageMsg.replace("page:", "")
        if (page < 1) {page = 1}
        arrival_first = pids.arrivals().get((page - 1) * 3);
    }

    if(arrival_first != null) {
        if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 1.5) {
            Texture.create("Background")
                .texture("jsblock:custom_directory/sj_sweden.png")
                .size(pids.width, pids.height)
                .draw(ctx);

            Text.create("arrival_first Number Text")
                .text(arrival_first.routeNumber())
                .pos(30, 20.5)
                .size(65, 6)
                .scale(1.15)
                .scaleXY()
                .color(0xFFD600)
                .draw(ctx);

            if (pids.station() && arrival_first.route()) {
                let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
                let stops_at = ""
                let stops_at_2 = ""
                let stationClean = pids.station().getName().normalize("NFC").trim();

                if (stops[stops.length - 2] == pids.station().name) {
                    stops_at = stops_at + stops[stops.length - 1].replace("|", " ")
                } else {
                    stops_at = stops_at + stops[stops.length - 2].replace("|", " ") + " " + stops[stops.length - 1].replace("|", " ")
                }

                let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
                let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 2;
                let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

                if (stops[i] != null && !stops_at.includes(stops[i])) {
                    stops_at_2 = stops_at_2 + stops[i].replace("|", " ")
                }

                if (stops[i_2] != null && !stops_at.includes(stops[i_2])) {
                    stops_at_2 = stops_at_2 + " " + stops[i_2].replace("|", " ")
                }

                if (stops[i_3] != null && !stops_at.includes(stops[i_3])) {
                    stops_at_2 = stops_at_2 + " " + stops[i_3].replace("|", " ")
                }

                Text.create("arrival_first stops")
                    .text(stops_at)
                    .pos(2, 30)
                    .size(100, 8.25)
                    .scaleXY()
                    .scale(1.3)
                    .color(0xFFD600)
                    .draw(ctx);

                Text.create("arrival_first stops 2")
                    .text(stops_at_2)
                    .pos(2, 42)
                    .size(100, 8.25)
                    .scaleXY()
                    .scale(0.95)
                    .color(0xFFD600)
                    .draw(ctx);
            }

            let etas = arrival_first.departureTime()
            let eta = new Date(etas)
            let hours = eta.getHours()
            let minutes = eta.getMinutes()
            let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            let deviation = arrival_first.deviation()
            let late_eta = etas - deviation
            late_eta = new Date(late_eta)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');

            Text.create("arrival ETA")
                .text(late_time)
                .color(0xFFD600)
                .scale(0.75)
                .pos(2, 15)
                .size(48, 24)
                .scaleXY()
                .draw(ctx);

            if (deviation > 60000) {
                Text.create("arrival ETA")
                    .text(time)
                    .color(0xaaffff)
                    .rightAlign()
                    .scale(0.75)
                    .pos(pids.width - 2, 15)
                    .size(48, 24)
                    .scaleXY()
                    .draw(ctx);
            }
        } else {
            Texture.create("Background")
                .texture("jsblock:custom_directory/sj_sweden_depatures.png")
                .size(pids.width, pids.height)
                .draw(ctx);

            for (let i = 3 * (page - 1); i < 3 * page; i++) {
                let rowY = 24 + ((i - 3 * (page - 1)) * 9);
                let arrival = pids.arrivals().get(i);
                if(arrival != null) {
                    Text.create("arrival destination")
                        .text(TextUtil.cycleString(arrival.destination()))
                        .color(0xFFD600)
                        .scale(0.75)
                        .pos(23, rowY)
                        .size(55, 24)
                        .scaleXY()
                        .draw(ctx);

                    Text.create("TiB")
                        .text(arrival.routeNumber())
                        .color(0xFFD600)
                        .scale(0.75)
                        .pos(87, rowY)
                        .size(50, 24)
                        .scaleXY()
                        .draw(ctx);

                    let etas = arrival.departureTime()
                    let eta = new Date(etas)
                    let hours = eta.getHours()
                    let minutes = eta.getMinutes()
                    let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
                    let deviation = arrival.deviation()
                    let late_eta = etas - deviation
                    late_eta = new Date(late_eta)
                    let late_hours = late_eta.getHours()
                    let late_minutes = late_eta.getMinutes()
                    let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');

                    Text.create("arrival ETA")
                        .text(late_time)
                        .color(0xFFD600)
                        .scale(0.75)
                        .pos(2, rowY)
                        .size(48, 24)
                        .scaleXY()
                        .draw(ctx);

                    if (deviation > 60000) {
                        Text.create("arrival ETA")
                            .text(time)
                            .color(0xaaffff)
                            .rightAlign()
                            .scale(0.75)
                            .pos(85, rowY)
                            .size(48, 24)
                            .scaleXY()
                            .draw(ctx);
                    }
                }
            }
        }
    } else {
        Texture.create("Background")
            .texture("jsblock:custom_directory/sj_sweden_depatures.png")
            .size(pids.width, pids.height)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }