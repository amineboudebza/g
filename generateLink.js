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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005009504965110; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; _bl_uid=n7mUskyOlsnlLj5bpjhLiO8utztk; acs_usuc_t=x_csrf=faezwkvm4fxk&acs_rt=666700f6229649a89d021eb2cbb5a7ff; _m_h5_tk=8bf23cd4f69e7d65fe67dd537dfe7bc1_1769946946082; _m_h5_tk_enc=c8b810a9cbc0472b314df4de478d0660; isg=BImJ6qvqBEdg8_jyDRsGnIivmLXj1n0I9afyGiv-BXCvcqmEcyaN2HeisM5EKhVA; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_us_t=ctoken=100yd81z3ya8p&l_source=aliexpress&ae_g=n&x_user=aJRlPiSRkhsxYvUVsZ0LfIELOjk4qs4fwTzYc69/TN8=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=lOtWuxxgbL8NPGntthK5gb63Q14ItyE6Qb/uehobdur8dVlEBg28H9Kc56yk0SaelFN5HNRQxKq5YQtLto6osSiMcDLuku+1yHQ5biZCLXlvVWhQRoO8f8Wa/H4KSrTAzEdssNpRG6tLyWUnSeJNUs9ooEfCbXSIV9L0sanvj65c60gAu9PJQVGkMW+18j3mIBmxyEirCSDbIe4i6Cah3cjadHibCdhIrBMVkmbRnLXLQSrixT034+jNt6Fcfzofpubyk3PK6mqR5A0XzLhBu7mSDvclhi/Uho0a2PLY8H8vCuyJUwWATcqzGqUCRjqeFpA4l6x+SkUvdwV75Zihwah5u/utF+6k/kxBaDJRGPzc4cs8vDiVfzDRFYeLYlRXI57OLqBvktOGlTmVS6/fQno8fEE/Drm1OP41hJu+AuHVytNzjAFZl2vny7CeAFjmcskvHHZ03olgnzJ/4uFI1XuIsEXOZdwQJJuO2Gx3ALsvyuLsFQP6hZ+vXibLWI23UAIytefU4sFdldBa/WAKIg6PIIV2XJ3idLJ5wTkGIBR8BhBQ6wuYmKHHFcd0iVoRPptzQxub2oTMzQgIcLV8LlkRttuo6bHtc35jtgiGg//9UvmCq60TW/j89U2to5wm0tYFwf0l5OQL/O4PWBbnXUHQbWfwLymhZtYob8Vwv34RRGwKiOVzDKfWRMQarz2yuStbeeMCxpAEYs/jYbuDePPROOtdRPYK; xman_f=VW2sB85QXLsF+nvodY+oF4LaU9LX++O/BgsLSq4FmsByISbxl2ffwm33rJUBPy/U3A/spapXhoZ2s/8KysvOd40055OgdAjEhXBGnSglHVame58fCWwhBDocGodUtKFDLcgJqfsoap0Qiaf79Sjc7jxsvNrqLt0Y7DaVOYy3ybukHGtGW6RFw/1O8XXTqMwa2nLcwNRJQHY4sXrQXEjJFzGRBbM7BHkitxPwXu9caW3FaKRyPnzfLoWcyjQ6EPJb5/is32aKbefihpGKKJeOXwGUadSeHTIOwq4Gu1L5WZAJ1LmrAieM7vQ8VBUdvJrBBng6NnJo3O+PsybShqi3AUb5n62+XNMIKtmHDwEVZ3JUa5zFEOcErB0KJezSS9Ph85VEHJmFuCkaj05yAbx+IyfPpbDLIB1KiLo182ymsUjRSp7iJwLWmOZ6Zq+lNlX9utI8t0v69dBAcq39cyiBeQ==; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; _ga_VED1YSGNC7=GS2.1.s1769944962$o8$g1$t1769944986$j36$l0$h0; _uetsid=555b66a0ff6011f0baec5f4d4fe0a1fb; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; cto_bundle=w_3Kp19nUWtKV1dONzd2WUpjTUNWOVF1aUxkTFpQY3I5N3UzZXlhMVV3aHpDdzcwdFYlMkYzUFNOSXQ4WlUlMkZmN2FHWSUyQjNKdUt0NFJBJTJGaW02ZCUyRlhmbVljZ2J3QTJvMzhIMHh5SzhMUUlVM2FseEV3NWJaa09hNmNScEtXJTJGendEaUt6aG9NMTA3VWFUMDlDYXd5aEROS2VLSUVDTUElM0QlM0Q; JSESSIONID=97E42681B8DBDDA5A036B9E055B0F0C8; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gxqtk0V3q6fifWICwhbhndv0zS6h-w2aL5yWmjcMlWFL3WkDmNPmGyF0OR4Mmm0XD-wqllmgIWnYw72iic0mhmFU3fOGQZPdH5Vnj1rGQrKYHSKmsq2XHxiaxPxms1oYh7mAZ_jlqRyZum1lZRajkcoSCxGXijgBAmDxOZvsvRyZ0pSu0YyzQieICAhjcSiIRYMtcCMbGBtITxkX1xt1pJGEOxOs1qMBRYM9GANjc93ITxijCSg1pJGEhmGjtf1xOdGDDyUJfkmB0LtkqkHtWjLiTnEgD30INKlv23htBVLgCXKXckUjatxK1aJngccaUAFV4hoskPNtdmIvAcFaCogLm6vIyDGnPlwRP9wLDf37f2pyVJwEhSgY8_KoBc4KylUN3Bw_ZfUSb-vRsJ38J4kIRKLsjz2u04Z1XQlnzxF-e5dO45qu2urpZbHD59BpuEusLXrwt5NzO45xpbXODE8q89kKZ9BpuEusLvhlBtL2u2WF.%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaX%252BoA08GJoPcJM4GZRLCtahHAfyH8yBifuyrk%252FIbqXUH0a7OY84%253D%2522%252C%2522epssw%2522%253A%252211*mmLtLm9uaTDwgmAz5KbkH4PinAm42T_LrNYj4ySlIdyi-wHI_xqCdVPrZ29K6iHWKf8yYstinNiKUCAZmmEqHBmm3tvO3BH4E4yvaYdhOF8bkaZk3gXqlx5zA3BQvlIkujIKluvOEO6_DDn8reIBUHymXiQmzBwtJM7n57Q5LVBVuktt2Yzw2mH0uccnSM0TndmmPa1kiWRUuu7C1O8mmeaCtnkbBT4C1RimHRmmqiBE7D6p3BjHuukm3e4ouu0qAtymfDvuuuuuEmmemJn02PmQmeaauu7wEL-6vrdiH_PyesRDPIr9f_j.%2522%257D`,
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





















