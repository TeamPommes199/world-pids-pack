include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/dot_matrix_1a.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let arrival_first = pids.arrivals().get(0)
    if (arrival_first != null) {
        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            Text.create("arrival_first Number Text")
                .text(arrival_first.routeNumber())
                .pos(2, 5.5)
                .size(20, 16)
                .scale(1.5)
                .scaleXY()
                .color(0xff8c00)
                .draw(ctx);

            Text.create("arrival_first destination")
                .text(TextUtil.cycleString(arrival_first.destination()))
                .pos(pids.width / 2, 33)
                .size(pids.width - 64, 16)
                .scale(1.5)
                .scaleXY()
                .centerAlign()
                .color(0xff8c00)
                .draw(ctx);

            if (pids.station() && arrival_first.route()) {
                let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
                let stops_at = ""
                let stationClean = pids.station().getName().normalize("NFC").trim() || "";
                let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
                let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

                if (stops[i] != null && stops[i] !== arrival_first.destination()) {
                    stops_at = stops_at + stops[i].replace("|", " ")
                }

                if (stops[i_2] != null && stops[i_2] !== arrival_first.destination()) {
                    stops_at = stops_at + ", " + stops[i_2].replace("|", " ")
                }

                Text.create("arrival_first stops")
                    .text(stops_at)
                    .pos(pids.width / 2, 23)
                    .size(pids.width - 32, 16)
                    .scaleXY()
                    .scale(1.1)
                    .centerAlign()
                    .color(0xff8c00)
                    .draw(ctx);
            }

            let car_length = arrival_first.carCount();
            if (car_length > 2) {
                Texture.create("arrival_first Car length")
                    .texture("jsblock:custom_directory/hannover_light_rail_2.png")
                    .pos(40, 6.5)
                    .size(70, 16)
                    .color(0xff8c00)
                    .draw(ctx);
            } else {
                Texture.create("arrival_first Car length")
                    .texture("jsblock:custom_directory/hannover_light_rail_1.png")
                    .pos(40, 6.5)
                    .size(70, 16)
                    .color(0xff8c00)
                    .draw(ctx);
            }
        } else {
            for (let i = 0; i < 3; i++) {
                let arrival = pids.arrivals().get(i);
                if (arrival != null) {
                    let rowY = 8.5 + (11 * i)

                    Text.create("arrival routeNumber")
                        .text(arrival.routeNumber())
                        .pos(18, rowY)
                        .size(16, 12)
                        .scaleXY()
                        .rightAlign()
                        .color(0xff8c00)
                        .draw(ctx);

                    Text.create("arrival destination")
                        .text(TextUtil.cycleString(arrival.destination()))
                        .pos(21, rowY)
                        .size(pids.width - 69, 12)
                        .scaleXY()
                        .color(0xff8c00)
                        .draw(ctx);

                    let eta = (arrival.arrivalTime() - Date.now()) / 60000;
                    if (eta < 0.5) {
                        eta = ""
                    } else {
                        eta = Math.round(eta)
                    }
                    Text.create("arrival ETA")
                        .text(eta + " min")
                        .color(0xff8c00)
                        .pos(pids.width - 1, rowY)
                        .size(48, 12)
                        .scaleXY()
                        .rightAlign()
                        .draw(ctx);
                }
            }
            let customMsg = pids.getCustomMessage(2);
            if (customMsg != "") {
                Text.create("Custom Text")
                    .text(TextUtil.cycleString(customMsg))
                    .size(pids.width - 2, 12)
                    .pos(1, 41.5)
                    .color(0xff8c00)
                    .marquee()
                    .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {
}