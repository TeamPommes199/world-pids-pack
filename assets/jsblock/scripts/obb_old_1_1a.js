include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/obb_old_1_1a.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text + Destination")
            .text(arrival_first.routeNumber() + "  " + TextUtil.cycleString(arrival_first.destination()))
            .pos(11, 12)
            .size(72, 6)
            .scale(2)
            .scaleXY()
            .color(0xEEEEEE)
            .draw(ctx);

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = ""} else {if(eta < 9.5) {eta = "0" + Math.round(eta)} else {eta = Math.round(eta)}}
        
        Text.create("arrival_first ETA")
            .text(eta)
            .color(0xEEEEEE)
            .rightAlign()
            .scale(2)
            .pos(pids.width - 11, 12)
            .size(42, 6)
            .scaleXY()
            .draw(ctx);

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stops_at = ""
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
            let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

            if (stops[i] != null && stops[i] != arrival_first.destination()) {
                stops_at = "über "
                stops_at = stops_at + stops[i].replace("|", " ")
            }

            if (stops[i_2] != null && stops[i_2] != arrival_first.destination()) {
                stops_at = stops_at + ", " + stops[i_2].replace("|", " ")
            }

            Text.create("arrival_first stops")
                .text(stops_at)
                .color(0xEEEEEE)
                .scale(1.15)
                .pos(11, 29)
                .size(130, 6)
                .scaleXY()
                .draw(ctx);
        }
    }

    let arrival_second = pids.arrivals().get(1);
    if(arrival_second != null) {
        Text.create("arrival_second Number Text + Destination")
            .text(arrival_second.routeNumber() + "  " + TextUtil.cycleString(arrival_second.destination()))
            .pos(11, pids.height - 20)
            .size(72, 6)
            .scale(2)
            .scaleXY()
            .color(0xEEEEEE)
            .draw(ctx);

        let eta = (arrival_second.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = ""} else {if(eta < 9.5) {eta = "0" + Math.round(eta)} else {eta = Math.round(eta)}}

        Text.create("arrival_second ETA")
            .text(eta)
            .color(0xEEEEEE)
            .rightAlign()
            .scale(2)
            .pos(pids.width - 11, pids.height - 20)
            .size(42, 6)
            .scaleXY()
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }