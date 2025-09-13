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
    if (page < 1) {page = 1}
    arrival_first = pids.arrivals().get((page - 1) * 5);
  }

  if (arrival_first != null) {
    if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 0.6) {
      let rowY = 3;

      Texture.create("Background_Blank")
          .texture("jsblock:custom_directory/berlin_s_bahn_arrive.png")
          .size(pids.width, pids.height)
          .draw(ctx);

      Texture.create("arrival_first Circle Colored Full")
          .texture("jsblock:custom_directory/lrr_full.png")
          .pos(1, rowY)
          .size(25, 13)
          .color(arrival_first.routeColor())
          .draw(ctx);

      if (pids.station() && arrival_first.route()) {
        let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
        let stops_at = ""
        let stationClean = pids.station().getName().normalize("NFC").trim() || "";
        let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
        let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;

        if (stops[i] != null && stops[i] != arrival_first.destination()) {
          stops_at = ""
          stops_at = stops_at + stops[i].replace("|", " ")
        }

        if (stops[i_2] != null && stops[i_2] != arrival_first.destination()) {
          stops_at = stops_at + "-" + stops[i_2].replace("|", " ")
        }

        Text.create("arrival_first stops")
            .text(stops_at)
            .pos(28, rowY + 15)
            .size(100, 8.25)
            .scaleXY() // <----
            .scale(0.88)
            .color(0xFFFFFF)
            .draw(ctx);
      }

      Text.create("arrival_first Number Text")
          .text(arrival_first.routeNumber())
          .scale(1.2)
          .centerAlign()
          .pos(14, rowY + 2)
          .size(18, 10.5) // <----
          .scaleXY() // <----
          .color(0xFFFFFF)
          .draw(ctx);

      Text.create("arrival_first destination")
          .text(TextUtil.cycleString(arrival_first.destination()))
          .pos(29, rowY)
          .size(38, 8.25)
          .scaleXY() // <----
          .scale(1.75)
          .color(0xFFFFFF)
          .draw(ctx);

      let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
      if (eta < 0.5) {
        eta = ""
      } else {
        eta = Math.round(eta);

        Text.create("Arrival ETA")
            .text("min.")
            .color(0xFFFFFF)
            .pos(pids.width, rowY + 6)
            .scale(1.3)
            .size(12, 3.5) // <----
            .scaleXY() // <----
            .rightAlign()
            .draw(ctx);
      }
      Text.create("Arrival ETA")
          .text(eta)
          .color(0xFFFFFF)
          .pos(pids.width - 9, rowY)
          .scale(1.3)
          .size(30, 9) // <----
          .scaleXY() // <----
          .rightAlign()
          .draw(ctx);

      let car_length = arrival_first.carCount();
      if (car_length > 2 && car_length < 5) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/berlin_2_s_bahn.png")
            .pos(2, rowY + 17)
            .size(23, 4)
            .draw(ctx);
      } else if (car_length > 7) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/berlin_4_s_bahn.png")
            .pos(2, rowY + 17)
            .size(23, 4)
            .draw(ctx);
      } else if (car_length > 5 && car_length < 8) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/berlin_3_s_bahn.png")
            .pos(2, rowY + 17)
            .size(23, 4)
            .draw(ctx);
      } else if (car_length < 3) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/berlin_1_s_bahn.png")
            .pos(2, rowY + 17)
            .size(23, 4)
            .draw(ctx);
      }
      for (let i = 1; i < 3; i++) {
        rowY = 38.5 + (13.3 * i)
        let arrival = pids.arrivals().get(i);
        if (arrival != null) {
          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(2.5, rowY - 2)
              .size(21, 10)
              .color(arrival.routeColor())
              .draw(ctx);

          Text.create("Number Text")
              .text(arrival.routeNumber())
              .scale(0.75)
              .centerAlign()
              .pos(12.5, rowY)
              .size(22, 9) // <----
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          Text.create("Arrival destination")
              .text(TextUtil.cycleString(arrival.destination()))
              .pos(26.5, rowY)
              .size(60, 9)
              .scaleXY() // <----
              .scale(0.80)
              .color(0xFFFFFF)
              .draw(ctx);

          let car_length = arrival.carCount();
          if (car_length > 2 && car_length < 5) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_2_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length > 7) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_4_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length > 5 && car_length < 8) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_3_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 3) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_1_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          }

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.5) {
            eta = ""
          } else {
            eta = Math.round(eta) + " min  "
          }
          Text.create("Arrival ETA")
              .text(eta)
              .color(0xFFFFFF)
              .pos(pids.width + 1, rowY)
              .scale(0.80)
              .size(30, 9) // <----
              .scaleXY() // <----
              .rightAlign()
              .draw(ctx);

          rowY = rowY + 13.3
        }
      }
    } else {
      Texture.create("Background")
          .texture("jsblock:custom_directory/berlin_s_bahn.png")
          .size(pids.width, pids.height)
          .draw(ctx);

      let rowY = 7
      for (let i = 5 * (page - 1); i < 5 * page; i++) {
        let arrival = pids.arrivals().get(i);
        if (arrival != null) {
          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(2.5, rowY - 2)
              .size(21, 10)
              .color(arrival.routeColor())
              .draw(ctx);

          Text.create("Number Text")
              .text(arrival.routeNumber())
              .scale(0.75)
              .centerAlign()
              .pos(12.5, rowY)
              .size(22, 9) // <----
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          Text.create("Arrival destination")
              .text(TextUtil.cycleString(arrival.destination()))
              .pos(26.5, rowY)
              .size(60, 9)
              .scaleXY() // <----
              .scale(0.80)
              .color(0xFFFFFF)
              .draw(ctx);

          let car_length = arrival.carCount();
          if (car_length > 2 && car_length < 5) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_2_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length > 7) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_4_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length > 5 && car_length < 8) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_3_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 3) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/berlin_1_s_bahn.png")
                .pos(79, rowY)
                .size(30, 5)
                .draw(ctx);
          }

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.5) {
            eta = ""
          } else {
            eta = Math.round(eta) + " min  "
          }
          Text.create("Arrival ETA")
              .text(eta)
              .color(0xFFFFFF)
              .pos(pids.width + 1, rowY)
              .scale(0.80)
              .size(30, 9) // <----
              .scaleXY() // <----
              .rightAlign()
              .draw(ctx);

          rowY = rowY + 13.3
        }
      }
    }
  } else {
    Texture.create("Background")
        .texture("jsblock:custom_directory/berlin_s_bahn.png")
        .size(pids.width, pids.height)
        .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}