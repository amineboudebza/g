getID.meta.type
                    );

                    console.log(generate ===>${generate});

                    // =================== ✅ [التصحيح الجديد هنا] ===================
                    
                    // [الشرط الجديد]: التأكد من وجود العنوان والصورة
                    if (!productData  !productData.title  !productData.image_url?.startsWith("http")) {
                        console.error(❌ فشل في جلب بيانات المنتج أو الصورة (linkpreview) لـ ID: ${getID.id}. سيتم تخطي هذا المنشور.);
                        await savePost(channel, latestPost); // احفظ المنشور لتجنب التكرار
                        continue; // اذهب إلى القناة التالية (هذا هو الحل المطلوب)
                    }

                    // إذا نجح كل شيء، قم ببناء الرسالة
                    let message = ✅ ${productData.title}\n\n;
                    let imageUrl = { url: productData.image_url };

                    // السعر
                    if (postInfo.price !== 'null') {
                        message += ✅ السعر: $${postInfo.price}\n;
                    }

                    // الكوبونات
                    if (Array.isArray(postInfo.coupons) && postInfo.coupons.length > 0) {
                        for (const coupon of postInfo.coupons) {
                            message += 🎟️ ${coupon}\n;
                        }
                    }

                    // الرابط
                    message += ✅ رابط الشراء: ${generate}\n\n;

                    // معلومات إضافية
                    message += 👩‍🚀إستخدم البوت قبل كل عملية شراء
@Amine13bot
;

                    if (getID.meta.type === 'bundle') {
                        message += 🎁 هذا عرض خاص بـ bundle\n;
                    }
                    // ================================================================

                    // إرسال الرسالة (فقط كصورة)
                    await bot.telegram.sendPhoto(
                        "@autocopy21",
                        imageUrl,
                        { caption: message }
                    );

                    await savePost(channel, latestPost);
                } else {
                    console.log(⏳ لا جديد في: ${channel});
                }
            } catch (err) {
                console.error(❌ خطأ في ${channel}:, err.message);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 20000));
    }
}

// =======================
// Main
// =======================
(async () => {
    const users = await channels.usersDb();
    channelList = users.map(u => formatChannelName(u.name));

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    app.get("/ok", (req, res) => res.send("Hello World!"));

    app.listen(port, () => {
        console.log(🚀 السيرفر يعمل على المنفذ ${port});
        monitorChannels(client);
        keepAppRunning();
    });
})();
