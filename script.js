function calculateDate() {
    let dateString = document.getElementById('block3').value;
    let dateObj = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8));
    dateObj.setDate(dateObj.getDate() + 1);
    let nextDate = dateObj.toISOString().split('T')[0].replace(/-/g, '');
    document.getElementById('block5').value = nextDate;
}

function setToday() {
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0].replace(/-/g, '');
    document.getElementById('block3').value = formattedDate;
    calculateDate();  // aktualisiere Block 5 basierend auf dem neuen Datum
}

function setNow() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('block4').value = hours + minutes + seconds;
    syncTime();  // synchronisiere die Zeit zwischen Block 4 und Block 6
}

function syncTime() {
    let time = document.getElementById('block4').value;
    document.getElementById('block6').value = time;
}

function generateQRCodes() {
    // Daten aus den Eingabefeldern zusammensetzen
    let finalData = 
        document.getElementById('block1').value +
        document.getElementById('block2').value +
        document.getElementById('block3').value +
        document.getElementById('block4').value +
        document.getElementById('block5').value +
        document.getElementById('block6').value;

    // Die zusammengesetzte Zahlenreihe anzeigen
    document.getElementById('combinedValue').innerHTML = "Zusammengesetzte Zahlenreihe: <br>" + finalData;

    // QR-Code mit qrcode.js erstellen
    let qrDiv1 = document.getElementById('qrcode1');
    qrDiv1.innerHTML = "";
    let qrcode1 = new QRCode(qrDiv1, {
        text: finalData,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.M
    });
}
