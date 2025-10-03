include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/wmata.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    for (let i = 0; i < 5; i++) {
      let rowY = 11 + (i * 13);
      let arrival = pids.arrivals().get(i);
      if (arrival != null) {
        Texture.create("Background")
            .texture("jsblock:custom_directory/circle.png")
            .size(11, 11)
            .pos(0.75, rowY + 0.75)
            .color(arrival.routeColor())
            .draw(ctx);

        Text.create("Number Text")
            .text(arrival.routeNumber())
            .centerAlign()
            .pos(6.5, rowY)
            .size(8, 12)
            .scaleXY()
            .scale(1.1)
            .color(0xffffff)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(42, rowY)
            .size(62, 12)
            .scaleXY()
            .scale(1.1)
            .color(0xffffff)
            .draw(ctx);

        let car_length = arrival.carCount();

        if (car_length === 8) {
          Text.create("Arrival carCount")
              .text(car_length)
              .pos(18, rowY)
              .size(11, 12)
              .scaleXY()
              .scale(1.1)
              .color(0x33ff33)
              .draw(ctx);
        } else {
          Text.create("Arrival carCount")
              .text(car_length)
              .pos(18, rowY)
              .size(11, 12)
              .scaleXY()
              .scale(1.1)
              .color(0xffffff)
              .draw(ctx);
        }

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        if (eta <= 0) {
          eta = "BRD"
        } else if (eta < 0.5 && eta > 0) {
          eta = "ARR"
        } else {
          eta = Math.round(eta);
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xffffff)
            .pos(pids.width - 1.5, rowY)
            .size(32, 12) // <----
            .scaleXY() // <----
            .scale(1.1)
            .rightAlign()
            .draw(ctx);
      }
    }
  } else {
    Texture.create("Background")
        .texture("jsblock:custom_directory/wmata.png")
        .size(pids.width, pids.height)
        .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}