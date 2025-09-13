include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/stockholm_subway.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    for(let i = 0; i < 4; i++) {
      if (i == 0) {
        let rowY = 4 + (i*15);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
          Texture.create("arrival_first Circle Colored")
          .texture("jsblock:custom_directory/lrr_u_bahn.png")
          .pos(3, rowY - 1.2)
          .size(16, 9)
          .color(arrival_first.routeColor())
          .draw(ctx);

          Text.create("Number Text")
          .text(arrival.routeNumber())
          .rightAlign()
          .pos(16.5, rowY)
          .size(14, 7)  // <----
          .scaleXY() // <----
          .color(0xFFFFFF)
          .draw(ctx);

          Text.create("Arrival destination")
          .text(TextUtil.cycleString(arrival.destination()))
          .pos(24, rowY)
          .size(75, 7)
          .scaleXY() // <----
          .color(0xFFFFFF)
          .draw(ctx);

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.5) {
            Text.create("Arrival ETA")
            .text("Nu")
            .color(0xFFFFFF)
            .pos(pids.width - 29, rowY)
            .size(15, 7) // <----
            .scaleXY() // <----
            .draw(ctx);

            Text.create("Arrival ETA")
            .text("Now")
            .color(0xFFFF11)
            .pos(pids.width - 16.5, rowY)
            .size(32, 7) // <----
            .scaleXY() // <----
            .draw(ctx);
          } else {
            eta = Math.round(eta) + " min";
            Text.create("Arrival ETA")
            .text(eta)
            .color(0xFFFFFF)
            .pos(pids.width - 1.5, rowY)
            .size(32, 7) // <----
            .scaleXY() // <----
            .rightAlign()
            .draw(ctx);
          }
        }
      } else if (i == 3) {
        let rowY = 4 + ((i + 1) * 15);
        let arrival = pids.arrivals().get(i);
        let customMsg = pids.getCustomMessage(3);
        
        if(customMsg != "") {
          Text.create("Custom Text")
          .text(TextUtil.cycleString(customMsg))
          .scale(1)
          .size(pids.width - 10, 7)
          .scaleXY()
          .pos(3, rowY)
          .color(0xFFFFFF)
          .draw(ctx);
        } else {
          if (arrival != null) {
            Texture.create("arrival_first Circle Colored")
                .texture("jsblock:custom_directory/lrr_u_bahn.png")
                .pos(3, rowY - 1.2)
                .size(16, 9)
                .color(arrival.routeColor())
                .draw(ctx);

            Text.create("Number Text")
                .text(arrival.routeNumber())
                .rightAlign()
                .pos(16.5, rowY)
                .size(14, 7)  // <----
                .scaleXY() // <----
                .color(0xFFFFFF)
                .draw(ctx);

            Text.create("Arrival destination")
                .text(TextUtil.cycleString(arrival.destination()))
                .pos(24, rowY)
                .size(75, 7)
                .scaleXY() // <----
                .color(0xFFFFFF)
                .draw(ctx);

            let eta = (arrival.arrivalTime() - Date.now()) / 60000;
            if (eta < 0.5) {
              Text.create("Arrival ETA")
                  .text("Nu")
                  .color(0xFFFFFF)
                  .pos(pids.width - 29, rowY)
                  .size(15, 7) // <----
                  .scaleXY() // <----
                  .draw(ctx);

              Text.create("Arrival ETA")
                  .text("Now")
                  .color(0xFFFF11)
                  .pos(pids.width - 16.5, rowY)
                  .size(32, 7) // <----
                  .scaleXY() // <----
                  .draw(ctx);
            } else {
              eta = Math.round(eta) + " min";
              Text.create("Arrival ETA")
                  .text(eta)
                  .color(0xFFFFFF)
                  .pos(pids.width - 1.5, rowY)
                  .size(32, 7) // <----
                  .scaleXY() // <----
                  .rightAlign()
                  .draw(ctx);
            }
          }
        }
      } else {
        let rowY = 4 + ((i + 1) * 15);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
          Texture.create("arrival_first Circle Colored")
              .texture("jsblock:custom_directory/lrr_u_bahn.png")
              .pos(3, rowY - 1.2)
              .size(16, 9)
              .color(arrival.routeColor())
              .draw(ctx);

          Text.create("Number Text")
              .text(arrival.routeNumber())
              .rightAlign()
              .pos(16.5, rowY)
              .size(14, 7)  // <----
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          Text.create("Arrival destination")
              .text(TextUtil.cycleString(arrival.destination()))
              .pos(24, rowY)
              .size(75, 7)
              .scaleXY() // <----
              .color(0xFFFFFF)
              .draw(ctx);

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          if (eta < 0.5) {
            Text.create("Arrival ETA")
                .text("Nu")
                .color(0xFFFFFF)
                .pos(pids.width - 29, rowY)
                .size(15, 7) // <----
                .scaleXY() // <----
                .draw(ctx);

            Text.create("Arrival ETA")
                .text("Now")
                .color(0xFFFF11)
                .pos(pids.width - 16.5, rowY)
                .size(32, 7) // <----
                .scaleXY() // <----
                .draw(ctx);
          } else {
            eta = Math.round(eta) + " min";
            Text.create("Arrival ETA")
                .text(eta)
                .color(0xFFFFFF)
                .pos(pids.width - 1.5, rowY)
                .size(32, 7) // <----
                .scaleXY() // <----
                .rightAlign()
                .draw(ctx);
          }
        }
      }
    }
  }
}

function dispose(ctx, state, pids) {
}