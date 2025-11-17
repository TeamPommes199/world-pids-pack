include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/hamburg_bus_tram.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    if (pids.station() != null) {
        Text.create("station name")
            .text(pids.station().getName().replace("|", " "))
            .pos(13.5, 2)
            .size(pids.width - 24, 12)
            .scaleXY()
            .color(0xffffff)
            .scale(1)
            .draw(ctx);
    }

    for (let i = 0; i < 4; i++) {
        let arrival = pids.arrivals().get(i);
        if (arrival != null) {
            let rowY = 25 + (10 * i)

            Text.create("arrival routeNumber")
                .text(arrival.routeNumber())
                .pos(29, rowY)
                .size(17, 12)
                .scaleXY()
                .rightAlign()
                .color(0xff8c00)
                .scale(0.88)
                .draw(ctx);

            Text.create("arrival destination")
                .text(TextUtil.cycleString(arrival.destination()))
                .pos(32, rowY + 1.85)
                .size(pids.width - 48, 12)
                .scaleXY()
                .color(0xff8c00)
                .scale(0.66)
                .draw(ctx);

            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            if (eta < 0.5) {
                eta = "sofort"
            } else {
                eta = Math.round(eta) + " min"
            }
            Text.create("arrival ETA")
                .text(eta)
                .color(0xff8c00)
                .pos(pids.width - 13, rowY)
                .size(48, 12)
                .scaleXY()
                .rightAlign()
                .scale(0.88)
                .draw(ctx);
        }
    }
}

function dispose(ctx, state, pids) {
}