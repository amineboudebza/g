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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; acs_usuc_t=x_csrf=q5fsgciuxh_1&acs_rt=ce94e3026d0d488c9a5db10018be15bf; _m_h5_tk=2c28e2ea99e0dd9acf7d8acd639db0a9_1766516796280; _m_h5_tk_enc=0015ca86a3b3bfe17a7b7b2fe75bf28a; isg=BBwcp-pxmWUTHG3NMLiryw287TrOlcC_uwK8B_YdxYfqQbzLHqZXTlDzobG5SfgX; xman_us_t=ctoken=_byqxqqge_jx&l_source=aliexpress&ae_g=n&x_user=a5OKz5714JJySJkM44P/NIp0gPk0M4/dRFbErQpYhJc=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_t=AaHu/JoI/L1P8f/TbpeT3TZ8jieSQ2W7amZJe5P9Q1I404PHCgVQJSHtMyA9uYpdq3NszcDwk/qnawr/Mh3kRWHonw/COfJ/3KSRohuYir4HreG2nd/Wt91YB4lyqg+M380QSzjdqSf66t9C0yu0vIIGizdW70fwa/OPBLNn62tPZIkfp9Rhq/kWTJHYDwMbndrCr8bsMZm4aVcurnCXZFegEsY3lECAX9bbSAHmGcxQtdQ0oSIfXAO0fUN+/8kSrV3VLLmVYiOi0CPuvBhSVAv2B7eq9yVIA7V2jlPx6QQsdJpDTFT1Hkx0fNaCawjkQ0i8Yhgk9PB1zTRdpb32l0EKYD+oJwWjcHFlLvK3VfRHBPMo3h9feWsGTqN7s3tZfORx7Wyo8lVbU9ELeDKxPEAbMrpFk8n/zD6qojquANRyQc/Dp12wXxU3n4vyeS41YsxcMz90FyMpOdEIzwGFacC9IQF/JLvjtfLGqA+3ImWQiEwV/oburRnRn+UWPaqkJyPfDWuVINpkA4wGcFWQZC9+/O76qJTLPL2zgXn2StGgIogWmAP1zITRe69s+jntsFeGQC+7ZSiaT8HUEq321nVkOimBdpg+kpiN2bUss/6t7E1lGE9sbnj1eXPgopZueUY7vcptys+s5W5HWE4eMIhQY7+JYahu24RG4AmsKi0stVCTkGqIUJTy2vjaz9aR9nMy+UzbB0QOeRds5fR0+SwB5we03VSa; xman_f=egWvmi+KyzVVbFMsV28ukGzQkMrtzHCi3GwdtG8lMUrJQovAYBmbwoDZk9qpXeo/H5QlfWpMpeKil8VwJaCgX/m2LOl6T/HGQw9ykhramQiYngvJesqCS4s0Xy8C1cTK8xcCTOdHjusiW5smLQgpA73Vj2l2E7iqvaFRDad5NJwzU+9L+clbDULGlOVm44m73ct46Z3UKs0wmwCz/+Gx57wY1PTCcCwqJfzfwlXUPa43hW1K4IPMsV2GN+4sH/ONaBH7wEMKCLZy4g8YNoeeHOXGayOIMCt+csZSlWh3TBGRrLx2OL6Jx2Y3Pl9pzVMXfAjA78a0wLFdnxbQSmVswonU9VrjhKyA7mtMHAaTFGxfrLN/zrqMXfG7n+XQmKqtrQ9y2nIhdKH3WEgNMZMb7wycKPRY1wFKCloouFH4kLzUiiIQpRwmpkaP6dPHV0NuHIynI7QhPZuRrpVwstaU6A==; AB_STG=; AB_ALG=; AB_DATA_TRACK=126423_27510; _ga_VED1YSGNC7=GS2.1.s1766514996$o2$g1$t1766515008$j48$l0$h0; _uetsid=501756d0e02e11f0bf12799189143936; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; cto_bundle=yD5nXF9nUWtKV1dONzd2WUpjTUNWOVF1aUxRaXFPTTcwMVV5ZzgyTXVxVWt5eU9LZDFMQiUyQlhyem84WXhIZFlNT3kwcUQlMkZzYjVleEEybHhBZCUyQjZHNkFFcTV0UTNhRXR4OUhiWG5abSUyRkRBVGJxQVVGT3gyVHljQXQ4cGNyOUZYd1pvM2UlMkZmR25PNWM4QnNrWUhYdlNKNmNjYWdBJTNEJTNE; JSESSIONID=B14C0CEF0C31645602F7ECE394E46749; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gUirkFflZ3Kra2diQAqe0kKQYpE8fkR6tDNQKvD3F7VuAua3KXGcVyY-OHSEev2IP7NSuWlmg7vJppKEKjDCALhQNj5n1XNuA4MBTjGi_yg7RUenTvPjOMiEpMynKXp8OLLjeYELxCO_YhM-e18CwCnPqZxmHRjlrEao_22XDCO6fn_1O8fk1YgpkRD0pS2uKgVk3s2ai62nt74ciRyTxWcntr40LJsh-y23ooVYKk2ntkv4mSeUxWc3xKkmt6HoKiy_rKeMgw0caFUYsYVVxG5YezbjZws1fUPzk540gM2j08zzsYmGhbXunmi45r6BToDtlb24bHS04Puoa-DvTGPo5AH_tzXOXxlE0omo79jn3uPbW0lRaIPi2xmTmrtMQxmxNYnqd9x3hfNme0qejdEzq7q4HDOAqWum-0a8v_Azxxyh4p1Ln0omv45h8z2Y35923aTmKLdygpNcJwU0X-P6F8_dJz2Y35923wQLoRe41Lw5.%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaUtRs517XAdQdtTh7VrFRDltP0Mv8FOsgVh%252BCIWbIbAbaD3gB28%253D%2522%252C%2522epssw%2522%253A%252211*mmLkRmGGnTCRgmAzEN7ljTOsyY0kUi6q2Gr7sFXoLnVqGfwlhMPRWvD1iImMoyXfnXjmfTEzsYBA3uuuaOA63iAxaOAvQuvuLOtO3DwhdBSyeZrk3gXFSi4VK2bwvUxChsGHdRAxEOUizHFMk0jtZKjmNjK9K9XHqp7nD7sAUl4lEalmFMaWzyFCzucntv8cxCFDevhn5GhcyxbxvxT_Dts5_4MgyHWhnWTsz5fjPvFq8O9mmCuuQjmmilGgljz0ZcuuF03bmmmnBjHEzyp5EB5YBjTW0c6uu3cuc6pYBBBmEmHuuVgaXjSlTcV7EmBemvieLKjIsOfUckoNJTNSfRHuuR..%2522%257D`,
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














