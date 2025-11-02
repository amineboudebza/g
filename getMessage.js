/سعر/i.test(checkContext))) {
                    price = potentialPrice;
                    break; 
                 }
             }
        }
    }
    // =================================================================
    // 🔥 [نهاية منطق السعر] 🔥
    // =================================================================


    // =================================================================
    // 🔥 [منطق الكوبونات - مأخوذ من v6] 🔥
    // =================================================================
    const coupons = [];

    // Regex 1: للرموز الصريحة (مثل: كود 40$: AEB010)
    const couponRegex = /((?:كوبونه?|كود|قسيمة|coupon|code)[\s:：-].*?[A-Z0-9]{4,})/gi;
    let match;
    while ((match = couponRegex.exec(text)) !== null) {
        const fullText = match[1].trim().replace(/\s+/g, ' ');
        if (!coupons.includes(fullText)) coupons.push(fullText);
    }

    // Regex 2: للأسطر الإرشادية (مثل: احصل على 1.41$)
    const fullLineCouponRegex = /((?:كوبونه?|كود|قسيمة|خصم|🎟|🎫|🙏|👊|☑️)[\s:：-].*?(?:[\d.,]+\s*[💲$€]))/gi;

    while ((match = fullLineCouponRegex.exec(text)) !== null) {
        const fullText = match[1].trim()
            .replace(/(\r\n|\n|\r)/gm, "") 
            .replace(/\s+/g, ' '); 

        if (fullText.length > 70  /سعر|price/i.test(fullText)) {
            continue;
        }

        let isDuplicate = false;
        for(const c of coupons) {
            if (c.includes(fullText) || fullText.includes(c)) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) coupons.push(fullText);
    }
    // =================================================================
    // 🔥 [نهاية منطق الكوبونات] 🔥
    // =================================================================


    // ------------------ النتيجة النهائية (مدمجة) ------------------
    return {
        link: aliLinks.length ? aliLinks[0] : 'null',
        price: price !== null ? price : 'null',
        coupons // <-- إضافة الكوبونات للنتيجة
    };
};

module.exports = extractPriceAndLink;
