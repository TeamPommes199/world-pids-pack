include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    let page = 1
    let pageMsg = customMsgs.find(item => item.includes("page:"))
    if (pageMsg) {
        page = pageMsg.replace("page:", "")
        if (page < 1) {
            page = 1
        }
    }

    let rows = 15
    let rowsMsg = customMsgs.find(item => item.includes("rows:"))
    if (rowsMsg) {
        rows = rowsMsg.replace("rows:", "")
        if (rows < 1) {
            rows = 1
        }
    }

    let head = ""
    let headMsg = customMsgs.find(item => item.includes("head:"))
    if (headMsg) {
        head = headMsg.replace("head:", "")
    }

    Texture.create("top background")
        .texture("jsblock:assets/sbb/sbb_big_top.png")
        .size(pids.width + 7, (pids.width + 7) / 10.66)
        .pos(0, 0)
        .zOrder(0)
        .draw(ctx);

    if (head !== "") {
        Text.create("head")
            .text(head)
            .pos(8, 2)
            .size(pids.width, 10)
            .scale(0.75)
            .zOrder(1)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);
    }

    for (let i = rows * (page - 1); i < rows * page; i++) {
        let arrival = pids.arrivals().get(i);
        let rowY = (pids.width + 7) / 10.66 + i * ((pids.width + 7) / 31)

        Texture.create("row background")
            .texture("jsblock:assets/sbb/sbb_big_row.png")
            .size(pids.width + 7, (pids.width + 7) / 31)
            .pos(0, rowY)
            .zOrder(0)
            .draw(ctx);

        if (arrival != null) {
            Texture.create("arrival number background")
                .texture("jsblock:assets/general/long_quad_full.png")
                .pos(0.5, rowY + 0.5)
                .size(9, (pids.width + 7) / 31 - 1.5)
                .zOrder(1)
                .draw(ctx);

            Text.create("arrival Number Text")
                .text(arrival.routeNumber())
                .pos(1, rowY + 0.55)
                .size(21, 10)
                .scale(0.375)
                .scaleXY()
                .color(0x000000)
                .zOrder(2)
                .draw(ctx);

            let stops_at = ""
            if (pids.station() && arrival.route()) {
                let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 2;
                let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 4;

                if (stops[i] != null && stops[i] != arrival.destination()) {
                    stops_at = ""
                    stops_at = stops_at + stops[i].replace("|", " ") + " "
                }

                if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
                    stops_at = stops_at + stops[i_2].replace("|", " ") + " "
                }
            }

            Text.create("arrival destination")
                .text(stops_at + arrival.destination().replace("|", " "))
                .pos(21, rowY + 0.5)
                .size(158, 10)
                .scaleXY()
                .scale(0.4)
                .color(0xFFFFFF)
                .zOrder(1)
                .draw(ctx);

            Text.create("arrival platform")
                .text(TextUtil.cycleString(arrival.platformName()))
                .pos(98, rowY + 0.5)
                .size(30, 10)
                .scaleXY()
                .scale(0.4)
                .color(0xFFFFFF)
                .rightAlign()
                .zOrder(1)
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
                .pos(10.5, rowY + 0.5)
                .scale(0.4)
                .size(23, 10)
                .scaleXY()
                .zOrder(1)
                .draw(ctx);

            if (deviation > 90000) {
                deviation = deviation / 60000
                deviation = Math.round(deviation)

                Text.create("delay")
                    .text("ca. " + deviation + " Min später")
                    .color(0xffff00)
                    .pos(107, rowY + 0.75)
                    .size(95, 10)
                    .scale(0.35)
                    .marquee()
                    .zOrder(2)
                    .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {
}