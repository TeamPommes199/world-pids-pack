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
    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Texture.create("ETA background")
          .texture("jsblock:custom_directory/wmata_custom_row.png")
          .pos(0, pids.height - 26)
          .size(pids.width, 26)
          .draw(ctx);

      if (customMsg.includes("|")) {
        let index = customMsg.indexOf("|")
        let [customMsgPartOne, customMsgPartTwo] = [customMsg.slice(0, index), customMsg.slice(index + 1)]
        Text.create("Arrival destination")
            .text(customMsgPartOne)
            .pos(pids.width / 2, pids.height - 25.5)
            .size(pids.width - 15, 12)
            .scaleXY()
            .centerAlign()
            .scale(1.1)
            .color(0xffffff)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(customMsgPartTwo)
            .pos(pids.width / 2, pids.height - 13)
            .size(pids.width - 15, 12)
            .scaleXY()
            .centerAlign()
            .scale(1.1)
            .color(0xffffff)
            .draw(ctx);
      } else {
        Text.create("Arrival destination")
            .text(customMsg)
            .pos(pids.width / 2, pids.height - 25.5)
            .size(pids.width - 15, 12)
            .scaleXY()
            .centerAlign()
            .scale(1.1)
            .color(0xffffff)
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