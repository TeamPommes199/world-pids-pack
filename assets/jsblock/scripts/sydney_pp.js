include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    let date = new Date;
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hour = date.getHours();

    Texture.create("Background")
        .texture("jsblock:assets/sydney.png")
        .pos(0, 15)
        .size(pids.width, pids.height - 30)
        .draw(ctx);

    Text.create("Clock")
        .text(hour + ":" + minutes + ":" + seconds)
        .color(0xFFFFFF)
        .pos(pids.width - 1, 20.5)
        .scale(0.3)
        .rightAlign()
        .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    let arrival_second = pids.arrivals().get(1);
    let arrival_third = pids.arrivals().get(2);
    if (arrival_first != null) {
        Texture.create("arrival_first Circle Colored")
            .texture("jsblock:assets/general/quad.png")
            .pos(4.5, 24.5)
            .size(6, 6)
            .color(arrival_first.routeColor())
            .draw(ctx);

        Text.create("arrival_first Number Text")
            .text(arrival_first.routeNumber())
            .pos(7.5, 25.35)
            .centerAlign()
            .size(5.6, 5.6)
            .scale(0.8)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .pos(11.5, 25)
            .size(50, 5)
            .scale(0.8)
            .scaleXY()
            .color(0x000000)
            .draw(ctx);

        Text.create("Platform Track")
            .text(arrival_first.platformName())
            .pos(60, 26.5)
            .size(9, 6)
            .scaleXY()
            .centerAlign()
            .scale(0.8)
            .color(0xFF5B00)
            .draw(ctx);

        if (pids.station() && arrival_first.route()) {
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let stops = arrival_first.route().getPlatforms().toArray().map(p => p.stationName);
            let currentIndex = stops.findIndex(s => s.normalize("NFC").trim() === stationClean);
            let nextStops = stops.slice(currentIndex + 1);
            let displayStops = [];

            if (nextStops.length <= 6) {
                displayStops = nextStops;
            } else {
                let step = (nextStops.length - 1) / 5;
                for (let i = 0; i < 5; i++) {
                    let index = Math.round(i * step);
                    displayStops.push(nextStops[index].replace("|", " "));
                }
                displayStops.push(nextStops[nextStops.length - 1]);
            }

            for (let line = 0; line < displayStops.length; line++) {
                let stop = displayStops[line].normalize("NFC").trim().replace("|", " ");

                Text.create("stop_line_" + line)
                    .text(stop)
                    .pos(4.5, 32 + 4 * line)
                    .size(52, 5)
                    .scaleXY()
                    .scale(0.8)
                    .color(0x000000)
                    .draw(ctx);
            }
        }

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = ""
        } else {
            eta = Math.round(eta) + " min"
            Text.create("Arrival Departs")
                .text("Departs")
                .color(0x000000)
                .pos(62, 49)
                .scale(0.2)
                .size(30, 9)
                .scaleXY()
                .rightAlign()
                .draw(ctx);
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xFF5B00)
            .pos(62, 51)
            .scale(0.55)
            .size(30, 9)
            .scaleXY()
            .rightAlign()
            .draw(ctx);

        let car_length = arrival_first.carCount() + " carriages";
        Text.create("arrival_first carriages")
            .text(car_length)
            .pos(51.35, 32.75)
            .size(18, 2)
            .scale(0.8)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);
    }


    if (arrival_second != null) {
        Texture.create("arrival_second Circle Colored")
            .texture("jsblock:assets/general/quad.png")
            .pos(73, 24.5)
            .size(6, 6)
            .color(arrival_second.routeColor())
            .draw(ctx);

        Text.create("arrival_second Number Text")
            .text(arrival_second.routeNumber())
            .pos(76, 25.35)
            .centerAlign()
            .size(5.5, 5.5)
            .scale(0.8)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_second destination")
            .text(TextUtil.cycleString(arrival_second.destination()))
            .pos(80, 25)
            .size(50, 5)
            .scale(0.8)
            .scaleXY()
            .color(0x000000)
            .draw(ctx);

        Text.create("Platform Track")
            .text(arrival_second.platformName())
            .pos(130.5, 26.5)
            .size(9, 6)
            .scaleXY()
            .centerAlign()
            .scale(0.8)
            .color(0xFF5B00)
            .draw(ctx);

        let eta = (arrival_second.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = ""
        } else {
            eta = Math.round(eta) + " min"
            Text.create("Arrival Departs")
                .text("Departs")
                .color(0x000000)
                .pos(133.5, 32.5)
                .scale(0.2)
                .size(30, 9) // <----
                .scaleXY() // <----
                .rightAlign()
                .draw(ctx);
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xFF5B00)
            .pos(133.5, 34.5)
            .scale(0.55)
            .size(30, 9)
            .scaleXY()
            .rightAlign()
            .draw(ctx);

        let car_length = arrival_second.carCount() + " carriages";
        Text.create("arrival_second carriages")
            .text(car_length)
            .pos(73.3, 32.25)
            .size(18, 2)
            .scale(0.8)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);
    }


    if (arrival_third != null) {
        Texture.create("arrival_third Circle Colored")
            .texture("jsblock:assets/general/quad.png")
            .pos(73, 40.5)
            .size(6, 6)
            .color(arrival_third.routeColor())
            .draw(ctx);

        Text.create("arrival_third Number Text")
            .text(arrival_third.routeNumber())
            .pos(76, 41.35)
            .centerAlign()
            .size(5.5, 5.5)
            .scale(0.8)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_third destination")
            .text(TextUtil.cycleString(arrival_third.destination()))
            .pos(80, 41)
            .size(50, 5)
            .scale(0.8)
            .scaleXY()
            .color(0x000000)
            .draw(ctx);

        Text.create("Platform Track")
            .text(arrival_third.platformName())
            .pos(130.5, 42.5)
            .size(9, 6)
            .scaleXY()
            .centerAlign()
            .scale(0.8)
            .color(0xFF5B00)
            .draw(ctx);

        let eta = (arrival_third.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
            eta = ""
        } else {
            eta = Math.round(eta) + " min"
            Text.create("Arrival Departs")
                .text("Departs")
                .color(0x000000)
                .pos(133.5, 48.5)
                .scale(0.2)
                .size(30, 9) // <----
                .scaleXY() // <----
                .rightAlign()
                .draw(ctx);
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xFF5B00)
            .pos(133.5, 50.5)
            .scale(0.55)
            .size(30, 9)
            .scaleXY()
            .rightAlign()
            .draw(ctx);

        let car_length = arrival_third.carCount() + " carriages";
        Text.create("arrival_third carriages")
            .text(car_length)
            .pos(73.3, 48.5)
            .size(18, 2)
            .scale(0.8)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);
    }
}

function dispose(ctx, state, pids) {
}