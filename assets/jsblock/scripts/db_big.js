include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    let rowY = 0.35
    let rows = 10

    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    if (pids.type == "pids_projector") {
        Texture.create("Background")
            .texture("jsblock:custom_directory/db_big_row_top_top.png")
            .size(pids.width + 7, (pids.height / 18) + 4.55)
            .pos(-3.5, rowY - 9.5)
            .draw(ctx);

        for (let customMsg of customMsgs) {
            if (customMsg.includes("rows:")) {
                rows = customMsg.replace("rows:", "")
            }
        }
    } else {
        rows = 14
    }

    let page = 1
    let pageMsg = customMsgs.find(item => item.includes("page:"))
    if (pageMsg) {
        page = pageMsg.replace("page:", "")
        if (page < 1) {page = 1}
    }

    Texture.create("Background")
        .texture("jsblock:custom_directory/db_big_row_top.png")
        .size(pids.width + 7, (pids.height / 18) + 2)
        .pos(-3.5, rowY - 0.75)
        .draw(ctx);

    for (let i = rows * (page - 1); i < rows * page; i++) {
        let x  = (i - rows * (page - 1))
        if (x / 2 !== Math.round(x / 2) - 0.5) {
            rowY += 5.7
            Texture.create("Background")
                .texture("jsblock:custom_directory/db_big_row.png")
                .size(pids.width + 7, (pids.height / 18) + 2)
                .pos(-3.5, rowY - 0.75)
                .draw(ctx);
        } else {
            rowY += 4.35
            Texture.create("Background")
                .texture("jsblock:custom_directory/db_big_row.png")
                .size(pids.width + 7, (pids.height / 18) + 1)
                .pos(-3.5, rowY)
                .draw(ctx);
            if (x !== rows - 1) {
                Texture.create("Background")
                    .texture("jsblock:custom_directory/db_big_row_black.png")
                    .size(pids.width, 1.3)
                    .pos(0, rowY + 3.7)
                    .draw(ctx);
            }
        }
        
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            Texture.create("late_arrival ETA background")
                .texture("jsblock:custom_directory/lrr_u_bahn.png")
                .pos(15, rowY - 0.25)
                .size(18, 3.33)
                .draw(ctx);

            Text.create("arrival Number Text")
            .text(arrival.routeNumber())
            .pos(16, rowY + 0.45)
            .size(14, 2.5)
            .scaleXY()
            .color(0x012f7b)
            .draw(ctx);

            Text.create("arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(70, rowY)
            .size(pids.width / 4, 4)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

            Text.create("arrival destination")
                .text(TextUtil.cycleString(arrival.platformName()))
                .pos(108, rowY)
                .size(pids.width / 15, 4)
                .scaleXY()
                .color(0xFFFFFF)
                .draw(ctx);

            
            if (pids.station() && arrival.route()) {
                let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
                let stops_at = ""
                let stationClean = pids.station().getName().normalize("NFC").trim();
                let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
                let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
                let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;

                if (stops[i] != null && stops[i] != arrival.destination()) {
                    stops_at = ""
                    stops_at = stops_at + stops[i].replace("|", " ")
                }

                if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
                    stops_at = stops_at + " - " + stops[i_2].replace("|", " ")
                }
                
                if (stops[i_3] != null && stops[i_3] != arrival.destination()) {
                    stops_at = stops_at + " - " + stops[i_3].replace("|", " ")
                }

                Text.create("arrival_first stops")
                    .text(stops_at)
                    .pos(34, rowY)
                    .size(pids.width / 4, 4)
                    .scaleXY() // <----
                    .color(0xFFFFFF)
                    .draw(ctx);
            }

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
            .pos(1, rowY)
            .leftAlign()
            .size(20, 4)
            .scaleXY()
            .draw(ctx);

            if (deviation > 270000) {
                Texture.create("late_arrival ETA background")
                    .texture("jsblock:custom_directory/lrr_u_bahn.png")
                    .pos(118, rowY - 0.25)
                    .size(18, 3.33)
                    .draw(ctx);
                deviation = deviation / 60000
                deviation = Math.round(deviation)

                Text.create("late_arrival ETA")
                    .text("     Verspätung ca. "+ deviation + " Min.     ")
                    .color(0x012f7b)
                    .pos(119, rowY + 0.45)
                    .size(pids.width / 2.5, 3.33)
                    .scale(0.275)
                    .marquee()
                    .draw(ctx);
            }
        }
    }
    Texture.create("Background")
        .texture("jsblock:custom_directory/db_big_row_dark_blue.png")
        .size(pids.width + 7, 1.3)
        .pos(-3.5, rowY + 5)
        .draw(ctx);
}

function dispose(ctx, state, pids) {
  }