include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    let page = 1
    let pageMsg = customMsgs.find(item => item.includes("page:"))
    if (pageMsg) {
        page = pageMsg.replace("page:", "")
        if (page < 1) {page = 1}
    }

    let showEtaMsg = customMsgs.find(item => item.includes("show_minutes"))
    let show_minutes = false
    if (showEtaMsg) {
        show_minutes = true
    }

    Texture.create("Background")
    .texture("jsblock:custom_directory/dot_matrix_1a.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let x = 0
    for (let i = 2 * (page - 1); i < 2 * page; i++) {
        let rowY
        if (pids.getCustomMessage(2) == "") {
            rowY = 12 + 14 * x
        } else {
            rowY = 18 + 14 * x
        }

        x++
        let arrival = pids.arrivals().get(i);
        if (arrival != null) {
            Text.create("arrival destination")
                .text(TextUtil.cycleString(arrival.destination()))
                .pos(65, rowY)
                .size(75, 12)
                .scale(1.2)
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

            if (show_minutes) {
                late_time = Math.round((arrival.arrivalTime() - Date.now()) / 60000) + " min"
            }

            Text.create("arrival ETA")
                .text(late_time)
                .color(0xffffff)
                .scale(1.2)
                .pos(1, rowY)
                .size(48, 12)
                .scaleXY()
                .draw(ctx);

            if (!show_minutes) {
                if (deviation > 120000 || deviation < -120000) {
                    Texture.create("late_arrival ETA background")
                        .texture("jsblock:custom_directory/lrr_u_bahn.png")
                        .pos(34, rowY)
                        .size(27, 14.4)
                        .draw(ctx);

                    Text.create("late_arrival ETA")
                        .text("+" + Math.round(deviation / 60000))
                        .color(0x000000)
                        .pos(40, rowY + 1.2)
                        .size(48, 10)
                        .scale(1.2)
                        .scaleXY()
                        .draw(ctx);
                }
            }

            Text.create("arrival Platform")
                .text(arrival.platformName())
                .color(0xffffff)
                .scale(1.2)
                .pos(pids.width - 1, rowY)
                .rightAlign()
                .size(24, 12)
                .scaleXY()
                .draw(ctx);
        }
    }

    let date = new Date;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (pids.getCustomMessage(2) == "") {
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
        Text.create("Clock")
            .text(time)
            .color(0xFFFFFF)
            .pos(pids.width / 2, 40)
            .scale(1.2)
            .centerAlign()
            .draw(ctx);
    } else {
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')
        Text.create("Clock")
            .text(time)
            .color(0xFFFFFF)
            .pos(pids.width - 1, 6)
            .scale(1.2)
            .rightAlign()
            .draw(ctx);

        Text.create("custom message")
            .text(pids.getCustomMessage(2))
            .color(0xFFFFFF)
            .pos(1, 6)
            .size(pids.width - 70, 10)
            .scale(1.2)
            .marquee()
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }