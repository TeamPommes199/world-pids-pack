include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:assets/general/black.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let posYSpacing = 2
    if (pids.arrivals().get(1) != null) {
        posYSpacing = 1.5
    }
    if (pids.arrivals().get(2) != null) {
        posYSpacing = 1
    }

    let arrival_first = pids.arrivals().get(0);
    if (arrival_first != null) {
        Text.create("arrival_first Number Text")
            .text(arrival_first.routeNumber() + ", " + arrival_first.carCount() + " carriages")
            .pos(3.5, 18 + posYSpacing)
            .leftAlign()
            .size(pids.width / 0.6, 24)
            .scale(0.5)
            .scaleXY()
            .color(0xffdd00)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .pos(35, 13.5)
            .size(85, 24)
            .marquee(12)
            .color(0xFFFFFF)
            .draw(ctx);

        let etas = arrival_first.departureTime()
        let deviation = arrival_first.deviation()
        let late_eta = etas - deviation
        late_eta = new Date(late_eta)
        let late_hours = late_eta.getHours()
        let late_minutes = late_eta.getMinutes()
        let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');

        Text.create("arrival ETA")
            .text(late_time)
            .color(0xffffff)
            .pos(3.5, 6)
            .size(48, 24)
            .scaleXY()
            .draw(ctx);

        if (deviation < 60000) {
            Texture.create("on_time_background")
                .texture("jsblock:assets/blackbox_landscape_lcd/on_time.png")
                .pos(pids.width - 55, 14)
                .size(55, 7)
                .draw(ctx);

            Text.create("on_time")
                .text("On time")
                .pos(pids.width - 28.5, 15.5)
                .size(55, 5)
                .centerAlign()
                .scaleXY()
                .color(0x000000)
                .draw(ctx)
        } else {
            Texture.create("delayed_background")
                .texture("jsblock:assets/blackbox_landscape_lcd/delayed.png")
                .pos(pids.width - 55, 14)
                .size(55, 7)
                .draw(ctx);

            Text.create("delayed")
                .text("Exp " + time)
                .pos(pids.width - 28.5, 15.5)
                .size(55, 5)
                .centerAlign()
                .scaleXY()
                .color(0xFFFFFF)
                .draw(ctx)
        }

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1
            let stop_text = ""

            for (i = i; i < stops.length; i++) {
                stop_text += stops[i].replace("|", " ")
                if (i !== stops.length - 1) {
                    stop_text += ", "
                }
            }
            Text.create("arrival_first stops")
                .text(stop_text)
                .pos(3.5, 30)
                .size(pids.width / 0.8 - 14, 10)
                .scale(0.8)
                .marquee(12)
                .color(0xFFFFFF)
                .draw(ctx);
        }
    }

    let arrivalList = []
    if (pids.arrivals().get(2) != null) {
        arrivalList = [pids.arrivals().get(2), pids.arrivals().get(1)]
    } else if (pids.arrivals().get(1) != null) {
        arrivalList = [pids.arrivals().get(1)]
    }

    for (let i = 0; i < arrivalList.length; i++) {
        let posY = pids.height - (i + 1) * 11.5
        Texture.create("delayed_background")
            .texture("jsblock:assets/blackbox_landscape_lcd/after_arrival.png")
            .pos(3, posY)
            .size(pids.width - 6, 10)
            .draw(ctx);

        let etas = arrivalList[i].departureTime()
        let deviation = arrivalList[i].deviation()
        let late_eta = etas - deviation
        late_eta = new Date(late_eta)
        let late_hours = late_eta.getHours()
        let late_minutes = late_eta.getMinutes()
        let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');

        Text.create("arrival ETA")
            .text(late_time)
            .pos(35, posY + 2.5)
            .size(pids.width, 10)
            .scale(0.65)
            .scaleXY()
            .color(0xffdd00)
            .draw(ctx);

        Text.create("arrival destination")
            .text(TextUtil.cycleString(arrivalList[i].destination()))
            .pos(60, posY + 2.5)
            .size(pids.width - 60, 10)
            .scale(0.65)
            .scaleXY()
            .color(0xffdd00)
            .draw(ctx);

        if (deviation < 60000) {
            Text.create("on_time")
                .text("On time")
                .pos(pids.width - 28, posY + 2.5)
                .size(pids.width, 10)
                .scale(0.65)
                .scaleXY()
                .centerAlign()
                .color(0xcccccc)
                .draw(ctx)
        } else {
            Text.create("delayed")
                .text("Exp " + time)
                .pos(pids.width - 28, posY + 2.5)
                .size(pids.width, 10)
                .scale(0.65)
                .scaleXY()
                .centerAlign()
                .color(0xcccccc)
                .draw(ctx)
        }
    }

    if (arrivalList.length === 2) {
        Text.create("3rd")
            .text("3rd")
            .pos(5, pids.height - 9)
            .size(pids.width, 10)
            .scale(0.65)
            .scaleXY()
            .color(0xffdd00)
            .draw(ctx);

        Text.create("2nd")
            .text("2nd")
            .pos(5, pids.height - 20.5)
            .size(pids.width, 10)
            .scale(0.65)
            .scaleXY()
            .color(0xffdd00)
            .draw(ctx);
    } else if (arrivalList.length === 1) {
        Text.create("2nd")
            .text("2nd")
            .pos(5, pids.height - 9)
            .size(pids.width, 10)
            .scale(0.65)
            .scaleXY()
            .color(0xffdd00)
            .draw(ctx);
    }

    let date = new Date;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    Text.create("Clock")
        .text(time)
        .color(0xFFDD00)
        .pos(pids.width - 3.5, 3)
        .scale(0.9)
        .rightAlign()
        .draw(ctx);

    if (pids.station() != null) {
        if (pids.arrivals().get(0) != null) {
            Text.create("station name")
                .pos(15, 3)
                .text("Platform " + pids.arrivals().get(0).platformName())
                .color(0xFFFFFF)
                .pos(3.5, 3)
                .scale(0.9)
                .draw(ctx)
        }
    }
}

function dispose(ctx, state, pids) {}