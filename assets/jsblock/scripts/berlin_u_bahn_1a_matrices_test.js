include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    Texture.create("Background")
    .texture("jsblock:custom_directory/berlin_u_bahn.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    let now = new Date();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let matrices = new Matrices()
    matrices.pushPose();
    matrices.rotateZDegrees((minutes + seconds / 60) * 6)
    matrices.popPose();

    Texture.create("Background")
        .texture("jsblock:custom_directory/db_big_row_black.png")
        .size(16, 2)
        .pos(pids.width / 2, pids.height / 2)
        .draw(ctx);

    for(let i = 0; i < 2; i++) {
      let rowY = 0 - 9 + (i*30);
      let arrival = pids.arrivals().get(i);
      if(arrival != null) {
        Text.create("Number Text")
        .text(arrival.routeNumber())
        .pos(1, rowY)
        .size(17, 25)  // <----
        .scaleXY() // <----
        .scale(2)
        .color(0xcda222)
        .draw(ctx);

        Text.create("Arrival destination")
        .text(arrival.destination())
        .pos(35, rowY + 11.5)
        .size(90, 25)
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
        .draw(ctx)
  }
}

function dispose(ctx, state, pids) {
}