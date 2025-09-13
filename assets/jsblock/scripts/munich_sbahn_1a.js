function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let msg_rows = 4
  for (let customMsg of customMsgs) {
    if (customMsg.includes("rows:")) {
      msg_rows = customMsg.replace("rows:", "")
    }
  }

  let only_first = false
  let onlyFirstMsg = customMsgs.find(item => item.includes("only_first"))
  if (onlyFirstMsg) {
    only_first = true
  }

  let only_arrivals = false
  let onlyArrivalsMsg = customMsgs.find(item => item.includes("only_arrivals"))
  if (onlyArrivalsMsg) {
    only_arrivals = true
  }

  let page = 1
  let pageMsg = customMsgs.find(item => item.includes("page:"))
  let arrival_first = pids.arrivals().get(0);
  if (pageMsg) {
    page = pageMsg.replace("page:", "")
    if (page < 1) {page = 1}
    arrival_first = pids.arrivals().get((page - 1) * msg_rows);
  }

  if (arrival_first != null) {
    if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 0.6 && !only_arrivals || only_first && !only_arrivals) {
      let rowY = 5;

      Texture.create("Background_Blank")
          .texture("jsblock:custom_directory/blank.png")
          .size(pids.width, pids.height)
          .draw(ctx);

      if (arrival_first != null) {
        Texture.create("arrival_first Circle Colored Full")
            .texture("jsblock:custom_directory/lrr_full.png")
            .pos(1, rowY)
            .size(33.5, 17)
            .draw(ctx);

        Texture.create("arrival_first Circle Colored")
            .texture("jsblock:custom_directory/lrr.png")
            .pos(2, rowY + 1)
            .size(31.5, 15)
            .color(arrival_first.routeColor())
            .draw(ctx);

        if (pids.station() && arrival_first.route()) {
          let stops = arrival_first.route().getPlatforms().toArray().map((platform) => platform.stationName);
          let stops_at = ""
          let stationClean = pids.station().getName().normalize("NFC").trim();
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
              .pos(45, 27)
              .size(150, 8.25)
              .scaleXY() // <----
              .scale(0.88)
              .color(0xFFFFFF)
              .draw(ctx);
        }

        Text.create("arrival_first Number Text")
            .text(arrival_first.routeNumber())
            .scale(1.5)
            .centerAlign()
            .pos(19, rowY + 2)
            .size(18, 10.5) // <----
            .scaleXY() // <----
            .color(0xFFFFFF)
            .draw(ctx);

        Text.create("arrival_first destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .pos(45, 37)
            .size(50, 8.25)
            .scaleXY() // <----
            .scale(1.75)
            .color(0xFFFFFF)
            .draw(ctx);

        let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
          eta = ""
        } else {
          eta = Math.round(eta);
          eta = eta + " min."
        }
        Text.create("Arrival ETA")
            .text(eta)
            .pos(5, 27)
            .size(40, 6)
            .scaleXY() // <----
            .scale(1.4) // <----
            .color(0xFFFFFF)
            .draw(ctx);

        let car_length = arrival_first.carCount();
        if (car_length > 4 && car_length < 9) {
          if (customMsgs.includes("icon: front")) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_2_front.png")
                .pos(2, 42)
                .size(40, 6.67)
                .draw(ctx);
          } else if (customMsgs.includes("icon: rear")) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_2_rear.png")
                .pos(2, 42)
                .size(40, 6.67)
                .draw(ctx);
          } else {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_2.png")
                .pos(2, 42)
                .size(40, 6.67)
                .draw(ctx);
          }
        } else if (car_length > 8) {
          Texture.create("arrival_first Car length")
              .texture("jsblock:custom_directory/munich_3.png")
              .pos(2, 42)
              .size(40, 6.67)
              .draw(ctx);
        } else if (car_length < 5) {
          if (customMsgs.includes("icon: front")) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_1_front.png")
                .pos(2, 42)
                .size(40, 6.67)
                .draw(ctx);
          } else if (customMsgs.includes("icon: rear")) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_1_rear.png")
                .pos(2, 42)
                .size(40, 6.67)
                .draw(ctx);
          } else {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_1.png")
                .pos(2, 42)
                .size(40, 6.67)
                .draw(ctx);
          }
        }
        Text.create("arrival_first Car A B C")
            .text("A   B   C")
            .pos(7, 51)
            .size(45, 6.8)
            .scale(0.75)
            .color(0xFFFFFF)
            .draw(ctx);
        for (let customMsg of customMsgs) {
          if (customMsg.includes(arrival_first.routeNumber(), ":")) {
            let customMsg_r = customMsg.replace(arrival_first.routeNumber() + ":", "")
            Text.create("Custom Text")
                .text(TextUtil.cycleString(customMsg_r))
                .pos(45, 10)
                .size(85, 4)
                .scale(1)
                .color(0xFFFF00)
                .marquee()
                .draw(ctx);
          }
        }
      }
    } else {
      Texture.create("Background")
          .texture("jsblock:custom_directory/munich_1a.png")
          .size(pids.width, pids.height)
          .draw(ctx);

      let rows = 1
      let rowY = 11
      let extra_i
      for (let i = msg_rows * (page - 1); i < msg_rows * page; i++) {
        let arrival = pids.arrivals().get(i);
        if (arrival != null && rows < 4) {
          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(1, rowY - 2)
              .size(21, 10)
              .color(arrival.routeColor())
              .draw(ctx);

          Text.create("Number Text")
              .text(arrival.routeNumber())
              .scale(0.75)
              .centerAlign()
              .pos(11, rowY)
              .size(22, 9) // <----
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          Text.create("Arrival destination")
              .text(TextUtil.cycleString(arrival.destination()))
              .pos(25, rowY)
              .size(130, 9)
              .scaleXY() // <----
              .scale(0.80)
              .color(0xFFFFFF)
              .draw(ctx);

          let car_length = arrival.carCount();
          if (car_length > 4 && car_length < 9) {
            if (customMsgs.includes("icon: front")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_2_front.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else if (customMsgs.includes("icon: rear")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_2_rear.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_2.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            }
          } else if (car_length > 8) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_3.png")
                .pos(140, rowY - 0.2)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 5) {
            if (customMsgs.includes("icon: front")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_1_front.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else if (customMsgs.includes("icon: rear")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_1_rear.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_1.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            }
          }

          Text.create("Platform Track")
              .text(arrival.platformName())
              .pos(133.5, rowY)
              .size(9, 9) // <----
              .scaleXY() // <----
              .centerAlign()
              .scale(0.80)
              .color(0xFFFFFF)
              .draw(ctx);

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.5) {
            eta = ""
          } else {
            eta = Math.round(eta)
          }
          Text.create("Arrival ETA")
              .text(eta)
              .color(0xFFFFFF)
              .pos(pids.width - 0.5, rowY)
              .scale(0.80)
              .size(30, 9) // <----
              .scaleXY() // <----
              .rightAlign()
              .draw(ctx);

          rowY = rowY + 13.3
          rows = rows + 1

          for (let customMsg of customMsgs) {
            if (rows < 5 || pids.getCustomMessage(2) == "") {
              if (customMsg.includes(arrival.routeNumber(), ":")) {
                let customMsg_r = customMsg.replace(arrival.routeNumber() + ":", "")
                Text.create("Custom Text")
                    .text(TextUtil.cycleString(customMsg_r))
                    .scale(0.8)
                    .size(pids.width * 1.20, 9)
                    .pos(1, rowY - 1)
                    .color(0xFFFF00)
                    .marquee()
                    .draw(ctx);
                rowY = rowY + 13.3
                rows = rows + 1
              }
            }
          }
          extra_i = i + 1
        }
      }

      let customMsg_extra = pids.getCustomMessage(2);
      let arrival_extra = pids.arrivals().get(extra_i);
      if (customMsg_extra != "") {
        Text.create("Custom Text")
            .text(TextUtil.cycleString(customMsg_extra))
            .scale(0.8)
            .size(pids.width * 1.20, 9)
            .pos(1, 11 + (4 * 13.3))
            .color(0xFFFF00)
            .marquee()
            .draw(ctx);
      } else if (rows < 5 && msg_rows >= 4) {
        if (arrival_extra != null) {
          let rowY = 11 + (3 * 13.3);
          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(1, rowY - 2)
              .size(21, 10)
              .color(arrival_extra.routeColor())
              .draw(ctx);

          Text.create("Number Text")
              .text(arrival_extra.routeNumber())
              .scale(0.75)
              .centerAlign()
              .pos(11, rowY)
              .size(22, 9) // <----
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          Text.create("arrival_extra destination")
              .text(TextUtil.cycleString(arrival_extra.destination()))
              .pos(25, rowY)
              .size(130, 9)
              .scaleXY() // <----
              .scale(0.80)
              .color(0xFFFFFF)
              .draw(ctx);

          let car_length = arrival_extra.carCount();
          if (car_length > 4 && car_length < 9) {
            if (customMsgs.includes("icon: front")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_2_front.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else if (customMsgs.includes("icon: rear")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_2_rear.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_2.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            }
          } else if (car_length > 8) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/munich_3.png")
                .pos(140, rowY - 0.2)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 5) {
            if (customMsgs.includes("icon: front")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_1_front.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else if (customMsgs.includes("icon: rear")) {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_1_rear.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            } else {
              Texture.create("Car length")
                  .texture("jsblock:custom_directory/munich_1.png")
                  .pos(140, rowY - 0.2)
                  .size(30, 5)
                  .draw(ctx);
            }
          }

          Text.create("Platform Track")
              .text(arrival_extra.platformName())
              .pos(133.5, rowY)
              .size(9, 9) // <----
              .scaleXY() // <----
              .centerAlign()
              .scale(0.80)
              .color(0xFFFFFF)
              .draw(ctx);

          let eta = (arrival_extra.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.5) {
            eta = ""
          } else {
            eta = Math.round(eta)
          }
          Text.create("arrival_extra ETA")
              .text(eta)
              .color(0xFFFFFF)
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
    Texture.create("Background")
        .texture("jsblock:custom_directory/munich_1a.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let customMsg = pids.getCustomMessage(2);
    if (customMsg != "") {
      Text.create("Custom Text")
          .text(TextUtil.cycleString(customMsg))
          .scale(0.8)
          .size(pids.width * 1.20, 9)
          .pos(1, 8 + (4 * 15))
          .color(0xFFFF00)
          .marquee()
          .draw(ctx);
    }
  }
}

function dispose(ctx, state, pids) {
}