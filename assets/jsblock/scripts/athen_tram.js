include(Resources.id("jsblock:scripts/pids_util.js"));

function isDark(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
  );

  return hsp < 150;
}

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:assets/athen_tram.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let page = 1
  let pageMsg = customMsgs.find(item => item.includes("page:"))
  let arrival_first = pids.arrivals().get(0);
  if (pageMsg) {
    page = pageMsg.replace("page:", "")
    if (page < 1) {page = 1}
    arrival_first = pids.arrivals().get((page - 1) * 4);
  }

  let color = 0xFFFFFF
  if (pids.station() != null) {color = pids.station().getColor()}

  Texture.create("Background")
      .texture("jsblock:assets/general/long_quad_full.png")
      .pos(0, 7.1)
      .size(131, 6.2)
      .color(color)
      .draw(ctx);

  if (pids.station() != null) {
    Text.create("station name")
        .text(pids.station().getName().replace("|", " ").toUpperCase())
        .pos(2, 7.75)
        .size(100, 10)
        .scaleXY()
        .scale(0.6)
        .color(isDark(color) ? 0xFFFFFF : 0x000000)
        .draw(ctx);
  }

  Text.create("date")
      .text(`${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}`)
      .pos(129, 7.75)
      .size(100, 10)
      .scaleXY()
      .scale(0.6)
      .rightAlign()
      .color(isDark(color) ? 0xFFFFFF : 0x000000)
      .draw(ctx);

  Text.create("clock")
      .text(`${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`)
      .pos(157, 23)
      .size(50, 10)
      .scaleXY()
      .scale(1.5)
      .centerAlign()
      .color(0xffffff)
      .draw(ctx);

  Text.create("tram text")
      .text("TRAM")
      .pos(3, 14.5)
      .size(24, 10)
      .scale(0.45)
      .color(0xffffff)
      .draw(ctx);

  Text.create("destination text")
      .text("DESTINATION")
      .pos(27, 14.5)
      .size(100, 10)
      .scale(0.45)
      .color(0xffffff)
      .draw(ctx);

  Text.create("arrival text")
      .text("ARRIVAL")
      .pos(112, 14.5)
      .color(0xffffff)
      .size(30, 10)
      .scale(0.45)
      .draw(ctx);

  if (arrival_first != null) {
    for (let i = 4 * (page - 1); i < 4 * page; i++) {
      let rowY = 20.5 + ((i - 4 * (page - 1)) * 8.5);
      let arrival = pids.arrivals().get(i);
      if(arrival != null) {
        Text.create("Number Text")
            .text(arrival.routeNumber())
            .pos(3, rowY)
            .size(24, 10)
            .scaleXY()
            .scale(0.65)
            .color(0xffffff)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination().toUpperCase()))
            .pos(27, rowY)
            .size(100, 10)
            .scale(0.65)
            .scaleXY()
            .color(0xffffff)
            .draw(ctx);

        let eta = (arrival.departureTime() - Date.now()) / 60000;
        if (eta > 0.65) {
          eta = Math.round(eta) + "'"
        } else {
          if (((arrival.departureTime() - Date.now()) / 1000) % 2 < 1) {
            eta = Math.round(eta) + "'"
          } else {
            eta = ""
          }
        }
        Text.create("Arrival ETA")
            .text(eta)
            .color(0xffffff)
            .pos(116, rowY)
            .size(30, 10)
            .scale(0.65)
            .scaleXY()
            .draw(ctx);
      }
    }
  }

  if (pids.getCustomMessage(2) != "") {
    Texture.create("Background")
        .texture("jsblock:assets/general/long_quad_full.png")
        .pos(0, 43.4)
        .size(pids.width, 9.5)
        .draw(ctx);

    Text.create("Arrival ETA")
        .text(pids.getCustomMessage(2))
        .color(0x000000)
        .pos(0, 45)
        .size(pids.width / 0.71, 10)
        .scale(0.7)
        .marquee()
        .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}