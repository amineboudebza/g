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
                    Cookie: `ali_apache_id=33.65.6.156.1761313881874.271155.2; acs_usuc_t=x_csrf=szxgzfckr1bq&acs_rt=731124aa052c4539be2dc7981377abd8; cna=XHKCIULO1ysCAWlukGxU15KJ; _m_h5_tk=f80157eb6612005fc8cc968000c87a8a_1761315686290; _m_h5_tk_enc=a4ece4cf056a344548d52a106ab24de4; _gcl_au=1.1.219685145.1761313887; _ga=GA1.1.1839813145.1761313887; _fbp=fb.1.1761313887710.155967568145916253; _pin_unauth=dWlkPU5HUmpPRGs0WkRNdE5UQmtaaTAwWlRrNExXRTRNbVl0TURFeU9EQTBNRGd3WVRCaw; xman_us_t=ctoken=azv6a5j1kz1l&l_source=aliexpress&x_user=07ze0ZhFS/AHr0g2Ow+wp24yOOJllITihGtuKN5WwIw=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; aep_common_f=iqbwh3lSyPyElnIlsHuSnkkxxYy+FLTbdKb3rzX+SS8zWn4DoosopA==; xman_t=ng8pCxRywwNIeO1+X+C9oaEBATNymtZm3j/2wiPPeQUfbsDg+QW2q4IimHZKVHWDrLr1dq6zztCjf5Cvyec3R8me7kqBwsdgoTbh076EEYEFI21F5Zt5ktV8sZlZE4t7AFOVre1qt81Bhuraz50bjF876Fm3OlySmqmpLWw1GR4vpHGerJCN4nsWqrfA6VMtpJBuDuG6GQZDFcg+p8Gh19njQVcScU19qcWB1q6SRJ47a8uiLOO8q1/gjipVc+wetK+5CQQqnySZvJdaI8QYiRc7Gu9AIBj3kODRyn+gaSJC9Od8A/8DY8kWJKScnoVBpdDWQyE4J/3fSkqmeItagj6nmnnTVlJKPPercwamf0E5HNTV18dfBnny6rvUnkLZKEG+lNjnDRsRY6NWrqXUMf8IbQ9b0mwnbRE0IxFCULdZjlyfNU1fI+Q9liSt7toQCX79xqw8tss1ka0H8wbscxDtt23wsI6mgzEjnAJxpUwH81oQtmeImOMRimrzA8X07vSDwjYGdmdLqCYWXpfj/JrVGUjUWHTKofiHkGZBYrOD8QvkyZBLnb3Jg8bQ58fnqcjIX/zPLDB39D18tQHiWaM/lmYjzYFzS4qJkwBzYLuIBzDt/k/ruGiayL+6w1W0El5nOsnP46vvyxYJG7Z5STz9NXxE2zUzvUTtaPPkH7DdvVM10LLNXNKuvm61Q8Oi9BUfdBjcXjNg6dt3kon5Ps4eSU5jHT0g; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=731124aa052c4539be2dc7981377abd8&intl_locale=en_US; xman_f=P+jE0Kwj2/12bd9oewtckEgTZUxThth436I8fI5nBPH2g8gQCB2CF9GwdDb6XR/YX5amKJY1Znpneaa4+r0nlT07aZbIOACqWYPTkSDd+yhIBTMOh9gQHHz0nt25ELplN9AmJHxmxb45CiDvTReWHtWM54gHshL9Q6rSlb6666Dr/yy85qDEK0fiO6pY0m+s2pdlRe6lFCqtKzFqmud+ypfdQ/o/AayQWw4USat1Rc3nzwn3EGK3B+LGr6HwjePRhKTQ9upPw6sjSuAkXwiL2cKb59rwQd2nPn/7KvRAv4u6rnZ3mVfKT6NgXRWwGE+Zp1xHN68Xyuovp+1Pd/AHqSONpJUK+fC5zqxzuKaIO07+F2dkltLkGueg/JvzLLSKM+iE+NN1C0kNHHAXokXZdkYxC2qsB99WwVGSNBD3CcxucO7gbsoPikMDcd7/EWtHy94S1sqR1BZfi/rHp4ujqg==; _uetsid=89b22010b0e011f0b0ce61adb1741bce; _uetvid=89b268c0b0e011f0ac43411e749e0c7f; _ga_VED1YSGNC7=GS2.1.s1761313887$o1$g1$t1761313915$j32$l0$h0; x-hng=lang=en-US; cto_bundle=KWjhtF9NVm1OSkNHNWpMdTRoTXR1R212QjFqejJ0OUFSc0FodGpra1RCQVlhUklBT1dvSlY3dkwyY05tMGQ3Q0trYjFhR2g1NlUlMkZkRDU2SDNBUnFsS1klMkJpNHJBJTJGbm96YzZFVk9WdyUyRlNHTWNoQUcyc0olMkJ3JTJCYndHWXBJOHNqdFhmNVZBdg; aep_usuc_f=site=ara&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2&province=null&city=null; JSESSIONID=2907C611D1505753EEFDCFCF04A10505; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gRkIkmwZuwbB-bGYO8-NGuM8areW0hJ2egZ-m0BF2JeK24iSDH2z80eWV2ufzzPyxzU8544UTJdhN_gE2yrzzBx7yPnmT32KzLGSJf0ET0-3w8imSuP-UzSnsqoALvR3UTw3E8L2uKJqYD2ueXmI3z7hWur2UTULyJ29WcRL5KJqxDCXip323Y-drlZ8y8FLwNeTSof8eTBpfPE7m_QKy8K6foqPvzFR9dBTVuy8y4eJfcUgV8EKy8KsXPq-tfIbVBanAnf2-1VN0shz5TB-ClK3kDtC3kMaApzrxPTvkA60OrnL5TLp0hMYPPDv7Cii8X3Uj49X5Rnx1JEIyKC4WfitKSoM9FiUdyiTW-sJpcwQRSHg_gtmkci-g5MwDK2QpyhzK0SX8cMI8DDs4gCTdJl_GvwvnwUr_mM7VYYkCqiKM4h54cW4lmgONGNcFla2fh1lZidsQrwpmQfL9lqQ_ht1JbVLjla2fh1lZWEgAo-6fwhl.%2522%252C%2522lwrid%2522%253A%2522AgGaFn0OhjlreQOmwNSGX39uI8qS%2522%252C%2522lwrtk%2522%253A%2522AAIEaPv039hKuI4Dcseza7pSw47ostC2fx3HHQo84j3AF8Ti3O08jq8%253D%2522%252C%2522epssw%2522%253A%252210*0izss6z25eal_-Xb6sFeO2srStwe1d5RFNTy1ERaUNDojCssQ-PbO6s3UhCFsRXQb-D0U-XQapD8JWPusFIadR5SX11yOYhsXx2WtsssOOEunHrfssFftassXRW_yRO2TzDcqChk2rubBCBEuR1KQk9TOP2cDEKzcpwpuiPSR283PX48Xuj4sWtmpIkgAWb_uCMZYZo7VVpSadLZBxEx6sFbtO-GUmIbORFaUmh_F-OOhs-ewtTPStzsl-FUbWUyOjjVK7Vdlmdn_5gPIgi0BXBjwdEJ-f0OHM2brCXih5uYxgDlXC..%2522%257D; isg=BH9_ANwLK01a1i9RhSEqGSpPDlMJZNMGARqk-RFPDy51IJyiGTavV092YujeeKt-`,
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










