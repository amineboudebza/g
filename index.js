// =================== بناء رسالة المنتج ===================

// إذا نجح كل شيء، قم ببناء الرسالة
let message = 🛒 تــخفــيض لـ\n\n;

// اسم المنتج
message += ✔️ ${productData.title}\n\n;

// السعر بعد التخفيض
if (postInfo.price !== 'null') {
    message += 💵 السعر بعد التخفيض: $${postInfo.price} 🔥\n;
}

// الرابط
message += 🔗 ${generate}\n\n;

// معلومات إضافية
message += 👩‍🚀إستخدم البوت قبل كل عملية شراء
@Amine13bot;

if (getID.meta.type === 'bundle') {
    message += \n🎁 هذا عرض خاص بـ bundle;
}

// الصورة
let imageUrl = { url: productData.image_url };

// إرسال الرسالة (كصورة مع كابتشن)
await bot.telegram.sendPhoto(
    "@autocopy21",
    imageUrl,
    { caption: message }
);

// حفظ آخر منشور
await savePost(channel, latestPost);

// ========================================================
