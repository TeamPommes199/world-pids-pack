include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/obb_2022.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(22, 18.5)
        .leftAlign()
        .size(12, 6)
        .scale(1.55)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(2, 28.5)
        .size(75, 6)
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
        .pos(pids.width - 1, 20)
        .size(48, 24)
        .scaleXY()
        .draw(ctx);
    }

    let arrival_second = pids.arrivals().get(1);
    if(arrival_second != null) {
        Text.create("arrival_second Number Text")
            .text(arrival_second.routeNumber())
            .pos(22, 51)
            .leftAlign()
            .size(12, 6)
            .scale(1.3)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_second destination")
            .text(TextUtil.cycleString(arrival_second.destination()))
            .pos(42, 51)
            .size(60, 6)
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
            .pos(pids.width - 1, 43)
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
        .pos(pids.width - 2, 18.5)
        .scale(0.9)
        .rightAlign()
        .draw(ctx);
}

function dispose(ctx, state, pids) {
  }