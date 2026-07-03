include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:assets/dynamic_frankfurt/head.png")
      .size(pids.height, pids.height / 3)
      .zOrder(0)
      .draw(ctx);

  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let platform_list = [];
  if (pids.station() != null) {
    Text.create("station name")
        .pos(8, 17)
        .text(pids.station().getName().replace("|", " "))
        .size(70, 10)
        .scaleXY()
        .scale(0.85)
        .color(0x222B7B)
        .zOrder(1)
        .draw(ctx)

    let routes = {}
    let x = true
    for (let i = 0; x === true; i++) {
      let arrival = pids.arrivals().get(i);

      if (arrival != null) {
        let routeKey = arrival.routeNumber() + "-" + arrival.destination()

        if (!routes[routeKey]) {
          routes[routeKey] = {
            "route": arrival.routeNumber(),
            "destination": arrival.destination(),
          }
        }
      } else {
        x = false
      }
    }

    for (let key in routes) {
      platform_list.push(routes[key]);
    }

    platform_list.sort((a, b) => a["route"].localeCompare(b["route"]))

    for (let i = 0; i < platform_list.length; i++) {
      Texture.create("Background")
          .texture("jsblock:assets/dynamic_frankfurt/route.png")
          .pos(0, pids.height / 3 + i * pids.height / 7.227)
          .size(pids.height, pids.height / 7.227)
          .zOrder(0)
          .draw(ctx);

      Text.create("routes")
          .pos(26, pids.height / 3 + i * pids.height / 7.227 + 2)
          .text(platform_list[i].route)
          .size(19, 10)
          .scaleXY()
          .scale(0.8)
          .color(0x222B7B)
          .rightAlign()
          .zOrder(1)
          .draw(ctx)

      if (platform_list[i].destination.includes("|")) {
        Text.create("destination 1")
            .pos(28, pids.height / 3 + i * pids.height / 7.227 + 1.5)
            .text(String(platform_list[i].destination).split("|")[0])
            .size(65, 10)
            .scaleXY()
            .scale(0.4)
            .color(0x222B7B)
            .zOrder(1)
            .draw(ctx)

        Text.create("destination 2")
            .pos(28, pids.height / 3 + i * pids.height / 7.227 + 5.5)
            .text(String(platform_list[i].destination).split("|")[1])
            .size(65, 10)
            .scaleXY()
            .scale(0.4)
            .color(0x222B7B)
            .zOrder(1)
            .draw(ctx)
      } else {
        Text.create("destination")
            .pos(28, pids.height / 3 + i * pids.height / 7.227 + 3.5)
            .text(platform_list[i].destination)
            .size(65, 10)
            .scaleXY()
            .scale(0.45)
            .color(0x222B7B)
            .zOrder(1)
            .draw(ctx)
      }
    }
  }

  Texture.create("Background")
      .texture("jsblock:assets/dynamic_frankfurt/bottom.png")
      .size(pids.height, pids.height / 1.6)
      .pos(0, (platform_list.length + 2.41) * pids.height / 7.227)
      .zOrder(0)
      .draw(ctx);

  let date = new Date;
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');

  Text.create("clock")
      .text(time)
      .pos(60.75, (platform_list.length + 2.41) * pids.height / 7.227)
      .size(20, 25)
      .scaleXY()
      .scale(0.8)
      .color(0xFFB600)
      .zOrder(1)
      .centerAlign()
      .draw(ctx);

  for (let i = 0; i < 4; i++) {
    let rowY = 37.5 + (i * 5.5) + platform_list.length * pids.height / 7.227;
    let arrival = pids.arrivals().get(i);

    if (arrival != null) {
      let eta = (arrival.arrivalTime() - Date.now()) / 60000;
      Text.create("route")
          .text(arrival.routeNumber())
          .pos(7, rowY)
          .size(15, 25)
          .scaleXY()
          .scale(0.62)
          .color(0xFFB600)
          .zOrder(1)
          .draw(ctx);

      Text.create("destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(18, rowY)
          .size(68, 25)
          .scaleXY()
          .scale(0.62)
          .color(0xFFB600)
          .zOrder(1)
          .draw(ctx);

      if (eta >= 0.5) {
        eta = Math.round(eta)
      } else {
        eta = 0
      }

      Text.create("Arrival ETA")
          .text(eta)
          .pos(68.5, rowY)
          .size(82, 25)
          .scaleXY()
          .scale(0.62)
          .color(0xFFB600)
          .zOrder(1)
          .rightAlign()
          .draw(ctx);
    }
  }
}

function dispose(ctx, state, pids) {
}