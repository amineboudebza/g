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
                    Cookie: `ali_apache_id=33.65.6.156.1765709491307.208766.0; cna=tYTFISOJtkYCAWlquBrT+NhM; _gcl_au=1.1.838961359.1765709495; _ga=GA1.1.1037946339.1765709495; _fbp=fb.1.1765709495464.947813335507793502; _pin_unauth=dWlkPVpEZzFaRFExWVRJdFptWm1OQzAwTkdRM0xXSm1aRGN0TWpkaVl6QTNaVGcxWm1VeQ; x-hng=lang=en-US; lzd_cid=352c0b5a-ce32-4e3d-b82b-32dfe926b322; tfstk=gRgt79MnrpvG1A0Ttf-HnCY5SjAnXHcZTAl5o-2GcvHKIjS0cfAZkoHoioOZncbAGjlmjN2iG-HxKJy1jRAacvHmGf2snPXvkveeQd8w7vVjKY9wQF8ZKvUZ-cb0IdzxGY4vELYkrfla0r9kELeIPYU815T0fZwQ7SjL_fSHrflau1BXZDTkkDtMcPwjhlZQO52C5SMbCMOLGSX1cNMX9BF0Nt1_hlaCO5P_l-MblBhQLSab1xajO9vYd1wckcmvtiuHMyQfl2FTAUc_dVg9i5ZTFfwpFLgd5leS1JQXBjJXm-eEPpxKTAmsIWkvypUINDU_6xT5qJiKOVroTh9KsPetOJaRGFGLWRES8kfvaYGKG0qK-QTzWPwsmPlcwdcKWAcZJjffAPUivu3TPUW_nDc-kS323eH-10MjDgzir4eNsT28iGdp9iS4fW77vgnAi8BprWek6EIV0kRU98Ap9iS4fWPLECpO0ireT; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005009504965110; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=7f82506b3c0f491e9683d058e5918d82&intl_locale=en_US; _bl_uid=n7mUskyOlsnlLj5bpjhLiO8utztk; _m_h5_tk=c23e76e7bc66326520e5cc7e2e4d360c_1769626384732; _m_h5_tk_enc=cbbd71e7a8539cf0b78c1c09bcf5f8e9; isg=BCgoioV01bFN8_lxBPxXL9Gg-RY6UYxbfNgzWeJZdKOWPcinimFc677_Mc3NDUQz; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_us_t=ctoken=10cmhs5wk8zfl&l_source=aliexpress&ae_g=n&x_user=pwW/IrfPGdYJhr1HqeL8sTnXCrAYE0t4ENOLmwViX78=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=UltNgeqgB7wf/wIHl5eyQRgVQidigVOcGdyEhtiktyac4AfujLheSZxwVRAELYU5y8tnNJzBHklJr/d6edsRNazPlKN0JoNH4B3AdrCif8JcJTf5TCwXKTKy5PaTV3nml/QYrYv/zeandfUT62BpmE2f9Mr0I8vhrLbgFqdIVRA/olMJZDZIuhwiRl7BPlbYCvAx3LaIjp/lW7YWOa5gQa+9tcMZpULxlsCSaGZS66/I4rYiUVfKsqKFlwmy0HqvVNBTltlM6HoctYgfhs1HcnUs4AvQIC/xvGga0W9e7m+lyUN5qvcU+2M+wfuPWFdOxknxYJ4WGP7TdepSIekNaNsYqdaLvsWxOXw4i+rQU+mYYUkBmNUqZsPTh4i8mmJ6g4IXFfbS4Bsryw+gvlg+SNCVfIgfu3uAp1F9bfdtOFIwrsozcSty9ZjeVDRd73c4JIi3LAU2JS0LWklukQFOQMU6n9M7uyhpbY8tgm/vLTYfPjeZcTFFaxrSjdBnAJgD0kWYjHFWegp32TkiunesHm4p3evKcEd7TXcQOgRr30zIqjSR3Duxs9hy6u8uynqf71OAhFRC+xORVVGps99Gv8xUDzh3yPg2K7iiKEJ2L1no2L4DHaIz/z91PNz3lFB9BoukAyJTs8/reLv2M8Ayx8npshlrFZCUADFkYkXVizd/jIIplnAMNVuEukVRKBkgPeG1BysYcBN9TGXfo14zI5TGtSMsONVt; xman_f=HaqJFRdIid8IKkXcTxTZmDn9K9N2l4pOgYXP07ge4pGzf5pnLGw5DEO4OjHhTsRo3WbtED5p4zJijnL7uKqWJBXQqCt291f1TDZC9yhWv8RY5azhIK3wk7M87sqBCHAv6ooUNDTcBn4lTn5tiq03JJ2ww+XjcZtWB5XbG17YMTggMJLELQw7j62vYTVFmwsB7vg62kwLLKVuJf6cAmcdXC9CYRbuokAZhCCZkcBJXIrtlE2ISHN57BPOs/yw3IDl69Vhi/Z5n08ybOXwKAM8hpJJdY95XOLsnOQiEZrMjzfrhmhRQCLxWcXEF7Aqrt2T7ukOhqOQj3IHJEsPPW72+7Sv2l/avVjnbzgxkuDvFBBUAmCQ/fGcvlz1pMzD0YN1q5mrPtCpsNZTWNcAoRdhITnJUMvyZTTzC4VNlolw7ZvPuOKu3PsuudPeLzr9enU/OPmWsEFyALvMM1fzBARd5Q==; cto_bundle=nlSFMF9nUWtKV1dONzd2WUpjTUNWOVF1aUxjWXIyc0laZmpMa0dhSCUyRk0lMkJkYmdlZE91cUcyZ2Z0TE9rVTd0TXYlMkZlMk11SGJ4UlBvR2J5SmQyenVhbVR4SGU1U2pyclRSRmFUcmxDeXdKMHl4TGxYajRQNlh4RGlTbUFXa2loV3B3aSUyRmdRZiUyRnQ3UVd2WEdSZkFpMyUyRkRTR1FUUXclM0QlM0Q; _ga_VED1YSGNC7=GS2.1.s1769624403$o7$g1$t1769624530$j53$l0$h0; _uetvid=dc1a98e0d8da11f09f9665e40dc07baf; acs_usuc_t=x_csrf=w0i2jjmfi1t9&acs_rt=476fbb9a1ca54102beb0fbedc542e7ae; JSESSIONID=F9579F87F6DC6E28CEF9E48E61ED8385; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gJMKk8ginFY3dlJ6k9AMqk2qjwtMiCmEb2ofEz4hNV3t4VrlEBuuPf3o5DchE8V5e0izNv2nxVe-kqm3rJVuV83Z4y_HYQu9220gKekHYbB-24Bu-7m52uwEIXXu-ey-Vq2JoEvDnDoUa8TDo3V49O2b0a_5rza_f8q85QjQBDoUUGJmUooqYLnGct47F4w_1oZLFwZSPdw_7ur5Ru6BXcaa5uZQAya1foqLAag7Fhn_7uw7A4NBXcaaV8aStVL85MalefhLXqPyOQBReAEL9zC3WTEIdtVUlQ4CET4LvWCnAPB5FAh7u3XTRISgzJ4E0k3y39yQwXgLf8pRCJ3EAYNtEFj_MRagGvivGhiteyFjd5IVhciaV4N-_EB0vJcTMvhe4NiIoyhbL0jv-cFx6Sr_1gCQKjmmUSMBpZzggu3YD2Qd4cDmHxkOorElOhKOa_PQbPkFS2gq5S88Xrxpe_5z_hrTohKOa_PQblUDv3CPa5-N.%2522%252C%2522lwrid%2522%253A%2522AgGbHHy4P%25252FTcR3Kq0dz7X39uI5Qx%2522%252C%2522lwrtk%2522%253A%2522AAIEaXrD0oih6BBwC3dcLc%252Bgb%252Fm4H8nvQ5xAgLjcuAyX7lIdPgJ6QMo%253D%2522%252C%2522epssw%2522%253A%252211*mmLddEDYqXiAgmAzBoTdwy1LGFIfm-ABFIyUKE1kTJHGqtKIxsYvI0sXuS6fslGn3w8v_BhvICMfyuAZmmTloiAx3teZaRAj3CmArXwiOF8bkELumTK7BNZB_vDQvIrk-nRKlOAZarbizen8BjD5izjmNjK9piA0ZvTexUq5LVBVkqlu57Oo2mmmmmomGBHkiWRUmmHuuryUuuUbu4P7u8wmma7tRRmm5ZgetVHp3tF0BjjezFpEfDZF0uuufDZuuR1ufMV5m-gammEE1_P29KIPLTkEJjMkgBBYuupV%2522%257D`,
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




















