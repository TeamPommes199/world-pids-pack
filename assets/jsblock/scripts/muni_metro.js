include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    let arrivalList = []
    for (let x = 0; x < 20; x++) {
      let arrival = pids.arrivals().get(x);
      if (arrival != null) {
        let eta = arrival.arrivalTime()
        let addArrival = true
        for (let y = 0; y < arrivalList.length; y++) {
          if (
              arrivalList[y].routeNumber == arrival.routeNumber() &&
              arrivalList[y].destination == arrival.destination() &&
              arrivalList[y].routeColor == arrival.routeColor() &&
              arrivalList[y].secondETA == null
          ) {
            addArrival = false
            arrivalList[y].secondETA = eta
          } else if (arrivalList[y].destination == arrival.destination()) {
            addArrival = false
          }
        }

        if (addArrival === true) {
          arrivalList.push({
            "routeNumber": arrival.routeNumber(),
            "destination": arrival.destination(),
            "routeColor": arrival.routeColor(),
            "firstETA": eta,
            "secondETA": null
          })
        }
      } else {
        x = 20
      }
    }

    arrivalList.sort((a, b) => {
      const routeCompare = a["routeNumber"].localeCompare(b["routeNumber"]);
      if (routeCompare === 0) {
        return a["destination"].localeCompare(b["destination"]);
      }
      return routeCompare;
    });

    Texture.create("route_circle")
        .texture("jsblock:assets/general/circle_full.png")
        .pos(12, 1)
        .size(23, 23)
        .color(arrival_first.routeColor())
        .zOrder(0)
        .draw(ctx);

    Text.create("Arrival ETA")
        .text(arrival_first.routeNumber())
        .color(0xFFFFFF)
        .pos(24, 5)
        .size(11, 10)
        .scale(1.85)
        .scaleXY()
        .centerAlign()
        .zOrder(1)
        .draw(ctx);

    Text.create("Arrival ETA")
        .text(arrival_first.destination().replace("|", " "))
        .color(0xFFFFFF)
        .pos(38, 5)
        .size(72, 10)
        .scale(1.85)
        .scaleXY()
        .zOrder(1)
        .draw(ctx);

    Texture.create("route_circle")
        .texture("jsblock:assets/general/long_quad_full.png")
        .pos(0, 25)
        .size(pids.width, 1)
        .zOrder(0)
        .draw(ctx);

    for (let i = 0; i < 6; i++) {
      let rowX = (i % 3) * 64
      let rowY = Math.round((i - 1.5) / 3) * 16;
      let arrival = arrivalList[i];
      if (arrival != null) {
        Texture.create("route_circle")
            .texture("jsblock:assets/general/circle_full.png")
            .pos(1 + rowX, 27 + rowY)
            .size(15, 15)
            .color(arrival.routeColor)
            .zOrder(0)
            .draw(ctx);

        Text.create("Arrival ETA")
            .text(arrival.routeNumber)
            .color(0xFFFFFF)
            .pos(9 + rowX, rowY + 29.5)
            .size(11, 10)
            .scale(1.1)
            .scaleXY()
            .centerAlign()
            .zOrder(1)
            .draw(ctx);

        let eta;
        if (arrival.secondETA != null) {
          let eta_first = Math.round((arrival.firstETA - Date.now()) / 60000)
          let eta_second = Math.round((arrival.secondETA - Date.now()) / 60000)
          if (eta_first < 0.5) {
            if (eta_second < 0.5) {
              eta = "0, 0"
            } else {
              eta = "0, " + eta_second
            }
          } else {
            eta = eta_first + ", " + eta_second
          }
        } else {
          let eta_first = Math.round((arrival.firstETA - Date.now()) / 60000)
          if (eta_first < 0.5) {
            eta = "0"
          } else {
            eta = eta_first
          }
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xFFFFFF)
            .pos(17.5 + rowX, rowY + 29)
            .size(70, 10)
            .scale(1.3)
            .scaleXY()
            .zOrder(1)
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}