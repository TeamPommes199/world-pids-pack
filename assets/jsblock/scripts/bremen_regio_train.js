include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/dot_matrix_1a.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .pos(65, 12)
            .size(75, 12)
            .scale(1.2)
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
            .color(0xffffff)
            .scale(1.2)
            .pos(1, 12)
            .size(48, 12)
            .scaleXY()
            .draw(ctx);

        if (deviation > 120000 || deviation < -120000) {
            Texture.create("late_arrival ETA background")
                .texture("jsblock:custom_directory/lrr_u_bahn.png")
                .pos(34, 12)
                .size(27, 14.4)
                .draw(ctx);

            Text.create("late_arrival ETA")
                .text("+" + Math.round(deviation / 60000))
                .color(0x000000)
                .pos(40, 13.2)
                .size(48, 10)
                .scale(1.2)
                .scaleXY()
                .draw(ctx);
        }

        Text.create("arrival_first Platform")
            .text(arrival_first.platformName())
            .color(0xffffff)
            .scale(1.2)
            .pos(pids.width - 1, 12)
            .rightAlign()
            .size(24, 12)
            .scaleXY()
            .draw(ctx);
    }

    let arrival_second = pids.arrivals().get(1);
    if(arrival_second != null) {
        Text.create("arrival_second destination")
            .text(TextUtil.cycleString(arrival_second.destination()))
            .pos(65, 26)
            .size(75, 12)
            .scale(1.2)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        let etas = arrival_second.departureTime()
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
        let deviation = arrival_second.deviation()
        let late_eta = etas - deviation
        late_eta = new Date(late_eta)
        let late_hours = late_eta.getHours()
        let late_minutes = late_eta.getMinutes()
        let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');

        Text.create("arrival_second ETA")
            .text(late_time)
            .color(0xffffff)
            .scale(1.2)
            .pos(1, 26)
            .size(48, 12)
            .scaleXY()
            .draw(ctx);

        if (deviation > 120000 || deviation < -120000) {
            Texture.create("late_arrival ETA background")
                .texture("jsblock:custom_directory/lrr_u_bahn.png")
                .pos(34, 26)
                .size(27, 14.4)
                .draw(ctx);

            Text.create("late_arrival ETA")
                .text("+" + Math.round(deviation / 60000))
                .color(0x000000)
                .pos(40, 27.2)
                .size(48, 10)
                .scale(1.2)
                .scaleXY()
                .draw(ctx);
        }

        Text.create("arrival_second Platform")
            .text(arrival_second.platformName())
            .color(0xffffff)
            .scale(1.2)
            .pos(pids.width - 1, 26)
            .rightAlign()
            .size(24, 12)
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
        .pos(pids.width / 2, 40)
        .scale(1.2)
        .centerAlign()
        .draw(ctx);
}

function dispose(ctx, state, pids) {
  }