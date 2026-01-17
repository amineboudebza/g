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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005009504965110; acs_usuc_t=x_csrf=9m89diaz0kjc&acs_rt=1fa10e6fc2ed43a08d7306ea480e6ed8; _m_h5_tk=41086379ef57510c460d77dcc9c16995_1768674036840; _m_h5_tk_enc=79a005a0f5fd44109f62e27fb3f45a35; isg=BCYmgefKc9qnVScr1ooxhcOOd5yoB2rBOZ_AIBDPq8kkk8ateJT30GBh65cfO2LZ; xman_us_t=ctoken=1ax_5d42m200n&l_source=aliexpress&ae_g=n&x_user=uWel2cCMegSPrUgsnavxhUcoyuGBxzS9NCtkyYUvnRI=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_t=4KyiZIJjw6ZEojtZJkPYR3s0ttMzGW+0JPTd9AdcIBdf+W0kk43p0VmSJgzMHp+0QQxBeCsQrMVg/tG7Qe6h3k3Ll/PMzBlylbu0kGf+NzZ1VcgiwMxh9tNM4hYCko5UinFZpRuVPod19l/zcFxNMm8Bu73duwuuCEPgj++czuelfjI0K6UQFlPDRjJJKdZES6Un+2vFNk5RG0Qqt3M761OMYzcKXwUGgnKO+2H6p+TbayTCYjQJToFrT9DOkLsDLkzZTqDuHHrST7N59v47Qmvs6zlZgJG/nbVKPIbxTiDsUC7QlHoJ3Xf9xbFwYFsj1Gd63AXYC3H2x8iSQgVcoasRkTn5fOzE/V+VQCZVcv9XDyI2lJYOIcREM55DYCTUyS4dcKBa+X6Wrz5Za74O/SR+AcfEoDo4X9FebmpkEK8+/v3w+6y3jieGX1DK3BWTf7iDY/RS9F1XClgQeTMmS+hvfqO6bV1TYj0muRiJK9DiWH709oEUNdhabojT7i68gLttNdHCJystWCJ79I8ee96sEEdIWoBvo9kCR8awc8OpjOSW+P5vyOJDfcZpOAfako+gQNQYjxWbPtVTGl7rlGXezq9gX3h7FTguWiui51OqjuRtPfh1HR0Dl4/MSyzd3RlEiO4stL6irp6ONgH/eWTdUppmAeQsOUakobocamPC3HZJaTImmBVB/htcZzbM1Tc26GqcFGx8E4EqzNqUC7QIkH1WfaqY; xman_f=tmXU0IkurXodoU8TwdqlgKI4dKO12esN2pKhS47z1E+Ob5icqodeIm+quxUKndER8/50R0f72+4WyMcpnv/pyie/1TKozWWLgaeSPAFkU6eJsQhLWMNNgTxKy6c5oalhgUlXmyzEJHiLojeD0NENlnekTMXgQj9D5Muzp90IJzwfzCSjEt38SHTyzIvCyCJEu+FxHn5YJAPdcJL6yUH6+MWZweKjHGS0R1TL9jJMOwbYsX3L3DVWc1x4y6aSV2XRxF5gdsdeS8aUGJxgFhizGzuoQrKphfSgln/QRIiSqAd7BH69pkjPRRYDWo0yaSSlJmBMBWE1z1cw0yfs5RoJlniR0DHAKL2+bvuXOhNdUBqPL6s8jWe6A+Wf7xxQoCPDpYyhcJ8CSx4P4cPp0H+k6awmnPjFb4LRnP4QeVgJYYPmSJfjaQknMKxz6hiQhuUY+OmW9235Y5TXnZTA/zBD3w==; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; _uetsid=07c8a700f3cd11f0985f453aaccaef12; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; cto_bundle=V-sE4l9nUWtKV1dONzd2WUpjTUNWOVF1aUxhMVJKOFc1dURtcTFreU5FSGI3YXJDZzBXbGNnVGhWMDJFeXcwd3IxdmVhVUhiV1VDam52SmVaUDlETDRkY24yRDdMZCUyQk83NDlTTzNRY0JUcTAlMkJRR0IlMkI4NHdVdENOYmt1dWluTW40THJsQ3FRbDA3eExHbU12TkNmJTJCUTJNTHglMkZBJTNEJTNE; _ga_VED1YSGNC7=GS2.1.s1768672237$o5$g1$t1768672295$j2$l0$h0; JSESSIONID=B2ADCFCC342AFFA765320F307B4200E6; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gDVilRbGsRkssR-FZnl1QBxmZw6K1fGbgodxDjnVLDoIDcHxDjb0uDQsMRQ6urz0qCdTuGZ0iDr0H-etMoD4Pocv6fR9ixmUYPHYX1tDikqokNix6xy3fzrmhNix0mqYuRQdw_U_5jGqmgCRwSrWVyEMbCuVu2uxSw3ZTEFUcjGV2MKR0LeSGlctN3ha8w0xkhJa0CJF-4uigCk2_p-EAqlqgAk28DuSPIu2QozF-qmE0jka0X7nlDoqgjlp9IougWNFDLuezCkQMW0iI0zhOIdXd2K-VP7BNQP3KAmPwDA2gW0guAKdQQXx48itecZF9Cc08qqorlxFxjz317DU_MOmdomEh5khQBrosoDz_vY2NyhadX0UaZpSvWmT05DFyQDxT7Hr_JBCXxhiroP_jEA44yU81vNcqHobB4GESo5Pxg5eLLrUEIgFkWJXhAuI-0QaYZvRTauA7wbHFOMZRVIR-wvXhAuI-0Qh-LtsQ2gO2%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaWw8bNPEVtobMD%252BRysLhVuqChmsok%252FxDVrK5yEyPM3JfDxHof8c%253D%2522%252C%2522epssw%2522%253A%252211*mmLMqm5FOXlAxRAzEN0d79Y4bMX-tb6hqo65Y1P3O1uBxs0oHjpNUxF1spNWCUn4acCc0TtBCTDDsuuuaOAVaBTEmmmmoCONo5r-LBdxa3TFdmA-mmT3VtHFlhrI0q_Z2CCGXZ5zK7dT1QpKRcT-QOAZoWE7CXMfs4X_PREa1jODbHpARHs1KH8PnQF0K70xrTSdEMWNuukqDVEOrdemHfbgZNyY6rOH2OKdSMv_qh0Z36mrW8XiDyr1PaNW-4ej1_3mmHWmuuUbu4clBT4C1RBmARmmq-getVHp3tF7Bjja0D4ofDjRzRmmfDvuuRBmfDjemo8aV98HBRBeBjawEQLrWek8JzAM2Ce15zorf_B.%2522%257D`,
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

















