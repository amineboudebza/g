const axios = require("axios");
const cheerio = require("cheerio");

class AliExpressHelper {

    async generateLink(cook, idProduct, typeurl, trackID = "default") {
        // رابط affiliate

        let url;

        if (typeurl === 'bundle') {
            url = `https://portals.aliexpress.com/tools/linkGenerate/generatePromotionLinkV2.htm?shipTos=DZ&trackId=default&targetUrl=https:%2F%2Fwww.aliexpress.com%2Fssr%2F300000512%2FBundleDeals2%3FdisableNav%3DYES%26pha_manifest%3Dssr%26_immersiveMode%3Dtrue%26productIds%3D${idProduct}%26aff_fcid%3D`;
        } else if (typeurl === 'syicon') {
            url = `https://portals.aliexpress.com/tools/linkGenerate/generatePromotionLinkV2.htm?shipTos=DZ&trackId=default&targetUrl=https:%2F%2Fm.aliexpress.com%2Fp%2Fcoin-index%2Findex.html%3F_immersiveMode%3Dtrue%26from%3Dsyicon%26productIds%3D${idProduct}%26tracking%3Dtrue%26aff_fcid%3D`;
        } else {
            url = `https://portals.aliexpress.com/tools/linkGenerate/generatePromotionLinkV2.htm?shipTos=DZ&trackId=default&targetUrl=https:%2F%2Fstar.aliexpress.com%2Fshare%2Fshare.htm%3FredirectUrl%3Dhttps%253A%252F%252Fvi.aliexpress.com%252Fitem%252F${idProduct}.html%253FsourceType%253D620%2526channel%253Dcoin%2526aff_fcid%253D`
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; xman_us_t=ctoken=100yd81z3ya8p&l_source=aliexpress&ae_g=n&x_user=aJRlPiSRkhsxYvUVsZ0LfIELOjk4qs4fwTzYc69/TN8=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=lOtWuxxgbL8NPGntthK5gb63Q14ItyE6Qb/uehobdur8dVlEBg28H9Kc56yk0SaelFN5HNRQxKq5YQtLto6osSiMcDLuku+1yHQ5biZCLXlvVWhQRoO8f8Wa/H4KSrTAzEdssNpRG6tLyWUnSeJNUs9ooEfCbXSIV9L0sanvj65c60gAu9PJQVGkMW+18j3mIBmxyEirCSDbIe4i6Cah3cjadHibCdhIrBMVkmbRnLXLQSrixT034+jNt6Fcfzofpubyk3PK6mqR5A0XzLhBu7mSDvclhi/Uho0a2PLY8H8vCuyJUwWATcqzGqUCRjqeFpA4l6x+SkUvdwV75Zihwah5u/utF+6k/kxBaDJRGPzc4cs8vDiVfzDRFYeLYlRXI57OLqBvktOGlTmVS6/fQno8fEE/Drm1OP41hJu+AuHVytNzjAFZl2vny7CeAFjmcskvHHZ03olgnzJ/4uFI1XuIsEXOZdwQJJuO2Gx3ALsvyuLsFQP6hZ+vXibLWI23UAIytefU4sFdldBa/WAKIg6PIIV2XJ3idLJ5wTkGIBR8BhBQ6wuYmKHHFcd0iVoRPptzQxub2oTMzQgIcLV8LlkRttuo6bHtc35jtgiGg//9UvmCq60TW/j89U2to5wm0tYFwf0l5OQL/O4PWBbnXUHQbWfwLymhZtYob8Vwv34RRGwKiOVzDKfWRMQarz2yuStbeeMCxpAEYs/jYbuDePPROOtdRPYK; af_ss_a=1; af_ss_b=1; aep_usuc_f=city=null&re_sns=google&b_locale=en_US&site=fra&province=null&c_tp=EUR&x_alimid=3073958362&isfb=y&ups_d=1|1|1|1&isb=y&ups_u_t=1785605003470&region=FR&ae_u_p_s=2; _gcl_au=1.1.739384075.1770053008; _fbp=fb.1.1770053008325.661875889866792841; _ga=GA1.1.1086877865.1770053008; _pin_unauth=dWlkPU5qUTNPR1F4WlRjdE5EVXhZeTAwWTJKaUxUazFaR1l0T1RBMFlUVTJaalEwTURJMA; tfstk=f0HIjnwZuwbIYvi_rWKNlpNWtIeSO29VpgZ-m0BF2JedyanY7H2rTHj-20gfL9oJ-4M7W0XU4JUKXcEu2uILyk36equ74WKn4uMsk0-3aUDSsTimqv-3UH2nx82JuEJ4FDm3Eeru1NDBBNEEXuELeNcadRwJuEJNulfVC8nezGqTfcUgV9QLy4etXuqbeue89haTVofRJ4eJfcUgqaU8w8IOBorcJfpRcuOQ-Dt5shMD7ZzovP6joAZL96mQ5TB-CfNQkaz1eTH_v0FF7BXXarh08SznWdWQFcESlogCWFw-fvDb6vLGF507W7DL1BBtlJg7MvF12tmapf2_XxKPiPk_84HQ6nWbaRH4MJhwsePzdog-K2s5eqnZ0vViFE_TrXr0BkgJHFsyAtzfdUf5fSX7fr-6f_fzLbuwyf7-nJFLjkNwfh_KZWEgfr-6f_fu9lqQ7ht1Jbf..; isg=BHp6mjRnx3V9qkunIlYlQZ9qy6CcK_4FYsIhL4RzJI3YdxuxbLidFZKFwxurZ3ad; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&x_as_i=%7B%22aeuCID%22%3A%22d9c90dba87ab488eb1d2fdc8f2a2154d-1770054076736-09497-_c3EA2Xhh%22%2C%22affiliateKey%22%3A%22_c3EA2Xhh%22%2C%22channel%22%3A%22AFFILIATE%22%2C%22cv%22%3A%221%22%2C%22isCookieCache%22%3A%22N%22%2C%22ms%22%3A%221%22%2C%22pid%22%3A%223073958362%22%2C%22tagtime%22%3A1770054076736%7D&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; aeu_cid=d9c90dba87ab488eb1d2fdc8f2a2154d-1770054076736-09497-_c3EA2Xhh; traffic_se_co=%7B%22src%22%3A%22Twitter%22%2C%22timestamp%22%3A1770054076739%7D; cto_bundle=ZLIdbF9nUWtKV1dONzd2WUpjTUNWOVF1aUxSTzZIWExhRVpxbjd4YVZSeDhNOFp3SmVWZHJRblRkMHlRdE4lMkZaRVpvSWR1Vmg5dG54SDFIU0Z3S3NTYldYRENzT3pveDBnZUdwSWVkNm9DU3g4cWc3V2tnaERJNiUyQllQT2V4UnNBcFZkVTZVTGd6emZ2eXhSMGNGNyUyQmpoOUprZXclM0QlM0Q; _ga_VED1YSGNC7=GS2.1.s1770756765$o5$g1$t1770756855$j60$l0$h0; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005006692829025%091005006103319616%091005007431422013%091005005863831684%091005008370870402%091005006691583009%0932913475990%091005008932111044; xman_f=P2114PX1M430kmdwMfHlLzIWq7ApORCDU+aocrEYCjcK4SBbdnLNkoMkGrONIlY50dUDgq+QS/xZnodDI0eqjmvuyAIwr3VuDFYlOgGZCcByEuWbxHYBHIGPZ7E1l7ohsL/+SOQmHl2tUBCKp5cFaG+2aSihfxbRZjPGES2b0HBjxjEkd9Y8JyEsGxFPPvKOPe6xAzu09sUcYYELf3DIEn76egfyRQrF1GRlzOlRPVTY6CaRrdex5DxHlse8dJUjX4nNG2YO2N2uMeTiqPipx5rAwVZwb5utgMeBRXIkLw1/sRVmI1iep1RBKGobMan860JG3I998RU37RECrkR1p+R7LvblpjSbAncBWn1V1/pr0hG1lS4rwNUknIL+DEcUbaa9KbmDEis/B7LlJA9tz6HPFrVr3N0YwikrKsnwnWZDCRhg2qdde7dfSU1UifPrxXZI1CcbHOkFuGenyX100A==; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; acs_usuc_t=x_csrf=faezwkvm4fxk&acs_rt=9329df6681414c788adf90b12cc4af36; x-hng=lang=en-US; JSESSIONID=782304ADA14E9317E598295EB7A9CA1B; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gt3r8pXlEULrUQJi_f4e7r2HmhU8RyJ6K2wQtXc3N82uR3E3txkaOkx-de7EwXVIV8wS0Jkm38AJ9BLEtxcCRQHQFxWnCvwuR0GBLxMiQki7A3FnLXyjdwgE9wPntvd8dQKjwbUL-d9_8FG-wnIFA2gP-jqmM5VhxnZlDUHexd965EguMG7XCb9Zmmi49-Vutw2HgtVanTfoK8qcn5PT-JDnKsc095PhKW4Hgj2YOy2nKuA4o-F3-JD3-XqnZXb41uAlvuzFyQt_VRcu3wbNH7EkcXICJwCTOuwgm-73GqPz4RcoSAbqFS0julZfOpzm6mMugP8FozrZqYPmMp7aEcGt1Jql6NhqLqzmrc5h-jzzhl3reTJ4I4hmWrqXSClmkYG-uX1H-SM_nb3u8FATzz2uuS3BHa2EmD072yBkUyc4tg-PpS0ro2nPKMruMSy6gI5hUDPkOJh0UMILmPF4CQN5vMEuMSy6gISdvoVTgRO7N%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaYvxM4TIUfFYHl%252F6Lz9ik%252FZ9PoEs32ugoqBlWj1PQ8pexIBm5aA%253D%2522%252C%2522epssw%2522%253A%252211*mmL96mLMnXoRgmmaBoTkzudIZn9UCMzwnK3LTM9m4lwp2kDj2GMEohOJzo5e_P-tANtXlrtiWhMyh4yxmmHBEtvOEOymmmAvLOAvHVo-djZSq5yFanKnwClg03AxvlIkzSgQmmmmarbizvjYBjD5bzkCSiQmgvitJy37xU9pPgpTukbu53i81mmfmmamq_BTEDpqGBTeSnRUmmHuuplhmeQbuUkbu8wmma7tRRmmqDam7D6q1jEHfDaVlccFfDSpl6n0BjPYNjaEEmEYNBmm6igEBjaafDPwEEmVvrdiHFFsesR15zorEBe.%2522%257D`,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                }
            });

            if (response.status === 200 && response.data) {
                return response.data.data.shortLink;
            }
            return null;
        } catch (err) {
            console.error(`❌ Error generateLink: ${err.message}`);
            return null;
        }
    }

    // async getProductData(id,lang) {
    //     const url = `https://${lang || 'vi'}.aliexpress.com/item/${id}.html`;

    //     try {
    //         const response = await axios.get(url, {
    //             headers: {
    //                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    //                 "Accept-Language": "en-US,en;q=0.9",
    //             },
    //             timeout: 10000,
    //         });

    //         if (response.status !== 200) {
    //             console.log(`❌ فشل في تحميل الصفحة: ${response.status}`);
    //             return null;
    //         }

    //         const $ = cheerio.load(response.data);
    //         const imageUrl = $("meta[property='og:image']").attr("content");
    //         const title = $("meta[property='og:title']").attr("content");

    //         if (!title || !imageUrl) {
    //             console.log("⚠️ لم يتم العثور على العنوان أو الصورة");
    //             return null;
    //         }

    //         return { title, image_url: imageUrl };
    //     } catch (err) {
    //         console.error(`❌ خطأ أثناء جلب بيانات المنتج: ${err.message}`);
    //         return null;
    //     }
    // }

    async getProductData(productId) {
        try {
            const url = 'https://linkpreview.xyz/api/get-meta-tags';
            const params = {
                url: `https://vi.aliexpress.com/item/${productId}.html`
            };

            const response = await axios.get(url, { params });
            const data = response.data;

            return {
                title: data.title || '',
                image_url: data.image || null,

            };

        } catch (err) {
            console.error("Error fetching preview:", err.message);
            return null;
        }
    }

}

module.exports = AliExpressHelper;






















