// Файл байршуулах үйл явдлын сонсогч нэмэх
document.getElementById('fileUpload').addEventListener('change', handleFile);

// Файл боловсруулах функц
function handleFile(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: 'array' });
        let sheetName = workbook.SheetNames[0];
        let sheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(sheet);

        // Өгөгдлийн хүчинтэй байдлыг шалгах
        if (validateExcelData(jsonData)) {
            processPoints(jsonData);
            sendToServer(jsonData);
        }
    };
    reader.readAsArrayBuffer(file);
}

// Excel өгөгдлийн хүчинтэй байдлыг шалгах
function validateExcelData(data) {
    for (let row of data) {
        if (!row.userId || typeof row.userId !== 'string') {
            alert('Алдаа: Хүчингүй хэрэглэгчийн ID утга байна.');
            return false;
        }
        if (!row.points || isNaN(row.points)) {
            alert('Алдаа: Онооны утга тоо биш байна.');
            return false;
        }
    }
    return true;
}

// Оноог боловсруулах функц
function processPoints(data) {
    data.forEach(row => {
        if (row.points < 0) {
            alert(`Алдаа: ${row.userId}-ийн оноо сөрөг байж болохгүй.`);
            return;
        }
        console.log(`Хэрэглэгч ${row.userId} нь ${row.points} оноо авсан`);
    });
    alert('Оноо амжилттай боловсруулагдлаа.');
}

// Сервер рүү өгөгдөл илгээх функц
async function sendToServer(data) {
    try {
        let response = await fetch('/api/uploadPoints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        let result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Серверийн алдаа:', error);
    }
}
