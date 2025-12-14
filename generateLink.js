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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; acs_usuc_t=x_csrf=s1hit0nm5am5&acs_rt=7f82506b3c0f491e9683d058e5918d82; cna=tYTFISOJtkYCAWlquBrT+NhM; _m_h5_tk=ff5dc3614ea6849ddbd677f0beea9a80_1765711474812; _m_h5_tk_enc=f6c23551a7107e37ae5f259fca18d317; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; xman_us_t=ctoken=ot1_ar76r81u&l_source=aliexpress&x_user=HgqkAsYdH1HWcLboCqVKdfrFSRuQyo78fMrFFTs8sF0=&x_lid=dz3486426239kzeae&sign=y&rmb_pp=amine.afft01@gmail.com; xman_t=kiNsPrtnEJb4sJ/6WyLiOJXpXgJgvwiWjEFVXanPWo9KR7GqtO+jF5xC9r0tmsbeu95sJ+wkILP+5ZFVzXjtSVqmBy6RBJBOKy1MiyWdzBuzD/AXuPMEKWIFsOFlwCmSPx8UNdu6HFNFPHB6ELI/AlFtHXyQe5FEtWWc7+EpKFSwEJGS0Xc9ROqdiPQCiiYg2WlndZ0+jIneb3kYs/yZKSjjs/9jYk7CtmBXR7d0rwhBmAIfMkJExEJrIo+dS1bjwtlG/6Noqwif92KGlE9P4f+BCaHTZooO2NrsW7iOX1O4tqTPpX7mT/4OI3qWLzoOwSpr+T9Rp+Vba5h7IRspNRoxLyXviYayuPbOMGBeVqYnbkDgTVs6s1Rr/rZHtLqAzLBVvOtBsMjRAugDLuUoq6ipc9ltQ47ohW9Z7zsEZw6+eLmcHnS0obcZOhghZDKF7WieerrfpzAvxxNExerljtM74cgtUM1qvsvxnbDYkLHXW2+A/20EDLUWR0kfsVvFVYDx9evnR8rRFUb/GZcdCcdWVs7MJbth910osYb+XGR/o26gTx5j6kbb/eeuYcm98ZoBdSjm7SpRQt6RwlCE9JRbZ+VEQobBJW1NoNuIzQcgfnoXrtduACOrs4hcfz87bb64ERQTDIEwck5HaUwbREtCRjNGd+5vW/xyE2O5jzShBbMryGxZCk0OhjOEorSQHPC9iQs86OP6aHl5dnnIEt3ingl9LQtW; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|amine|boudebza|ifm|6157624339&x_lid=dz3486426239kzeae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; xman_f=JXvvllRfoPiBoM5lN/cMjr5CgRF163sMC3LQ+Pk+BRlmTN7iva4vqUlAA8DexyVcvXWpj0yrlZF2k+Ca0Ekb+ceYJbLF42Y7YACnIbp94Uh7XBpcU3O8ZQg5G8WHHCurmRpDuSG+bnrPkEkeiSK+2jtRoVbC0Poe+jNGKLD3+bKty92mR9/muAs7lEGywq4DmikyJFkndsK0fzmNuy2B4wlyDGzoQnDszgKK+MBp1orh4hhgnUNujIxxtBhniyMYjyD5JtRmy7SkrX18+IQ/AdIiTKXWsfOJdJXv1rFlNl2/ixqw+KubSR3xkiZxyvJmHbaImgRZjF3y0qNsz/j4KoLRs4McyteXIHvkLvw3fUCjwxv2mpW8tREhrk98SvVwrc46OX6YKTWfyLKh+P5ZyPpgoMsgPiUR0/lEg2Cj8IB5MPCeJNM7d+XKqTdlQvA41EE7ujqk2LM=; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; cto_bundle=r8WN0F9nUWtKV1dONzd2WUpjTUNWOVF1aUxTREhJJTJCd2d6USUyRng3NXFXJTJCSlFtTFU4YjB2SG50T2ZlQ0FwdmtKSkxhQlNaZUkxdWJMME94R2RYTGFYaDNBM0I4ZlM0bnhEbFExRU8zdjdRbWZkVjhwbXdUbTlxeW5HUDc4JTJCMThIS21TOUdrajRSRWNCVFRLRVBKeVZSeVdoa25wZyUzRCUzRA; _ga_VED1YSGNC7=GS2.1.s1765709495$o1$g1$t1765709690$j56$l0$h0; _uetsid=dc1a7920d8da11f0985f410d20e151cc; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; aep_usuc_f=site=ara&c_tp=DZD&x_alimid=6157624339&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2&province=null&city=null; x-hng=lang=en-US; JSESSIONID=ED77597790063845AC23BC39AEEF5E67; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gzkikAtMIfPsXlB1sn26_WkkWPOLCRwj3qBYk-U2TyzQkPFYk-xm0yK_HfK10momrOBt0FgmnyumMjhTHqVqVq2ABRWOnS4E8cFxWd_cn20uDhaYBSln50u0GhaYur0x0fKpeLnsf-w4oUpJepML1ZuG7OW20kr74HEaLiHEl-w2yeQJu_h7hVAVrQyqYHqYDNWZuOWexura3OPVQ67URoy43PP4T6r8ms74b--nYyZY3ru4_H2URoy4uqyq9rW4rxkILEeku8iLn0D3j54rxp6AhsqfyrowmOBKKXVgzLUh3tk3jmPOJCWkMzl7W7Us8pBgnDrmru0G8e2qxAMuTA8CnWg08SMatCWErR00aAPh0TiLQXw3YY-ANyH3WqkgT3BuMJk8aRlpOFFYIu0qCVjc34oK2ANInUbUlfE7Ll02Uejy165PgzBbYnHFGsNaAk4-UDMsNp-zDh-Hx_O__kZ9yHxhGsNaAk4JxHf5l5rQXUC..%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522epssw%2522%253A%252211*mmLZ0mCexsxBgmAz3ubkTcd9o8PISRDWqDgpMcQtX0w0Wj8oUKetDnYnxnrZjnUS_3KVRtE6YmpEeAemEOyRcNAZ3tvO3BAJ3CmmiU9idBSyePZkmTVnDv2mhDR-gwrk-nRnotvOmTE-tdqlreI5x1ZunIEmzBw0ZvTeoYBpPgpTEalmFkOot-FuuRemPasYGsbGuu3mmE8mmoJIYxK7BT4C1RimRRmmqcu0RAFp3BjEBjPm3RymfDjRzRmmuukEBZgafDPYNBmmV98_NjaafDjWBg-68cjiHzAMLD3DPIr9EBe.%2522%252C%2522lwrtk%2522%253A%2522AAIEaT8H%252BhGqmTMOET1dyzX2hFx38UlOU6xKGIhpOoVZCMM598trhrY%253D%2522%257D; isg=BKCgHg-F3d1Ov2HZXBRvF2mIca5yqYRz37aw8xq0cbtOFUQ_wLpeAspjraWVpTxL`,
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













