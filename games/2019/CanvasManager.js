// canvas object in variable 'canvas'
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function(newMode) { // REQUIRED FUNCTION
    mode = newMode
    var auto = mode == 0
    buttonManager.setEnabled("blueHab1L", auto)
    buttonManager.setEnabled("blueHab1C", auto)
    buttonManager.setEnabled("blueHab1R", auto)
    buttonManager.setEnabled("blueHab2L", auto)
    buttonManager.setEnabled("blueHab2R", auto)
    buttonManager.setEnabled("redHab1R", auto)
    buttonManager.setEnabled("redHab1C", auto)
    buttonManager.setEnabled("redHab1L", auto)
    buttonManager.setEnabled("redHab2R", auto)
    buttonManager.setEnabled("redHab2L", auto)
    buttonManager.setEnabled("blueCrossedLineToggle", auto)
    buttonManager.setEnabled("redCrossedLineToggle", auto)
    render()
}
this.getData = function() { // REQUIRED FUNCTION
    return data
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var data = {"AutoShipHatch": 0, "AutoShipHatchFailures": 0, "AutoShipCargo": 0, "AutoShipCargoFailures": 0, "ShipHatch": 0, "ShipHatchFailures": 0, "ShipCargo": 0, "ShipCargoFailures": 0, "AutoRocketHatch": 0, "AutoRocketHatchFailures": 0, "AutoRocketCargo": 0, "AutoRocketCargoFailures": 0, "RocketL1Hatch": 0, "RocketL2Hatch": 0, "RocketL3Hatch": 0, "RocketL1HatchFailures": 0, "RocketL2HatchFailures": 0, "RocketL3HatchFailures": 0, "RocketL1Cargo": 0, "RocketL2Cargo": 0, "RocketL3Cargo": 0, "RocketL1CargoFailures": 0, "RocketL2CargoFailures": 0, "RocketL3CargoFailures": 0}
var selectedPiece = "none"

const rocketButtonX = [1825, 1825, 1825, 1975, 1975, 1975, 1825, 1825, 1825, 1975, 1975, 1975]
const rocketButtonY = [30, 180, 330, 30, 180, 330, 1120, 1270, 1420, 1120, 1270, 1420]
const rocketButtonSuccess = [false, false, false, true, true, true, false, false, false, true, true, true]
const rocketButtonLevel = [3, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 3]

function render() {
    context.clearRect(0, 0, 3000, 1600)
    
    // main background
    context.fillStyle = "#d1d1d1"
    context.fillRect(300, 200, 2400, 1200)
    
    // blue HAB background
    context.fillStyle = "#0000de"
    context.fillRect(300, 500, 350, 600)
    if ("StartLevel" in data && "StartPos" in data && data["AllianceColor"] == 1 && mode == 0) {
        context.fillStyle = "#6666ff"
        context.fillRect(650 + (data["StartLevel"] * -175), 500 + (data["StartPos"] * 200), 175, 200)
    }
    
    // red HAB background
    context.fillStyle = "#ff0000"
    context.fillRect(2350, 500, 350, 600)
    if ("StartLevel" in data && "StartPos" in data && data["AllianceColor"] == 0 && mode == 0) {
        context.fillStyle = "#ff7575"
        context.fillRect(2175 + (data["StartLevel"] * 175), 900 + (data["StartPos"] * -200), 175, 200)
    }
    
    // cargo & hatch
    if ("AllianceColor" in data) {
        if (selectedPiece == "cargo") {
            context.lineWidth = 20
            context.fillStyle = "#bd6500"
        } else {
            context.lineWidth = 5
            context.fillStyle = "#ff8800"
        }
        context.beginPath()
        
        context.arc(2875 + (data["AllianceColor"] * -2750), 600, 100, 0, 2 * Math.PI)
        context.fill()
        context.stroke()
        
        if (selectedPiece == "hatch") {
            context.lineWidth = 20
            context.fillStyle = "#c7ba00"
        } else {
            context.lineWidth = 5
            context.fillStyle = "#fff34d"
        }
        context.beginPath()
        context.arc(2875 + (data["AllianceColor"] * -2750), 1000, 100, 0, 2 * Math.PI)
        context.fill()
        context.stroke()
        
        context.beginPath()
        context.fillStyle = "#ffffff"
        context.arc(2875 + (data["AllianceColor"] * -2750), 1000, 32, 0, 2 * Math.PI)
        context.fill()
        context.stroke()
        
    }
    
    // blue cargo ship
    context.beginPath()
    context.lineWidth = 5
    context.fillStyle = "#0000de"
    context.moveTo(1000, 670)
    context.lineTo(1000, 930)
    context.lineTo(1200, 960)
    context.lineTo(1500, 960)
    context.lineTo(1500, 640)
    context.lineTo(1200, 640)
    context.closePath()
    context.fill()
    context.stroke()
    
    // red cargo ship
    context.beginPath()
    context.lineWidth = 5
    context.fillStyle = "#ff0000"
    context.moveTo(2000, 670)
    context.lineTo(2000, 930)
    context.lineTo(1800, 960)
    context.lineTo(1500, 960)
    context.lineTo(1500, 640)
    context.lineTo(1800, 640)
    context.closePath()
    context.fill()
    context.stroke()
    
    // cargo ship buttons
    if ("AllianceColor" in data) {
        context.fillStyle = "#00d936"
        context.fillRect(1740 + (data["AllianceColor"] * -680), 700, 200, 200)
        context.lineWidth = 5
        context.strokeRect(1740 + (data["AllianceColor"] * -680), 700, 200, 200)
        
        context.fillStyle = "#b30000"
        context.fillRect(1540 + (data["AllianceColor"] * -280), 700, 200, 200)
        context.lineWidth = 5
        context.strokeRect(1540 + (data["AllianceColor"] * -280), 700, 200, 200)
        
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "140px sans-serif"
        context.fillStyle = "#000000"
        var shipSuccesses
        var shipFailures
        if (mode == 0) {
            shipSuccesses = data["AutoShipCargo"] + data["AutoShipHatch"]
            shipFailures = data["AutoShipCargoFailures"] + data["AutoShipHatchFailures"]
        } else {
            shipSuccesses = data["ShipCargo"] + data["ShipHatch"]
            shipFailures = data["ShipCargoFailures"] + data["ShipHatchFailures"]
        }
        context.fillText(shipSuccesses, 1840 + (data["AllianceColor"] * -680), 800)
        context.fillText(shipFailures, 1640 + (data["AllianceColor"] * -280), 800)
        
    }
    
    // OUTLINE PATH START
    context.beginPath()
    context.lineWidth = 5
    context.lineCap = "butt"
    
    // main outline
    context.strokeStyle = "#000000"
    context.strokeRect(300, 200, 2400, 1200)
    
    // HAB lines
    context.moveTo(650, 200)
    context.lineTo(650, 1400)
    
    context.moveTo(2350, 200)
    context.lineTo(2350, 1400)
    
    // blue HAB outline
    context.strokeRect(300, 500, 350, 600)
    context.moveTo(475, 500)
    context.lineTo(475, 1100)
    
    context.moveTo(300, 700)
    context.lineTo(650, 700)
    
    context.moveTo(300, 900)
    context.lineTo(650, 900)
    
    context.moveTo(300, 700)
    context.lineTo(475, 900)
    
    context.moveTo(300, 900)
    context.lineTo(475, 700)
    
    // red HAB outline
    context.strokeRect(2350, 500, 350, 600)
    context.moveTo(2525, 500)
    context.lineTo(2525, 1100)
    
    context.moveTo(2350, 700)
    context.lineTo(2700, 700)
    
    context.moveTo(2350, 900)
    context.lineTo(2700, 900)
    
    context.moveTo(2525, 700)
    context.lineTo(2700, 900)
    
    context.moveTo(2525, 900)
    context.lineTo(2700, 700)
    
    // OUTLINE PATH END
    context.stroke()
    
    // blue rockets
    context.lineWidth = 5
    context.fillStyle = "#0000de"
    context.fillRect(850, 5, 350, 500)
    context.strokeRect(850, 5, 350, 500)
    context.fillRect(850, 1095, 350, 500)
    context.strokeRect(850, 1095, 350, 500)
    
    // red rockets
    context.lineWidth = 5
    context.fillStyle = "#ff0000"
    context.fillRect(1800, 5, 350, 500)
    context.strokeRect(1800, 5, 350, 500)
    context.fillRect(1800, 1095, 350, 500)
    context.strokeRect(1800, 1095, 350, 500)
    
    // rocket buttons
    if ("AllianceColor" in data) {
        context.lineWidth = 5
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.font = "110px sans-serif"
        for (var i = 0; i < rocketButtonX.length; i++) {
            var allianceShift
            if (rocketButtonSuccess[i]) {
                context.fillStyle = "#00d936"
                allianceShift = -1100
            } else {
                context.fillStyle = "#b30000"
                allianceShift = -800
            }
            context.fillRect(rocketButtonX[i] + (data["AllianceColor"] * allianceShift), rocketButtonY[i], 150, 150)
            context.strokeRect(rocketButtonX[i] + (data["AllianceColor"] * allianceShift), rocketButtonY[i], 150, 150)
            
            var value
            if (mode == 0) {
                if (rocketButtonSuccess[i]) {
                    value = data["AutoRocketHatch"] + data["AutoRocketCargo"]
                } else {
                    value = data["AutoRocketHatchFailures"] + data["AutoRocketCargoFailures"]
                }
            } else {
                var failureText = ""
                if (!rocketButtonSuccess[i]) {
                    failureText = "Failures"
                }
                value = data["RocketL" + rocketButtonLevel[i].toString() + "Hatch" + failureText] + data["RocketL" + rocketButtonLevel[i].toString() + "Cargo" + failureText]
            }
            context.fillStyle = "#000000"
            context.fillText(value, rocketButtonX[i] + 75 + (data["AllianceColor"] * allianceShift), rocketButtonY[i] + 75)
        }
    }
    
    // crossed line arrow
    context.lineWidth = 15
    context.lineCap = "round"
    context.beginPath()
    if ("AllianceColor" in data && mode == 0) {
        if (!("CrossedLine" in data)) {
            data["CrossedLine"] = 0
        }
        var pointLeft = data["CrossedLine"] == 0
        if (data["AllianceColor"] == 0) {
            pointLeft = !pointLeft
        }
        var offset = data["AllianceColor"] * -1700 + 1700
        context.moveTo(580 + offset, 100)
        context.lineTo(720 + offset, 100)
        if (pointLeft) {
            context.moveTo(580 + offset, 100)
            context.lineTo(630 + offset, 50)
            context.moveTo(580 + offset, 100)
            context.lineTo(630 + offset, 150)
        } else {
            context.moveTo(720 + offset, 100)
            context.lineTo(670 + offset, 50)
            context.moveTo(720 + offset, 100)
            context.lineTo(670 + offset, 150)
        }
        context.stroke()
    }
    
    // rocket level text
    if ("AllianceColor" in data) {
        context.textBaseline = "middle"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        if (data["AllianceColor"] == 1) {
            context.textAlign = "left"
            context.fillText("L3", 1230, 105)
            context.fillText("L2", 1230, 255)
            context.fillText("L1", 1230, 405)
            context.fillText("L1", 1230, 1195)
            context.fillText("L2", 1230, 1345)
            context.fillText("L3", 1230, 1495)
        } else {
            context.textAlign = "right"
            context.fillText("L3", 1770, 105)
            context.fillText("L2", 1770, 255)
            context.fillText("L1", 1770, 405)
            context.fillText("L1", 1770, 1195)
            context.fillText("L2", 1770, 1345)
            context.fillText("L3", 1770, 1495)
        }
    }
    
    // finish text
    context.textBaseline = "top"
    context.font = "60px sans-serif"
    context.fillStyle = "#000000"
    context.textAlign = "left"
    context.fillText("Show Result", 0, 0)
}
render()

buttonManager.addButton("blueHab1L", new Button(475, 500, 175, 200, function() {
                                                data["AllianceColor"] = 1
                                                data["StartLevel"] = 1
                                                data["StartPos"] = 0
                                                render()
                                                }))
buttonManager.addButton("blueHab1C", new Button(475, 700, 175, 200, function() {
                                                data["AllianceColor"] = 1
                                                data["StartLevel"] = 1
                                                data["StartPos"] = 1
                                                render()
                                                }))
buttonManager.addButton("blueHab1R", new Button(475, 900, 175, 200, function() {
                                                data["AllianceColor"] = 1
                                                data["StartLevel"] = 1
                                                data["StartPos"] = 2
                                                render()
                                                }))
buttonManager.addButton("blueHab2L", new Button(300, 500, 175, 200, function() {
                                                data["AllianceColor"] = 1
                                                data["StartLevel"] = 2
                                                data["StartPos"] = 0
                                                render()
                                                }))
buttonManager.addButton("blueHab2R", new Button(300, 900, 175, 200, function() {
                                                data["AllianceColor"] = 1
                                                data["StartLevel"] = 2
                                                data["StartPos"] = 2
                                                render()
                                                }))
buttonManager.addButton("redHab1R", new Button(2350, 500, 175, 200, function() {
                                               data["AllianceColor"] = 0
                                               data["StartLevel"] = 1
                                               data["StartPos"] = 2
                                               render()
                                               }))
buttonManager.addButton("redHab1C", new Button(2350, 700, 175, 200, function() {
                                               data["AllianceColor"] = 0
                                               data["StartLevel"] = 1
                                               data["StartPos"] = 1
                                               render()
                                               }))
buttonManager.addButton("redHab1L", new Button(2350, 900, 175, 200, function() {
                                               data["AllianceColor"] = 0
                                               data["StartLevel"] = 1
                                               data["StartPos"] = 0
                                               render()
                                               }))
buttonManager.addButton("redHab2R", new Button(2525, 500, 175, 200, function() {
                                               data["AllianceColor"] = 0
                                               data["StartLevel"] = 2
                                               data["StartPos"] = 2
                                               render()
                                               }))
buttonManager.addButton("redHab2L", new Button(2525, 900, 175, 200, function() {
                                               data["AllianceColor"] = 0
                                               data["StartLevel"] = 2
                                               data["StartPos"] = 0
                                               render()
                                               }))
buttonManager.addButton("blueCrossedLineToggle", new Button(530, 0, 240, 200, function() {
                                                            if (data["AllianceColor"] == 1) {
                                                            if (data["CrossedLine"] == 0) {
                                                            data["CrossedLine"] = 1
                                                            } else {
                                                            data["CrossedLine"] = 0
                                                            }
                                                            }
                                                            render()
                                                            }))
buttonManager.addButton("redCrossedLineToggle", new Button(2230, 0, 240, 200, function() {
                                                           if (data["AllianceColor"] == 0) {
                                                           if (data["CrossedLine"] == 0) {
                                                           data["CrossedLine"] = 1
                                                           } else {
                                                           data["CrossedLine"] = 0
                                                           }
                                                           }
                                                           render()
                                                           }))
buttonManager.addButton("blueCargoSelect", new Button(0, 450, 300, 300, function() {
                                                      if ("AllianceColor" in data && data["AllianceColor"] == 1) {
                                                      if (selectedPiece == "cargo") {
                                                      selectedPiece = "none"
                                                      } else {
                                                      selectedPiece = "cargo"
                                                      }
                                                      render()
                                                      }
                                                      }))
buttonManager.addButton("blueHatchSelect", new Button(0, 850, 300, 300, function() {
                                                      if ("AllianceColor" in data && data["AllianceColor"] == 1) {
                                                      if (selectedPiece == "hatch") {
                                                      selectedPiece = "none"
                                                      } else {
                                                      selectedPiece = "hatch"
                                                      }
                                                      render()
                                                      }
                                                      }))
buttonManager.addButton("redCargoSelect", new Button(2700, 450, 300, 300, function() {
                                                     if ("AllianceColor" in data && data["AllianceColor"] == 0) {
                                                     if (selectedPiece == "cargo") {
                                                     selectedPiece = "none"
                                                     } else {
                                                     selectedPiece = "cargo"
                                                     }
                                                     render()
                                                     }
                                                     }))
buttonManager.addButton("redHatchSelect", new Button(2700, 850, 300, 300, function() {
                                                     if ("AllianceColor" in data && data["AllianceColor"] == 0) {
                                                     if (selectedPiece == "hatch") {
                                                     selectedPiece = "none"
                                                     } else {
                                                     selectedPiece = "hatch"
                                                     }
                                                     render()
                                                     }
                                                     }))
function shipButton(failure) {
    var failureText = ""
    if (failure) {
        failureText = "Failures"
    }
    if (mode == 0) {
        if (selectedPiece == "hatch") {
            data["AutoShipHatch" + failureText] ++
        } else if (selectedPiece == "cargo") {
            data["AutoShipCargo" + failureText] ++
        }
    } else {
        if (selectedPiece == "hatch") {
            data["ShipHatch" + failureText] ++
        } else if (selectedPiece == "cargo") {
            data["ShipCargo" + failureText] ++
        }
    }
    render()
}
buttonManager.addButton("blueShipSuccess", new Button(1060, 700, 200, 200, function() {
                                                      if ("AllianceColor" in data && data["AllianceColor"] == 1) {
                                                      shipButton(false)
                                                      }
                                                      }))
buttonManager.addButton("redShipSuccess", new Button(1740, 700, 200, 200, function() {
                                                     if ("AllianceColor" in data && data["AllianceColor"] == 0) {
                                                     shipButton(false)
                                                     }
                                                     }))
buttonManager.addButton("blueShipFailure", new Button(1260, 700, 200, 200, function() {
                                                      if ("AllianceColor" in data && data["AllianceColor"] == 1) {
                                                      shipButton(true)
                                                      }
                                                      }))
buttonManager.addButton("redShipFailure", new Button(1540, 700, 200, 200, function() {
                                                     if ("AllianceColor" in data && data["AllianceColor"] == 0) {
                                                     shipButton(true)
                                                     }
                                                     }))
function rocketButton(level, failure) {
    var failureText = ""
    if (failure) {
        failureText = "Failures"
    }
    if (auto) {
        if (selectedPiece == "hatch") {
            data["AutoRocketHatch" + failureText] ++
        } else if (selectedPiece == "cargo") {
            data["AutoRocketCargo" + failureText] ++
        }
    } else {
        if (selectedPiece == "hatch") {
            data["RocketL" + level.toString() + "Hatch" + failureText] ++
        } else if (selectedPiece == "cargo") {
            data["RocketL" + level.toString() + "Cargo" + failureText] ++
        }
    }
    render()
}
for (var alliance = 0; alliance < 2; alliance++) {
    for (var i = 0; i < rocketButtonX.length; i++) {
        var allianceText = "red"
        if (alliance == 1) {
            allianceText = "blue"
        }
        var allianceShift
        if (rocketButtonSuccess[i]) {
            allianceShift = -1100
        } else {
            allianceShift = -800
        }
        buttonManager.addButton(allianceText + "RocketButton" + i.toString(), new Button(rocketButtonX[i] + (alliance * allianceShift), rocketButtonY[i], 150, 150, function() {
                                                                                         if ("AllianceColor" in data && data["AllianceColor"] == this.data["alliance"]) {
                                                                                         rocketButton(this.data["level"], this.data["failure"])
                                                                                         }
                                                                                         }))
        buttonManager.setData(allianceText + "RocketButton" + i.toString(), {"alliance": alliance, "level": rocketButtonLevel[i], "failure": !rocketButtonSuccess[i]})
    }
}
