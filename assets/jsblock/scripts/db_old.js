include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/db_old.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(pids.width - 0.5, 20)
        .rightAlign()
        .size(12, 6)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(30, 24)
        .size(74, 10)
        .scaleXY()
        .color(0xFFFFFF)
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
        .color(0xFFFFFF)
        .rightAlign()
        .scale(1.25)
        .pos(pids.width, 9)
        .size(48, 24)
        .draw(ctx);

        if (deviation > 270000) {
            Texture.create("late_arrival ETA background")
            .texture("jsblock:custom_directory/lrr_u_bahn.png")
            .pos(27, 8)
            .size(pids.width - 65, 6)
            .draw(ctx);
            
            deviation = deviation / 60000
            deviation = Math.round(deviation)

            Text.create("late_arrival ETA")
            .text("     Verspätung ca. "+ deviation + " Min.     ")
            .color(0x000000)
            .pos(28, 9)
            .scale(0.5)
            .size(pids.width, 4)
            .marquee()
            .draw(ctx);
        }
    }

    for(let i = 1; i < 3; i++) {
        let rowY = 31 + (i*13);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            Text.create("arrival Number Text")
            .text(arrival.routeNumber())
            .pos(48, rowY)
            .size(20, 12)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

            Text.create("arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(70, rowY)
            .size(60, 12)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

            let etas = arrival.departureTime()
            let deviation = arrival.deviation()
            let late_eta = etas - deviation
            late_eta = new Date(late_eta)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
            Text.create("arrival ETA")
            .text(late_time)
            .color(0xFFFFFF)
            .pos(1, rowY)
            .leftAlign()
            .size(33, 12)
            .scaleXY()
            .draw(ctx);

            if (deviation > 270000) {
                Texture.create("late_arrival ETA background")
                .texture("jsblock:custom_directory/lrr_u_bahn.png")
                .pos(30, rowY - 1)
                .size(18, 14)
                .draw(ctx);

                deviation = deviation / 60000
                deviation = Math.round(deviation)

                Text.create("late_arrival ETA")
                .text("+" + deviation)
                .color(0x012f7b)
                .pos(30.5, rowY)
                .size(16, 12)
                .scaleXY()
                .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {
  }