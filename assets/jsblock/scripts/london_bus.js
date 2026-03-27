include(Resources.id("jsblock:scripts/pids_util.js"));

let varA = 1;
let varB = 2;
let varC = 3;
let hasTriggered = false;
function animation_arrive() {
    let rowY;
    let now = new Date;
    let sec = now.getSeconds()
    let ms = now.getMilliseconds()

    let phase = sec % 10;
    if (phase === 9) {
        if (!hasTriggered) {
            if (varA < 5 && varB < 6 && varC < 7) {
                varA += 3
                varB += 3
                varC += 3
                hasTriggered = true
            } else {
                varA = 1
                varB = 2
                varC = 3
                hasTriggered = true
            }
        }
    }

    if (phase === 9 || phase === 0) {
        let currentMs = (phase === 9 ? 0 : 1000) + ms;
        let progress = currentMs / 2000;

        rowY = 10 * (1 - progress);
    } else {
        rowY = 0;

        if (phase === 1) {
            hasTriggered = false;
        }
    }

    return rowY
}

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/dot_matrix_1a.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    for (let i = 0; i < 4; i++) {
        let arrival = pids.arrivals().get(i);
        if (arrival != null) {
            let rowY = 8.5 + (11 * i)

            if (i === 0) {
                Text.create("number")
                    .text(i + 1)
                    .pos(15, rowY)
                    .size(16, 12)
                    .scaleXY()
                    .rightAlign()
                    .color(0xff7c00)
                    .draw(ctx);

                Text.create("arrival routeNumber")
                    .text(arrival.routeNumber())
                    .pos(43, rowY)
                    .size(16, 12)
                    .scaleXY()
                    .rightAlign()
                    .color(0xff7c00)
                    .draw(ctx);

                Text.create("arrival destination")
                    .text(TextUtil.cycleString(arrival.destination()))
                    .pos(55, rowY)
                    .size(pids.width - 85, 12)
                    .scaleXY()
                    .color(0xff7c00)
                    .draw(ctx);

                let eta = (arrival.arrivalTime() - Date.now()) / 60000;
                if (eta < 0.5) {
                    eta = "due"
                } else {
                    eta = Math.round(eta) + "min"
                }
                Text.create("arrival ETA")
                    .text(eta)
                    .color(0xff7c00)
                    .pos(pids.width - 1, rowY)
                    .size(48, 12)
                    .scaleXY()
                    .rightAlign()
                    .draw(ctx);

                Texture.create("Background")
                    .texture("jsblock:custom_directory/dot_matrix_10.png")
                    .size(pids.width, pids.height / (720 / 106))
                    .pos(0, 8.5 + (11 * (i + 1) - 0.1))
                    .draw(ctx);
            } else {
                let x = varA
                if (i === 2) {x = varB}
                if (i === 3) {x = varC}

                arrival = pids.arrivals().get(x);

                Text.create("number")
                    .text(x + 1)
                    .pos(15, rowY + animation_arrive())
                    .size(16, 12)
                    .scaleXY()
                    .rightAlign()
                    .color(0xff7c00)
                    .draw(ctx);

                Text.create("arrival routeNumber")
                    .text(arrival.routeNumber())
                    .pos(43, rowY + animation_arrive())
                    .size(16, 12)
                    .scaleXY()
                    .rightAlign()
                    .color(0xff7c00)
                    .draw(ctx);

                Text.create("arrival destination")
                    .text(TextUtil.cycleString(arrival.destination()))
                    .pos(55, rowY + animation_arrive())
                    .size(pids.width - 85, 12)
                    .scaleXY()
                    .color(0xff7c00)
                    .draw(ctx);

                let eta = (arrival.arrivalTime() - Date.now()) / 60000;
                if (eta < 0.5) {
                    eta = "due"
                } else {
                    eta = Math.round(eta) + "min"
                }
                Text.create("arrival ETA")
                    .text(eta)
                    .color(0xff7c00)
                    .pos(pids.width - 1, rowY + animation_arrive())
                    .size(48, 12)
                    .scaleXY()
                    .rightAlign()
                    .draw(ctx);

                Texture.create("Background")
                    .texture("jsblock:custom_directory/dot_matrix_10.png")
                    .size(pids.width, pids.height / (720 / 106))
                    .pos(0, 8.5 + (11 * (i + 1) - 0.1))
                    .draw(ctx);
            }
        }
    }
}

function dispose(ctx, state, pids) {
}