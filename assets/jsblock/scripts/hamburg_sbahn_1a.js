include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:assets/hamburg_s_bahn/hamburg_1a.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
    customMsgs = customMsgs.split(';');
    customMsgs = customMsgs.map(item => item.trim());

    let arrival_first = pids.arrivals().get(0);
    let arrival_s = pids.arrivals().get(1);
    let arrival_t = pids.arrivals().get(2);
    if (arrival_first != null) {
        Texture.create("arrival_first Circle Colored Full")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(1, 10)
            .size(18, 7)
            .draw(ctx);

        Texture.create("arrival_first Circle Colored")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(1.25, 10.3)
            .size(17.5, 6.4)
            .color(arrival_first.routeColor())
            .draw(ctx);

        Text.create("arrival_first Number Text")
            .text(arrival_first.routeNumber())
            .centerAlign()
            .pos(10.25, 11)
            .size(17, 6.2)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .pos(22, 9.5)
            .size(50, 7)
            .scaleXY()
            .scale(1.6)
            .color(0xFFFFFF)
            .draw(ctx);

        let car_length = arrival_first.carCount();
        if (car_length > 3 && car_length < 7) {
            if (customMsgs.includes("icon: rear")) {
                Texture.create("Car length")
                    .texture("jsblock:assets/hamburg_s_bahn/hamburg_2_rear.png")
                    .pos(50, 33)
                    .size(50, 10)
                    .draw(ctx);
            } else {
                Texture.create("Car length")
                    .texture("jsblock:assets/hamburg_s_bahn/hamburg_2_front.png")
                    .pos(50, 33)
                    .size(50, 10)
                    .draw(ctx);
            }
        } else if (car_length > 6) {
            Texture.create("Car length")
                .texture("jsblock:assets/hamburg_s_bahn/hamburg_3.png")
                .pos(50, 33)
                .size(50, 10)
                .draw(ctx);
        } else if (car_length < 4) {
            if (customMsgs.includes("icon: rear")) {
                Texture.create("Car length")
                    .texture("jsblock:assets/hamburg_s_bahn/hamburg_1_rear.png")
                    .pos(50, 33)
                    .size(50, 10)
                    .draw(ctx);
            } else {
                Texture.create("Car length")
                    .texture("jsblock:assets/hamburg_s_bahn/hamburg_1_front.png")
                    .pos(50, 33)
                    .size(50, 10)
                    .draw(ctx);
            }
        }

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = "sofort"
        } else {
            eta = Math.round(eta);
            eta = eta + " Min"
        }
        Text.create("arrival_first ETA")
            .text(eta)
            .color(0xFFFFFF)
            .scale(1.4)
            .pos(22, 20)
            .size(30, 5)
            .scaleXY()
            .draw(ctx);
    }


    if (arrival_s != null) {
        Texture.create("arrival_s Circle Colored Full")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(110, 13)
            .size(15, 5.5)
            .draw(ctx);

        Texture.create("arrival_s Circle Colored")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(110.25, 13.15)
            .size(14.5, 5.2)
            .color(arrival_s.routeColor())
            .draw(ctx);

        Text.create("arrival_s Number Text")
            .text(arrival_s.routeNumber())
            .centerAlign()
            .pos(117.75, 13.65)
            .size(14, 4.7)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_s destination")
            .text(TextUtil.cycleString(arrival_s.destination()))
            .pos(127, 12)
            .size(28, 7)
            .scaleXY()
            .scale(1.3)
            .color(0xFFFFFF)
            .draw(ctx);

        let eta = (arrival_s.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = "sofort"
        } else {
            eta = Math.round(eta);
            eta = eta + " Min"
        }
        Text.create("arrival_s ETA")
            .text(eta)
            .color(0xFFFFFF)
            .scale(1.1)
            .pos(pids.width - 1.5, 13.5)
            .size(15, 5)
            .rightAlign()
            .scaleXY()
            .draw(ctx);
    }


    if (arrival_t != null) {
        Texture.create("arrival_t Circle Colored Full")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(110, 41)
            .size(15, 5.5)
            .draw(ctx);

        Texture.create("arrival_t Circle Colored")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(110.25, 41.15)
            .size(14.5, 5.2)
            .color(arrival_t.routeColor())
            .draw(ctx);

        Text.create("arrival_t Number Text")
            .text(arrival_t.routeNumber())
            .centerAlign()
            .pos(117.75, 41.65)
            .size(14, 4.7)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_t destination")
            .text(TextUtil.cycleString(arrival_t.destination()))
            .pos(127, 40)
            .size(28, 7)
            .scaleXY()
            .scale(1.3)
            .color(0xFFFFFF)
            .draw(ctx);

        let eta = (arrival_t.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = "sofort"
        } else {
            eta = Math.round(eta);
            eta = eta + " Min"
        }
        Text.create("arrival_t ETA")
            .text(eta)
            .color(0xFFFFFF)
            .scale(1.1)
            .pos(pids.width - 1.5, 41.5)
            .size(15, 5)
            .rightAlign()
            .scaleXY()
            .draw(ctx);
    }

    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let time = hours + ":" + minutes + " Uhr"

    Text.create("Clock")
        .text(time)
        .color(0xFFFFFF)
        .pos(pids.width - 1.5, 1)
        .scale(0.35)
        .rightAlign()
        .draw(ctx);
}

function dispose(ctx, state, pids) {
  }