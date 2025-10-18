include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  Texture.create("Background")
      .texture("jsblock:custom_directory/karlsruhe_stadtbahn.png")
      .size(pids.width, pids.height)
      .draw(ctx);

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 0.5) {
      Texture.create("Background")
          .texture("jsblock:custom_directory/karlsruhe_stadtbahn_arrival.png")
          .size(pids.width, pids.height)
          .draw(ctx);

      if (pids.station() != null) {
        let gleis
        if (pids.arrivals().get(0) != null) {gleis = pids.arrivals().get(0).platformName()} else {gleis = "-"}
        Text.create("station name")
            .pos(15, 3)
            .text(pids.station().getName().replace("|", " ") + " (Gleis " + gleis + ")")
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
          .rightAlign()
          .scaleXY()
          .scale(0.8)
          .draw(ctx);

      let rowY = 16 + (0*10.3);
      Texture.create("Circle Colored")
          .texture("jsblock:custom_directory/lrr.png")
          .pos(3, rowY - 2)
          .size(24, 14)
          .color(arrival_first.routeColor())
          .draw(ctx);

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

      let car_length = arrival_first.carCount();
      if (car_length > 3 && car_length < 7) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/karlsruhe_2_stadtbahn.png")
            .pos(90, rowY - 0.2)
            .color(0x000000)
            .size(40, 6.7)
            .draw(ctx);
      } else if (car_length < 4) {
        Texture.create("Car length")
            .texture("jsblock:custom_directory/karlsruhe_1_stadtbahn.png")
            .pos(90, rowY - 0.2)
            .color(0x000000)
            .size(40, 6.7)
            .draw(ctx);
      }
      for(let i = 1; i < 2; i++) {
        let rowY = 16 + ((i + 3) *10.3);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(3, rowY - 2)
              .size(12, 7)
              .color(arrival.routeColor())
              .draw(ctx);

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

          let car_length = arrival.carCount();
          if (car_length > 3 && car_length < 7) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_2_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 4) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_1_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          }

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          let sizeX = 16
          if(eta < 9) {eta = "in " + Math.round(eta) + " min"; sizeX = 21} else {
            let etas = arrival.arrivalTime()
            eta = new Date(etas)
            let hours = eta.getHours()
            let minutes = eta.getMinutes()
            let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            eta = time
          }
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
        Texture.create("ETA background")
            .texture("jsblock:custom_directory/karlsruhe_stadtbahn_info.png")
            .pos(0, 0)
            .size(pids.width, pids.height)
            .draw(ctx);

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

          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(3, rowY - 2)
              .size(12, 7)
              .color(arrival_extra.routeColor())
              .draw(ctx);

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

          let car_length = arrival_extra.carCount();
          if (car_length > 3 && car_length < 7) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_2_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 4) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_1_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          }

          let eta = (arrival_extra.arrivalTime() - Date.now()) / 60000;
          let sizeX = 16
          if(eta < 9) {eta = "in " + Math.round(eta) + " min"; sizeX = 21} else {
            let etas = arrival_extra.arrivalTime()
            eta = new Date(etas)
            let hours = eta.getHours()
            let minutes = eta.getMinutes()
            let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            eta = time
          }
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
    } else {
      if (pids.station() != null) {
        let gleis
        if (pids.arrivals().get(0) != null) {gleis = pids.arrivals().get(0).platformName()} else {gleis = "-"}
        Text.create("station name")
            .pos(15, 3)
            .text(pids.station().getName().replace("|", " ") + " (Gleis " + gleis + ")")
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
          .rightAlign()
          .scaleXY()
          .scale(0.8)
          .draw(ctx);

      for(let i = 0; i < 5; i++) {
        let rowY = 16 + (i*10.3);
        let arrival = pids.arrivals().get(i);
        if(arrival != null) {
          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(3, rowY - 2)
              .size(12, 7)
              .color(arrival.routeColor())
              .draw(ctx);

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

          let car_length = arrival.carCount();
          if (car_length > 3 && car_length < 7) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_2_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 4) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_1_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          }

          let eta = (arrival.arrivalTime() - Date.now()) / 60000;
          let sizeX = 16
          if(eta < 9) {eta = "in " + Math.round(eta) + " min"; sizeX = 21} else {
            let etas = arrival.arrivalTime()
            eta = new Date(etas)
            let hours = eta.getHours()
            let minutes = eta.getMinutes()
            let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            eta = time
          }
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
      let arrival_extra = pids.arrivals().get(5);
      if(customMsg_extra != "") {
        Texture.create("ETA background")
            .texture("jsblock:custom_directory/karlsruhe_stadtbahn_info.png")
            .pos(0, 0)
            .size(pids.width, pids.height)
            .draw(ctx);

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

          Texture.create("Circle Colored")
              .texture("jsblock:custom_directory/lrr.png")
              .pos(3, rowY - 2)
              .size(12, 7)
              .color(arrival_extra.routeColor())
              .draw(ctx);

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

          let car_length = arrival_extra.carCount();
          if (car_length > 3 && car_length < 7) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_2_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          } else if (car_length < 4) {
            Texture.create("Car length")
                .texture("jsblock:custom_directory/karlsruhe_1_stadtbahn.png")
                .pos(87.5, rowY - 0.2)
                .color(0x000000)
                .size(30, 5)
                .draw(ctx);
          }

          let eta = (arrival_extra.arrivalTime() - Date.now()) / 60000;
          let sizeX = 16
          if(eta < 9) {eta = "in " + Math.round(eta) + " min"; sizeX = 21} else {
            let etas = arrival_extra.arrivalTime()
            eta = new Date(etas)
            let hours = eta.getHours()
            let minutes = eta.getMinutes()
            let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            eta = time
          }
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
    }
  } else {
    if (pids.station() != null) {
      let gleis
      if (pids.arrivals().get(0) != null) {gleis = pids.arrivals().get(0).platformName()} else {gleis = "-"}
      Text.create("station name")
          .pos(15, 3)
          .text(pids.station().getName().replace("|", " ") + " (Gleis " + gleis + ")")
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
        .rightAlign()
        .scaleXY()
        .scale(0.8)
        .draw(ctx);

    let customMsg = pids.getCustomMessage(3);
    if(customMsg != "") {
      Texture.create("ETA background")
          .texture("jsblock:custom_directory/karlsruhe_stadtbahn_info.png")
          .pos(0, 6*9.3)
          .size(pids.width, 12)
          .color(0xFF0000)
          .draw(ctx);

      Text.create("Custom Text")
          .text(TextUtil.cycleString(customMsg))
          .scale(0.8)
          .size(pids.width * 1.20, 9)
          .pos(1, 8 + (6*9.3))
          .color(0xFFFFFF)
          .marquee()
          .draw(ctx);
    }
  }
}

function dispose(ctx, state, pids) {
}