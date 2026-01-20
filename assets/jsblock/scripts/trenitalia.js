include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/trenitalia.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
            .text(arrival_first.routeNumber().toUpperCase())
            .scale(1.25)
            .color(0xFF6C00)
            .pos(pids.width - 41, 11)
            .size(30, 10)
            .scaleXY()
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()).toUpperCase())
            .scale(1.25)
            .pos(3, 11)
            .size(71, 10)
            .scaleXY()
            .color(0xFF6C00)
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
            .scale(1.25)
            .pos(3, 30.75)
            .size(75, 10)
            .scaleXY()
            .color(0xFF6C00)
            .draw(ctx);
    }

    if (pids.getCustomMessage(3) != "") {
        Text.create("arrival_first ETA")
            .text(pids.getCustomMessage(3).replace("|", " ").toUpperCase())
            .scale(0.675)
            .pos(3, 54)
            .size((pids.width / 0.675) - 13, 10)
            .marquee()
            .color(0xFF6C00)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
}