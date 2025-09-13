include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/hamburg.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    let arrival_first = pids.arrivals().get(0);
    let arrival_s = pids.arrivals().get(1);
    let arrival_t = pids.arrivals().get(2);
    if(arrival_first != null) {
        Texture.create("arrival_first Circle Colored Full")
        .texture("jsblock:custom_directory/lrr_full.png")
        .pos(1, 26)
        .size(15, 5)
        .draw(ctx);

        Texture.create("arrival_first Circle Colored")
        .texture("jsblock:custom_directory/lrr.png")
        .pos(1.25, 26.15)
        .size(14.5, 4.7)
        .color(arrival_first.routeColor())
        .draw(ctx);

        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .centerAlign()
        .pos(8.75, 26.65)
        .size(14, 4.2)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(18, 24)
        .size(33, 7)
        .scaleXY()
        .scale(1.6)
        .color(0xFFFFFF)
        .draw(ctx);

        let car_length = arrival_first.carCount();
        if (car_length > 3 && car_length < 7) {
            if (customMsgs.includes("icon: rear")) {
                Texture.create("Car length")
                    .texture("jsblock:custom_directory/hamburg_2_rear.png")
                    .pos(32, 46)
                    .size(40, 8)
                    .draw(ctx);
            } else {
                Texture.create("Car length")
                    .texture("jsblock:custom_directory/hamburg_2_front.png")
                    .pos(32, 46)
                    .size(40, 8)
                    .draw(ctx);
            }
        } else if (car_length > 6) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/hamburg_3.png")
            .pos(32, 46)
            .size(40, 8)
            .draw(ctx);
        } else if (car_length < 4) {
            if (customMsgs.includes("icon: rear")) {
                Texture.create("Car length")
                    .texture("jsblock:custom_directory/hamburg_1_rear.png")
                    .pos(32, 46)
                    .size(40, 8)
                    .draw(ctx);
            } else {
                Texture.create("Car length")
                    .texture("jsblock:custom_directory/hamburg_1_front.png")
                    .pos(32, 46)
                    .size(40, 8)
                    .draw(ctx);
            }
        }

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = "sofort"} else {eta = Math.round(eta); eta = eta + " Min"}
        Text.create("arrival_first ETA")
        .text(eta)
        .color(0xFFFFFF)
        .scale(1.4)
        .pos(16, 36)
        .size(30, 5)
        .scaleXY()
        .draw(ctx);
    }


    if(arrival_s != null) {
        Texture.create("arrival_s Circle Colored Full")
        .texture("jsblock:custom_directory/lrr_full.png")
        .pos(77, 28)
        .size(15, 5)
        .draw(ctx);

        Texture.create("arrival_s Circle Colored")
        .texture("jsblock:custom_directory/lrr.png")
        .pos(77.25, 28.15)
        .size(14.5, 4.7)
        .color(arrival_s.routeColor())
        .draw(ctx);

        Text.create("arrival_s Number Text")
        .text(arrival_s.routeNumber())
        .centerAlign()
        .pos(84.75, 28.65)
        .size(14, 4.2)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_s destination")
        .text(TextUtil.cycleString(arrival_s.destination()))
        .pos(94, 27)
        .size(22, 7)
        .scaleXY()
        .scale(1.3)
        .color(0xFFFFFF)
        .draw(ctx);

        let eta = (arrival_s.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = "sofort"} else {eta = Math.round(eta); eta = eta + " Min"}
        Text.create("arrival_s ETA")
        .text(eta)
        .color(0xFFFFFF)
        .scale(0.8)
        .pos(135, 29)
        .size(13, 5)
        .rightAlign()
        .scaleXY()
        .draw(ctx);
    }


    if(arrival_t != null) {
        Texture.create("arrival_t Circle Colored Full")
        .texture("jsblock:custom_directory/lrr_full.png")
        .pos(77, 53)
        .size(15, 5)
        .draw(ctx);

        Texture.create("arrival_t Circle Colored")
        .texture("jsblock:custom_directory/lrr.png")
        .pos(77.25, 53.15)
        .size(14.5, 4.7)
        .color(arrival_t.routeColor())
        .draw(ctx);

        Text.create("arrival_t Number Text")
        .text(arrival_t.routeNumber())
        .centerAlign()
        .pos(84.75, 53.65)
        .size(14, 4.2)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_t destination")
        .text(TextUtil.cycleString(arrival_t.destination()))
        .pos(94, 52)
        .size(22, 7)
        .scaleXY()
        .scale(1.3)
        .color(0xFFFFFF)
        .draw(ctx);

        let eta = (arrival_t.arrivalTime() - Date.now()) / 60000;
        if(eta < 0.5) {eta = "sofort"} else {eta = Math.round(eta); eta = eta + " Min"}
        Text.create("arrival_t ETA")
        .text(eta)
        .color(0xFFFFFF)
        .scale(0.8)
        .pos(135, 54)
        .size(13, 5)
        .rightAlign()
        .scaleXY()
        .draw(ctx);
    }

    Text.create("Clock")
    .text(PIDSUtil.formatTime(MinecraftClient.worldDayTime(), true) + " Uhr")
    .color(0xFFFFFF)
    .pos(pids.width - 2.5, 2)
    .scale(0.4)
    .rightAlign()
    .draw(ctx);
}

function dispose(ctx, state, pids) {
  }