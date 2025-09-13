include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/athen_suburban.png")
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
    arrival_first = pids.arrivals().get((page - 1) * 3);
  }

  if (arrival_first != null) {
    for (let i = 3 * (page - 1); i < 3 * page; i++) {
      let rowY = 3 + ((i - 3 * (page - 1)) * 12.5);
      let arrival = pids.arrivals().get(i);
      if(arrival != null) {
        Text.create("Number Text")
            .text(arrival.routeNumber())
            .pos(60, rowY)
            .size(24, 25)  // <----
            .scaleXY() // <----
            .centerAlign()
            .scale(1.25)
            .color(0xcc2636)
            .draw(ctx);

        Text.create("Arrival destination")
            .text(arrival.destination().toUpperCase())
            .pos(77, rowY)
            .size(45, 25)
            .scale(1.25)
            .scaleXY() // <----
            .color(0xcda222)
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
            .text(time)
            .color(0xcda222)
            .pos(27, rowY)
            .size(30, 25)
            .scale(1.25)
            .centerAlign()
            .scaleXY()
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}