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

  let rows = 5
  let rowsMsg = customMsgs.find(item => item.includes("rows:"))
  if (rowsMsg) {
    rows = rowsMsg.replace("rows:", "")
    if (rows > 8) {
      rows = 8
    } else if (rows < 1) {
      rows = 1
    }
  }

  let showEtaMsg = customMsgs.find(item => item.includes("show_minutes"))
  let show_minutes = false
  if (showEtaMsg) {
    show_minutes = true
  }

  let color = 0xFF0000
  if (pids.station() != null) {color = pids.station().getColor()}

  Texture.create("Background")
      .texture("jsblock:assets/ruhr/background.png")
      .size(pids.width, pids.height)
      .color(color)
      .draw(ctx);

  Texture.create("Top White")
      .texture("jsblock:assets/ruhr/white_bar.png")
      .size(pids.width, 12.7)
      .draw(ctx);

  if (pids.station() != null) {
    Text.create("station name")
        .pos(pids.width / 2, 4.5)
        .text(pids.station().getName().replace("|", " "))
        .size(pids.width - 30, 10)
        .scaleXY()
        .scale(0.8)
        .centerAlign()
        .zOrder(2)
        .color(0x000000)
        .draw(ctx)
  }

  let now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let time = hours + ":" + minutes

  Text.create("Clock")
      .text(time)
      .pos(pids.width - 2, 4.5)
      .color(0x000000)
      .size(pids.width - 30, 10)
      .rightAlign()
      .scaleXY()
      .zOrder(2)
      .scale(0.8)
      .draw(ctx);

  let multiple_platforms = false
  if (pids.arrivals().platforms().length > 1) {
    multiple_platforms = true
  }

  Text.create("Linie")
      .text("Linie")
      .color(isDark(color) ? 0xFFFFFF : 0x000000)
      .size(pids.width, 10)
      .pos(2, 13)
      .scaleXY()
      .scale(0.45)
      .zOrder(1)
      .draw(ctx);

  Text.create("Richtung")
      .text("Richtung")
      .color(isDark(color) ? 0xFFFFFF : 0x000000)
      .size(pids.width, 10)
      .pos(22, 13)
      .scaleXY()
      .scale(0.45)
      .zOrder(1)
      .draw(ctx);

  if (multiple_platforms) {
    Text.create("Steig")
        .text("Steig")
        .color(isDark(color) ? 0xFFFFFF : 0x000000)
        .size(pids.width, 10)
        .pos(pids.width - 37, 13)
        .scaleXY()
        .scale(0.45)
        .zOrder(1)
        .draw(ctx);
  }

  Text.create("Abfahrt")
      .text("Abfahrt")
      .color(isDark(color) ? 0xFFFFFF : 0x000000)
      .size(pids.width, 10)
      .pos(pids.width - 19, 13)
      .scaleXY()
      .scale(0.45)
      .zOrder(1)
      .draw(ctx);

  for (let i = rows * (page - 1); i < rows * page; i++) {
    let arrival = pids.arrivals().get(i);
    let rowY = 16.8 + ((pids.height - 16.8) / rows) * (i - rows * (page - 1));
    let extraY = 55 / rows * 0.318181818 - (0.075 * rows) - 0.375

    Texture.create("Top White")
        .texture("jsblock:assets/ruhr/white_bar.png")
        .pos(0, rowY)
        .size(pids.width, 0.5)
        .zOrder(1)
        .draw(ctx);

    if (arrival != null) {
      Text.create("routeNumber")
          .text(arrival.routeNumber())
          .pos(2, rowY + extraY)
          .color(0xFFFFFF)
          .size(25, 10)
          .scaleXY()
          .zOrder(2)
          .scale(0.65)
          .draw(ctx);

      Text.create("destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(22, rowY + extraY)
          .color(0xFFFFFF)
          .size(multiple_platforms ? 110 : 130, 10)
          .scaleXY()
          .zOrder(2)
          .scale(0.65)
          .draw(ctx);

      if (multiple_platforms) {
        Text.create("platform")
            .text(arrival.platformName())
            .pos(pids.width - 31.5, rowY + extraY)
            .color(0xFFFFFF)
            .size(20, 10)
            .scaleXY()
            .zOrder(2)
            .centerAlign()
            .scale(0.65)
            .draw(ctx);
      }

      let etas = arrival.departureTime()
      let eta
      if (etas - Date.now() < 30000) {
        eta = "sofort"
      } else if (etas - Date.now() < 600000 || show_minutes) {
        eta = Math.round((etas - Date.now()) / 60000) + " Min"
      } else {
        eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        eta = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')
      }
      Text.create("departure")
          .text(eta)
          .pos(pids.width - 2, rowY + extraY)
          .color(0xFFFFFF)
          .size(50, 10)
          .rightAlign()
          .scaleXY()
          .zOrder(2)
          .scale(0.65)
          .draw(ctx);
    }
  }
}

function dispose(ctx, state, pids) {
}