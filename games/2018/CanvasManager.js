// canvas object in variable 'canvas'
// alliances reversed in variable 'reverseAlliances' -> no reverse = red on right
// width = 3000px, height = 1600px
var mode = 0 // 0 = auto, 1 = teleop, 2 = endgame
this.setMode = function(newMode) { // REQUIRED FUNCTION
    mode = newMode
    dataLog = []
    render()
}
this.getData = function() { // REQUIRED FUNCTION
    sendData = jsonCopy(data)
    if (sendData["AllianceColor"] == 1) {
        sendData["FieldSwitchPos"] = sendData["FieldSwitchPosBlue"]
    } else if (sendData["AllianceColor"] == 0) {
        sendData["FieldSwitchPos"] = sendData["FieldSwitchPosRed"]
    } else {
        sendData["FieldSwitchPos"] = 0
    }
    delete sendData["FieldSwitchPosRed"]
    delete sendData["FieldSwitchPosBlue"]
    
    if (reverseAlliances) {
        sendData["AllianceColor"] = 1 - sendData["AllianceColor"]
    }
    return sendData
}
function uploadData() { // Closes scouting interface and saves data (if using visual for end game, must have a call to this function)
    document.dispatchEvent(uploadEvent)
}

var context = canvas.getContext("2d")
var buttonManager = new ButtonManager(canvas)
var data = {"FieldScalePos": 0, "FieldSwitchPosRed": 0, "FieldSwitchPosBlue": 0, "AutoCross": 0, "AutoSwitch": 0, "AutoScale": 0, "AutoXchange": 0, "NumDelToSwitch": 0, "NumDelToScale": 0, "NumDelToXchange": 0, "NumDelToOppSwitch": 0}
var dataLog = []
var buttonPositions = {"blueSwitch": "none", "scale": "none", "redSwitch": "none"}
var buttonFields = {"blueSwitch": "none", "scale": "none", "redSwitch": "none"}
var redColor = "#ff0000"
var redHighlightColor = "#ff7575"
var blueColor = "#0000de"
var blueHighlightColor = "#6666ff"
if (reverseAlliances) {
    redColor = "#0000de"
    redHighlightColor = "#6666ff"
    blueColor = "#ff0000"
    blueHighlightColor = "#ff7575"
}

function jsonCopy(original) {
    return JSON.parse(JSON.stringify(original))
}

function saveData() {
    dataLog.push(jsonCopy(data))
}

this.render = function() {
    render()
}

this.clear = function() {
    context.clearRect(0, 0, 3000, 1600)
}

function render() {
    context.clearRect(0, 0, 3000, 1600)
    
    // main background
    context.beginPath()
    context.moveTo(550, 200)
    context.lineTo(300, 300)
    context.lineTo(300, 1300)
    context.lineTo(550, 1400)
    context.lineTo(2450, 1400)
    context.lineTo(2700, 1300)
    context.lineTo(2700, 300)
    context.lineTo(2450, 200)
    context.closePath()
    context.strokeStyle = "#000000"
    context.fillStyle = "#d1d1d1"
    context.lineWidth = 5
    context.fill()
    context.stroke()
    
    if (mode == 0) {
        // red starting positions background
        context.fillStyle = redColor
        context.fillRect(2450, 300, 250, 500)
        context.fillRect(2450, 1050, 250, 250)
        
        if ("AllianceColor" in data) {
            if (data["AllianceColor"] == 0) {
                context.fillStyle = redHighlightColor
                if (data["StartPos"] == 0) {
                    context.fillRect(2450, 1050, 250, 250)
                } else if (data["StartPos"] == 1) {
                    context.fillRect(2450, 550, 250, 250)
                } else if (data["StartPos"] == 2) {
                    context.fillRect(2450, 300, 250, 250)
                }
            }
        }
        
        context.strokeRect(2450, 300, 250, 250)
        context.strokeRect(2450, 550, 250, 250)
        context.strokeRect(2450, 1050, 250, 250)
        
        // blue starting positions background
        context.fillStyle = blueColor
        context.fillRect(300, 300, 250, 250)
        context.fillRect(300, 800, 250, 500)
        
        if ("AllianceColor" in data) {
            if (data["AllianceColor"] == 1) {
                context.fillStyle = blueHighlightColor
                if (data["StartPos"] == 0) {
                    context.fillRect(300, 300, 250, 250)
                } else if (data["StartPos"] == 1) {
                    context.fillRect(300, 800, 250, 250)
                } else if (data["StartPos"] == 2) {
                    context.fillRect(300, 1050, 250, 250)
                }
            }
        }
        
        context.strokeRect(300, 300, 250, 250)
        context.strokeRect(300, 800, 250, 250)
        context.strokeRect(300, 1050, 250, 250)
    }
    
    // red xchange
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            context.fillStyle = redColor
            context.fillRect(2700, 800, 250, 250)
            context.strokeRect(2700, 800, 250, 250)
            context.textBaseline = "middle"
            context.textAlign = "center"
            context.font = "180px sans-serif"
            context.fillStyle = "#000000"
            var value = data["AutoXchange"]
            if (mode == 1) {
                value = data["NumDelToXchange"]
            }
            context.fillText(value, 2825, 925)
        }
    }
    
    // blue xchange
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 1) {
            context.fillStyle = blueColor
            context.fillRect(50, 550, 250, 250)
            context.strokeRect(50, 550, 250, 250)
            context.textBaseline = "middle"
            context.textAlign = "center"
            context.font = "180px sans-serif"
            context.fillStyle = "#000000"
            var value = data["AutoXchange"]
            if (mode == 1) {
                value = data["NumDelToXchange"]
            }
            context.fillText(value, 175, 675)
        }
    }
    
    function renderScorer(xPos, type, positionField, value) {
        context.lineWidth = 5
        context.lineCap = "butt"
        
        if (data[positionField] == 0) {
            context.fillStyle = blueColor
        } else {
            context.fillStyle = redColor
        }
        context.fillRect(xPos - 175, 450, 350, 350)
        context.strokeRect(xPos - 175, 450, 350, 350)
        
        if (data[positionField] == 0) {
            context.fillStyle = redColor
        } else {
            context.fillStyle = blueColor
        }
        context.fillRect(xPos - 175, 800, 350, 350)
        context.strokeRect(xPos - 175, 800, 350, 350)
        
        if (mode == 0) {
            context.lineWidth = 15
            context.lineCap = "round"
            context.beginPath()
            context.moveTo(xPos, 720)
            context.lineTo(xPos + 50, 770)
            context.moveTo(xPos, 720)
            context.lineTo(xPos - 50, 770)
            
            context.moveTo(xPos, 720)
            context.lineTo(xPos, 880)
            
            context.moveTo(xPos, 880)
            context.lineTo(xPos + 50, 830)
            context.moveTo(xPos, 880)
            context.lineTo(xPos - 50, 830)
            context.stroke()
        }
        
        if ("AllianceColor" in data) {
            var textHigh = Number(data["AllianceColor"])
            textHigh = Math.abs(textHigh - Number(data[positionField]))
            context.textBaseline = "middle"
            context.textAlign = "center"
            context.font = "180px sans-serif"
            context.fillStyle = "#000000"
            context.fillText(value, xPos, 1025 + (textHigh * -450))
            if (textHigh == 1) {
                buttonPositions[type] = "high"
            } else {
                buttonPositions[type] = "low"
            }
        } else {
            buttonPositions[type] = "none"
        }
    }
    
    var switchValue = ""
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            if (mode == 0) {
                switchValue = data["AutoSwitch"]
                buttonFields["redSwitch"] = "AutoSwitch"
            } else {
                switchValue = data["NumDelToSwitch"]
                buttonFields["redSwitch"] = "NumDelToSwitch"
            }
        } else {
            if (mode == 0) {
                switchValue = ""
                buttonFields["redSwitch"] = "none"
            } else {
                switchValue = data["NumDelToOppSwitch"]
                buttonFields["redSwitch"] = "NumDelToOppSwitch"
            }
        }
    }
    renderScorer(2025, "redSwitch", "FieldSwitchPosRed", switchValue)
    
    switchValue = ""
    if ("AllianceColor" in data) {
        if (data["AllianceColor"] == 0) {
            if (mode == 0) {
                switchValue = ""
                buttonFields["blueSwitch"] = "none"
            } else {
                switchValue = data["NumDelToOppSwitch"]
                buttonFields["blueSwitch"] = "NumDelToOppSwitch"
            }
        } else {
            if (mode == 0) {
                switchValue = data["AutoSwitch"]
                buttonFields["blueSwitch"] = "AutoSwitch"
            } else {
                switchValue = data["NumDelToSwitch"]
                buttonFields["blueSwitch"] = "NumDelToSwitch"
            }
        }
    }
    renderScorer(975, "blueSwitch", "FieldSwitchPosBlue", switchValue)
    
    var scaleValue = data["AutoScale"]
    buttonFields["scale"] = "AutoScale"
    if (mode == 1) {
        scaleValue = data["NumDelToScale"]
        buttonFields["scale"] = "NumDelToScale"
    }
    renderScorer(1500, "scale", "FieldScalePos", scaleValue)
    
    // HAB lines
    context.beginPath()
    context.lineWidth = 5
    context.strokeStyle = "#000000"
    context.moveTo(700, 200)
    context.lineTo(700, 1400)
    context.moveTo(2300, 200)
    context.lineTo(2300, 1400)
    context.stroke()
    
    // crossed line arrow
    if ("AllianceColor" in data && mode == 0) {
        context.lineWidth = 15
        context.lineCap = "round"
        context.beginPath()
        if (!("AutoCross" in data)) {
            data["AutoCross"] = 0
        }
        var pointLeft = data["AutoCross"] == 0
        if (data["AllianceColor"] == 0) {
            pointLeft = !pointLeft
        }
        var offset = data["AllianceColor"] * -1600 + 1600
        context.moveTo(630 + offset, 100)
        context.lineTo(770 + offset, 100)
        if (pointLeft) {
            context.moveTo(680 + offset, 50)
            context.lineTo(630 + offset, 100)
            context.lineTo(680 + offset, 150)
        } else {
            context.moveTo(720 + offset, 50)
            context.lineTo(770 + offset, 100)
            context.lineTo(720 + offset, 150)
        }
        context.stroke()
    }
    
    // undo button
    if (dataLog.length > 0) {
        context.fillStyle = "#e3e3e3"
        context.fillRect(1375, 1450, 250, 150)
        
        context.textBaseline = "middle"
        context.textAlign = "center"
        context.font = "70px sans-serif"
        context.fillStyle = "#000000"
        context.fillText("Undo", 1500, 1525)
    }
}
render()

buttonManager.addButton("blueStartL", new Button(300, 300, 250, 250, function() {
                                                 if (mode == 0) {
                                                     data["AllianceColor"] = 1
                                                     data["StartPos"] = 0
                                                     render()
                                                 }
                                                 }))
buttonManager.addButton("blueStartC", new Button(300, 800, 250, 250, function() {
                                                 if (mode == 0) {
                                                     data["AllianceColor"] = 1
                                                     data["StartPos"] = 1
                                                     render()
                                                 }
                                                 }))
buttonManager.addButton("blueStartR", new Button(300, 1050, 250, 250, function() {
                                                 if (mode == 0) {
                                                     data["AllianceColor"] = 1
                                                     data["StartPos"] = 2
                                                     render()
                                                 }
                                                 }))
buttonManager.addButton("redStartR", new Button(2450, 300, 250, 250, function() {
                                                if (mode == 0) {
                                                    data["AllianceColor"] = 0
                                                    data["StartPos"] = 2
                                                    render()
                                                }
                                                }))
buttonManager.addButton("redStartC", new Button(2450, 550, 250, 250, function() {
                                                if (mode == 0) {
                                                    data["AllianceColor"] = 0
                                                    data["StartPos"] = 1
                                                    render()
                                                }
                                                }))
buttonManager.addButton("redStartL", new Button(2450, 1050, 250, 250, function() {
                                                if (mode == 0) {
                                                    data["AllianceColor"] = 0
                                                    data["StartPos"] = 0
                                                    render()
                                                }
                                                }))
buttonManager.addButton("blueCrossedLineToggle", new Button(530, 0, 240, 200, function() {
                                                            if (data["AllianceColor"] == 1 && mode == 0) {
                                                                data["AutoCross"] = 1 - data["AutoCross"]
                                                                render()
                                                            }
                                                            }))
buttonManager.addButton("redCrossedLineToggle", new Button(2230, 0, 240, 200, function() {
                                                           if (data["AllianceColor"] == 0 && mode == 0) {
                                                               data["AutoCross"] = 1 - data["AutoCross"]
                                                               render()
                                                           }
                                                           }))
buttonManager.addButton("scalePosToggle", new Button(1375, 675, 250, 250, function() {
                                                     if (mode == 0) {
                                                         data["FieldScalePos"] = 1 - data["FieldScalePos"]
                                                         render()
                                                     }
                                                     }))
buttonManager.addButton("redSwitchPosToggle", new Button(1900, 675, 250, 250, function() {
                                                     if (mode == 0) {
                                                         data["FieldSwitchPosRed"] = 1 - data["FieldSwitchPosRed"]
                                                         render()
                                                     }
                                                     }))
buttonManager.addButton("blueSwitchPosToggle", new Button(850, 675, 250, 250, function() {
                                                         if (mode == 0) {
                                                             data["FieldSwitchPosBlue"] = 1 - data["FieldSwitchPosBlue"]
                                                             render()
                                                         }
                                                         }))
buttonManager.addButton("scaleDeliveryTop", new Button(1325, 450, 350, 225, function() {
                                                       if (buttonFields["scale"] != "none" && buttonPositions["scale"] == "high") {
                                                           saveData()
                                                           data[buttonFields["scale"]] ++
                                                           render()
                                                       }
                                                       }))
buttonManager.addButton("scaleDeliveryBottom", new Button(1325, 925, 350, 225, function() {
                                                          if (buttonFields["scale"] != "none" && buttonPositions["scale"] == "low") {
                                                              saveData()
                                                              data[buttonFields["scale"]] ++
                                                              render()
                                                          }
                                                          }))
buttonManager.addButton("redSwitchDeliveryTop", new Button(1850, 450, 350, 225, function() {
                                                       if (buttonFields["redSwitch"] != "none" && buttonPositions["redSwitch"] == "high") {
                                                           saveData()
                                                           data[buttonFields["redSwitch"]] ++
                                                           render()
                                                       }
                                                       }))
buttonManager.addButton("redSwitchDeliveryBottom", new Button(1850, 925, 350, 225, function() {
                                                          if (buttonFields["redSwitch"] != "none" && buttonPositions["redSwitch"] == "low") {
                                                              saveData()
                                                              data[buttonFields["redSwitch"]] ++
                                                              render()
                                                          }
                                                          }))
buttonManager.addButton("blueSwitchDeliveryTop", new Button(800, 450, 350, 225, function() {
                                                           if (buttonFields["blueSwitch"] != "none" && buttonPositions["blueSwitch"] == "high") {
                                                               saveData()
                                                               data[buttonFields["blueSwitch"]] ++
                                                               render()
                                                           }
                                                           }))
buttonManager.addButton("blueSwitchDeliveryBottom", new Button(800, 925, 350, 225, function() {
                                                              if (buttonFields["blueSwitch"] != "none" && buttonPositions["blueSwitch"] == "low") {
                                                                  saveData()
                                                                  data[buttonFields["blueSwitch"]] ++
                                                                  render()
                                                              }
                                                              }))
buttonManager.addButton("redXchange", new Button(2700, 800, 250, 250, function() {
                                                 if ("AllianceColor" in data) {
                                                     if (data["AllianceColor"] == 0) {
                                                         saveData()
                                                         if (mode == 0) {
                                                             data["AutoXchange"] ++
                                                         } else {
                                                             data["NumDelToXchange"] ++
                                                         }
                                                         render()
                                                     }
                                                 }
                                                 }))
buttonManager.addButton("blueXchange", new Button(50, 550, 250, 250, function() {
                                                  if ("AllianceColor" in data) {
                                                      if (data["AllianceColor"] == 1) {
                                                          saveData()
                                                          if (mode == 0) {
                                                              data["AutoXchange"] ++
                                                          } else {
                                                              data["NumDelToXchange"] ++
                                                          }
                                                          render()
                                                      }
                                                  }
                                                  }))
buttonManager.addButton("undoButton", new Button(1375, 1450, 250, 150, function() {
                                                 if (dataLog.length > 0) {
                                                     data = jsonCopy(dataLog.pop())
                                                     render()
                                                 }
                                                 }))
