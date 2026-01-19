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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005009504965110; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; acs_usuc_t=x_csrf=626nia0otf6x&acs_rt=c9347eed30fc44558d435da4adbbfad3; _m_h5_tk=ef317d1effec7408ea707f65b52b9128_1768854368905; _m_h5_tk_enc=2066542d977596f1d89236b0776f643a; isg=BPr6Gh0_RxuqCMsnotalwR_qSyAcq36F9fusLATzFg1Y95ox7DgIlGkFR5sr5_Yd; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_us_t=ctoken=11sdl5mcpq9pr&l_source=aliexpress&ae_g=n&x_user=uzOGbNCU3sI+/nRV3umiLgdPu9Kv3+ZUjkkGGyfAwt8=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=EWXeOg6Bb8jJ/5ZBiUrUKaZa+4tFrTkvZsvtJJ8ZR8jRNUs2Be1AReiKVuHywsPD2sK5KWNo5g9rOzdvIYdCcj63MniwYdowRfdYSOGPcH1OANt5tyxTYkBrSYZDJLT8boJ7Ole5ycE7WSS2AaUG7Iu4Pvg82Tm9cDE6sG8JqOksncqgIgS2ab5heqy8H5fakDb0SmG7W3XjTLGx75qbxeeu0jc0jkqzQRYqmNSwAB0UfJOlOGGhg2bu3ugJTKFrjKD+EgclsuUvvLg1pA8jjvXCMjdm18duaB3jjzeZt389Eg4CK605ZPTGed9c3949krnqmhAw1PvIZci2fRQBYZJpu0r5zUSogcCktvkQbBrxcRWE+agoABfeaoW+YG8Iz956HT84WuKRGSGUbDKD5fheABhRUNK+Hhj72C6cC/JZ5vPxB8EoPVA328pE1g6rPQvGw9qplNAuGn9XNbB+UtexSvJi7hpztPsTTCfByzxssI8YbKSKy/yBFZfIasIALxAIlW8ZXPjhUl7sziNbSngkShUdeIJOGuTNoZr0BrGvHwsdwzuqGywL+uf9fVvkQtAXxMUgGvTqFhSbbLy7Z7O6VwjmiuUH5xiy+319FV+KkOeTHuQFIPVD3qrE6A0r/fJ/NDFeum7tz7gLj0j2CgLRxLgNiufU4eBhoxUjChqrE0isRm6HhBlBst05PCh+8dN+3Bo+w6YJ+E/yRCoxoBycR3DlBZR7; xman_f=v4EIZ2U/aphqztVXqgWNaoDyvGTSEHttTQda19yTkcg9wND5sICTsl3dMrbBSXJS/Zm6AjPH5n9rrE0Z1a6YYB6fZYFsVkPhpdvz9/KlIKT5XqC8Au6i53RfCB9+YScpjY75G6hzBqG/BXsBOmp18PQFexGzhK6rIaDQfljOA/6PX/G6J3RPX1Tw/3+iKG0eygfMQLER3Wg6312Q+a8mf9apwnriw8Bhb7caY+wvh2vfhrFswJJKqha2nybrDyJvKlnsw7I3R1uxSrCXMccUxRqwhDEcMK2uUWxXjc/O5ajbXYgCjra/pjx55BBOQOtng4wI4LHmubn+tVqAS3D9SlTEPZ33CbbAvYiXoI614oeWWbu7mPilT//PIAwbg0zaHzhbEk4Up4KJrNXoVV+xlZzjYwZUYc6hqyRRxb3/+ISE7KBCiPqIcu16sx1Gkxe0j9LcIUBf5aZGCYGw4F+mGg==; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; cto_bundle=5AlAaV9nUWtKV1dONzd2WUpjTUNWOVF1aUxhdTAzeTRFbWwwZnlPTVZQeHBpdlNCJTJCR1Z2c01LWTNNbHhmS0F5bU0lMkJSMk01WmsxSTVhYjRXSzV3SjVVckkxYyUyRjV1Sm9KcmFPTTF3eGNwWE44bVU5dGVQUTNtb1E2dnpVTlBmaGw4MVF5bDZhRG93SW0wNEpHVjBtOUdFTUJvalElM0QlM0Q; _ga_VED1YSGNC7=GS2.1.s1768852118$o6$g1$t1768852135$j43$l0$h0; _uetsid=d9612de0f56f11f0908e7786322a852f; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; JSESSIONID=219A2741D0CD17B4F4BBF6524D482BAC; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gNRokdgoZLW5ZkZqsk5SUR6126MYF_1BTHFdv6IE3iSfvgBdv60H8i359L378e8Hj7FJ80tHti-HpppR9HXe5HfLw_P8t9j20UBp2bZ3tnxGJ4sdw9JDVF-hd4sdYMxp8L3x6fLWP61Fxcht6fgvJGKu4W5E8Z718qQPgyd2A61EXmQ_imllO3XdiZ5euqbdJuyyY7yqoa_PT7WUa-rVcw5FT9SUgZ7h8WPFT8uDui_dTM-FUqfVcw5FYH5EthFFjBRXgDFY2OTDT8dFrTjwzg-pXIzhw8ThmHKMNaYcbUyQTWRcrTAD64TM8Tpe5OOJkXVfwFvVgaxE_0527KYOEQmgwMtWt9AfnyoPE9jk3QW08W8Rwg-pK3muFgJJmO_V3yc1khI2PQJmRo8yXgfPuthZSEWeHQ66wmPl_dTRwp-qi7xN4gy4QnJgOZupgJwCUZ_cX4-q-Rhq7w3roq2sFT7fyc3moJwCUZ_cXq00Cu6PlanO.%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaW77FSaCywYQhP85fWQXJmjOWKsUVUIkh7oBS1rjfrQ42bnEbCo%253D%2522%252C%2522epssw%2522%253A%252211*mmLUimSGGrgmgCvg5Kbd7-0Xb17pREbt0TWcGqJeHf2Mm45qypbmIBgBU_G0dGuT5pXfkrEz062fW9emmmm1fmmmEOyZaOtVomHO0WYy0kTIEKZkmTV5jh3NJa5ENaEr-nRKlRmm3tmTtZjYreIfMKjmNtV3K9XHqVTe57QAUl4luhut27Oo2mmWmekW5dHUnBTQI9dnPX53-CqNpgFVDtBp6OMgJDMg-WTs2huDpoLUIhBmmCuu9IHu0-WCaZV0ZimmZKuHmmmpEmvEzDfCuc7ENZAHuuuu9JpEBjemmvgauu7EBt3mBg8CmDaEADZu3xFdETrAuskEQXLkgBBYEmam%2522%257D
`,
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


















