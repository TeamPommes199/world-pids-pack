function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    if (((arrival_first.arrivalTime() - Date.now()) / 60000) < 0.5) {
      let rowY = 13;

      Texture.create("Background_Blank")
      .texture("jsblock:custom_directory/munich_u_bahn_arrive.png")
      .size(pids.width, pids.height)
      .draw(ctx);

      if(arrival_first != null) {
        Texture.create("arrival_first Circle Colored Full")
        .texture("jsblock:custom_directory/lrr_full_u_bahn.png")
        .pos(5, rowY - 8)
        .size(33.5, 17)
        .draw(ctx);

        Texture.create("arrival_first Circle Colored")
        .texture("jsblock:custom_directory/lrr_u_bahn.png")
        .pos(6, rowY - 7)
        .size(31.5, 15)
        .color(arrival_first.routeColor())
        .draw(ctx);

        Text.create("arrival_first Number Text")
        .text(arrival_first.routeNumber())
        .scale(1.5)
        .centerAlign()
        .pos(22.25, rowY - 6)
        .size(18, 10.5) // <----
        .scaleXY() // <----
        .color(0xFFFFFF)
        .draw(ctx);

        Text.create("arrival_first destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(6, rowY + 11)
        .size(85, 8.25)
        .scaleXY() // <----
        .scale(1.4)
        .color(0xFFFFFF)
        .draw(ctx);

//        let eta = ""
//        Text.create("Arrival ETA")
//        .text(eta)
//        .pos(5, 38)
//        .size(40, 6)
//        .scaleXY() // <----
//        .scale(1.4) // <----
//        .color(0xFFFFFF)
//        .draw(ctx);

        let car_length = arrival_first.carCount();
        if (car_length > 2 && car_length < 5) {
          Texture.create("arrival_first Car length")
            .texture("jsblock:custom_directory/munich_2_ubahn.png")
            .pos(45, rowY - 5)
            .size(80, 13.33)
            .draw(ctx);
        } else if (car_length < 3) {
          Texture.create("arrival_first Car length")
            .texture("jsblock:custom_directory/munich_1_ubahn.png")
            .pos(45, rowY - 5)
            .size(80, 13.33)
            .draw(ctx);
        }
      }

    let arrival_second = pids.arrivals().get(1);
    let arrival_third = pids.arrivals().get(2);
    if(arrival_second != null) {
      Texture.create("arrival_second Circle Colored Full")
      .texture("jsblock:custom_directory/lrr_full_u_bahn.png")
      .pos(5, 51)
      .size(16.75, 8.5)
      .draw(ctx);

      Texture.create("Circle Colored")
      .texture("jsblock:custom_directory/lrr_u_bahn.png")
      .pos(5.5, 51.5)
      .size(15.75, 7.5)
      .color(arrival_second.routeColor())
      .draw(ctx);

      Text.create("Number Text")
      .text(arrival_second.routeNumber())
      .scale(1.2)
      .centerAlign()
      .pos(14, 53)
      .color(0xFFFFFF)
      .size(9, 5) // <----
      .scaleXY() // <----
      .draw(ctx);

      Text.create("Arrival destination")
      .text(TextUtil.cycleString(arrival_second.destination()))
      .pos(24, 53)
      .size(70, 5)
      .scaleXY() // <----
      .scale(1.2)
      .color(0xFFFFFF)
      .draw(ctx);

      let eta = (arrival_second.arrivalTime() - Date.now()) / 60000;
      eta = Math.round(eta) + " Min."
      Text.create("Arrival ETA")
      .text(eta)
      .color(0xFFFFFF)
      .pos(pids.width - 1.5, 53)
      .scale(1.2)
      .size(30, 5) // <----
      .scaleXY() // <----
      .rightAlign()
      .draw(ctx);
    }
    if(arrival_third != null) {
      Texture.create("arrival_third Circle Colored Full")
      .texture("jsblock:custom_directory/lrr_full_u_bahn.png")
      .pos(5, 61)
      .size(16.75, 8.5)
      .draw(ctx);

      Texture.create("Circle Colored")
      .texture("jsblock:custom_directory/lrr_u_bahn.png")
      .pos(5.5, 61.5)
      .size(15.75, 7.5)
      .color(arrival_third.routeColor())
      .draw(ctx);

      Text.create("Number Text")
      .text(arrival_third.routeNumber())
      .scale(1.2)
      .centerAlign()
      .pos(14, 63)
      .color(0xFFFFFF)
      .size(9, 5) // <----
      .scaleXY() // <----
      .draw(ctx);

      Text.create("Arrival destination")
      .text(TextUtil.cycleString(arrival_third.destination()))
      .pos(24, 63)
      .size(70, 5)
      .scaleXY() // <----
      .scale(1.2)
      .color(0xFFFFFF)
      .draw(ctx);

      let eta = (arrival_third.arrivalTime() - Date.now()) / 60000;
      eta = Math.round(eta) + " Min."
      Text.create("Arrival ETA")
      .text(eta)
      .color(0xFFFFFF)
      .pos(pids.width - 1.5, 63)
      .scale(1.2)
      .size(30, 5) // <----
      .scaleXY() // <----
      .rightAlign()
      .draw(ctx);
    }
    
    } else {
    Texture.create("Background")
    .texture("jsblock:custom_directory/munich_u_bahn.png")
    .size(pids.width, pids.height)
    .draw(ctx);

    for(let i = 0; i < 3; i++) {
      let rowY = 13 + (i*20);
      
      let arrival = pids.arrivals().get(i);
      if(arrival != null) {
        Texture.create("arrival Circle Colored Full")
        .texture("jsblock:custom_directory/lrr_full_u_bahn.png")
        .pos(5, rowY)
        .size(25, 11.25)
        .draw(ctx);
  
        Texture.create("Circle Colored")
        .texture("jsblock:custom_directory/lrr_u_bahn.png")
        .pos(5.5, rowY + 0.5)
        .size(23.9, 10.25)
        .color(arrival.routeColor())
        .draw(ctx);
  
        Text.create("Number Text")
        .text(arrival.routeNumber())
        .centerAlign()
        .pos(18, rowY + 2)
        .color(0xFFFFFF)
        .size(9, 5) // <----
        .scaleXY() // <----
        .scale(1.7)
        .draw(ctx);
  
        Text.create("Arrival destination")
        .text(TextUtil.cycleString(arrival.destination()))
        .pos(35, rowY + 2)
        .size(50, 5)
        .scaleXY() // <----
        .scale(1.7)
        .color(0xFFFFFF)
        .draw(ctx);
  
        let eta = (arrival.arrivalTime() - Date.now()) / 60000;
        eta = Math.round(eta)
        Text.create("Arrival ETA")
        .text(eta)
        .color(0xFFFFFF)
        .pos(pids.width - 4.5, rowY + 2)
        .scale(1.7)
        .size(30, 5) // <----
        .scaleXY() // <----
        .rightAlign()
        .draw(ctx);
        }
      }
      if (pids.getCustomMessage(3) != "") {
        Texture.create("arrival Circle Colored Full")
        .texture("jsblock:custom_directory/munich_ubahn_info.png")
        .pos(0, pids.height - 11)
        .size(pids.width, 11)
        .draw(ctx);
  
        Text.create("Info")
        .text(pids.getCustomMessage(3))
        .pos(12, pids.height - 8)
        .size(pids.width * 1.2, 6)
        .scale(0.75)
        .marquee()
        .color(0xFFFFFF)
        .draw(ctx);
      }
    }
  } else {
    Texture.create("Background")
    .texture("jsblock:custom_directory/munich_u_bahn.png")
    .size(pids.width, pids.height)
    .draw(ctx);
  }
}

function dispose(ctx, state, pids) {
}