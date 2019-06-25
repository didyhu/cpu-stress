const { app, Tray, Menu } = require("electron")
const path = require("path")
const childProcess = require("child_process")

"use strict"

const applicationName = "cpu-stress"
let tray, workers = []

app.on("ready", () => {
    for (let i = 0; i < 2; i++) {
        workers[i] = childProcess.fork(path.join(__dirname, "./stress.js"))
    }
    tray = new Tray(path.join(__dirname, "./icon.ico"))
    const contextMenu = Menu.buildFromTemplate([
        { label: "关闭", type: "normal", click }
    ])
    function click(event) {
        for (const worker of workers) {
            worker.kill("SIGINT")
        }
        app.exit()
    }
    tray.setToolTip("烤机中")
    tray.setContextMenu(contextMenu)
    tray.displayBalloon({
        title: "CPUStress",
        content: "正在烤机中"
    })

})
