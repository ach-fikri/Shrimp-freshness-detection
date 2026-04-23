const messageTemplate = (resetLink) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        .email-container{font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px;background-color:#f9f9f9;border:1px solid #ddd;border-radius:10px}
        .button{background-color:#007BFF;color:#fff;font-weight:bold;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;margin-top:20px}
    </style>
</head>
<body>
    <div class="email-container">
        <h2>Permintaan Reset Password</h2>
        <p>Kami menerima permintaan untuk mengatur ulang password Anda. Jika ini bukan Anda, abaikan pesan ini.</p>
        <p>Untuk mengatur ulang password Anda, silakan klik tautan di bawah ini:</p>
        <a href="${resetLink}" class="button">Reset Password</a>
        <p>Jika tautan tidak berfungsi, salin dan tempel URL berikut ke browser Anda:</p>
        <p>${resetLink}</p>
        <p>Link ini akan kadaluarsa dalam 15 menit.</p>
        <p>Terima kasih,<br>Tim Support</p>
    </div>
</body>
</html>`;
}

module.exports = { messageTemplate };
