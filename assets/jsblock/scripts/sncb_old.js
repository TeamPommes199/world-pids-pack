include(Resources.id("jsblock:scripts/pids_util.js"));
let counter = {}

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/sncb_old.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let msg = true
    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        let text = TextUtil.cycleString(arrival_first.destination());
        text = String(text);

        let xOffset = 0
        let posX = 4.7

        for (let i = 0; i < text.length; i++) {
            if (text[i].toUpperCase() === 'I') {
                xOffset += 1.15

                Text.create("arrival_first destination " + i)
                    .text(text[i])
                    .pos(posX + xOffset, 1.5)
                    .scale(1.35)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 7.3
            } else {
                Text.create("arrival_first destination " + i)
                    .text(text[i])
                    .pos(posX + xOffset, 1.5)
                    .scale(1.35)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 8.45
            }
        }

        if (pids.station() && arrival_first.route()) {
            let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stops_at = ""
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

            if (stops[i] != null && stops[i] != arrival_first.destination()) {
                stops_at = stops[i].replace("|", "")
                stops_at = String(stops_at)
            }

            let xOffset = 0
            let posX = (133 - 1.25) - (stops_at.length * 8.45)
            for (let i = 0; i < stops_at.length; i++) {
                if (stops_at[i].toUpperCase() === 'I') {
                    xOffset += 1.15

                    Text.create("arrival_first stop " + i)
                        .text(stops_at[i])
                        .pos(posX + xOffset, 17.5)
                        .scale(1.35)
                        .color(0xEFDB0B)
                        .draw(ctx);

                    xOffset += 7.3
                } else {
                    Text.create("arrival_first stop " + i)
                        .text(stops_at[i])
                        .pos(posX + xOffset, 17.5)
                        .scale(1.35)
                        .color(0xEFDB0B)
                        .draw(ctx);

                    xOffset += 8.45
                }
            }
        }

        let routeNumber = String(arrival_first.routeNumber())
        xOffset = 0
        posX = (133 - 1.25) - (routeNumber.length * 8.45)
        for (let i = 0; i < routeNumber.length; i++) {
            Text.create("departure eta")
                .text(routeNumber[i])
                .pos(posX + xOffset, 33.5)
                .scale(1.35)
                .color(0xEFDB0B)
                .draw(ctx);

            xOffset += 8.45
        }

        let etas = arrival_first.departureTime()
        let deviation = arrival_first.deviation()
        let late_eta = etas - deviation
        late_eta = new Date(late_eta)
        let late_hours = late_eta.getHours()
        let late_minutes = late_eta.getMinutes()
        let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
        late_time = String(late_time)
        xOffset = 0
        posX = 4.7
        for (let i = 0; i < late_time.length; i++) {
            Text.create("departure eta")
                .text(late_time[i])
                .pos(posX + xOffset, 33.5)
                .scale(1.35)
                .color(0xEFDB0B)
                .draw(ctx);

            xOffset += 8.45
        }

        let customMsg = pids.getCustomMessage(3);
        if (customMsg == "" && pids.station() && arrival_first.route()) {
            msg = false
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let stops = arrival_first.route().getPlatforms().toArray().map(p => p.stationName);
            let currentIndex = stops.findIndex(s => s.normalize("NFC").trim() === stationClean);
            let nextStops = stops.slice(currentIndex + 1);
            let stops_at = ""

            for (let i = 0; i < nextStops.length; i++) {
                stops_at = stops_at + nextStops[i].replace("|", "")
                if (i + 1 !== nextStops.length) {stops_at = stops_at + ", "}
            }

            let pids_pos = pids.blockPos().x() + "_" + pids.blockPos().y() + "_" + pids.blockPos().z()
            if (!counter[pids_pos]) {
                counter[pids_pos] = 0
            }
            let firstPart = "Ce train s'arrête à:"
            let firstNumber = Math.round(counter[pids_pos] / 125) * 36
            let secondNumber = 36 * (Math.round(counter[pids_pos] / 125) + 1)

            xOffset = 0
            posX = 4.7
            for (let i = 0; i < firstPart.length; i++) {
                Text.create("customMsg")
                    .text(firstPart[i])
                    .pos(posX + xOffset, 56.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }

            xOffset = 0
            posX = 4.7
            for (let i = 0; i < stops_at.substring(firstNumber, secondNumber).length; i++) {
                Text.create("customMsg")
                    .text(stops_at.substring(firstNumber, secondNumber)[i])
                    .pos(posX + xOffset, 66.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }

            if (counter[pids_pos] / 125 > stops_at.length / 36) {counter[pids_pos] = 0}
            counter[pids_pos]++
        }
    }

    let customMsg = pids.getCustomMessage(3);
    customMsg = String(customMsg)
    if (customMsg !== "" && msg === true) {
        let lastSpaceIndex = customMsg.lastIndexOf(' ', 36);
        if (customMsg.length <= 36) {
            let xOffset = 0
            let posX = 4.7
            for (let i = 0; i < customMsg.length; i++) {
                Text.create("customMsg")
                    .text(customMsg[i])
                    .pos(posX + xOffset, 56.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }
        } else if (lastSpaceIndex === -1) {
            let xOffset = 0
            let posX = 4.7
            for (let i = 0; i < customMsg.substring(0, 36).length; i++) {
                Text.create("customMsg")
                    .text(customMsg.substring(0, 36)[i])
                    .pos(posX + xOffset, 56.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }

            xOffset = 0
            posX = 4.7
            for (let i = 0; i < customMsg.substring(36).length; i++) {
                Text.create("customMsg")
                    .text(customMsg.substring(36)[i])
                    .pos(posX + xOffset, 66.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }
        } else {
            let firstPart = customMsg.substring(0, lastSpaceIndex);
            let secondPart = customMsg.substring(lastSpaceIndex + 1);

            let xOffset = 0
            let posX = 4.7
            for (let i = 0; i < firstPart.length; i++) {
                Text.create("customMsg")
                    .text(firstPart[i])
                    .pos(posX + xOffset, 56.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }

            xOffset = 0
            posX = 4.7
            for (let i = 0; i < secondPart.length; i++) {
                Text.create("customMsg")
                    .text(secondPart[i])
                    .pos(posX + xOffset, 66.5)
                    .scale(0.5625)
                    .color(0xEFDB0B)
                    .draw(ctx);

                xOffset += 3.52
            }
        }
    }
}

function dispose(ctx, state, pids) {
  }