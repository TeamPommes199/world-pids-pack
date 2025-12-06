include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/norway.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        let arrival_text = arrival_first.routeNumber()

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
                stops_at = stops_at + " ・ " + stops[i_2].replace("|", " ")
            }

            Text.create("arrival_first stops")
                .text(stops_at)
                .pos(4, 18)
                .size(pids.width - 6, 30)
                .scaleXY()
                .scale(0.65)
                .color(0xffffff)
                .draw(ctx);
        }

        Texture.create("arrival_first Circle Colored")
            .texture("jsblock:custom_directory/lrr_u_bahn.png")
            .pos(4, 3.5)
            .size(17, 8.5)
            .color(arrival_first.routeColor())
            .draw(ctx);

        Text.create("arrival_first Number Text")
            .text(arrival_text)
            .scale(1.1)
            .color(0xffffff)
            .pos(13, 4.5)
            .size(14, 6.5)
            .scaleXY()
            .centerAlign()
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .scale(1.1)
            .pos(4, 3)
            .size(pids.width - 50, 30)
            .scaleXY()
            .color(0xffffff)
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
            .rightAlign()
            .scale(1.1)
            .pos(pids.width - 1, 3)
            .size(75, 30)
            .scaleXY()
            .color(0xffffff)
            .draw(ctx);

        let date = new Date;
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')
        Text.create("arrival_first ETA")
            .text(time)
            .rightAlign()
            .scale(0.4)
            .pos(pids.width - 1, -1)
            .size(75, 30)
            .scaleXY()
            .color(0xffffff)
            .draw(ctx);

        let car_length = arrival_first.carCount();
        for (let i = 0; i < car_length && i < 11; i++) {
            let posX = i * 12.2 + 1

            if (i + 1 === car_length || i + 1 === 11) {
                Texture.create("train_stopping_areas")
                    .texture("jsblock:custom_directory/quad_right_missing.png")
                    .size(12, 8)
                    .pos(posX, pids.height - 12)
                    .draw(ctx);
            } else {
                Texture.create("train_stopping_areas")
                    .texture("jsblock:custom_directory/quad.png")
                    .size(12, 8)
                    .pos(posX, pids.height - 12)
                    .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {
  }