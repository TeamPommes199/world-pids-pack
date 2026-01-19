function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    Texture.create("Background")
        .texture("jsblock:custom_directory/dutch_tram.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    if (pids.station() != null) {
      Text.create("station name")
          .pos(32, 1.5)
          .text(pids.station().getName().replace("|", " "))
          .size(pids.width - 33.5, 8)
          .scaleXY()
          .scale(0.8)
          .color(0xFFFFFF)
          .draw(ctx)
    }

    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let time = hours + ":" + minutes

    Text.create("Clock")
        .text(time)
        .color(0xFFFFFF)
        .size(pids.width - 30, 8)
        .pos(pids.width - 0.75, 1.5)
        .rightAlign()
        .scaleXY()
        .scale(0.8)
        .draw(ctx);

    for (let i = 0; i < 6; i++) {
      let rowY = 11 + (i * 10.85);
      let arrival = pids.arrivals().get(i);

      if (arrival != null) {
        Texture.create("Circle Colored")
            .texture("jsblock:custom_directory/lrr_u_bahn.png")
            .pos(2, rowY + 0.5)
            .size(22, 9.8)
            .color(arrival.routeColor())
            .draw(ctx);

        Text.create("Number Text")
            .text(arrival.routeNumber())
            .rightAlign()
            .pos(23.5, rowY + 2)
            .color(0xFFFFFF)
            .size(12.5, 5) // <----
            .scaleXY() // <----
            .scale(1.7)
            .draw(ctx);

        Texture.create("Circle Colored")
            .texture("jsblock:custom_directory/dutch_bus_gps.png")
            .pos(34, rowY + 1)
            .size(6, 6)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(43, rowY + 2)
            .size(35, 2.5)
            .scaleXY() // <----
            .scale(1.7)
            .color(0x000000)
            .draw(ctx);

        if (pids.station() && arrival.route()) {
          let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
          let stops_at = ""
          let stationClean = pids.station().getName().normalize("NFC").trim();
          let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 2;

          if (stops[i] != null && stops[i] != arrival.destination()) {
            stops_at = "Via "
            stops_at = stops_at + stops[i].replace("|", " ")
          }

          Text.create("arrival stops")
              .text(stops_at)
              .pos(43, rowY + 7)
              .size(35, 1.75)
              .scaleXY() // <----
              .scale(1.7)
              .color(0x5555FF)
              .draw(ctx);
        }

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        eta = Math.round(eta)
        if (eta < 1) {
          Texture.create("Arrival ETA")
              .texture("jsblock:custom_directory/dutch_tram_sign.png")
              .pos(pids.width - 21.5, rowY + 1.5)
              .size(20.5, 8.5) // <----
              .draw(ctx);
        } else {
          Text.create("Arrival ETA")
              .text(eta)
              .color(0x000000)
              .pos(pids.width - 10, rowY + 2)
              .scale(1.7)
              .size(30, 5) // <----
              .scaleXY() // <----
              .rightAlign()
              .draw(ctx);

          Text.create("Arrival ETA")
              .text("min")
              .color(0x000000)
              .pos(pids.width - 2, rowY + 5.75)
              .scale(1.7)
              .size(10, 2.25) // <----
              .scaleXY() // <----
              .rightAlign()
              .draw(ctx);
        }
      }
    }

    if (pids.getCustomMessage(2) !== "" || pids.getCustomMessage(3) !== "") {
      Texture.create("dutch tram info")
          .texture("jsblock:custom_directory/dutch_bus_custom_row.png")
          .pos(0, pids.height - 11)
          .size(pids.width, 11)
          .draw(ctx);
    }

    if (pids.getCustomMessage(2) !== "") {
      Text.create("Info")
          .text(pids.getCustomMessage(2))
          .pos(2, pids.height - 9.25)
          .size(pids.width * 1.3, 5)
          .scale(0.75)
          .scaleXY()
          .color(0x000000)
          .draw(ctx);
    }
    if (pids.getCustomMessage(3) !== "") {
      Text.create("Info")
          .text(pids.getCustomMessage(3))
          .pos(2, pids.height - 4.75)
          .size(pids.width * 1.3, 5)
          .scale(0.75)
          .scaleXY()
          .color(0x000000)
          .draw(ctx);
    }
  } else {
    Texture.create("Background")
        .texture("jsblock:custom_directory/dutch_tram.png")
        .size(pids.width, pids.height)
        .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}