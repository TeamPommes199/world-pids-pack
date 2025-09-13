function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Black")
      .texture("jsblock:custom_directory/black.png")
      .size(pids.width, pids.height)
      .draw(ctx);
  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 0.5) {
      let rowY = 20;

      if(arrival_first != null) {
        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;

        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .scale(1)
        .pos(2, rowY + 2)
        .size(20, 10.5) // <----
        .scaleXY() // <----
        .color(0xff8c00)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(24, rowY + 2)
        .size(68, 10.5)
        .scaleXY() // <----
        .scale(1)
        .color(0xff8c00)
        .draw(ctx);

        if (pids.station() && arrival_first.route()) {
          let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
          let stops_at = ""
          let stops_at_2 = ""
          let stationClean = pids.station().getName().normalize("NFC").trim() || "";
          let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
          let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

          if (stops[i] != null && stops[i] != arrival_first.destination()) {
            stops_at = "über "
            stops_at = stops_at + stops[i].replace("|", " ")
          }

          if (stops[i_2] != null && stops[i_2] != arrival_first.destination()) {
            stops_at_2 = stops_at_2 + "und " + stops[i_2].replace("|", " ")
          }

          Text.create("arrival_first stops")
              .text(stops_at)
              .pos(24, rowY + 13)
              .size(88, 10.5)
              .scaleXY()
              .scale(0.65)
              .color(0xff8c00)
              .draw(ctx);

          Text.create("arrival_first stops part 2")
              .text(stops_at_2)
              .pos(24, rowY + 20)
              .size(88, 10.5)
              .scaleXY()
              .scale(0.65)
              .color(0xff8c00)
              .draw(ctx);
        }

        let car_length = arrival_first.carCount();
        if (car_length > 2 && car_length < 5) {
          Texture.create("arrival_first Car length")
            .texture("jsblock:custom_directory/frankfurt_2_u_bahn.png")
            .pos(pids.width - 40, rowY + 20)
            .size(35, 7)
            .color(0xff8c00)
            .draw(ctx);
        } else if (car_length > 4 && car_length < 7) {
          Texture.create("arrival_first Car length")
            .texture("jsblock:custom_directory/frankfurt_3_u_bahn.png")
            .pos(pids.width - 40, rowY + 20)
            .size(35, 7)
            .color(0xff8c00)
            .draw(ctx);
        } else if (car_length > 6) {
          Texture.create("arrival_first Car length")
            .texture("jsblock:custom_directory/frankfurt_4_u_bahn.png")
            .pos(pids.width - 40, rowY + 20)
            .size(35, 7)
            .color(0xff8c00)
            .draw(ctx);
        } else if (car_length < 3) {
          Texture.create("arrival_first Car length")
            .texture("jsblock:custom_directory/frankfurt_1_u_bahn.png")
            .pos(pids.width - 40, rowY + 20)
            .size(35, 7)
            .color(0xff8c00)
            .draw(ctx);
        }
      }
    } else {
    for(let i = 0; i < 3; i++) {
      let rowY = 20 + (i * 10)
      let arrival = pids.arrivals().get(i);

      if(arrival != null) {
          Text.create("Number Text")
          .text(arrival.routeNumber())
          .scale(0.75)
          .pos(2, rowY)
          .size(21, 9) // <----
          .scaleXY() // <----
          .color(0xff8c00)
          .draw(ctx);

          Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(25, rowY)
          .size(70, 9)
          .scaleXY() // <----
          .scale(0.80)
          .color(0xff8c00)
          .draw(ctx);

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if(eta < 0.5) {eta = ""} else {eta = Math.round(eta)}
          Text.create("Arrival ETA")
          .text(eta)
          .color(0xff8c00)
          .pos(pids.width - 0.5, rowY)
          .scale(0.80)
          .size(30, 9) // <----
          .scaleXY() // <----
          .rightAlign()
          .draw(ctx);
      }
    }

    let customMsg_extra = pids.getCustomMessage(3);
    let arrival_extra = pids.arrivals().get(3);
    if(customMsg_extra != "") {
        Text.create("Custom Text")
        .text(TextUtil.cycleString(customMsg_extra))
        .scale(0.8)
        .size(pids.width * 1.20, 9)
        .pos(1, 20 + (3*10))
        .color(0xff8c00)
        .marquee()
        .draw(ctx);
      } else {
        if(arrival_extra != null) {
          let rowY = 20 + (3*10);

          Text.create("Number Text")
          .text(arrival_extra.routeNumber())
          .scale(0.75)
          .pos(2, rowY)
          .size(21, 9) // <----
          .scaleXY() // <----
          .color(0xff8c00)
          .draw(ctx);

          Text.create("arrival_extra destination")
          .text(TextUtil.cycleString(arrival_extra.destination()))
          .pos(25, rowY)
          .size(70, 9)
          .scaleXY() // <----
          .scale(0.80)
          .color(0xff8c00)
          .draw(ctx);

          let eta = (arrival_extra.arrivalTime() - Date.now()) / 60000;
          if(eta < 0.5) {eta = ""} else {eta = Math.round(eta)}
          Text.create("arrival_extra ETA")
          .text(eta)
          .color(0xff8c00)
          .pos(pids.width - 0.5, rowY)
          .scale(0.80)
          .size(30, 9) // <----
          .scaleXY() // <----
          .rightAlign()
          .draw(ctx);
        }
      }
    } 
  } else {
    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
        Text.create("Custom Text")
        .text(TextUtil.cycleString(customMsg))
        .scale(0.8)
        .size(pids.width * 1.20, 9)
        .pos(1, 8 + (4*15))
        .color(0xff8c00)
        .marquee()
        .draw(ctx);
      }
  }
}

function dispose(ctx, state, pids) {
}