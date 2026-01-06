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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; acs_usuc_t=x_csrf=3ax7iurub3v0&acs_rt=e083a400998a49f794439ad7c05cc127; _m_h5_tk=ace3d0eee08dab053609f75a7b350d47_1767715277792; _m_h5_tk_enc=2b3f5269a2c9e12456f4f4fa1c243dbb; isg=BKKiFTvnP6CidCMfih6NuWei8ygE86YNXSPENOw7cpXAv0I51IBZHJ416-NDrx6l; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_us_t=ctoken=qdkr74g0g9g6&l_source=aliexpress&ae_g=n&x_user=rbSuHBG0N9jOlPpIQqtiNph9gQd68+IpX+tIB9Oqzcc=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=GXfxs+asH/dXAms8EhtbMQgr3woFPX2E66LdbpmDUhQ0LcdImysxD8rCz1mexX7n09pGj6Vsk2UxPAnTQPm5wGTKU+wryHh3fQ5eQGEdthdDji6rIDrhrqDMocH8PYlHVVOLb4BoYvgxMw8RHgVJiRdxQb8Yf80KHWZx8xcGEH2+qhaj3O1js/PIMj9VncH6+UStfwPuo/0r0s77g4yMxnBPJEmz5A2CnO850GOa+1Ytnsuin81I9tbsxWNz5tJoo9QrKZpu9umGw36rOwuPMyPusBNYwSYuhq8LhgGrNVIWgzUeZiXrUKKBwKMdr6C1irzs7wZYWCj60BWFLIYqe2UiJPen8WMJn2guuoiw4VUqRZWdps0enis/dEqwudje/CjH00m+XYJc7YmOWjGeGpBCkHe8eP1A8UAfCI7+WKUvNB6X7FAStVg7eGGTMbY1JsbYo830+R1VxMgpHHfVSMpLeGlPf8o3P6pYXeHrUJYdDMYs6+3AnHVBuAzcrxvOIJa6rn21DgxfGip8ruMglrSEaxhMq/jlY3Vf9SFjAxf1/xLLwVIakbSL87cifJ05NkYBD6grbsrnmbNa/bz84Ps/Hhg0sn+No2mdfHBYkUAxkLBUlW6tGq99ouxZ8zupu2slFr8yY69jDB64ybZTYWFqRe2Red+UuwaoBW22IEh9v/awUVvkBlwrA8gyhDRm9CgOmIs5135V59RiEWYGL15pNwQfQyjT; xman_f=f6GZ3E/iY1FTLkdPDwNsW7DIJdBedcbLSzzVWz+wFq+WXq0C3HJcfbx6r7G8jdz+4i+WbGdAm8IX8Mx97NAhOcVx6yUgDWyxrXGZLba2GlM4E18SdIiUBSYI4fiDWqSmaMAwPq3LqO6LvYu/itv2mPVfmoVS5hiJaaB4LasqJY8/gowCa50SwKs8wNquUrpBfRbE36w9/SfiU/ARr7XDlu6slUHt5rF6Uqe07D4lKt5zMKEBqpI25gjqIAgTmaHYJqU+h6cIbImyaiwwoPlJOs+7tQWJwRui0H7/GxPgkCjFFKtJhcQo/9bwAZCjzrC6zBE5H67PdnHAaQV5InpYqqMxyRpG86wKuGP/erQehPDPG48BkVOBTMOTPHVlEv+SWVtqHlynOB9sp6cjMtP0PyhAyMQ01ThDOcNbx9kWAfv9UfgPKGSOcB6rHzXeD/KhRqV21nw00L6APtGt/gf89A==; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; _ga_VED1YSGNC7=GS2.1.s1767713296$o3$g1$t1767713321$j35$l0$h0; _uetsid=52e10e70eb1411f0a985f57d3219038a; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; cto_bundle=ZUpu_l9nUWtKV1dONzd2WUpjTUNWOVF1aUxXY3NiWnJNRnNlbHVHdzNKME9ORG1uRzdrZFZPZWJhOGtUNmZYSjZGOUNXVVV6eW5OekpUeDRmb0hkbiUyQkdaRjhWQ21IajBLVGV2R01hblllS3c3NFlmYm1ZZVhrQkptWGVjWjM0eUFQQmpBakxxNmViWkxBc2xTRDdoZ1h2ZWtoUSUzRCUzRA; JSESSIONID=33A8D75F9602CDAA60C8D560B26DD6D9; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gAsKlw1Gm5VHAiZ_MD4gZQcZJmegSPXFQ6WjqQAnP1COU1Joqy5kNNCl19bnq3YS2T6yPMxhK1KRMsXHZHYkF3CNUBG3Lz5Te6fMxWS3LanRe_nktUXSeLtFjwmktW-RFsx8iSq0m9Wez3N0iuBcthKX3v9SZQO6f3vJ1zDBX9We4Auq6XscLuQMTaRBV_t65K9vVX95NfM6_LJSOLiQBOOw129BVLgsfKprP3t5NFw9UC9BVe15CRpy1QGnF7dsdQmR-V0xV8GEf4g5XpLpw2AZ2FSjmFdbiIijcBppJ2XB60i5XaO4EcdQuAAyxBW2p_rqYHTRR6p62un6v6WCVFIusATvfCYfAtUbCOIJ9EsBWxofCOJ5NUQaMmvpxNLAvwyr191D9ZtFExFhBEQ9udTse2thotjylMZKgCY2espA9XIryijA0GhDML0QBR3rze9wdYcris56u7p9iJE-z48aQdd0BR3rze9wBI2Le4uy7R5..%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaV2akLFpu0wWdCXO8ZtITOgBOKT4d65UTkb8c5QAfu3y07Jvzr4%253D%2522%252C%2522epssw%2522%253A%252211*mmLXHmbKsriRgmma5KAkUpYJ9UKVXAWqKEIm2pcxFOUhdt7yKdUu0tkIDiTCdiCBBrzLMtE68CAY6cF0mmTiziAxaOAmmmH4E4yZNrA20kLbkvrkEVLh9jZsxIxZgnxC-nRKlRmmEO6_DGFMk0jZmKjmXDK9gvi0ZL7nxUqAUMpTuh0mFyi8zynZmekW9GgzAjKZ6zqWp4cZyxA4PP4h2KDp6zsr-cIUSW3g2h05moLU8_emmCuuWrImBbGgcZKmWmmmEmmCmmmnfD1Ysc-OBe9eEvbDA_PYNdpOmmEENBBmfDZuuRBmc6nlTidmuuyemCQRLKSS7SjcNSRNJQarfRmemm..%2522%257D`,
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















