include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/portuguese_depature.png")
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

  let date = new Date;
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')

  Text.create("Clock")
      .text(time)
      .color(0x0500be)
      .size(30, 3.5)
      .pos(pids.width - 8, 2)
      .scaleXY()
      .scale(0.8)
      .draw(ctx);

  for (let i = 8 * (page - 1); i < 8 * page; i++) {
    let rowY = 13.5 + ((i - 8 * (page - 1)) * 7.15);
    let arrival = pids.arrivals().get(i);
    if (arrival != null) {
      Text.create("Number Text")
          .text(arrival.routeNumber())
          .centerAlign()
          .pos(87.5, rowY)
          .size(18, 3)  // <----
          .scaleXY() // <----
          .scale(1.1)
          .color(0xededed)
          .draw(ctx);

      Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(17, rowY)
          .size(45, 5)
          .scaleXY() // <----
          .scale(1.1)
          .color(0xededed)
          .draw(ctx);

      Text.create("Platform Track")
          .text(arrival.platformName())
          .pos(73.5, rowY)
          .size(7, 5)
          .scaleXY()
          .centerAlign()
          .scale(1.1)
          .color(0xffff00)
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
      Text.create("Arrival ETA")
          .text(late_time)
          .color(0xededed)
          .pos(0.5, rowY)
          .size(32, 5)
          .scaleXY()
          .scale(1.1)
          .draw(ctx);

      if (deviation > 300000 || deviation < -300000) {
        Text.create("late_arrival ETA")
            .text("NOVA HORA: " + time)
            .color(0xededed)
            .pos(102, rowY)
            .size(27, 5)
            .scaleXY()
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}