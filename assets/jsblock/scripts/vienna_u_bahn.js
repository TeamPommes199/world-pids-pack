include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/vienna_u_bahn.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let arrival_first = pids.arrivals().get(0);
    if(arrival_first != null) {
        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .pos(0.25, 26.5)
        .leftAlign()
        .size(12, 6)
        .scale(1.75)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        let text = TextUtil.cycleString(arrival_first.destination());
        text = String(text);
        text = text.toUpperCase();

        let xOffset = 0
        let posX = 20.9

        for (let i = 0; i < text.length; i++) {
            if (text[i] === 'I') {
                xOffset += 1.2

                Text.create("arrival_first destination " + i)
                    .text('I')
                    .pos(posX + xOffset, 26.5)
                    .size(45, 6)
                    .scale(1.7)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);

                xOffset += 5.6
            } else {
                Text.create("arrival_first destination " + i)
                    .text(text[i])
                    .pos(posX + xOffset, 26.5)
                    .size(45, 6)
                    .scale(1.7)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);

                xOffset += 6.8
            }
        }

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {eta = "✶"} else {eta = Math.round(eta)}

        Text.create("arrival ETA")
        .text(eta)
        .color(0xffffff)
        .rightAlign()
        .scale(1.65)
        .pos(pids.width + 0.65, 26.5)
        .size(18, 6)
        .scaleXY()
        .draw(ctx);
    }

    let arrival_second = pids.arrivals().get(1);
    if(arrival_second != null) {
        Text.create("arrival_second Number Text")
        .text(arrival_second.routeNumber())
        .pos(0.25, 42.5)
        .leftAlign()
        .size(12, 6)
        .scale(1.75)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

        let text = TextUtil.cycleString(arrival_second.destination());
        text = String(text);
        text = text.toUpperCase();

        let xOffset = 0
        let posX = 20.9

        for (let i = 0; i < text.length; i++) {
            if (text[i] === 'I') {
                xOffset += 1.2

                Text.create("arrival_second destination " + i)
                    .text('I')
                    .pos(posX + xOffset, 42.5)
                    .size(45, 6)
                    .scale(1.7)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);

                xOffset += 5.6
            } else {
                Text.create("arrival_second destination " + i)
                    .text(text[i])
                    .pos(posX + xOffset, 42.5)
                    .size(45, 6)
                    .scale(1.7)
                    .scaleXY()
                    .color(0xFFFFFF)
                    .draw(ctx);

                xOffset += 6.8
            }
        }

        let eta = (arrival_second.arrivalTime() - Date.now()) / 60000;
        eta = Math.round(eta)

        Text.create("arrival_second ETA")
        .text(eta)
        .color(0xffffff)
        .rightAlign()
        .scale(1.7)
        .pos(pids.width + 0.65, 42.5)
        .size(18, 6)
        .scaleXY()
        .draw(ctx);
    }

    Texture.create("Second Layer")
    .texture("jsblock:custom_directory/vienna_u_bahn_second_layer.png")
    .size(pids.width, pids.height)
    .draw(ctx);
}

function dispose(ctx, state, pids) {
  }