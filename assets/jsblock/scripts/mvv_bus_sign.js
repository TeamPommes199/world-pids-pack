include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let sizeX = 48
  let sizeY = function(x, y) {return 48/x*y}

  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let departures = 0
  let departuresMsg = customMsgs.find(item => item.includes("departures:"))
  if (departuresMsg) {
    departures = departuresMsg.replace("departures:", "")
    if (departures < 0) {
      departures = 0
    } else if (departures == 1) {
      departures = 2
    } else if (departures == 3 || departures > 4) {
      departures = 4
    }
  }

  let variant = ""
  let color = false
  let variantMsg = customMsgs.find(item => item.includes("variant:"))
  if (variantMsg) {
    variant = "_" + variantMsg.replace("variant:", "").trim()
    if (variant.includes("#")) {
      let rawColor = variant.split("#")[1]
      color = parseInt(rawColor, 16)

      variant = variant.split("#")[0]
    }
  }

  Texture.create("Background")
      .texture(`jsblock:assets/mvv_bus_sign/bottom${variant}.png`)
      .size(sizeX, sizeY(600, 1269))
      .pos(0, 80 - sizeY(600, 369))
      .zOrder(0)
      .draw(ctx);

  let platform_list = [];
  if (pids.station() != null) {
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

    if (platform_list.length < 5) {
      for (let i = 0; i < 5 - platform_list.length - departures / 2; i++) {
        let rowY = 80 - sizeY(600, 369) - 12 * (i + 1 + departures / 2)
        Texture.create("Background")
            .texture(`jsblock:assets/mvv_bus_sign/linie${variant}.png`)
            .pos(0, rowY)
            .size(sizeX, sizeY(600, 150))
            .zOrder(0)
            .draw(ctx);
      }
    }

    for (let i = 0; i < platform_list.length; i++) {
      let rowY = 80 - sizeY(600, 369) - 12 * (i + 1 + departures / 2 + Math.max(0, 5 - platform_list.length - departures / 2))
      Texture.create("Background")
          .texture(`jsblock:assets/mvv_bus_sign/linie${variant}.png`)
          .pos(0, rowY)
          .size(sizeX, sizeY(600, 150))
          .zOrder(0)
          .draw(ctx);

      Text.create("routes")
          .pos(3.5, rowY + 3)
          .text(platform_list[i].route)
          .size(16, 10)
          .scaleXY()
          .scale(0.8)
          .color(color ? color : 0xffffff)
          .zOrder(1)
          .draw(ctx)

      if (platform_list[i].destination.includes("|")) {
        Text.create("destination 1")
            .pos(18, rowY + 3)
            .text(String(platform_list[i].destination).split("|")[0])
            .size(80, 10)
            .scaleXY()
            .scale(0.32)
            .color(color ? color : 0xffffff)
            .zOrder(1)
            .draw(ctx)

        Text.create("destination 2")
            .pos(18, rowY + 7)
            .text(String(platform_list[i].destination).split("|")[1])
            .size(80, 10)
            .scaleXY()
            .scale(0.32)
            .color(color ? color : 0xffffff)
            .zOrder(1)
            .draw(ctx)
      } else {
        Text.create("destination")
            .pos(18, rowY + 3.5)
            .text(platform_list[i].destination)
            .size(65, 10)
            .scaleXY()
            .scale(0.4)
            .color(color ? color : 0xffffff)
            .zOrder(1)
            .draw(ctx)
      }
    }

    let negativRowY = Math.max(0, 5 - platform_list.length - departures / 2)
    if (pids.station().getName().includes("|")) {
      let rowY = sizeY(600, 369) + 8
      let stationY = 68 - rowY - 12 * (platform_list.length + departures / 2 + negativRowY)

      Text.create("station name 1")
          .pos(24, stationY + 6)
          .text(String(pids.station().getName()).split("|")[0] + ",")
          .size(70, 10)
          .scaleXY()
          .scale(0.65)
          .color(color ? color : 0x004ea5)
          .centerAlign()
          .zOrder(1)
          .draw(ctx)

      Text.create("station name 2")
          .pos(24, stationY + 12)
          .text(String(pids.station().getName()).split("|")[1])
          .size(70, 10)
          .scaleXY()
          .scale(0.65)
          .color(color ? color : 0x004ea5)
          .centerAlign()
          .zOrder(1)
          .draw(ctx)
    } else {
      Text.create("station name")
          .pos(24, 68 - sizeY(600, 369) - 12 * (platform_list.length + departures / 2 + negativRowY))
          .text(pids.station().getName().replace("|", " "))
          .size(70, 10)
          .scaleXY()
          .scale(0.65)
          .color(color ? color : 0x004ea5)
          .centerAlign()
          .zOrder(1)
          .draw(ctx)
    }
  }

  let negativRowY = Math.max(0, 5 - platform_list.length - departures / 2)
  Texture.create("Background")
      .texture(`jsblock:assets/mvv_bus_sign/head${variant}.png`)
      .size(sizeX, sizeY(600, 660))
      .pos(0, 80 - sizeY(600, 369) - sizeY(600, 660) - 12 * (platform_list.length + departures / 2 + (negativRowY)))
      .zOrder(0)
      .draw(ctx);

  if (departures != 0) {
    if (departures == 2) {
      Texture.create("Background")
          .texture(`jsblock:assets/mvv_bus_sign/display_2${variant}.png`)
          .pos(0, 80 - sizeY(600, 369) - sizeY(600, 150))
          .size(sizeX, sizeY(600, 150))
          .zOrder(0)
          .draw(ctx);
    } else {
      Texture.create("Background")
          .texture(`jsblock:assets/mvv_bus_sign/display_4${variant}.png`)
          .pos(0, 80 - sizeY(600, 369) - sizeY(600, 300))
          .size(sizeX, sizeY(600, 300))
          .zOrder(0)
          .draw(ctx);
    }

    for (let i = 0; i < departures; i++) {
      let rowY
      if (departures == 2) {
        rowY = 80 - sizeY(600, 369) - sizeY(600, 150) + 1.5 + i * 5.25;
      } else {
        rowY = 80 - sizeY(600, 369) - sizeY(600, 300) + 1.5 + i * 5.5;
      }
      let arrival = pids.arrivals().get(i);

      if (arrival != null) {
        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        Text.create("route")
            .text(arrival.routeNumber())
            .pos(7, rowY)
            .size(12, 10)
            .scaleXY()
            .scale(0.45)
            .zOrder(1)
            .draw(ctx);

        Text.create("destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(13, rowY)
            .size(44, 10)
            .scaleXY()
            .scale(0.45)
            .zOrder(1)
            .draw(ctx);

        if (eta >= 0.5) {
          eta = Math.round(eta) + " min"
        } else {
          eta = "jetzt"
        }

        Text.create("Arrival ETA")
            .text(eta)
            .pos(41.75, rowY)
            .size(18, 10)
            .scaleXY()
            .scale(0.45)
            .zOrder(1)
            .rightAlign()
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}