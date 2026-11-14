include(Resources.id("jsblock:scripts/pids_util.js"));

function darkColor(hexColor) {
  let r = (hexColor >> 16) & 0xFF;
  let g = (hexColor >> 8) & 0xFF;
  let b = hexColor & 0xFF;

  r = Math.max(0, r - 20);
  g = Math.max(0, g - 20);
  b = Math.max(0, b - 20);

  return (r << 16) | (g << 8) | b;
}

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
    arrival_first = pids.arrivals().get((page - 1) * 2);
  }

  if (arrival_first != null) {
    Texture.create("Background")
        .texture("jsblock:assets/general/long_quad_full.png")
        .size(pids.width, 7)
        .pos(0, 2)
        .color(darkColor(arrival_first.routeColor()))
        .zOrder(0)
        .draw(ctx);

    Texture.create("Background")
        .texture("jsblock:assets/general/long_quad_full.png")
        .size(pids.width, pids.height / 2 - 12)
        .pos(0, 9)
        .color(arrival_first.routeColor())
        .zOrder(0)
        .draw(ctx);

    Text.create("Arrival destination")
        .text(String(arrival_first.destination()).split("|", 2)[0])
        .pos(3, 15)
        .size(70, 10)
        .scale(1.35)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

    if (String(arrival_first.destination()).split("|", 2)[1] !== undefined) {
      Text.create("Arrival destination language")
          .text(String(arrival_first.destination()).split("|", 2)[1])
          .pos(3, 26)
          .size(70, 10)
          .scale(0.75)
          .scaleXY()
          .color(0xFFFFFF)
          .draw(ctx);
    }

    Texture.create("Background")
        .texture("jsblock:assets/general/circle_full.png")
        .size(7, 7)
        .pos(92.5, 26.25)
        .color(darkColor(arrival_first.routeColor()))
        .zOrder(1)
        .draw(ctx);

    Text.create("Number Text")
        .text(arrival_first.routeNumber())
        .pos(96, 28)
        .size(10, 10)
        .scaleXY()
        .centerAlign()
        .scale(0.4)
        .color(0xFFFFFF)
        .draw(ctx);

    let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
    eta = Math.round(eta)
    if (eta < 0.5) {
      eta = 0
    }

    Text.create("Arrival ETA")
        .text(eta)
        .color(0xFFFFFF)
        .pos(pids.width - 13, 12)
        .size(15, 10)
        .scale(1.75)
        .centerAlign()
        .scaleXY()
        .draw(ctx);

    Text.create("ETA text")
        .text("МИНУТИ/MINUTES")
        .color(0xFFFFFF)
        .pos(pids.width - 13, 20)
        .size(15, 10)
        .scale(1.75)
        .centerAlign()
        .scaleXY()
        .draw(ctx);
  }

  let arrival_second = pids.arrivals().get((page - 1) * 2 + 1)
  if (arrival_second != null) {
    Texture.create("Background")
        .texture("jsblock:assets/general/long_quad_full.png")
        .size(pids.width, 7)
        .pos(0, pids.height / 2 - 3)
        .color(darkColor(arrival_second.routeColor()))
        .zOrder(0)
        .draw(ctx);

    Texture.create("Background")
        .texture("jsblock:assets/general/long_quad_full.png")
        .size(pids.width, pids.height / 2 - 8)
        .pos(0, pids.height / 2 + 4)
        .color(arrival_second.routeColor())
        .zOrder(0)
        .draw(ctx);

    Text.create("Arrival destination")
        .text(String(arrival_second.destination()).split("|", 2)[0])
        .pos(3, 15 + pids.height / 2 - 2)
        .size(70, 10)
        .scale(1.35)
        .scaleXY()
        .color(0xFFFFFF)
        .draw(ctx);

    if (String(arrival_second.destination()).split("|", 2)[1] !== undefined) {
      Text.create("Arrival destination language")
          .text(String(arrival_second.destination()).split("|", 2)[1])
          .pos(3, 26 + pids.height / 2 - 2)
          .size(70, 10)
          .scale(0.75)
          .scaleXY()
          .color(0xFFFFFF)
          .draw(ctx);
    }

    Texture.create("Background")
        .texture("jsblock:assets/general/circle_full.png")
        .size(7, 7)
        .pos(92.5, 26.25 + pids.height / 2 - 2)
        .color(darkColor(arrival_second.routeColor()))
        .zOrder(1)
        .draw(ctx);

    Text.create("Number Text")
        .text(arrival_second.routeNumber())
        .pos(96, 28 + pids.height / 2 - 2)
        .size(10, 10)
        .scaleXY()
        .centerAlign()
        .scale(0.4)
        .color(0xFFFFFF)
        .draw(ctx);

    let eta = (arrival_second.arrivalTime() - Date.now()) / 60000;
    eta = Math.round(eta)
    if (eta < 0.5) {
      eta = 0
    }

    Text.create("Arrival ETA")
        .text(eta)
        .color(0xFFFFFF)
        .pos(pids.width - 13, 12 + pids.height / 2 - 2)
        .size(15, 10)
        .scale(1.75)
        .centerAlign()
        .scaleXY()
        .draw(ctx);

    Text.create("ETA text")
        .text("МИНУТИ/MINUTES")
        .color(0xFFFFFF)
        .pos(pids.width - 13, 20 + pids.height / 2 - 2)
        .size(15, 10)
        .scale(1.75)
        .centerAlign()
        .scaleXY()
        .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}