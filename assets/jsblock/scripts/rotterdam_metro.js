include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/rotterdam_metro.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let page = 1
  let pageMsg = customMsgs.find(item => item.includes("page:"))
  if (pageMsg) {
    page = pageMsg.replace("page:", "")
    if (page < 1) {
      page = 1
    }
  }

  if (pids.station() != null) {
    let platform
    if (pids.arrivals().get(0) != null) {platform = pids.arrivals().get(0).platformName()} else {platform = "-"}
    Text.create("station name")
        .pos(35, 1)
        .text(pids.station().getName().replace("|", " "))
        .size(pids.width, 10)
        .scaleXY()
        .scale(0.55)
        .color(0xFFFFFF)
        .draw(ctx)

    Text.create("platform")
        .pos(pids.width - 2, 1)
        .text("Spoor " + platform)
        .size(pids.width, 10)
        .scaleXY()
        .scale(0.55)
        .color(0xFFFFFF)
        .rightAlign()
        .draw(ctx)

    let platform_colors = {}
    let x = true
    for (let i = 0; x === true; i++) {
      let arrival = pids.arrivals().get(i);

      if (arrival != null) {
        if (!platform_colors[arrival.routeNumber()]) {
          platform_colors[arrival.routeNumber()] = {
            "route": arrival.routeNumber(),
            "color": arrival.routeColor()
          }
        }
      } else {x = false}
    }

    let platform_list = [];
    for (let key in platform_colors) {
      platform_list.push(platform_colors[key]);
    }

    for (let i = 0; i < platform_list.length; i++) {
      let posX = 35 + pids.station().getName().replace("|", " ").length() * 3 + i * 5.5

      Texture.create("Background")
          .texture("jsblock:custom_directory/lrr_u_bahn.png")
          .pos(posX, 0.5)
          .size(5, 5)
          .color(platform_list[i].color)
          .draw(ctx);

      Text.create("platform")
          .pos(posX + 2.5, 1)
          .text(platform_list[i].route)
          .size(10, 10)
          .scaleXY()
          .centerAlign()
          .scale(0.45)
          .color(0xFFFFFF)
          .draw(ctx)
    }
  }

  for (let i = 3 * (page - 1); i < 3 * page; i++) {
    let eta = null
    let rowY = 5 + ((i - 3 * (page - 1)) * 14);
    let arrival = pids.arrivals().get(i);

    if (arrival != null) {
      eta = (arrival.arrivalTime() - Date.now()) / 60000;
    }

    if (eta != null) {
      if (eta < 0.5) {
        Texture.create("Background")
            .texture("jsblock:custom_directory/rotterdam_background_arrive.png")
            .pos(10, rowY + 10)
            .size(pids.width, pids.height)
            .draw(ctx);
      } else {
        Texture.create("Background")
            .texture("jsblock:custom_directory/rotterdam_background.png")
            .pos(10, rowY + 10)
            .size(pids.width, pids.height)
            .draw(ctx);
      }
    } else {
      Texture.create("Background")
          .texture("jsblock:custom_directory/rotterdam_background.png")
          .pos(10, rowY + 10)
          .size(pids.width, pids.height)
          .draw(ctx);
    }

    if (arrival != null) {
      eta = (arrival.arrivalTime() - Date.now()) / 60000;
      Text.create("Number Text")
          .text(arrival.routeNumber())
          .pos(10, rowY)
          .size(18, 25)  // <----
          .scaleXY() // <----
          .scale(1.3)
          .color(0xFFB600)
          .draw(ctx);

      Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination().toUpperCase()))
          .pos(35, rowY)
          .size(75, 25)
          .scale(1.3)
          .scaleXY() // <----
          .color(0xFFB600)
          .draw(ctx);

      if (eta >= 0.5) {
        eta = Math.round(eta) + " min"
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xFFB600)
            .pos(pids.width - 10, rowY)
            .size(30, 25)
            .scale(1.3)
            .rightAlign()
            .scaleXY()
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}