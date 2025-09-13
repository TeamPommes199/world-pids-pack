function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/hamburg_u_bahn_colored.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival = pids.arrivals().get(0);
    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];
    if(arrival != null) {
        Text.create("Number Text")
        .text(arrival.routeNumber())
        .centerAlign()
        .pos(11, 2.5)
        .size(22, 50)
        .scaleXY()
        .color(0x000000)
        .draw(ctx);

        Text.create("Arrival destination")
        .text(TextUtil.cycleString(arrival.destination()))
        .pos(80, 2.5)
        .size(110, 50)
        .centerAlign()
        .scaleXY()
        .color(0xca204e)
        .draw(ctx);

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = "fährt sofort"} else if (eta < 1.5 && eta > 0.49) {eta = "in " + Math.round(eta) + " Minute"} else {eta = "in " + Math.round(eta) + " Minuten"}
        Text.create("Arrival ETA")
        .text(eta)
        .color(0x506823)
        .pos(pids.width - 0.5, 60)
        .size(75, 9)
        .scaleXY()
        .rightAlign()
        .draw(ctx);

        for(let customMsg of customMsgs) {
            if(customMsg.includes(arrival.routeNumber(), ":")) {
              let customMsg_r = customMsg.replace(arrival.routeNumber() + ":", "") 
              Text.create("Custom Text")
              .text(TextUtil.cycleString(customMsg_r))
              .size(pids.width, 20)
              .pos(65, 37)
              .color(0xe43319)
              .centerAlign()
              .wrapText()
              .draw(ctx);
            }
        }
    } else {
        Text.create("not in service")
            .text("BETRIEBSPAUSE")
            .pos(80, 2.5)
            .size(110, 50)
            .centerAlign()
            .scaleXY()
            .color(0xa2440f)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
}