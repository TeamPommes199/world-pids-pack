function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/hamburg_u_bahn_1a.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival = pids.arrivals().get(0);
    let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2)];
    if(arrival != null) {
        Text.create("Number Text")
            .text(arrival.routeNumber())
            .centerAlign()
            .pos(16.5, -22.5)
            .size(22, 50)
            .scaleXY()
            .scale(1.41)
            .color(0x000000)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(110, -22.5)
            .size(110, 50)
            .centerAlign()
            .scaleXY()
            .scale(1.41)
            .color(0xa2440f)
            .draw(ctx);

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = "fährt sofort"
        } else if (eta < 1.5 && eta > 0.49) {
            eta = "in " + Math.round(eta) + " Minute"
        } else {
            eta = "in " + Math.round(eta) + " Minuten"
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xa2440f)
            .pos(pids.width - 0.5, 48)
            .size(75, 9)
            .scaleXY()
            .scale(1.41)
            .rightAlign()
            .draw(ctx);

        for (let customMsg of customMsgs) {
            if (customMsg.includes(arrival.routeNumber(), ":")) {
                let customMsg_r = customMsg.replace(arrival.routeNumber() + ":", "")
                Text.create("Custom Text")
                    .text(TextUtil.cycleString(customMsg_r))
                    .size(pids.width / 1.41, 20)
                    .pos(90, 23)
                    .color(0xa2440f)
                    .centerAlign()
                    .scale(1.41)
                    .wrapText()
                    .draw(ctx);
            }
        }
    } else {
        Text.create("not in service")
            .text("BETRIEBSPAUSE")
            .pos(110, -22.5)
            .size(110, 50)
            .centerAlign()
            .scaleXY()
            .scale(1.41)
            .color(0xa2440f)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
}