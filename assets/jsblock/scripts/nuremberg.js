include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/nuremberg.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(2, 14)
        .size(12, 6)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(56, 20)
        .size(74, 10)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        let etas = arrival_first.departureTime()
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
        let deviation = arrival_first.deviation()
        let late_eta = etas - deviation
        late_eta = new Date(late_eta)
        let late_hours = late_eta.getHours()
        let late_minutes = late_eta.getMinutes()
        let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
        Text.create("arrival_first ETA")
        .text(late_time)
        .color(0xFFFFFF)
        .pos(2, 20)
        .size(50, 10)
        .scaleXY()
        .draw(ctx);

        if (deviation > 60000 || deviation < -60000) {
            Texture.create("late_arrival ETA background")
            .texture("jsblock:custom_directory/lrr_u_bahn.png")
            .pos(30, 19)
            .size(22, 10)
            .draw(ctx);
            
            Text.create("late_arrival ETA")
            .text(time)
            .color(0x012f7b)
            .pos(30, 20)
            .size(22, 10)
            .scaleXY()
            .draw(ctx);
        }
    }

    for(let i = 1; i < 4; i++) {
        let rowY = 34.5 + (i*9);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            Text.create("arrival Number Text")
            .text(arrival.routeNumber())
            .centerAlign()
            .pos(60, rowY)
            .size(20, 6)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

            Text.create("arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(82, rowY)
            .size(50, 6)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

            let etas = arrival.departureTime()
            let eta = new Date(etas)
            let hours = eta.getHours()
            let minutes = eta.getMinutes()
            let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            let deviation = arrival.deviation()
            let late_eta = etas - deviation
            late_eta = new Date(late_eta)
            let late_hours = late_eta.getHours()
            let late_minutes = late_eta.getMinutes()
            let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
            Text.create("arrival ETA")
            .text(late_time)
            .color(0xFFFFFF)
            .pos(26, rowY)
            .rightAlign()
            .size(22, 6)
            .scaleXY()
            .draw(ctx);

            if (deviation > 60000 || deviation < -60000) {
                Texture.create("late_arrival ETA background")
                .texture("jsblock:custom_directory/lrr_u_bahn.png")
                .pos(30, rowY - 1)
                .size(16, 7)
                .draw(ctx);

                Text.create("late_arrival ETA")
                .text(time)
                .color(0x012f7b)
                .pos(30.5, rowY)
                .size(15, 6)
                .scaleXY()
                .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {
  }