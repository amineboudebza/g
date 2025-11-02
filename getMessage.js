const extractPriceAndLink = (text) => {
    // ------------------ قسم التنظيف والإعداد ------------------
    const arabicToLatin = (s) => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
    let t = arabicToLatin(String(text || '')); // <-- الإصلاح الأول (||) موجود
    t = t.replace(/[\u00A0\u200B-\u200D\uFEFF]/g, ' '); 
    t = t.replace(/\s+/g, ' ').trim();

    // استخراج الروابط أولاً
    let aliLinks = [...t.matchAll(/(https?:\/\/[^\s"]*aliexpress\.[^\s"]+|https?:\/\/[^\s"]*s\.click\.aliexpress\.com\/[^\s"]+|s\.click\.aliexpress\.com\/[^\s"]+|aliexpress\.[^\s"]+\/[^\s"]+)/gi)]
        .map(m => m[0].trim().replace(/[^\w\-._~:/?#[\]@!$&'()*+,;=%]+$/g, ''));
    aliLinks = aliLinks.map(link => !/^https?:\/\//i.test(link) ? 'https://' + link : link);

    let price = null;

    const normalizeNumberStr = (s) => {
        s = String(s).trim().replace(/\s+/g, '').replace(/,/g, '.');
        const parts = s.split('.');
        if (parts.length <= 1) return s;
        const last = parts.pop();
        return parts.join('') + '.' + last;
    };

    // --- القائمة السوداء للمواصفات التقنية (قاعدة الفيتو الكاملة) ---
    const isTechSpec = (checkContext) => {
        // ==== هذا هو الإصلاح الثاني الذي كان مفقودًا ====
        const disqualifyingUnits = /\b(GB|TB|GO|TO|RAM|ROM|SSD|M\.2|MB|Go|To|mAh|V\d+)\b/i; 
        return disqualifyingUnits.test(checkContext) || /\/\s*[\d.,]+/.test(checkContext) || /[A-Za-z]\d+/.test(checkContext); // لمنع V16
    };

    // ------------------ الخطوة الأولى: البحث الذهبي (الأنماط عالية الدقة) ------------------
    const highConfidencePatterns = [
        /(?:السعر|price|prix|سعرها|سعره|بـ|final|total|السعر بعد التخفيض|السعر النهائي)[\s:]*(?:[💲$€])?\s*([\d.,]+)\s*(?:[💲$€])?/i,
        /[💲$€]\s*([\d.,]+)/,
        /([\d.,]+)\s*[💲$€]/
    ];

    const lines = t.split('\n');

    for (const line of lines) {
        for (const pattern of highConfidencePatterns) {
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
                 if (!isTechSpec(checkContext) && (checkContext.includes('$') || checkContext.includes('💲') || /سعر/i.test(checkContext))) {
                    price = potentialPrice;
                    break; 
                 }
             }
        }
    }

    return {
        link: aliLinks.length ? aliLinks[0] : 'null',
        price: price !== null ? price : 'null'
    };
};

module.exports = extractPriceAndLink;
