include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/blank.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        let arrival_text = arrival_first.routeNumber()

        if (pids.station() && arrival_first.route()) {
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let stops = arrival_first.route().getPlatforms().toArray().map(p => p.stationName);
            let currentIndex = stops.findIndex(s => s.normalize("NFC").trim() === stationClean);
            let nextStops = stops.slice(currentIndex);
            let displayStops = [];


            displayStops.push(nextStops[nextStops.length - 1]);
            let step = (nextStops.length - 1) / 5;
            for (let i = 2; i > -1; i--) {
                let index = Math.round(i * step);
                if (!displayStops.includes(nextStops[index].replace("|", " "))) {
                    displayStops.push((nextStops[index].replace("|", " ")));
                }
            }

            for (let line = 0; line < displayStops.length; line++) {
                let stop = displayStops[line].normalize("NFC").trim();

                if (stop == pids.station().getName()) {
                    Texture.create("Background")
                        .texture("jsblock:custom_directory/full_round.png")
                        .pos(95, 13 + 5.2 * line)
                        .size(5.2, 5.2)
                        .draw(ctx);
                } else {
                    Texture.create("Background")
                        .texture("jsblock:custom_directory/not_full_round.png")
                        .pos(95, 13 + 5.2 * line)
                        .size(5.2, 5.2)
                        .draw(ctx);
                }

                Text.create("stop_line_" + line)
                    .text(stop)
                    .pos(100, 14 + 5.25 * line)
                    .size(45, 5)
                    .scaleXY()
                    .scale(0.7)
                    .color(0xFFFFFF)
                    .draw(ctx);
            }
        }


        Text.create("arrival_first Number Text")
            .text(arrival_text)
            .scale(1)
            .pos(1, -9)
            .size(75, 30)
            .scaleXY()
            .color(0xffffff)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .scale(1)
            .pos(1, 1)
            .size(pids.width - 55, 30)
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
            .scale(1)
            .color(0xffffff)
            .pos(60, 1.5)
            .size(60, 30)
            .draw(ctx);

        Texture.create("train_stopping_areas")
            .texture("jsblock:custom_directory/finish_vr_stop_area.png")
            .size(pids.width, 11.5)
            .pos(0, pids.height - 11.5)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }