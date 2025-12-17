include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/nuremberg_subway.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let dates = new Date;
  let minutes = dates.getMinutes();
  let hours = dates.getHours();
  let day = dates.getDate();
  let month = dates.getMonth() + 1;
  let year = dates.getFullYear();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0')
  let date = day.toString().padStart(2, '0') + "." + month.toString().padStart(2, '0') + "." + year.toString()

  Text.create("clock")
      .text(time)
      .color(0xc1cb28)
      .pos(pids.width - 1.5, pids.height - 7.75)
      .size(32, 6.5)
      .scaleXY()
      .rightAlign()
      .draw(ctx);

  Text.create("date")
      .text(date)
      .color(0xc1cb28)
      .pos(1.5, pids.height - 7.75)
      .size(65, 6.5)
      .scaleXY()
      .draw(ctx);

  for (let i = 0; i < 2; i++) {
    let rowY = 6 + (i * 30);
    let arrival = pids.arrivals().get(i);

    if (arrival != null) {
      Texture.create("arrival_first Circle Colored")
          .texture("jsblock:custom_directory/lrr_u_bahn.png")
          .pos(3, rowY - 1)
          .size(25, 14)
          .color(arrival.routeColor())
          .draw(ctx);

      Text.create("Number Text")
          .text(arrival.routeNumber())
          .pos(16, rowY)
          .size(23, 12)  
          .scaleXY() 
          .centerAlign()
          .color(0xFFFFFF)
          .scale(1.1)
          .draw(ctx);

      Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(31, rowY)
          .size(72, 12)
          .scaleXY() 
          .color(0xc1cb28)
          .scale(1.15)
          .draw(ctx);

      let eta = (arrival.arrivalTime() - Date.now()) / 60000;
      if (eta > 0.5) {
        Text.create("Arrival ETA")
            .text(Math.round(eta))
            .color(0xc1cb28)
            .pos(pids.width - 1.5, rowY)
            .size(32, 12)
            .scaleXY()
            .rightAlign()
            .scale(1.2)
            .draw(ctx);
        Text.create("Arrival ETA")
            .text("Min.")
            .color(0xc1cb28)
            .pos(pids.width - 1.5, rowY + 16.5)
            .size(32, 8)
            .scaleXY() 
            .rightAlign()
            .draw(ctx);
      }

      if (pids.station() && arrival.route()) {
        let stops = arrival.route().getPlatforms().toArray().map((platform) => platform.stationName);
        let stops_at = ""
        let stationClean = pids.station().getName().normalize("NFC").trim();
        let i = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 1;
        let i_2 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 3;
        let i_3 = stops.findIndex(s => s.normalize("NFC").trim() === stationClean) + 5;

        if (stops[i] != null && stops[i] !== arrival.destination()) {
          stops_at = "über "
          stops_at = stops_at + stops[i].replace("|", " ")
        }

        if (stops[i_2] != null && stops[i_2] !== arrival.destination()) {
          stops_at = stops_at + " - " + stops[i_2].replace("|", " ")
        }

        if (stops[i_3] != null && stops[i_3] !== arrival.destination()) {
          stops_at = stops_at + " - " + stops[i_3].replace("|", " ")
        }

        Text.create("arrival stops")
            .text(stops_at)
            .color(0xc1cb28)
            .pos(31, rowY + 17.5)
            .size(90, 8)
            .marquee()
            .scale(0.82)
            .draw(ctx);
      }
    }
  }
}

function dispose(ctx, state, pids) {
}