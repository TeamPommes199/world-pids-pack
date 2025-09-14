include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/obb_depature.png")
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
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

  Text.create("Clock")
      .text(time)
      .color(0xffffff)
      .size(30, 8)
      .pos(95, 1)
      .scaleXY()
      .scale(0.8)
      .draw(ctx);

  for (let i = 12 * (page - 1); i < 12 * page; i++) {
    let rowY = 13 + ((i - 12 * (page - 1)) * 5.35);
    let arrival = pids.arrivals().get(i);
    if (arrival != null) {
      Text.create("Number Text")
          .text(arrival.routeNumber())
          .pos(44, rowY + 0.2)
          .size(20, 5)
          .scaleXY()
          .scale(0.8)
          .color(0xededed)
          .draw(ctx);

      Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(66, rowY)
          .size(65, 5)
          .scaleXY()
          .scale(0.8)
          .color(0xededed)
          .draw(ctx);

      Text.create("Platform Track")
          .text(arrival.platformName())
          .pos(pids.width - 6, rowY)
          .size(6, 5)
          .scaleXY()
          .centerAlign()
          .scale(0.8)
          .color(0xededed)
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
          .pos(15, rowY)
          .size(15, 5)
          .scaleXY()
          .scale(0.8)
          .rightAlign()
          .draw(ctx);

      if (deviation > 60000 || deviation < -60000) {
        Text.create("late_arrival ETA")
            .text(time)
            .color(0xffff00)
            .pos(16, rowY)
            .size(15, 5)
            .scaleXY()
            .scale(0.8)
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}