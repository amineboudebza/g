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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; acs_usuc_t=x_csrf=s64lk8zbysd7&acs_rt=a8db550c9d2d4c35a0898b3f3ca2c238; _m_h5_tk=6c9e9ab11a26711cc707dc775cc2b2fb_1768328805270; _m_h5_tk_enc=87683c469e1ff10eddefd4bb4e78b399; isg=BO7uOaw_C79zfX-D3pL53UvmP0Sw77LpwWc4yBi3oPGs-45VgHyw-FP5t38XI6oB; xman_us_t=ctoken=p2ma5y93lq3_&l_source=aliexpress&ae_g=n&x_user=gqeQ2aR91OV7n7cG7CL9pP2v/G64whpxIlu0iwjpL6Q=&x_lid=dz3486426239kzeae&sign=y&rmb_pp=amine.afft01@gmail.com; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|amine|boudebza|ifm|6157624339&x_lid=dz3486426239kzeae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=6157624339&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_t=PHIVA9TA6CIXuN8i4x+NeoYSDi8FThY10KmGgPlx2pITG+697BIQZeujbWguh8EgE1ddy8c+0FRR1dhwigxDAi+0YZX79O7KXJeti9mKL5M8JOtY2X751jMvy6AFoCwqdVEE1x5TBTPWPxbAk0Rdl6ZEMaoHH43zvreeyK8fIYrm8bt/K++gyKuYl6S9E2B8FmiIIx8Ck4JOMT+DmDBtHeRjSXybMtishtcw8O/vilJyGxlFkKyBHompnkDms+8uYvmQYjYcc63UfSyp2h98yf16JpjJJa4Wusl3VoGqA6FjmNHVPF197ovbnHo7kkx/Wq1GV5uaY399FwDUAgjwbIX3grN5ePG57H3hOLy3murafIUNhYpXDsfbOrlG9R1A/OXl2Wc4YJrGUrd0vehYtTzm0TGkNPxAelCUxhY/rVVmTe/g73zFkpjuh4CnnUt2S60GRT9Dv+WNi27Dd7UEDtCFCiFbfOeMoM4r5T4vXzwDZoWMxVJlfeAmLRGx5nE1IUT4Vz1v6XQyGOXjHCbRhWciGgp2rozSg5kCWK+KzxLDLjDT0/7S0EMv4ZRcciMkoE9utQBzICdjdd25/m0EGo8syk7Xic28Vm1wvamNoBH7f3AyXJSUFHdGmiOP+Ngp0/9Wy2OeUXSprGm3ha8V+hXkc881ESQe6k/z24FXW0TAqRA7WTMrgMHr2KJYOlMAbG1WGe4hUp8S3HZe2Vk8qjbMKtCzT738; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005009504965110; xman_f=wAG5HvWuf2FGBfehXXnvqOCoGaExn7DCYd/X2vYdtTfBJufrn0GDdEgztgyStN3EXWzwXilnKo+8CG3eFA4ogPysb/rr8BRqXDIJE9igD9zDDybFNejfpXB6EJbeZumNeapQment8ysUbWIDh7H5XPfRNV0OwQsac5Bc2wLhOQ9g1b8OzN8Irdgv+BmLki0bHP9weDKPkXbaxFa9rN6WexWjylk/NfxKYwIoTikwWDadKnRUMu2dR4uYrronWXjeA8A5bq6sM2yfkc9fBQmu0gaTogr0cYAScHX0wr0+5mVCMT/FacnJd46aYTvkOVn2608GXb/TQUAnYsnT26u1PI5cdM5zruH8b0mUNMPUyki1Vyl0gS9ftQo4bUE6pf5/lz28SjrJMiudyMqV+b0GeKS8q86x+pUPd+0vdbzVv/fCWUmOT/w5XJvXLyMiTbvmNOPyJRGz5TY=; cto_bundle=p27kd19nUWtKV1dONzd2WUpjTUNWOVF1aUxSZGtOUUtlbVBuekMwdjB1UnJqT3NBQ09SdmRjQVBlTGplMGp1VXlrNDIyVW5mUkhiUFclMkJZNGpDdk1pclp3bDIwanRGUXllcDIlMkZPdU5ra2h0UGUxUzJEUGZoS094akY5TW01c1NCOTIxeXl2eXpxdkZ2cXhOODJIdXFvbVVSbTV3JTNEJTNE; _ga_VED1YSGNC7=GS2.1.s1768327004$o4$g1$t1768327050$j14$l0$h0; _uetsid=3973fa40f0a911f0a0987155d2bd2447; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; JSESSIONID=A7CD481C73275D5D7319A722154674BC; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522g5qqk3ADiiI4lN13LJmN4Bbf5rixfc5CslGsIR2ihjcmfmgiI5NkcVbY1G-aHRD_ljGbzfPuajXABOIaI726ftFsG7RgO5Gmfrw1_7N3TVaj5ZHg_Rl71hZaBhkgI5Bx1tQ7H-ntj61IbMwYHIY-1BZ2mg2uevDMjag0TPD5261CAgTB1xAcO-6TYxwoBbDmInDcULDtZIAgsj0kZvkKjfVgs0YoLvLMSnYmZ4c-IccgsqXrqbHZjfVijTyotNe0I3kIoTKGZlalf60Zt-cyjHR-3qvYiFtDmNGq7X0oZhD74xuqt-qHFSvmEuZrR491_02LPSDrYG-o02z0gY2R_Hl0RJeIsqvpv8Pa40q08dxgUmlSJoPvg_l3D8qKq4shL8q8G-EzCdjiFWGuHomNx9nqmjmrel1JmfzuSogxXIfqj8kG4iOtEoruXrRM7qD-UX6PUeGLAx1VaOGkWF3ovYlChxT9WqD-UX6PUFLtrvHrOtMf.%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaWb325m%252FEdY5vn3428W317KTedPa5vnKsWCGQed1RAswudI4TbY%253D%2522%252C%2522epssw%2522%253A%252211*mmL6qmNphrMygCvg5KbktBxfh5AI494YGvBUFuxnkdicbysaT9Lmo5mIa25xORdVoOkW6sEzcpI06HiZ3taV8CvO3temmCvXommvvqCX0kLpbLRE3g44-vInoMaJg0Ik-nzHROAZEO6_DIqlreIZG8jmXDK9gvi0ZvTeoYsAUXFruhut27Oo1mT9mekWVfGtYwTQKp2n5X53yxA4PgFVojsAKOMgJDIUS5b9zL5jPeeK8_emmmmm2pImBP4MbuMqFimmF07zmmmnBjTeHu-OucOYBjHSADjemHHCXjjeEvgaEmmemCuuc6nl4mBmfDaEBtQRd-WS7NfUckWd3g6IEjPmBB..%2522%257D`,
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
















