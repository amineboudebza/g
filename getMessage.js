const extractPriceAndLink = (text) => {
    // ------------------ قسم التنظيف والإعداد ------------------
    const arabicToLatin = (s) => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
    let t = arabicToLatin(String(text  ''));
    t = t.replace(/[\u00A0\u200B-\u200D\uFEFF]/g, ' '); 
    t = t.replace(/\s+/g, ' ').trim();

    // ------------------ استخراج الروابط ------------------
    let aliLinks = [...t.matchAll(/(https?:\/\/[^\s"]*aliexpress\.[^\s"]+|https?:\/\/[^\s"]*s\.click\.aliexpress\.com\/[^\s"]+|s\.click\.aliexpress\.com\/[^\s"]+|aliexpress\.[^\s"]+\/[^\s"]+)/gi)]
        .map(m => m[0].trim().replace(/[^\w\-._~:/?#[\]@!$&'()*+,;=%]+$/g, ''));
    aliLinks = aliLinks.map(link => !/^https?:\/\//i.test(link) ? 'https://' + link : link);

    // =================================================================
    // 🔥 [منطق السعر الاحترافي - مأخوذ بالكامل من ملفك] 🔥
    // =================================================================
    let price = null;

    const normalizeNumberStr = (s) => {
        s = String(s).trim().replace(/\s+/g, '').replace(/,/g, '.');
        const parts = s.split('.');
        if (parts.length <= 1) return s;
        const last = parts.pop();
        return parts.join('') + '.' + last;
    };

    // --- القائمة السوداء للمواصفات التقنية (قاعدة الفيتو الكاملة) ---
    // (هذا هو مفتاح الحل من ملفك)
    const isTechSpec = (checkContext) => {
        const disqualifyingUnits = /\b(GB|TB|GO|TO|RAM|ROM|SSD|M\.2|MB|Go|To|mAh|V\d+)\b/i; 
        return disqualifyingUnits.test(checkContext)  /\/\s*[\d.,]+/.test(checkContext)  /[A-Za-z]\d+/.test(checkContext);
    };

    // ------------------ الخطوة الأولى: البحث الذهبي (الأنماط عالية الدقة) ------------------
    const highConfidencePatterns = [
        /(?:السعر|price|prix|سعرها|سعره|بـ|final|total|السعر بعد التخفيض|السعر النهائي|الـــسعـر|السعـر|الثمن بعد)[\s:]*(?:[💲$€])?\s*([\d.,]+)\s*(?:[💲$€])?/i,
        /[💲$€]\s*([\d.,]+)/,
        /([\d.,]+)\s*[💲$€]/
    ];

    const lines = t.split('\n');

    for (const line of lines) {
        // (تم إضافة الرموز التعبيرية هنا لضمان التطابق مع v6)
        const keywords = [
            "السعر", "price", "prix", "سعرها", "سعره", "الثمن بعد", 
            "الـــسعـر", "السعـر", "سعر تخفيض العملات", "السعر بعد التخفيض"
        ].join('|');
        const highConfidenceV6 = new RegExp(`.*?(?:${keywords})[^\\\\d\\\\r\\\\n]*?([\\d.,]+)\\s*(?:[💲$€])?`, 'i');
        
        const patternsToTry = [highConfidenceV6, ...highConfidencePatterns];

        for (const pattern of patternsToTry) {
            const match = line.match(pattern);
            if (match && match[1]) {
                const numStr = normalizeNumberStr(match[1]);
                const potentialPrice = parseFloat(numStr);

                if (!isNaN(potentialPrice) && potentialPrice > 0.5 && potentialPrice < 10000) {
                    const checkContext = line.substring(Math.max(0, match.index - 10), Math.min(line.length, match.index + match[0].length + 10));
                    
                    if (!isTechSpec(checkContext)) { // استخدام الدالة الكاملة
                        price = potentialPrice;
                        break;
                    }
                }
            }
        }
        if (price !== null) {
            break;
        }
    }
    
    // ------------------ الخطوة الثانية: البحث في النص الكامل كخطة بديلة ------------------
    if (price === null) {
        const allNumbers = [...t.matchAll(/([\d.,]+)/g)];
        for (const match of allNumbers) {
             const numStr = normalizeNumberStr(match[0]);
             const potentialPrice = parseFloat(numStr);

             if (!isNaN(potentialPrice) && potentialPrice > 0.5 && potentialPrice < 10000) {
                const checkContext = t.substring(Math.max(0, match.index - 10), Math.min(t.length, match.index + match[0].length + 10));
                 if (!isTechSpec(checkContext) && (checkContext.includes('$')  checkContext.includes('💲')
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
