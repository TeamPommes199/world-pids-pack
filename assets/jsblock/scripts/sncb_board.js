include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/sncb_board.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let customMsgs = pids.getCustomMessage(0) + ";" + pids.getCustomMessage(1) + ";" + pids.getCustomMessage(2);
  customMsgs = customMsgs.split(';');
  customMsgs = customMsgs.map(item => item.trim());

  let page = 1
  let pageMsg = customMsgs.find(item => item.includes("page:"))
  if (pageMsg) {
    page = pageMsg.replace("page:", "")
    if (page < 1) {page = 1}
  }

  for (let i = 14 * (page - 1); i < 14 * page; i++) {
    let rowY = 8.15 + ((i - 14 * (page - 1)) * 4.87);
    let arrival = pids.arrivals().get(i);
    if (arrival != null) {
      Text.create("Number Text")
          .text(arrival.routeNumber())
          .pos(pids.width - 16, rowY + 0.2)
          .size(16, 5)  // <----
          .scaleXY() // <----
          .scale(0.6)
          .color(0xffffff)
          .draw(ctx);

      Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(35, rowY)
          .size(90, 5)
          .scaleXY() // <----
          .scale(0.6)
          .color(0xffff00)
          .draw(ctx);

      Text.create("Platform Track")
          .text(arrival.platformName())
          .pos(pids.width - 3.5, rowY)
          .size(6, 5)
          .scaleXY()
          .centerAlign()
          .scale(0.6)
          .color(0xffffff)
          .draw(ctx);

      let etas = arrival.departureTime()
      let eta = new Date(etas)
      let hours = eta.getHours()
      let minutes = eta.getMinutes()
      let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
      let deviation = arrival.deviation()
      let late_eta = etas - deviation
      late_eta = new Date(late_eta)
      let late_hours = late_eta.getHours()
      let late_minutes = late_eta.getMinutes()
      let late_time = late_hours.toString().padStart(2, '0') + ":" + late_minutes.toString().padStart(2, '0');
      // late_time is the time without the delay
      Text.create("Arrival ETA")
          .text(late_time)
          .color(0xffffff)
          .pos(2, rowY)
          .size(32, 5)
          .scaleXY()
          .scale(0.6)
          .draw(ctx);

      if (deviation > 90000 || deviation < -90000) {
          let text = `+${Math.round(deviation / 60000).toString()}'`
        if (deviation < 0) {
            text = `${Math.round(deviation / 60000).toString()}'`
        }

        Texture.create("late_arrival ETA background")
            .texture("jsblock:custom_directory/sncb_delay.png")
            .pos(12, rowY - 0.6)
            .size(21, 4.2)
            .draw(ctx);

          Text.create("late_arrival ETA")
              .text(text)
              .pos(17.5, rowY + 0.5)
              .size(32, 5)
              .scale(0.5)
              .color(0xffffff)
              .scaleXY()
              .centerAlign()
              .draw(ctx);

        Text.create("late_arrival ETA")
            .text(time)
            .pos(24.45, rowY + 0.5)
            .size(32, 5)
            .scale(0.5)
            .scaleXY()
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}