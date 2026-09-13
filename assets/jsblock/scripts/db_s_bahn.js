function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let page = 1
  let pageMsg = customMsgs.find(item => item.includes("page:"))
  let arrival_first = pids.arrivals().get(0);
  if (pageMsg) {
    page = pageMsg.replace("page:", "")
    if (page < 1) {
      page = 1
    }
    arrival_first = pids.arrivals().get((page - 1) * 6);
  }

  Texture.create("Background")
      .texture("jsblock:assets/db_s_bahn/db_s_bahn.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let date = new Date;
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')

  Text.create("Clock")
      .text(time)
      .color(0xFFFFFF)
      .pos(11, 1.4)
      .scale(0.325)
      .draw(ctx);

  if (arrival_first) {
    let rowY = 14.5
    for (let i = 6 * (page - 1); i < 6 * page; i++) {
      let arrival = pids.arrivals().get(i);
      if (arrival != null) {
        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        let min = ""
        if (eta < 0.5) {
          eta = ""
        } else {
          eta = Math.round(eta)
          min = "min"
        }

        Text.create("Arrival ETA")
            .text(eta)
            .color(0xFFFFFF)
            .pos(11.5, rowY + 2)
            .scale(0.425)
            .size(50, 9)
            .scaleXY()
            .rightAlign()
            .draw(ctx);

        Text.create("Min")
            .text(min)
            .color(0xFFFFFF)
            .pos(16, rowY + 2)
            .scale(0.275)
            .size(50, 9)
            .scaleXY()
            .rightAlign()
            .draw(ctx);

        Texture.create("Circle Colored")
            .texture("jsblock:assets/general/long_circle_full.png")
            .pos(17.5, rowY + 1)
            .size(8.25, 4.5)
            .color(arrival.routeColor())
            .draw(ctx);

        Text.create("Number Text")
            .text(arrival.routeNumber())
            .scale(0.35)
            .centerAlign()
            .pos(22, rowY + 2)
            .size(22, 9)
            .scaleXY()
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(32, rowY + 2)
            .size(155, 9)
            .scaleXY()
            .scale(0.425)
            .color(0xFFFFFF)
            .draw(ctx)

        if (pids.station() && arrival.route()) {
          let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
          let stops_at = ""
          let stationClean = pids.station().getName().normalize("NFC").trim();
          let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
          let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
          let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;
          let i_4 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 7;

          if (stops[i] != null && stops[i] != arrival.destination()) {
            stops_at = ""
            stops_at = stops_at + stops[i].replace("|", " ")
          }

          if (stops[i_2] != null && stops[i_2] != arrival.destination()) {
            stops_at = stops_at + " - " + stops[i_2].replace("|", " ")
          }

          if (stops[i_3] != null && stops[i_3] != arrival.destination()) {
            stops_at = stops_at + " - " + stops[i_3].replace("|", " ")
          }

          if (stops[i_4] != null && stops[i_4] != arrival.destination()) {
            stops_at = stops_at + " - " + stops[i_4].replace("|", " ")
          }

          Text.create("Arrival stops")
              .text(stops_at)
              .pos(32, rowY - 1.5)
              .size(260, 9)
              .scaleXY()
              .scale(0.25)
              .color(0xFFFFFF)
              .draw(ctx)
        }

        Text.create("Arrival Platform")
            .text(arrival.platformName())
            .pos(103.5, rowY + 2)
            .size(35, 9)
            .scaleXY()
            .scale(0.425)
            .color(0xFFFFFF)
            .draw(ctx)

        rowY = rowY + 10.75
      }
    }
  }
}

function dispose(ctx, state, pids) {
}