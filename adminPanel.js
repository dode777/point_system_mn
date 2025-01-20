// Хэрэглэгчийн оноог шинэчлэх функц
function updateUserPoints(userId, points) {
    if (!userPoints[userId]) {
        console.log('Оруулсан хэрэглэгч байхгүй байна.');
        return;
    }
    let newTotal = userPoints[userId] + points;
    if (newTotal < 0) {
        console.log('Оноо сөрөг байж болохгүй.');
        return;
    }
    userPoints[userId] = newTotal;
    console.log(`Хэрэглэгч ${userId}-ийн оноо шинэчлэгдсэн: ${userPoints[userId]}`);
}
