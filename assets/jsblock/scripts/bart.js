include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let showEtaMsg = customMsgs.find(item => item.includes("show_hh_mm"))
  let show_hh_mm = false
  if (showEtaMsg) {
    show_hh_mm = true
  }

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    Texture.create("Background")
        .texture("jsblock:assets/bart.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    let first_eta = (arrival_first.arrivalTime() - Date.now()) / 1000
    if (first_eta < 30) {
      if (first_eta < 0 || Math.round(first_eta) % 5 < 2.5) {
        Text.create("Number Text")
            .text(arrival_first.carCount() + "-CAR, " + arrival_first.routeNumber())
            .pos(pids.width / 2, 25)
            .size(pids.width, 25)
            .scaleXY()
            .scale(1.1)
            .centerAlign()
            .color(0xFF1122)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival_first.destination()))
            .pos(pids.width / 2, 5)
            .size(pids.width / 2 - 5, 22)
            .scale(1.8)
            .scaleXY()
            .centerAlign()
            .color(0xFF2211)
            .draw(ctx);
      }
    } else {
      let arrivalList = []
      for (let x = 0; x < 10; x++) {
        let arrival = pids.arrivals().get(x);
        if (arrival != null) {
          let addArrival = true
          for (let y = 0; y < arrivalList.length; y++) {
            if (
                arrivalList[y].routeNumber == arrival.routeNumber() &&
                arrivalList[y].carCount == arrival.carCount() &&
                arrivalList[y].destination == arrival.destination() &&
                arrivalList[y].secondETA == null
            ) {
              addArrival = false
              arrivalList[y].secondETA = arrival.arrivalTime()
            }
          }

          if (addArrival === true) {
            arrivalList.push({
              "routeNumber": arrival.routeNumber(),
              "carCount": arrival.carCount(),
              "destination": arrival.destination(),
              "firstETA": arrival.arrivalTime(),
              "secondETA": null
            })
          }
        }
      }

      for (let i = 0; i < 2; i++) {
        let rowY = i * 24;
        let arrival = arrivalList[i];
        if (arrival != null) {
          Text.create("Number Text")
              .text(arrival.carCount + "-CAR, " + arrival.routeNumber)
              .pos(8, rowY + 13)
              .size(pids.width, 25)
              .scaleXY()
              .scale(0.85)
              .color(0xFF1122)
              .draw(ctx);

          Text.create("Arrival destination")
              .text(TextUtil.cycleString(arrival.destination))
              .pos(8, rowY)
              .size(pids.width / 2 - 5, 22)
              .scale(1.3)
              .scaleXY()
              .color(0xFF2211)
              .draw(ctx);

          let eta;
          if (arrival.secondETA != null && !show_hh_mm) {
            eta = Math.round((arrival.firstETA - Date.now()) / 60000) + ", " + Math.round((arrival.secondETA - Date.now()) / 60000) + " MIN"
          } else if (arrival.secondETA != null && show_hh_mm) {
            let date = new Date(arrival.firstETA)
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let date_2 = new Date(arrival.secondETA)
            let hours_2 = date_2.getHours()
            let minutes_2 = date_2.getMinutes()
            eta =
                hours.toString().padStart(2, '0') + ":" +
                minutes.toString().padStart(2, '0') + ", " +
                hours_2.toString().padStart(2, '0') + ":" +
                minutes_2.toString().padStart(2, '0');
          } else if (!show_hh_mm) {
            eta = Math.round((arrival.firstETA - Date.now()) / 60000) + " MIN"
          } else {
            let date = new Date(arrival.firstETA)
            let hours = date.getHours()
            let minutes = date.getMinutes()
            eta = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
          }
          Text.create("Arrival ETA")
              .text(eta)
              .color(0xFF1122)
              .pos(pids.width - 8, rowY + 3)
              .size(70, 25)
              .scale(0.85)
              .scaleXY()
              .rightAlign()
              .draw(ctx);
        }
      }
    }
  } else {
    Texture.create("Background")
        .texture("jsblock:assets/bart.png")
        .size(pids.width, pids.height)
        .draw(ctx)
  }

  if (pids.station() != null) {
    if (arrival_first != null) {
      Text.create("station name")
          .pos(pids.width - 20, pids.height - 5)
          .text("Platform " + arrival_first.platformName())
          .color(0xFFFFFF)
          .scale(0.5)
          .rightAlign()
          .draw(ctx)
    }
  }
}

function dispose(ctx, state, pids) {
}