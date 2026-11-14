include(Resources.id("jsblock:scripts/pids_util.js"));

let last_departure = {}
let last_update_time = {}

let FLIP_MS = 250

function make_flap(value, max) {
    return { shown: value, target: value, from: value, to: value, start: 0, flipping: false, max: max }
}

function make_text_flap(value) {
    return { shown: value, target: value, from: value, to: value, start: 0, flipping: false, max: 0 }
}

function custom_message(pids, index) {
    let message = pids.getCustomMessage(index)
    if (message == null) {
        return ""
    }
    return String(message)
}

function tick_flap(f, now) {
    if (!f.flipping && f.shown !== f.target) {
        f.from = f.shown
        f.to = f.max > 0 ? (f.shown + 1) % f.max : f.target
        f.start = now
        f.flipping = true
    }
    if (f.flipping && now - f.start >= FLIP_MS) {
        f.shown = f.to
        f.flipping = false
    }
}

function draw_flap(ctx, name, f, x, y, w, h, text_x, text_w, now) {
    let value = f.shown
    let p = 0

    if (f.flipping) {
        p = Math.min((now - f.start) / FLIP_MS, 1)
        if (p < 0.5) {
            value = f.from
        } else {
            value = f.to
        }
    }

    let label = value
    if (f.max > 0) {
        label = value.toString().padStart(2, '0')
    }

    Texture.create(name)
        .texture("jsblock:assets/dutch_cta_old/flap.png")
        .pos(x, y)
        .size(w, h)
        .zOrder(1)
        .draw(ctx);

    if (name === "hour" || name === "minute") {
        Text.create(name)
            .text(label)
            .centerAlign()
            .pos(text_x, y + h * 0.178)
            .size(text_w, h * 0.746)
            .scale(1.1)
            .scaleXY()
            .color(0x002ba0)
            .zOrder(2)
            .draw(ctx);
    } else if (name.includes("via_station")) {
        if (label.includes("___")) {
            let [first_label, second_label] = label.split("___")
            Text.create(name)
                .text(first_label)
                .pos(text_x, y + h * 0.178 - 0.5)
                .size(text_w / 0.475, h * 0.746)
                .scale(0.5)
                .scaleXY()
                .color(0x002ba0)
                .zOrder(2)
                .draw(ctx);

            Text.create(name)
                .text(second_label)
                .pos(text_x, y + h * 0.178 + 6)
                .size(text_w / 0.475, h * 0.746)
                .scale(0.5)
                .scaleXY()
                .color(0x002ba0)
                .zOrder(2)
                .draw(ctx);
        }
    } else {
        Text.create(name)
            .text(label)
            .pos(text_x, y + h * 0.178)
            .size(text_w, h * 0.746)
            .scale(1.1)
            .scaleXY()
            .color(0x002ba0)
            .zOrder(2)
            .draw(ctx);
    }

    if (f.flipping) {
        if (p < 0.5) {
            let cover_h = h * p * 2
            if (cover_h > 0.05) {
                Texture.create(name + "_cover")
                    .texture("jsblock:assets/dutch_cta_old/flap_up.png")
                    .pos(x, y)
                    .size(w, cover_h)
                    .zOrder(3)
                    .draw(ctx);
            }
        } else {
            let cover_y = h * (p - 0.5) * 2
            let cover_h = h - cover_y
            if (cover_h > 0.05) {
                Texture.create(name + "_cover")
                    .texture("jsblock:assets/dutch_cta_old/flap_down.png")
                    .pos(x, y + cover_y)
                    .size(w, cover_h)
                    .zOrder(3)
                    .draw(ctx);
            }
        }
    }
}

function update_last_departure(pids, arrival, pids_pos) {
    let eta = arrival.departureTime()
    let time = new Date(eta)

    let stop_1 = ""
    let stop_2 = ""
    let stop_3 = ""
    if (pids.station() && arrival.route()) {
        let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
        let stationClean = pids.station().getName().normalize("NFC").trim();
        let i_1 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
        let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 2;
        let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
        let i_4 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 4;
        let i_5 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;
        let i_6 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 6;

        if (stops[i_1] != null && stops[i_1] != arrival.destination()) {
            if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
                stop_1 = stops[i_1].replace("|", " ") + "___" + stops[i_2].replace("|", " ")
            } else {
                stop_1 = stops[i_1].replace("|", " ")
            }
        }

        if (stops[i_3] != null && stops[i_3] != arrival.destination()) {
            if (stops[i_4] != null && stops[i_4] != arrival.destination()) {
                stop_2 = stops[i_3].replace("|", " ") + "___" + stops[i_4].replace("|", " ")
            } else {
                stop_2 = stops[i_3].replace("|", " ")
            }
        }

        if (stops[i_5] != null && stops[i_5] != arrival.destination()) {
            if (stops[i_6] != null && stops[i_6] != arrival.destination()) {
                stop_3 = stops[i_5].replace("|", " ") + "___" + stops[i_6].replace("|", " ")
            } else {
                stop_3 = stops[i_5].replace("|", " ")
            }
        }

        if (stop_2 === "") {
            stop_2 = stop_1
            stop_1 = ""
        }

        if (stop_3 === "") {
            stop_3 = stop_2
            stop_2 = stop_1
            stop_1 = ""
        }
    }

    last_departure[pids_pos].hour.target = time.getHours()
    last_departure[pids_pos].minute.target = time.getMinutes()
    last_departure[pids_pos].information_1.target = custom_message(pids, 2)
    last_departure[pids_pos].information_2.target = custom_message(pids, 3)
    last_departure[pids_pos].via_station_1.target = stop_1
    last_departure[pids_pos].via_station_2.target = stop_2
    last_departure[pids_pos].via_station_3.target = stop_3
    last_departure[pids_pos].routeNumber.target = String(arrival.routeNumber()).replace("|", " ")
    last_departure[pids_pos].destination.target = String(arrival.destination()).replace("|", " ")
}

function create(ctx, state, pids) {
    let pids_pos = pids.blockPos().x() + "_" + pids.blockPos().y() + "_" + pids.blockPos().z()
    last_update_time[pids_pos] = Date.now()
}

function render(ctx, state, pids) {
    let arrival = pids.arrivals().get(0)
    let pids_pos = pids.blockPos().x() + "_" + pids.blockPos().y() + "_" + pids.blockPos().z()
    if (!last_departure[pids_pos] && arrival != null) {
        let eta = arrival.departureTime()
        let time = new Date(eta)

        let stop_1 = ""
        let stop_2 = ""
        let stop_3 = ""
        if (pids.station() && arrival.route()) {
            let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
            let stationClean = pids.station().getName().normalize("NFC").trim();
            let i_1 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
            let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 2;
            let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
            let i_4 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 4;
            let i_5 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;
            let i_6 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 6;

            if (stops[i_1] != null && stops[i_1] != arrival.destination()) {
                if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
                    stop_1 = stops[i_1].replace("|", " ") + "___" + stops[i_2].replace("|", " ")
                } else {
                    stop_1 = stops[i_1].replace("|", " ")
                }
            }

            if (stops[i_3] != null && stops[i_3] != arrival.destination()) {
                if (stops[i_4] != null && stops[i_4] != arrival.destination()) {
                    stop_2 = stops[i_3].replace("|", " ") + "___" + stops[i_4].replace("|", " ")
                } else {
                    stop_2 = stops[i_3].replace("|", " ")
                }
            }

            if (stops[i_5] != null && stops[i_5] != arrival.destination()) {
                if (stops[i_6] != null && stops[i_6] != arrival.destination()) {
                    stop_3 = stops[i_5].replace("|", " ") + "___" + stops[i_6].replace("|", " ")
                } else {
                    stop_3 = stops[i_5].replace("|", " ")
                }
            }

            if (stop_2 === "") {
                stop_2 = stop_1
                stop_1 = ""
            }

            if (stop_3 === "") {
                stop_3 = stop_2
                stop_2 = stop_1
                stop_1 = ""
            }
        }

        last_departure[pids_pos] = {
            "hour": make_flap(time.getHours(), 24),
            "minute": make_flap(time.getMinutes(), 60),
            "routeNumber": make_text_flap(String(arrival.routeNumber()).replace("|", " ")),
            "via_station_1": make_text_flap(stop_1),
            "via_station_2": make_text_flap(stop_2),
            "via_station_3": make_text_flap(stop_3),
            "information_1": make_text_flap(custom_message(pids, 2)),
            "information_2": make_text_flap(custom_message(pids, 3)),
            "destination": make_text_flap(String(arrival.destination()).replace("|", " "))
        }
    } else {
        Texture.create("Background")
            .texture("jsblock:assets/dutch_cta_old/background.png")
            .size(pids.width, pids.height)
            .zOrder(0)
            .draw(ctx);

        if (arrival != null) {
            let now = Date.now();
            if (now - last_update_time[pids_pos] >= 200) {
                update_last_departure(pids, arrival, pids_pos);
                last_update_time[pids_pos] = now;
            }

            tick_flap(last_departure[pids_pos].hour, now)
            tick_flap(last_departure[pids_pos].minute, now)
            tick_flap(last_departure[pids_pos].routeNumber, now)
            tick_flap(last_departure[pids_pos].information_1, now)
            tick_flap(last_departure[pids_pos].information_2, now)
            tick_flap(last_departure[pids_pos].via_station_1, now)
            tick_flap(last_departure[pids_pos].via_station_2, now)
            tick_flap(last_departure[pids_pos].via_station_3, now)
            tick_flap(last_departure[pids_pos].destination, now)

            draw_flap(ctx, "hour", last_departure[pids_pos].hour, 33.425, 2.11, 15.175, 13.4, 41.6, 12, now)
            draw_flap(ctx, "minute", last_departure[pids_pos].minute, 50.7, 2.11, 15.175, 13.4, 58.75, 12, now)
            draw_flap(ctx, "routeNumber", last_departure[pids_pos].routeNumber, 70.2, 2.11, 63.8, 13.4, 72.1, 55, now)
            draw_flap(ctx, "information_1", last_departure[pids_pos].information_1, 70.2, 21.11, 63.8, 13.4, 72.1, 55, now)
            draw_flap(ctx, "information_2", last_departure[pids_pos].information_2, 70.2, 40.11, 63.8, 13.4, 72.1, 55, now)
            draw_flap(ctx, "via_station_1", last_departure[pids_pos].via_station_1, 2.2, 21.11, 63.8, 13.4, 4.1, 55, now)
            draw_flap(ctx, "via_station_2", last_departure[pids_pos].via_station_2, 2.2, 40.11, 63.8, 13.4, 4.1, 55, now)
            draw_flap(ctx, "via_station_3", last_departure[pids_pos].via_station_3, 2.2, 59.11, 63.8, 13.4, 4.1, 55, now)
            draw_flap(ctx, "destination", last_departure[pids_pos].destination, 70.2, 59.11, 63.8, 13.4, 72.1, 55, now)
        }
    }
}

function dispose(ctx, state, pids) {
}