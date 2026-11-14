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
      .texture("jsblock:assets/bucharest_metro/grid.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    Texture.create("Background")
        .texture("jsblock:assets/bucharest_metro/route_color.png")
        .size(pids.width, 13.4)
        .color(arrival_first.routeColor())
        .zOrder(1)
        .draw(ctx);

    Text.create("station name")
        .pos(pids.width - 11, 2)
        .text(arrival_first.routeNumber())
        .size(20, 10)
        .scaleXY()
        .centerAlign()
        .scale(1.1)
        .color(0xFFFFFF)
        .draw(ctx);

    for (let i = 0; i < 2; i++) {
      let rowY = 21 + (i * 28);
      let arrival = pids.arrivals().get(i);
      if (arrival != null) {
        let text_1
        if (i === 0) {
          text_1 = "Următorul tren circulă în direcția"
        } else {
          text_1 = "Trenul în direcția"
        }
        Text.create("text 1")
            .text(text_1)
            .pos(56, rowY - 6)
            .size(200, 10)
            .scaleXY()
            .centerAlign()
            .scale(0.36)
            .color(0xffffff)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(56, rowY)
            .size(70, 10)
            .scaleXY()
            .centerAlign()
            .scale(1.5)
            .color(0xffff00)
            .draw(ctx);

        Text.create("text 2")
            .text("Pleacă la ora")
            .pos(56, rowY + 15)
            .size(200, 10)
            .scaleXY()
            .centerAlign()
            .scale(0.36)
            .color(0xffffff)
            .draw(ctx);

        let etas = arrival.departureTime()
        let eta = new Date(etas)
        let hours = eta.getHours()
        let minutes = eta.getMinutes()
        eta = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')
          Text.create("Arrival ETA")
              .text(eta)
              .color(0xffffff)
              .pos(pids.width - 11, rowY + 2)
              .size(20, 10)
              .centerAlign()
              .stretchXY()
              .scale(1.1)
              .draw(ctx);
      }
    }

    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Text.create("Custom Text")
          .text(TextUtil.cycleString(customMsg))
          .scale(0.7)
          .size((pids.width - 3) / 0.7, 10)
          .pos(0.5, pids.height - 6)
          .color(0xffffff)
          .marquee()
          .draw(ctx);
    }
  } else {
    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Text.create("Custom Text")
      .text(TextUtil.cycleString(customMsg))
      .scale(1)
      .size(pids.width - 3, 7)
      .pos(0.5, pids.height - 8.5)
      .color(0xffffff)
      .marquee()
      .draw(ctx);
    }
  }

  if (pids.station() != null) {
    Text.create("station name")
        .pos(pids.width / 2, 2)
        .text(pids.station().getName().replace("|", " "))
        .size(75, 10)
        .scaleXY()
        .centerAlign()
        .scale(1.1)
        .color(isDark(arrival_first.routeColor()) ? 0xFFFFFF : 0x000000)
        .draw(ctx)
  }

  let now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let time = hours + ":" + minutes

  Text.create("Clock")
      .text(time)
      .color(0xffff00)
      .size(20, 10)
      .pos(12.5, 3)
      .centerAlign()
      .stretchXY()
      .scale(1.1)
      .draw(ctx);
}

function dispose(ctx, state, pids) {
}