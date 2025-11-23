include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  if (customMsgs.find(item => item.includes("color:")) === "color: dark blue") {
    Texture.create("Background")
        .texture("jsblock:custom_directory/copenhagen_metro_dark-blue.png")
        .size(pids.width, pids.height)
        .draw(ctx);
  } else {
    Texture.create("Background")
        .texture("jsblock:custom_directory/copenhagen_metro.png")
        .size(pids.width, pids.height)
        .draw(ctx);
  }

  let page = 1
  let pageMsg = customMsgs.find(item => item.includes("page:"))
  let arrival_first = pids.arrivals().get(0);
  if (pageMsg) {
    page = pageMsg.replace("page:", "")
    if (page < 1) {page = 1}
    arrival_first = pids.arrivals().get((page - 1) * 3);
  }

  if (arrival_first != null) {
    for (let i = 3 * (page - 1); i < 3 * page; i++) {
      let rowY = 1 + ((i - 3 * (page - 1)) * 25);
      let arrival = pids.arrivals().get(i);
      if(arrival != null && i !== 2) {
        Texture.create("Background")
            .texture("jsblock:custom_directory/circle.png")
            .size(12.5, 12.5)
            .pos(1.5, rowY + 5.25)
            .color(arrival.routeColor())
            .draw(ctx);

        Text.create("Number Text")
            .text(arrival.routeNumber())
            .pos(8, rowY + 6.25)
            .size(10.5, 10.5)  // <----
            .scaleXY() // <----
            .centerAlign()
            .scale(1)
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(17.5, rowY)
            .size(pids.width - 52.5, 25)
            .scale(1)
            .scaleXY() // <----
            .color(0xFFFFFF)
            .draw(ctx);

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.25) {
          // nothing...
        } else {
          if (eta < 0.75) {
            eta = "½ min"
          } else if (Math.round(eta * 10) % 10 > 1.05 && Math.round(eta * 10) % 10 < 4.95 && eta < 3) {
            eta = Math.round(eta) + "½ min"
          } else {
            eta = Math.round(eta) + " min"
          }

          Text.create("Arrival ETA")
              .text(eta)
              .color(0xFFFFFF)
              .pos(pids.width - 1, rowY)
              .size(30, 25)
              .scale(1)
              .rightAlign()
              .scaleXY()
              .draw(ctx);
        }
      } else {
        if (pids.getCustomMessage(3) != "") {
          Text.create("arrival_first stops")
              .text(pids.getCustomMessage(3))
              .pos(3, rowY + 1)
              .size(pids.width * 1.65, 25)
              .wrapText()
              .scale(0.55)
              .color(0xFFFFFF)
              .draw(ctx);
        } else if (arrival !== null) {
          Texture.create("Background")
              .texture("jsblock:custom_directory/circle.png")
              .size(12.5, 12.5)
              .pos(1.5, rowY + 5.25)
              .color(arrival.routeColor())
              .draw(ctx);

          Text.create("Number Text")
              .text(arrival.routeNumber())
              .pos(8, rowY + 6.25)
              .size(10.5, 10.5)  // <----
              .scaleXY() // <----
              .centerAlign()
              .scale(1)
              .color(0xFFFFFF)
              .draw(ctx);

          Text.create("Arrival destination")
              .text(TextUtil.cycleString(arrival.destination()))
              .pos(17.5, rowY)
              .size(pids.width - 52.5, 25)
              .scale(1)
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.25) {
            // nothing...
          } else {
            if (eta < 0.75) {
              eta = "½ min"
            } else if (Math.round(eta * 10) % 10 > 1.05 && Math.round(eta * 10) % 10 < 4.95 && eta < 3) {
              eta = Math.round(eta) + "½ min"
            } else {
              eta = Math.round(eta) + " min"
            }

            Text.create("Arrival ETA")
                .text(eta)
                .color(0xFFFFFF)
                .pos(pids.width - 1, rowY)
                .size(30, 25)
                .scale(1)
                .rightAlign()
                .scaleXY()
                .draw(ctx);
          }
        }
      }
    }
  }
}

function dispose(ctx, state, pids) {
}