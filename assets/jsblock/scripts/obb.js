include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/obb.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(0.5, 20)
        .leftAlign()
        .size(12, 6)
        .scale(1.55)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(0.5, 30)
        .size(45, 6)
        .scale(1.3)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        if(arrival_first.terminating() == true) {
            Text.create("an")
            .text("|←     an")
            .color(0xffffff)
            .rightAlign()
            .scale(0.8)
            .pos(pids.width - 0.5, 26)
            .size(48, 24)
            .draw(ctx);
        } else {
            Text.create("ab")
            .text("|→     ab")
            .color(0xffffff)
            .rightAlign()
            .scale(0.8)
            .pos(pids.width - 0.5, 26)
            .size(48, 24)
            .draw(ctx);
        }

        let etas = arrival_first.departureTime()
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');

        Text.create("arrival ETA")
        .text(time)
        .color(0xffffff)
        .rightAlign()
        .scale(1.2)
        .pos(pids.width - 3, 26)
        .size(48, 24)
        .scaleXY()
        .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }