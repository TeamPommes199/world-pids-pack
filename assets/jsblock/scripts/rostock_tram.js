include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    `if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 0.5) {
      Texture.create("Background")
      .texture("jsblock:custom_directory/rostock_tram.png")
      .size(pids.width, pids.height)
      .draw(ctx);

      if (pids.station() != null) {
        Text.create("station name")
        .pos(2, 3)
        .text(pids.station().getName())
        .size(pids.width - 30, 10)
        .scaleXY()
        .scale(0.8)
        .color(0xFFFFFF)
        .draw(ctx)
      }

      let now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      let time = hours + ":" + minutes

      Text.create("Clock")
      .text(time)
      .color(0xFFFFFF)
      .size(pids.width - 30, 10)
      .pos(pids.width - 2, 3)
      .centerAlign()
      .scaleXY()
      .scale(0.8)
      .draw(ctx);

      let rowY = 16 + (0*10.3);
      Text.create("Number Text")
      .text(arrival_first.routeNumber())
      .centerAlign()
      .pos(15, rowY - 1.25)
      .size(20, 14)  // <----
      .scaleXY() // <----
      .color(0x000000)
      .draw(ctx);

      Text.create("arrival_first destination")
      .text(TextUtil.cycleString(arrival_first.destination()))
      .pos(30, rowY)
      .size(60, 18)
      .scaleXY() // <----
      .scale(0.8)
      .color(0x000000)
      .draw(ctx);

      for(let i = 1; i < 2; i++) {
        let rowY = 16 + ((i + 3) *10.3);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            Text.create("Number Text")
            .text(arrival.routeNumber())
            .centerAlign()
            .pos(9, rowY - 1.25)
            .size(10, 7)  // <----
            .scaleXY() // <----
            .color(0x000000)
            .draw(ctx);

            Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(20, rowY)
            .size(60, 9)
            .scaleXY() // <----
            .scale(0.56)
            .color(0x000000)
            .draw(ctx);

            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            let sizeX = 16
            eta = Math.round(eta) + " min";
            Text.create("Arrival ETA")
            .text(eta)
            .color(0x000000)
            .pos(pids.width - 16.5, rowY)
            .scale(0.7)
            .size(sizeX, 9) // <----
            .scaleXY() // <----
            .leftAlign()
            .draw(ctx);
        }
      }

    let customMsg_extra = pids.getCustomMessage(3);
    let arrival_extra = pids.arrivals().get(2);
    if(customMsg_extra != "") {
      Text.create("Custom Text")
      .text(TextUtil.cycleString(customMsg_extra))
      .scale(0.8)
      .size(pids.width + 8, 9)
      .pos(15, 3.5 + (7*9.3) - 1)
      .color(0xFFFFFF)
      .marquee()
      .draw(ctx);
      } else {
        if(arrival_extra != null) {
          let rowY = 16 + (5*10.3);
          Text.create("Number Text")
          .text(arrival_extra.routeNumber())
          .centerAlign()
          .pos(9, rowY - 1.25)
          .size(10, 7) // <----
          .scaleXY() // <----
          .color(0x000000)
          .draw(ctx);

          Text.create("arrival_extra destination")
          .text(TextUtil.cycleString(arrival_extra.destination()))
          .pos(20, rowY)
          .size(60, 9)
          .scaleXY() // <----
          .scale(0.56)
          .color(0x000000)
          .draw(ctx);

          let eta = (arrival_extra.arrivalTime() - Date.now()) / 60000;
          let sizeX = 16
          eta = Math.round(eta) + " min";
          Text.create("arrival_extra ETA")
          .text(eta)
          .color(0x000000)
          .pos(pids.width - 16.5, rowY)
          .scale(0.7)
          .size(sizeX, 9) // <----
          .scaleXY() // <----
          .leftAlign()
          .draw(ctx);
        }
      }
    } else {`
      Texture.create("Background")
      .texture("jsblock:custom_directory/rostock_tram.png")
      .size(pids.width, pids.height)
      .draw(ctx);

      if (pids.station() != null) {
        Text.create("station name")
        .pos(2, 3)
        .text(pids.station().getName())
        .size(pids.width - 30, 10)
        .scaleXY()
        .scale(0.8)
        .color(0xFFFFFF)
        .draw(ctx)
      }

      let now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      let time = hours + ":" + minutes

      Text.create("Clock")
      .text(time)
      .color(0xFFFFFF)
      .size(pids.width - 30, 10)
      .pos(pids.width - 17, 3)
      .centerAlign()
      .scaleXY()
      .scale(0.8)
      .draw(ctx);

      for(let i = 0; i < 3; i++) {
        let rowY = 26 + (i*11);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
            Text.create("Number Text")
            .text(arrival.routeNumber())
            .rightAlign()
            .pos(17, rowY)
            .size(16, 7)  // <----
            .scaleXY() // <----
            .scale(1.1)
            .color(0x000000)
            .draw(ctx);

            Text.create("Arrival destination")
            .text(TextUtil.cycleString(arrival.destination()))
            .pos(22, rowY)
            .size(55, 7)
            .scaleXY() // <----
            .scale(1.1)
            .color(0x000000)
            .draw(ctx);

            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            eta = Math.round(eta) + " min";
            if (eta < 0) {eta = 0}
            Text.create("Arrival ETA")
            .text(eta)
            .color(0x000000)
            .pos(pids.width - 1.5, rowY)
            .size(32, 7) // <----
            .scaleXY() // <----
            .scale(1.1)
            .rightAlign()
            .draw(ctx);
        }
      }

    let customMsg_extra = pids.getCustomMessage(3);
    let arrival_extra = pids.arrivals().get(3);
    if(customMsg_extra != "") {
      Text.create("Custom Text")
      .text(TextUtil.cycleString(customMsg_extra))
      .scale(1)
      .size(pids.width - 1, 7)
      .pos(0.5, 26 + (3*11))
      .color(0x000000)
      .marquee()
      .draw(ctx);
      } else {
        if(arrival_extra != null) {
          let rowY = 26 + (3*11);
          Text.create("Number Text")
          .text(arrival_extra.routeNumber())
          .rightAlign()
          .pos(17, rowY)
          .size(16, 7) // <----
          .scaleXY() // <----
          .scale(1.1)
          .color(0x000000)
          .draw(ctx);

          Text.create("arrival_extra destination")
          .text(TextUtil.cycleString(arrival_extra.destination()))
          .pos(22, rowY)
          .size(55, 7)
          .scaleXY() // <----
          .scale(1.1)
          .color(0x000000)
          .draw(ctx);
          let eta = (arrival_extra.arrivalTime() - Date.now()) / 60000;
          eta = Math.round(eta) + " min";
          Text.create("arrival_extra ETA")
          .text(eta)
          .color(0x000000)
          .pos(pids.width - 1.5, rowY)
          .size(32, 7) // <----
          .scaleXY() // <----
          .scale(1.1)
          .rightAlign()
          .draw(ctx);
        }
      }
    `}`
  } else {
    Texture.create("Background")
        .texture("jsblock:custom_directory/rostock_tram.png")
        .size(pids.width, pids.height)
        .draw(ctx);

    if (pids.station() != null) {
      Text.create("station name")
          .pos(2, 3)
          .text(pids.station().getName())
          .size(pids.width - 30, 10)
          .scaleXY()
          .scale(0.8)
          .color(0xFFFFFF)
          .draw(ctx)
    }

    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let time = hours + ":" + minutes

    Text.create("Clock")
        .text(time)
        .color(0xFFFFFF)
        .size(pids.width - 30, 10)
        .pos(pids.width - 17, 3)
        .centerAlign()
        .scaleXY()
        .scale(0.8)
        .draw(ctx);

    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Text.create("Custom Text")
      .text(TextUtil.cycleString(customMsg_extra))
      .scale(1)
      .size(pids.width - 1, 7)
      .pos(0.5, 26 + (3*11))
      .color(0x000000)
      .marquee()
      .draw(ctx);
    }
  }
}

function dispose(ctx, state, pids) {
}