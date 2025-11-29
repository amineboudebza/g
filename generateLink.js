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
                    Cookie: `ali_apache_id=33.59.247.114.1762106178240.972798.8; cna=RYmOIS+l/WMCAWluSOl4mFpd; _gcl_au=1.1.1686061478.1762106185; _ga=GA1.1.1296311611.1762106186; _pin_unauth=dWlkPU5EQTRNR0k0TWpFdFpqVmpPQzAwWXpBM0xXSmhORFF0TkdRd09ETmhZakl3WTJabA; _fbp=fb.1.1762106187987.674424787749878438; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=40d2b89316014dfaa602d695ec85c348&intl_locale=en_US; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; x-hng=lang=en-US; _m_h5_tk=85e269f8698ee5c7aad5b9ef26ee9c2b_1764352374452; _m_h5_tk_enc=c08f39b06a12e7becff0be9d655c6200; xman_us_t=ctoken=u26l8nyeth0_&l_source=aliexpress&x_user=TzUwtsb0DXEzr1shvPnaGNTbTrJtm9c9ZSKx7CsB+JM=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; aep_common_f=RpMiERxf3/KKq+rTeaSKzlgpvZpUnj4waIK2lldrThHeokLozgWUrw==; xman_t=viBbZ+HPRygVytXNII1WLOHimEA6VG4gBTt3Pq+hP+yJLqOC2HPmgGqUbThAbVThxFDveYCemO5T2EMUDLm8WDufmB8Vzi9QzHdAJOKP5yCjV5vFnvakrZxjao8rwlXkWURWWLdCGAT4L+PhC8dNmbbx1PqvHOpnXHIcrzjx/QikdAfNqsFUYDlNzqyo1dqvX5/4YtOjuktVjei0zcOrn5v44TUM1hWVhv8KUBnIHyXOgX3lfoNmDDa4T80hbB1aZzkyRHz0Zo21AxsEzthktq+eReTq/8cFIKHy8T0d1VaG+fVfG8J+61/sCQj05gOsqz1J3j82CfmzymLc4QDjgq5FPEqZ2KFgqn23mpJZ9ULp16qMg8/Tew2PMwyZ4aEs+nV1oW0itWVzuHhVj8JV93IixWI6N5vpdmG/lHAtPYT4pPlc9F2EnV3jlgwsEflvtrUPn1apvr2507RyfBOYnQayBe6lR16oTVJiqMUPyO6QywBo+BNBZ01BcMJqwvoe+bn6NHxI+0wI+zDBPbOQ47pC/kPdUAUW0IyZhf9R7SYAQWDOSxFJzb6teqDCNYkUTOCChb2BheYpFdyp8istmtyqv1AomWFc81bTrPi8UvreS0eXoJjifXtGSsJgWKu+q+lmKUxzEeNyLGoB8zDTmZFuLgqEYGVyVHeoQPJWiMUtIvt88TBLOxmkGVVxGDwKE4W2GndlyVqiEhHknzM8OLZxWf8SJAJb; xman_f=iH1Ra6WwVMXZONqVn3n8cjZBnb/6B6BeQZm+xb4xT1nsq572WSOw72LGmh7E4ZEgdAT19IO8H8dGKSeV/NGoVXjP1KI2mvQogJodbadg05VV58XbqdJefrWrfwEUIa/VDCBlWtVPdh/zVkH61P74g8q7rem4XCxGXBqq4XgpZbtJAcYeEs7A8ywv/+f9Uw1FstmDiAc2un48ysYpaykE3Jy9NT9PvWGy+1iI2sxVz4QIc/ZJ6E/i6rTUMZ7el2K/WI9rqYB4caDm+EqirY1+o69yE9c6km89VwbpT0n/kdcUiKqi+Zmb4YXcAUyn6ckhyKeu5os/O5sSSczUIzgDCBMhuwE70ybY+CbQNNMS+f6Z4Mv+aXmXKbABNBCkQ/OaOw8sX6UD4LVZckt/cdK9teG7Ydj6LjSlFfaujbeYfMRHpzLEFJEIrk8XrRGYR5uzJez8CFws3imiLC7DaLLjtg==; _ga_VED1YSGNC7=GS2.1.s1764350392$o2$g1$t1764350402$j50$l0$h0; _uetvid=40144810b81511f09d6083a24cd7f441; cto_bundle=bPqJrl9HbHNra3B5d2hWd2NDUDVSaHFiSGg2YWolMkI2Zzc0YjhzUElmUG04akJkYzlRTzZjeG1wQXZvNWZWb0FVZ210JTJGZEpwVnh6QlA0ajBlSmJwcVM0WiUyQjJQUGJnNDl4NkxJJTJCWG5QVSUyQnNiSTBSMWljN1pXSVRTRmY4UVRtWEJEbkdYdG0; acs_usuc_t=x_csrf=9wvd42sqdzo7&acs_rt=af162eb3ce6c41a1a939cbb5f577620a; JSESSIONID=0593EB05EAC16C54F3F4896835D912F9; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522g7DEl3bh-ppE8v_6dVeP0ldUdLyLh88XrYa7q0muAy43FJNuq4gGd7AKPLWrv0qSOyaI_zui7yxp23prqVm5FH37RV7ol4a3FXiWzVgmu7GQNBEoz0zsPTMr2Troq4KLPHdsvDe8EETbUKiKvxpzHKMFKcbiXoX3qCNnubq6BETXhd1fPkbHlDgnyPga2Pq3q94HbNq4SMqnryVGSorYEz0orl2g0ubuqu4hIhr8Sz2uE42Mbuagr82orcch6DmlQoNHfeyMWtsNgWUmxPWl3NEUt9nONtWV7lNQo54NElMaYWzmxxXxsJEiCAPb1gTzImhs-ly2UO2UgX0UjcLP3ycjDmautiBxb4kaIvcVqTmaLPNxL2Qe7rDKjxeg1KxqjA3IvAo5qLqslPmKK8JDDJy3-RrtFFB3zfcodWeR-eyobujyUaEG0lH-TafztlEalh-NOCmkvIZrTqfRw52YbrtQA_C8tlEalh-Nw_FgWlzXAk1..%2522%252C%2522lwrid%2522%253A%2522AgGaRbaTnWNrozijv5x%25252FX39uI8qS%2522%252C%2522lwrtk%2522%253A%2522AAIEaSpKNxDtRfLdNf1DhZ1X8KeZYz6F8w7juYIpHr4N%252F1Klq3ekUd4%253D%2522%252C%2522epssw%2522%253A%252210*vW6ss6B7K0lb_-xaORasufFNkqC3U9c6i-Ty1Sm9UNxJQCsss6FabGDoU_UFsRXQO-Xeb-xexAFlgWPuUCPbdQdLTr3VCzhs-12y-QrfOOvk6WOOAaFUtEcsb5FOOrsazFs-7HrtJMLcqYyBb3ykssBLJTq31c9THdBohIKnU0lpXz-Y89aV7EF8MUQ4dRbmGwwgAWt_OWaP_2Uo9dvQG9wjUGRbfC5RssFabRFaORa_FjJZhsHStnH_OXRbnWrpbWUIhg6-5sGZcgyUiQr3rTHPyblnvYI9b0DDe9CRnAkHrJPtZlbrfC..%2522%257D; isg=BEpKJB6-F668fJsun7XjqPmymzDsO86VOYQqvdSABh0oh-9BvMndpCCxl-tbd0Yt`,
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










