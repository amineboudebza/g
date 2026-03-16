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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; af_ss_a=1; af_ss_b=1; _gcl_au=1.1.739384075.1770053008; _fbp=fb.1.1770053008325.661875889866792841; _ga=GA1.1.1086877865.1770053008; _pin_unauth=dWlkPU5qUTNPR1F4WlRjdE5EVXhZeTAwWTJKaUxUazFaR1l0T1RBMFlUVTJaalEwTURJMA; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&x_as_i=%7B%22aeuCID%22%3A%22d9c90dba87ab488eb1d2fdc8f2a2154d-1770054076736-09497-_c3EA2Xhh%22%2C%22affiliateKey%22%3A%22_c3EA2Xhh%22%2C%22channel%22%3A%22AFFILIATE%22%2C%22cv%22%3A%221%22%2C%22isCookieCache%22%3A%22N%22%2C%22ms%22%3A%221%22%2C%22pid%22%3A%223073958362%22%2C%22tagtime%22%3A1770054076736%7D&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; aeu_cid=d9c90dba87ab488eb1d2fdc8f2a2154d-1770054076736-09497-_c3EA2Xhh; traffic_se_co=%7B%22src%22%3A%22Twitter%22%2C%22timestamp%22%3A1770054076739%7D; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005006692829025%091005006103319616%091005007431422013%091005005863831684%091005008370870402%091005006691583009%0932913475990%091005008932111044; x-hng=lang=en-US; tfstk=g5iZSB1GshKN3uVTSDZ24Bm-C7rTboRWimNbnxD0C5VgGmt4obHDB-Nf52rq9fu1Goaf0SD0OcNsClcFgbMlDjg_l-kmGxsfC5HbiMMqtrmbflcIO20p6iiqHiymnjpTGdLIBAEYmQO703MtBQwKScvQs9v0h-vQIcmA4jqYmQO5Ri494ohZKyansvvUh-_Gmj40tpy0EojgoGbhtWF3m-j0nk23F-ecsicmKpyYtSq0mjqHL-hCZADcY8aMIgCyTksL7PPoIWSrwDyGW7-8tijmYRkUZA0hmimUQPoEVdH-hPgmeznsdnSLfYu3xRlDqCqnE2k77cRPfSht0roL8tAg7rPZ-c4FniD_f5cjufRNW50sTze3-t-8dbNnBc0eH6DiN5rgKytkUv4mRcU-fBjaq4H_fqcHYGll4o1YKconDV5coP2LL79eLtfZuRx1w4E1kZU32JPWCR_AkPDQL79CvZQYWieUNpZd.; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; _m_h5_tk=54abf75d89d6f1dbc279c759db40d67d_1773680651643; _m_h5_tk_enc=9994e4dc041e7715ca8e48e3b0bd708a; isg=BCUlG8mPoJy8M8RGAQ8iMExjNOFfYtn0PBD0TycK0dxrPkWw77MVxfPczLpIPvGs; aep_usuc_f=city=null&re_sns=google&b_locale=en_US&site=fra&province=null&c_tp=EUR&x_alimid=3073958362&isfb=y&ups_d=1|1|1|1&isb=y&ups_u_t=1785605003470&region=FR&ae_u_p_s=2; cto_bundle=XkfBiF9nUWtKV1dONzd2WUpjTUNWOVF1aUxXNkZiUHM1VzZlOVZ0SktiVUxQZkdhNnpJT3Q0MU9iOXNoTHRwNGpWUzdtNUQ5JTJGQzdVdkxTbVpVbEVsJTJGYlpiWFF3MGhxVkJYdnJoSWxqNXJVQlZGVmRUck56TW9kdHV0JTJCbFowSHRIdlFOeG5nNTRLcGglMkJQRjdJcVExaEo4bHhYUSUzRCUzRA; xman_us_t=ctoken=sr7njt_5uxp&l_source=aliexpress&ae_g=n&x_user=jP9GOOvfD+VkTTyFd7L/U36Yxmd/ET331LZqD3xm6IY=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=r7rFsRTWy+vSKMsKI5XsHfrrbSZQc6OmZyUpbH4Zuja0dcs9EDY/GUq2IKue6+2DAkn4DLrhpMAGexY1nHGsjgYJo16AipKQzcg5cGQaVSFijkCARgsXSDfaq1XVoCq2qkx8zHl67mh01Jfn28+E6wJ5DDIeaAU7qwWdl6CrEvFFaIuAN3uyf+ihojFX8VXGxe2p4ZyDZhVGXmes1dA95BytN0jcDQHY0yen04YdpPXyY5wHEx7n7qRUXbMrnjZwqudjkprdEzXboUCKPSriU6bFJioG+GziX12A8A3lmHGM/vl1QymLiHpjpz64vZa9B5t4Qf80xF1M8CpBxNGqybu99AeOiPB/aghHjn2wHAmODw+2fAGhYgE2MDdb5JyVFze3jATFa9c8GUjE+kuuyp+0B6lbKziqJ1vIysTcu9zwL9FWS507dyWFdl6ViKIZBmtEwL704CZ5YZQBb4PwCmNJuoHN0aqW6QG6K0t5yrinwY78A3/N3m/qCP3rcrj2xXtqlhiSHDj6O6qzURC9XW8jJ1UITbnUNmFuXMaN+LjQ/86alok5YUtQb8/9Pg70bbo/8ds4d2E5QGmCUJKkojygfMKasuFXpXMfbg9OVsAmoGhatRg/1Rcf3q02TQoBsXzx22xqYr/jsmN9zOU57WlVTwb2oCmfUDJ5NcS5DvfmT+eKcaEw2jyZ/GX4iJlVs7Q8YvK+/rVwhdY3KFCHQHwYLG+OGa49; _uetsid=92758380210811f196e959bda0d5a116; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; xman_f=tWUG7L7kVTIZLuulprgYv5V0J2h+GyXqia1HssdRhAQoMTgF10PYk0V9qJSg9GuJ0WDIJZueRNH+bOIGm5A23zt7xcjwBqf9f9A/Q4cLSn+3XCXsJN5ftO5PQxxM5QY6X3wFqKY6tjKxyFMQbKNJdMFKYoG0bnGbmBKpoBUE8r5cAbuK/pGKvimPxkU0i6FAGrrYab7+geBmQbXdZBnI1Mqx1iF4SavNOPqcC5OjemjfO3XH7VQiBo1GL7M+K+stpPxhWX6SzgA7Mh0kKWoph93W53CZS2mo6uz+CL/uEX4BeSx2Xp7mpiutZcJJ/dEZok/vDtujvJsjB8SNHA/rNlZNHRd7oiwQDCiREhvyBnZeongORDD28bb0jolQUzPnIElZXpNaNgGqeI5PWI4xsCKCgpTqmWn7KHinEViL84hQlJva1LADah0Knlp+AAjeVltlBC7joUvhycWeuimq7g==; _ga_VED1YSGNC7=GS2.1.s1773678581$o10$g1$t1773678591$j50$l0$h0; acs_usuc_t=x_csrf=18s5_8ih2tbwx&acs_rt=6bf24dc153c04839b84ca29bf11e0c67; JSESSIONID=7C04D2EDFDBFF8C7805943CCCDD5F917; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gJAsk31e4lqsjM0tDluUV7uzlwfXC2lrMr_vrEFak1C9ksTXytJN3ECjlh-70iWqSiIAAnjNQ1Hgh-twkG7V0A0fDMLkQqf90j9XXpxwQEuGHsTkxZWvgizMK388_CkGgS1Gisnr4bly7FfcMMh4jorgvN7tgSIAB1fpN1gcVblySFUHw8Xoadz-n4_ADsBOHyQdxa2AMSQxRMQfr-E9Ds3IRabVkRFAXWCdla5ADnBxReIhlsQ9Ds3BJMbxtXU5lAsM5q_T2g1SKP8CASFvOw3G4FZ_TZOh5Jsw7Mi-2BNlCgLOASn_fxQFcMA-YvTHbdKN-nGSA6LJd1Q6DbePvpTpsT8nBDTN1GTdv_ax6e11fTdhLrgk2eTvU9OEybf16GpVsEzSbeO6bFABured11JCFC1-ZlI2LUOflImmO3T9enpf4eNPV5i0hy6uGwsrR2w0n_b6yi_VrtoPBwb1L2gQXKXO-wsrR2w0nOQh5MuIRlpc.%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEabigdJBx32oFj635R1YlAUqCC4gYMu2dGwnik%252FekLT6Veff%252BFnM%253D%2522%252C%2522epssw%2522%253A%252211*mmLDFmLdZsiDgmjz5KAka0palkAJqMkeYAZPWBa-chopZ0Ff55lAbnvl_xZOs8EerdAhqihvE-KjtC1_EOcsFNAZ3teZaR1m3CHO7BAQ0ke2-jkv3g4Lg6wuoWhNgKErhsiKlRAxmTE-t1FMk0jCRHRmNBQmgvizX3m_D7s5L04lkqlmFMaWt-Fs_iamLX7niZTmu0BmORqDse4C1_36BmEE_Yq5l6kBme7tu39mmHIemZ7RzDV00cuFui7RNjaE9900c-gEfDZuuuuuuu0LNsfIfDZu0Vga3xEXAMxK-6aaxLGO2l4VmeaE%2522%257D`,
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






















