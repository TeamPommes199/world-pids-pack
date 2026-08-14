include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:assets/general/dark_grey.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    for (let i = 0; i < 8; i++) {
        let rowY = pids.height / 8.2 * i + 2;
        let arrival = pids.arrivals().get(i);
        if (arrival != null) {
            Text.create("routeNumber")
                .text(arrival.routeNumber())
                .pos(17, rowY)
                .size(15 / 0.8, 10)
                .scaleXY()
                .scale(0.8)
                .rightAlign()
                .color(0xeeeeee)
                .draw(ctx);

            Text.create("destination")
                .text(TextUtil.cycleString(arrival.destination()))
                .pos(21, rowY)
                .size(pids.width - 42 / 0.8, 10)
                .scaleXY()
                .scale(0.8)
                .color(0xeeeeee)
                .draw(ctx);

            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            if(eta < 0.5) {eta = ""} else {eta = Math.round(eta)}
            Text.create("arrivalTime")
                .text(eta)
                .pos(pids.width, rowY)
                .size(15 / 0.8, 10)
                .scaleXY()
                .scale(0.8)
                .rightAlign()
                .color(0xeeeeee)
                .draw(ctx);

        }
    }
}

function dispose(ctx, state, pids) {}