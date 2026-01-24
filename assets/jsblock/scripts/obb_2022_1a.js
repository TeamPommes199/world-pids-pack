include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/obb_2022_1a.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(31.5, 7)
        .leftAlign()
        .size(pids.width - 133, 6)
        .scale(1.55)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(4.5, 21.5)
        .size(pids.width - 88, 6)
        .scale(1.55)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = ""} else {if(eta < 9.5) {eta = "0" + Math.round(eta)} else {eta = Math.round(eta)}}
        
        Text.create("arrival ETA")
        .text(eta)
        .color(0xffffff)
        .rightAlign()
        .scale(1.2)
        .pos(pids.width - 3.5, 11.5)
        .size(48, 24)
        .scaleXY()
        .draw(ctx);

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 2;

            if (stops[i] != null && stops[i] != arrival_first.destination()) {
                Text.create("arrival_first stops")
                    .text("weiter nach " + stops[i].replace("|", " "))
                    .pos(4.5, 36)
                    .size(pids.width - 9, 5.5)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);
            }
        }
    }

    let arrival_second = pids.arrivals().get(1);
    if(arrival_second != null) {
        Text.create("arrival_second Number Text")
            .text(arrival_second.routeNumber())
            .pos(31.5, 47)
            .leftAlign()
            .size(13.3, 6)
            .scale(1.3)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_second destination")
            .text(TextUtil.cycleString(arrival_second.destination()))
            .pos(50.5, 47)
            .size(pids.width - 98, 6)
            .scale(1.3)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        let eta = (arrival_second.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = ""} else {if(eta < 9.5) {eta = "0" + Math.round(eta)} else {eta = Math.round(eta)}}

        Text.create("arrival_second ETA")
            .text(eta)
            .color(0xffffff)
            .rightAlign()
            .scale(1)
            .pos(pids.width - 3.5, 39)
            .size(48, 24)
            .scaleXY()
            .draw(ctx);
    }

    let date = new Date;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    Text.create("Clock")
        .text(time)
        .color(0xFFFFFF)
        .pos(pids.width - 4.5, 7)
        .scale(0.9)
        .rightAlign()
        .draw(ctx);
}

function dispose(ctx, state, pids) {
  }