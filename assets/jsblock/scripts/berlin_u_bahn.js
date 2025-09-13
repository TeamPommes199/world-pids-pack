include(Resources.id("jsblock:scripts/pids_util.js"));

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
    .texture("jsblock:custom_directory/berlin_u_bahn.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    for (let i = 2 * (page - 1); i < 2 * page; i++) {
      let rowY = 0 - 2.5 + ((i - 2 * (page - 1)) * 30);
      let arrival = pids.arrivals().get(i);
      if(arrival != null) {
        Text.create("Number Text")
        .text(arrival.routeNumber())
        .pos(1, rowY)
        .size(14, 25)  // <----
        .scaleXY() // <----
        .scale(2)
        .color(0xcda222)
        .draw(ctx);

        Text.create("Arrival destination")
        .text(arrival.destination())
        .pos(30, rowY + 11.5)
        .size(60, 25)
        .scale(1)
        .scaleXY() // <----
        .color(0xcda222)
        .draw(ctx);

        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        if (eta < 0.5) {
          // nothing...
        } else {
          eta = "in " + Math.round(eta) + " min";
          Text.create("Arrival ETA")
          .text(eta)
          .color(0xcda222)
          .pos(pids.width - 1.5, rowY + 11.5)
          .size(70, 25) // <----
          .scale(1)
          .scaleXY() // <----
          .rightAlign()
          .draw(ctx);
        }
      }
    }
  } else {
    Texture.create("Background")
        .texture("jsblock:custom_directory/berlin_u_bahn.png")
        .size(pids.width, pids.height)
        .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}