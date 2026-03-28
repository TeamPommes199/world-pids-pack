include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/north_east_line.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let date = new Date;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let time
    if (seconds % 20 < 10) {
        time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')
    } else {
        time = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()
    }

    Text.create("date")
        .text(time)
        .centerAlign()
        .scale(1.5)
        .pos(20, 6.5)
        .color(0xFFFFFF)
        .size(24, 30)
        .stretchXY()
        .draw(ctx);

    let arrival = pids.arrivals().get(0);
    if(arrival != null) {
        Text.create("Next Train")
            .text("Next Train")
            .centerAlign()
            .scale(0.85)
            .pos(pids.width / 2, 28)
            .color(0xFFFFFF)
            .draw(ctx);

        let eta = Math.round((arrival.arrivalTime() - Date.now()) / 60000)
        if (eta < 0.5) {eta = ""} else {eta = eta + " min"}
        Text.create("arrival ETA")
            .text(eta)
            .scale(1.75)
            .color(0xFFFFFF)
            .centerAlign()
            .pos(pids.width / 2, 38)
            .size(pids.width / 1.75, 30)
            .draw(ctx);

        Text.create("arrival")
            .text(arrival.routeNumber() + " " + TextUtil.cycleString(arrival.destination()))
            .centerAlign()
            .scale(1)
            .pos(pids.width / 2, 45)
            .size(pids.width / 1, 30)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);
    }

    for (let i = 0; i < 4; i++) {
        Text.create("row_" + i)
            .text(pids.getCustomMessage(i))
            .scale(0.6)
            .pos(42, 2 + (i * 5.2))
            .color(0xFFFFFF)
            .size(155, 10)
            .stretchXY()
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
  }