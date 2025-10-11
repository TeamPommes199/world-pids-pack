include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/sbb.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Texture.create("arrival_first Circle Colored")
        .texture("jsblock:custom_directory/lrr_u_bahn.png")
        .pos(3, 21)
        .size(18, 6)
        .color(arrival_first.routeColor())
        .draw(ctx);

        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(12, 21.6)
        .centerAlign()
        .size(13.7, 4.8)
        .scale(1.3)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(3, 30)
        .size(50, 6)
        .scale(1.25)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        if (pids.station() && arrival_first.route()) {
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let stops = arrival_first.route().getPlatforms().toArray().map(p => p.stationName);
            let currentIndex = stops.findIndex(s => s.normalize("NFC").trim() === stationClean);
            let nextStops = stops.slice(currentIndex + 1);
            let displayStops = [];

            if (nextStops.length <= 6) {
                displayStops = nextStops;
            } else {
                let step = (nextStops.length - 1) / 5;
                for (let i = 0; i < 5; i++) {
                    let index = Math.round(i * step);
                    displayStops.push(nextStops[index].replace("|", " "));
                }
                displayStops.push(nextStops[nextStops.length - 1]);
            }

            for (let line = 0; line < displayStops.length; line++) {
                let stop = displayStops[line].normalize("NFC").trim().replace("|", " ");

                Text.create("stop_line_" + line)
                    .text(stop)
                    .pos(70, 21 + 5.25 * line)
                    .size(60, 5)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);
            }
        }

        let etas = arrival_first.departureTime()
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');

        Text.create("arrival ETA")
        .text(time)
        .color(0xffffff)
        .pos(25, 21)
        .size(25, 6)
        .scale(1.3)
        .scaleXY()
        .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }