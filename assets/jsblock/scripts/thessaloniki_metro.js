include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/thessaloniki_metro.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  for(let i = 0; i < 2; i++) {
    let rowY = -6 + (i * 25);
    let arrival = pids.arrivals().get(i);
    if(arrival != null) {
      Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination().toUpperCase()))
          .pos(9.25, rowY)
          .size(45, 25)
          .scale(1.6)
          .scaleXY()
          .color(0xff5b14)
          .draw(ctx);

      let eta = (arrival.arrivalTime() - Date.now()) / 60000;
      if (eta < 0.5) {eta = ""} else {eta = Math.round(eta) + "´"}
      Text.create("Arrival ETA")
          .text(eta)
          .color(0xff5b14)
          .pos(pids.width - 8, rowY)
          .size(30, 25)
          .scale(1.6)
          .rightAlign()
          .scaleXY()
          .draw(ctx);
    }
  }

  let date = new Date;
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
  Text.create("Clock")
      .text(time)
      .color(0xff5b14)
      .pos(pids.width - 8, 57)
      .size(30, 25)
      .scale(1.6)
      .rightAlign()
      .draw(ctx);
}

function dispose(ctx, state, pids) {

}
