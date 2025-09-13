include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/izmir_metro.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    if (pids.station() != null) {
      Text.create("station name")
          .pos(40, 3)
          .text(pids.station().getName())
          .size(75, 10)
          .scaleXY()
          .wrapText()
          .centerAlign()
          .scale(1)
          .color(0xFFFFFF)
          .draw(ctx)
    }

    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let time = hours + ":" + minutes

    Text.create("Clock")
        .text(time)
        .color(0xffffff)
        .size(pids.width - 30, 10)
        .pos(pids.width - 27, 4)
        .centerAlign()
        .scaleXY()
        .scale(1.75)
        .draw(ctx);

    for (let i = 0; i < 2; i++) {
      let rowY = 33 + (i * 16.5);
      let arrival = pids.arrivals().get(i);
      if (arrival != null) {
        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(5, rowY)
            .size(38, 7)
            .scaleXY()
            .scale(1.65)
            .color(0xffffff)
            .draw(ctx);

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        eta = Math.round(eta);
        if (eta < 1) {
          eta = 0
          Text.create("Arrival ETA")
              .text(eta + " dk")
              .color(0xffff00)
              .pos(pids.width - 42, rowY)
              .size(32, 7)
              .scaleXY()
              .scale(1.65)
              .draw(ctx);
        } else {
          Text.create("Arrival ETA")
              .text(eta + " dk")
              .color(0xffffff)
              .pos(pids.width - 42, rowY)
              .size(32, 7)
              .scaleXY()
              .scale(1.65)
              .draw(ctx);
        }
      }
    }

    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Text.create("Custom Text")
          .text(TextUtil.cycleString(customMsg))
          .scale(1)
          .size(pids.width - 3, 7)
          .pos(0.5, pids.height - 8.5)
          .color(0xffffff)
          .marquee()
          .draw(ctx);
    }
  } else {
    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Text.create("Custom Text")
      .text(TextUtil.cycleString(customMsg))
      .scale(1)
      .size(pids.width - 3, 7)
      .pos(0.5, pids.height - 8.5)
      .color(0xffffff)
      .marquee()
      .draw(ctx);
    }
  }
}

function dispose(ctx, state, pids) {
}