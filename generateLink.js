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
                    Cookie: `ali_apache_id=33.59.247.114.1762106178240.972798.8; cna=RYmOIS+l/WMCAWluSOl4mFpd; _gcl_au=1.1.1686061478.1762106185; _ga=GA1.1.1296311611.1762106186; _pin_unauth=dWlkPU5EQTRNR0k0TWpFdFpqVmpPQzAwWXpBM0xXSmhORFF0TkdRd09ETmhZakl3WTJabA; _fbp=fb.1.1762106187987.674424787749878438; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=40d2b89316014dfaa602d695ec85c348&intl_locale=en_US; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; x-hng=lang=en-US; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005010060998612; acs_usuc_t=x_csrf=pv44ymm_45mk&acs_rt=9e387778b7554b9eabccd24e607413a7; _m_h5_tk=ca6c8257a86d9eee8b9924a6c0aa0752_1765623323152; _m_h5_tk_enc=9ce2ae3fc3664586dc4b7143213659da; xman_us_t=ctoken=yj0dkn3t7w_k&l_source=aliexpress&x_user=kWqtpvFjpvUVhzM7r2aLuMhb9T3W/jytq9vL7AVaqnE=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; xman_t=KkSORXzoO1m5kWFXVF/1ZjIFtdmEW4bRwIHTspDWVap3jI7sMvQCLIHHTvS+tzWyQ3IvVmU6a0BVD+MMjO99VH17eiKmTAKOjetZyrojM0OxZe0XLk3sQN7UqCXj48p3blRodBnQ1gL5Z2TAb64CTDuQ5y+TqqwVcRmby29bTLxS9z4PppJuDNTqe1SpA0jj08p7Zo9Q+E4kDgofn7NhfS7+xgfg9TKUskyZtXjxGj4ebRLxKDoQH2a3/RRqM4kv2Jy5zmLbx+abWCj/FL3Wkez3wVFzbDTVY0bnvVl1K/r1BDLuLKVfndFN+5VxKesvDjRaVJaix3ES8kanW3/27FLy086TyeUQDr7RMXxGhspy6dJ3mgDf8PcFVyXnryXVudkq86vtpp4k+RpFWH/iUxMJ5sA7hSLoTFj4lfQHA8C8HPpYveCWaJeSExWJa596GHae3NvD2Jm0Q/NBGDv63LtBEPc1JWHrJlK88CgFWpEt6Vfo6UB7BQtuXffkNp8u6JKpZ9CxR8FwARELw7+NVZ/A/3iQjZ8TuJuD7sRvytQ4naK3Zh5W3etzNWPLVrqYAkPLCkYw18sAJ/KmkN/AswzyB7TNiF3pUIy5Dqrl9Vd7ygvspEo5XAXPE+yE/9pIDnfzLcXJjWbGFgi4eAgTVbpA/ycy4tHapKl1RQq8oKRuQTUXbcTMggIz4kUhWgLvsEpdA+pY/IvCrUcZik3dNhrKiGR8MvhF; xman_f=AhI/AX/scPLYw56hpcOo/bFPKBV6vOLaE9zHkdpsOky4fGsQUFmB/FlBRHkOQ3w4agxFw37xchyyIB7gfQzx0ZVpBQJGRSkEyX2gKx53nKYxDEAAgddPBxW+kCyWnKckEPepSE0Dr+PdcBlpgMuliSEPRlJSKOjj3RH8lNh9qx2d9oOvQR8vGyxgmYnaztZ4TO/me5G30ZApYUbiC18r+J28gU/oaXq5E3z5oLlNPQeD2nKx7SDoKF4OomqRtctEhbrWl0mWdlHab4WPxaS9jRW2sloGz1CyKzrcL9iqZh96/pJ2XMhUzibqkm/YMLHn0VR1FxbAPVcgzdT2mySYt1ZoOID0+AoLeg1xfgzu0npJRIn5vuUKFu1Ps+KCFSNfQwrbBnDnud2RabMVR6Os9mVrtN/A3nwbr1qaY1cAdRKi6EUyojZJKpeFA8SwAEv+CtCJIEDiFAPWQj8TyU8aRQ==; AB_STG=st_SE_1764840261491%23stg_5570; AB_ALG=; AB_DATA_TRACK=126423_27511; _ga_VED1YSGNC7=GS2.1.s1765621343$o4$g1$t1765621366$j37$l0$h0; _uetsid=9d753f60d80d11f088e733eab1be873c; _uetvid=40144810b81511f09d6083a24cd7f441; cto_bundle=XbyAkF9HbHNra3B5d2hWd2NDUDVSaHFiSGg5QXVvQ016UFd5M3N1czR6ZklTaEwxNnN6ZjF1SUZPbXVrMHp5aDlkRyUyQnYlMkJNaFZnWlhqVFFvOU1TJTJGMCUyRlJtZkh3TXV2RW1wdktnMHNOd0RqRGswd2xwT3N1UkFidGlybTJ3QyUyQmptSTR1b0g; JSESSIONID=049826322346F9DBD596FE4FC748271B; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gOmok_9kq4z7q6S5rpqWzPtETETYVuZIYXIL9kFeuSPb97UL9kvnLSp7v4p5LvknsgI-LQGnxSlnJ238vX4ECXqd2uSRxyVqgYUKw31hxjcgpLNL2yumNAl3RLNLTWcKL4pvXhHSFkZUtCK9X_99zBhlayPeL-y_dKez09nqOkZe6IC9TN3_AbYyatEE3K2Lp_SrTg72n8waYgzF4Z54GJrUY7yFgoy7pw7U8yJm3SwQYWlUzKq4GJrUTXrEtZSUsDoj0BEYz2S48308EzVZU7lKtmJY7aM0ici-48D0_Y7CYMo0EzmmhdK9Az3ECPi-HHjb2A0408cebQrqQqDTr0AG2WGSxymbo9RzryVou0zcLMk827lK-bAlP7u-iPw4u9x_HfFqF0uDdskr67qz3rKwIxzEk0as2ISubVM822l2mgcN4V7V7wPOA-JK0w_Qz-w06ckjVV9Qaa4WnKb6PzybeCpDnw_Qz-w06Kvc56azh8dO.%2522%252C%2522lwrid%2522%253A%2522AgGaRbaTnWNrozijv5x%25252FX39uI8qS%2522%252C%2522lwrtk%2522%253A%2522AAIEaT2u9f46YbonIAcRutUSOg5piVfo2Pdc8Fs6Z2BHBwNtqGdnD5U%253D%2522%252C%2522epssw%2522%253A%252211*mmLcamo9drfegCvgEN3kM7S0V_AkRXmF7ltTfEj4RsKwJnSDuIcVBJU5gKRmQW_Pdvz4yXEzX963pyem3tQfMuvOmmmvQOeJ3CmZQv_-dBj67PZkEVW-Owi1A3B-gwrk-nzHdRmmEOITt1FMbzRffKjmNtV3KgExrStd8HAA_tEyV7tt27RSVfK8gtcndiNfStFDKp2n5GhcJeqNpxT_ojs5_Mtr-cIUSWTsz5fjPJh5LnCuuRmmQjmmilGgcZKmWe7CTmHHmmmnfD1EzDfCucMENjH7TRHuuwpOc6weEvgafDPEBjaEmmHArBdmuukYNZied-oIspnO5r8GhSarfRH0uR..%2522%257D; isg=BIGB_Z-wjO2wL-DjyMAonfY_kM2brvWg5hnxMOPQ9AjnyqScKPzRcRSMrCaMQo3Y`,
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











