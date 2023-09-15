"use strict";

function calculateDate() {
    let dateString = document.getElementById('block3').value;
    console.log("Ursprüngliches Datum:", dateString);
    
    let dateObj = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8));
    console.log("Date-Objekt erstellt:", dateObj);
    
    dateObj.setDate(dateObj.getDate() + 1);
    console.log("Date-Objekt nach Hinzufügen eines Tages:", dateObj);
    
    let year = dateObj.getFullYear();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // +1, da Monate von 0-11 indiziert sind
    let day = String(dateObj.getDate()).padStart(2, '0');
    let nextDate = year + month + day;

    console.log("Nächstes Datum:", nextDate);
    
    document.getElementById('block5').value = nextDate;
}


function setToday() {
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0].replace(/-/g, '');
    document.getElementById('block3').value = formattedDate;
    calculateDate();
}

function setNow() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('block4').value = hours + minutes + seconds;
    syncTime();
}

function syncTime() {
    let time = document.getElementById('block4').value;
    document.getElementById('block6').value = time;
}

function generateQRCodes() {
    const QrCode = qrcodegen.QrCode;  // Abbreviation
    const QrSegment = qrcodegen.QrSegment;  // Abbreviation

    let finalData = 
        document.getElementById('block1').value +
        document.getElementById('block2').value +
        document.getElementById('block3').value +
        document.getElementById('block4').value +
        document.getElementById('block5').value +
        document.getElementById('block6').value;

    document.getElementById('combinedValue').innerHTML = "Zusammengesetzte Zahlenreihe: <br>" + finalData;

    let segs = QrSegment.makeSegments(finalData);
    let qr = QrCode.encodeSegments(segs, QrCode.Ecc.MEDIUM, 2, 2, -1, false);

    drawCanvas(qr, 8, 4, "#FFFFFF", "#000000", document.getElementById('qrcode1'));
}

function drawCanvas(qr, scale, border, lightColor, darkColor, canvas) {
    if (scale <= 0 || border < 0)
        throw new RangeError("Value out of range");
    const width = (qr.size + border * 2) * scale;
    canvas.width = width;
    canvas.height = width;
    let ctx = canvas.getContext("2d");
    for (let y = -border; y < qr.size + border; y++) {
        for (let x = -border; x < qr.size + border; x++) {
            ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
            ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
        }
    }
}
