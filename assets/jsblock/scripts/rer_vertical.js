include(Resources.id("jsblock:scripts/pids_util.js"));

function withAlpha(color, alpha) {
  return (alpha * 0x1000000) + color;
}

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
  let customMsgs = [pids.getCustomMessage(0), pids.getCustomMessage(1), pids.getCustomMessage(2), pids.getCustomMessage(3)];
  let height = 31

  for (let customMsg of customMsgs) {
    if (customMsg.includes("height:")) {
      height = customMsg.replace("height:", "")
    }
  }

  Texture.create("Background")
      .texture("jsblock:assets/rer_vertical/rer_vertical.png")
      .size(64, 113.77)
      .zOrder(0)
      .draw(ctx);

  Texture.create("Background2")
      .texture("jsblock:assets/general/long_quad_full.png")
      .size(64, height)
      .pos(0, 113.77)
      .zOrder(0)
      .draw(ctx);

  let routes = {}
  if (pids.station() != null) {
    let x = true
    let firstRouteNumber = null;
    let firstRouteColor = null;

    for (let i = 0; x === true; i++) {
      let arrival = pids.arrivals().get(i);

      if (arrival != null && arrival.route()) {
        let route = arrival.routeNumber() + " - " + arrival.destination()

        if (Object.keys(routes).length < 3) {
          if (Object.keys(routes).length === 0) {
            firstRouteNumber = arrival.routeNumber();
            firstRouteColor = arrival.routeColor();

            routes[route] = {
              "route": arrival.routeNumber(),
              "color": arrival.routeColor(),
              "destination": arrival.destination(),
              "stops": arrival.route().getPlatforms().toArray().map((platform) => platform.stationName)
            }
          } else if (firstRouteNumber == arrival.routeNumber() && firstRouteColor == arrival.routeColor() && !routes[route]) {
            routes[route] = {
              "route": arrival.routeNumber(),
              "color": arrival.routeColor(),
              "destination": arrival.destination(),
              "stops": arrival.route().getPlatforms().toArray().map((platform) => platform.stationName)
            }
          }
        }
      } else {
        x = false
      }
    }

    let sortedEntries = Object.entries(routes).sort((a, b) => {
      return a[1].destination.localeCompare(b[1].destination)
    })

    routes = {}
    sortedEntries.forEach(([key, value]) => {
      routes[key] = value
    })
  }

  let date = new Date;
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let time = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');

  Text.create("clock")
      .text(time)
      .pos(56.5, 1)
      .size(20, 10)
      .scaleXY()
      .scale(0.6)
      .color(0xFFB600)
      .zOrder(1)
      .centerAlign()
      .draw(ctx);

  let arrival_first = pids.arrivals().get(0);
  if (arrival_first != null) {
    Texture.create("Background")
        .texture("jsblock:assets/general/quad.png")
        .size(22, 22)
        .zOrder(1)
        .color(arrival_first.routeColor())
        .draw(ctx);

    Text.create("route number")
        .text(arrival_first.routeNumber())
        .pos(11.75, 3.75)
        .size(10.5, 10)
        .scaleXY()
        .scale(2)
        .color(0xFFFFFF)
        .zOrder(2)
        .centerAlign()
        .draw(ctx);

    let eta = (arrival_first.arrivalTime() - Date.now()) / 60000;
    if (eta < 0.5) {
      eta = 0
    } else {
      eta = Math.round(eta)
    }

    Text.create("eta")
        .text(eta)
        .pos(59.25, 30.75)
        .size(13, 10)
        .scaleXY()
        .scale(0.65)
        .color(0xFFB600)
        .zOrder(1)
        .centerAlign()
        .draw(ctx);

    Text.create("min")
        .text("min")
        .pos(59.25, 36)
        .size(13, 10)
        .scale(0.2)
        .color(0xFFB600)
        .zOrder(1)
        .centerAlign()
        .draw(ctx);

    Text.create("eta")
        .text(arrival_first.platformName())
        .pos(55, 15)
        .size(15, 10)
        .scaleXY()
        .scale(0.6)
        .color(0x0C0C94)
        .zOrder(1)
        .centerAlign()
        .draw(ctx);

    Text.create("destination")
        .text(TextUtil.cycleString(arrival_first.destination()))
        .pos(3, 30)
        .size(69, 10)
        .scaleXY()
        .scale(0.7)
        .color(0x0C0C94)
        .zOrder(1)
        .draw(ctx);

    if (pids.station() && arrival_first.route()) {
      let routesArray = Object.values(routes);

      if (routesArray.length > 0) {
        let posX_map = {
          1: [20, 20],
          2: [16, 4.6, 27.4],
          3: [19, 2, 19, 36]
        }

        let mapKey = Math.min(routesArray.length, 3)
        let currentMap = posX_map[mapKey] ? posX_map[mapKey] : [20, 20]

        let colorHighlight = arrival_first.routeColor()
        let colorDimmed = withAlpha(arrival_first.routeColor(), 28)
        let textHighlight = 0x0C0C94
        let textDimmed = withAlpha(0x0C0C94, 26)

        let highlightIdx = routesArray.findIndex(r => String(r.destination) === String(arrival_first.destination()))
        if (highlightIdx < 0) {
          highlightIdx = 0
        }

        let stationClean = pids.station().getName().normalize("NFC").trim()
        let lists = routesArray.map(routeObj => {
          let names = routeObj.stops.map(s => s.normalize("NFC").trim())
          let start = Math.max(0, names.indexOf(stationClean))
          return {
            "names": names.slice(start),
            "raw": routeObj.stops.slice(start)
          };
        });

        let rows = []
        let ptr = lists.map(() => 0)
        let guard = 0
        while (guard++ < 200) {
          let active = []

          for (let r = 0; r < lists.length; r++) {
            if (ptr[r] < lists[r].names.length) {
              active.push(r)
            }
          }

          if (active.length === 0) {
            break
          }

          let nextName = lists[active[0]].names[ptr[active[0]]]
          let allSame = active.every(r => lists[r].names[ptr[r]] === nextName)

          if (allSame) {
            let rawName = lists[active[0]].raw[ptr[active[0]]]
            let cells = lists.map(() => null)

            active.forEach(r => {
              cells[r] = rawName
              ptr[r]++
            })

            rows.push({"shared": true, "cells": cells})
          } else {
            let firstActive = active[0]
            let mergeName = null

            for (let k = ptr[firstActive]; k < lists[firstActive].names.length && mergeName === null; k++) {
              let candidate = lists[firstActive].names[k]

              if (active.every(r => r === firstActive || lists[r].names.indexOf(candidate, ptr[r]) !== -1)) {
                mergeName = candidate
              }
            }

            let segments = lists.map(() => [])

            active.forEach(r => {
              let end = mergeName === null ? lists[r].names.length : lists[r].names.indexOf(mergeName, ptr[r])
              segments[r] = lists[r].raw.slice(ptr[r], end)
              ptr[r] = end
            })

            let segmentLength = segments.reduce((max, s) => Math.max(max, s.length), 0)

            for (let k = 0; k < segmentLength; k++) {
              rows.push({
                "shared": false,
                "cells": lists.map((l, r) => k < segments[r].length ? segments[r][k] : null)
              })
            }
          }
        }

        let firstRow = lists.map(() => -1)
        let lastRow = lists.map(() => -1)

        for (let i = 0; i < rows.length; i++) {
          for (let r = 0; r < lists.length; r++) {
            if (rows[i].cells[r] !== null) {
              if (firstRow[r] === -1) {
                firstRow[r] = i
              }
              lastRow[r] = i
            }
          }
        }

        let isPresent = (r, i) => firstRow[r] !== -1 && i >= firstRow[r] && i <= lastRow[r]
        let colOf = (r, i) => rows[i].shared ? currentMap[0] : currentMap[r + 1]
        let rowY = []
        let gapBefore = []

        for (let i = 0; i < rows.length; i++) {
          let gap = false

          if (i > 0) {
            for (let r = 0; r < lists.length; r++) {
              if (isPresent(r, i - 1) && isPresent(r, i) && colOf(r, i - 1) !== colOf(r, i)) {
                gap = true
              }
            }
          }

          gapBefore.push(gap)
          rowY.push(i === 0 ? 43 : rowY[i - 1] + 4.5 + (gap ? 8 : 0))
        }

        let drawLine = (posX, posY, height, hi) => {
          Texture.create("Background")
              .texture("jsblock:assets/rer_vertical/branch_station_background.png")
              .size(3.5, height)
              .pos(posX, posY)
              .zOrder(hi ? 2 : 1)
              .color(hi ? colorHighlight : colorDimmed)
              .draw(ctx);
        }

        let drawConnector = (xUpper, xLower, posY, hi) => {
          Texture.create("Background")
              .texture(xLower < xUpper ? "jsblock:assets/rer_vertical/ver_branch_connection_mirrored.png" : "jsblock:assets/rer_vertical/ver_branch_connection.png")
              .size(Math.abs(xUpper - xLower) + 3.5, 8)
              .pos(Math.min(xUpper, xLower), posY)
              .zOrder(hi ? 2 : 1)
              .color(hi ? colorHighlight : colorDimmed)
              .draw(ctx);
        }

        let drawStation = (posX, posY, name, hi) => {
          Texture.create("Background")
              .texture("jsblock:assets/general/circle_full.png")
              .size(3, 3)
              .pos(posX + 0.25, posY + 0.25)
              .zOrder(4)
              .color(0xffffff)
              .draw(ctx);

          if (name.normalize("NFC").trim() === pids.station().getName().normalize("NFC").trim()) {
            let x_extra = 2.2 * TextUtil.cycleString(name).length()
            if (2.2 * TextUtil.cycleString(name).length() > 26) {
              x_extra = 26
            }
            Texture.create("Background")
                .texture("jsblock:assets/general/circle_full.png")
                .size(4, 4)
                .pos(posX, posY - 0.25)
                .zOrder(3)
                .color(0x01138f)
                .draw(ctx);

            Texture.create("Background")
                .texture("jsblock:assets/general/long_quad_full.png")
                .size(x_extra, 4)
                .pos(posX + 2.2, posY - 0.25)
                .zOrder(3)
                .color(0x01138f)
                .draw(ctx);

            Texture.create("Background")
                .texture("jsblock:assets/general/circle_full.png")
                .size(4, 4)
                .pos(posX + x_extra, posY - 0.25)
                .zOrder(3)
                .color(0x01138f)
                .draw(ctx);

            Text.create("stop")
                .text(TextUtil.cycleString(name))
                .pos(posX + 4.5, posY + 0.25)
                .size(65, 10)
                .scaleXY()
                .scale(0.35)
                .color(0xffffff)
                .zOrder(5)
                .draw(ctx);
          } else {
            Text.create("stop")
                .text(TextUtil.cycleString(name))
                .pos(posX + 4.5, posY)
                .size(65, 10)
                .scaleXY()
                .scale(0.35)
                .color(hi ? textHighlight : textDimmed)
                .zOrder(hi ? 5 : 1)
                .draw(ctx);
          }
        };

        for (let i = 0; i < rows.length; i++) {
          let row = rows[i]

          if (i > 0) {
            let gapY = rowY[i - 1] + 4.5

            for (let r = 0; r < lists.length; r++) {
              if (isPresent(r, i - 1) && isPresent(r, i)) {
                let xUpper = colOf(r, i - 1)
                let xLower = colOf(r, i)

                if (xUpper !== xLower) {
                  drawConnector(xUpper, xLower, gapY, r === highlightIdx)
                } else if (gapBefore[i]) {
                  drawLine(xUpper, gapY, 8, r === highlightIdx)
                }
              }
            }
          }

          if (row.shared) {
            let firstCell = row.cells.find(c => c !== null)
            let hi = row.cells[highlightIdx] !== null
            drawLine(currentMap[0], rowY[i], 4.5, hi)
            drawStation(currentMap[0], rowY[i], firstCell, hi)
          } else {
            for (let r = 0; r < lists.length; r++) {
              if (isPresent(r, i)) {
                let hi = r === highlightIdx
                drawLine(currentMap[r + 1], rowY[i], 4.5, hi)

                if (row.cells[r] !== null) {
                  drawStation(currentMap[r + 1], rowY[i], row.cells[r], hi)
                }
              }
            }
          }
        }
      }
    }
  }
}


function dispose(ctx, state, pids) {
}
