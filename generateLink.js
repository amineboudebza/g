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
                    Cookie: `ali_apache_id=33.59.247.114.1762106178240.972798.8; cna=RYmOIS+l/WMCAWluSOl4mFpd; _m_h5_tk=c6afa44cc18f5c85b36cd97f617c8371_1762108795189; _m_h5_tk_enc=ddbbdad9947693cc6adecf421c3d22d1; _gcl_au=1.1.1686061478.1762106185; _ga=GA1.1.1296311611.1762106186; _pin_unauth=dWlkPU5EQTRNR0k0TWpFdFpqVmpPQzAwWXpBM0xXSmhORFF0TkdRd09ETmhZakl3WTJabA; _fbp=fb.1.1762106187987.674424787749878438; xman_us_t=ctoken=fo_lfhlhevcv&l_source=aliexpress&x_user=9QL3L2UZgg1VoZi2WyVMFt4kN2Gsq91kaymBp2Le/Ho=&x_lid=dz1474717362rvgae&sign=y&rmb_pp=amineboudebza1@gmail.com; aep_common_f=XayFjWBWudWizPaTaZ48CmlMbHGcTFLg6A6I6hwt4sNv8DXHAHoCTQ==; xman_t=sBebz7HpUHciijU+ri8kpsF4YPDWXTd/ymjQ4hnevDDTc8E35VEy6qtIWLaSXvpLHdQic3MQDe7QQk1islXAOvq4QA/5U5RgqqK3XALjtGR9qVT5mshjT+bwt96GY6OgPVpEhcL17xJ0XmHgfWD6ohsph4NV9BJ1ZdYHOimrD9x8BrWeTN4lnY+vPJbd8OBBHxviM5H3FRoc5WuefVzfQclFZqVkz9J8FjVhUibfEr85o2HJZzTo6cbX+g1tE44v6St0Hf65Fg5oSYN4NM7k6veyG7EsxIIrNdrUHIfAolYuBygJJ47j+QUT8tGLNs9WVqTQT8XKSPRSua5W3/dgvDCP9v7MsOntU/0zDuWoVHWPf0hTC4MjZfxlG8+uoUsTmTS28wpaWZBJR/nmLnVZST+SQB/bDMsI4/R+48O/U/gnL6+1R8pmsOJ2m2LVoU71bbj5lBtTxkf1Tw887AOgZscpMlPOiRR/kJ3U4M6n/ESKjGibnha2j+gLl22fK/IfXPdKf0tP2k+dXxFRsWPV/KlilbafkB8dvtmQThPKFpI4x6UJxmsE2rD82S+YkcgJxpIZpsiM/iIDZj7yKqpfc9V9iwb+Qdhx5joLtNpfYq124nMJS73Pm0hwAZ1yR05PvkttV1W5wdRuxtXn5mgwG8lPA8l2Ze1Hk0NkjNmPDUyYo3jZQhsq5c+XDZZygAQXYNryrlQ1lTP37wT5IMd/Y8KlL/UGus9k; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|Boudebza|Amine|ifm|3073958362&x_lid=dz1474717362rvgae&x_c_chg=1&acs_rt=40d2b89316014dfaa602d695ec85c348&intl_locale=en_US; aep_usuc_f=site=ara&province=null&city=null&c_tp=DZD&x_alimid=3073958362&isfb=y&re_sns=google&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; xman_f=mFuCZnQSEXi5Sv51hQSLMYzzzsJb1r8PCYq6b7wRa6i4nb+9X9/yFrI2HVGs7Zh9KNb3Y+4gRO2v+tYWE/GvZIbwvq290JHAxfN2wGa88cOxm+jnqPuEPWInAA3wjtG89SQmN0fPZew1uj+f1wP8GfkCaOsxtBw4XraEJO46nKiiVesLdLyxP4MNu9C2kzeJzmoUOlCXO8fxuMZUCDwY4D97IklvJBiFf0I5WIGJCd2ezYmvcJzRuJRKg6EpE/qtDUyGtNbabWdPsXMowlU+dUQYMPFWFnVZvsLYmZ1U31IGrTWtPPciQBGs/7PyC9f+ZpMpAChFywXBkfIxU1948CclXl0JX8IK3XrTqVAUXGWwS2wO3xJdRAbZOimUrPU/QQvioGlmls8Xnm67dduWu3i5t71jxc4ozPsOp7PUzFsCUYY6VRoDmr7/dHF0mCLQdVLYgn4Iyb3Y2h3rvdfk/w==; cto_bundle=xTnlOV9HbHNra3B5d2hWd2NDUDVSaHFiSGh4UDFRSnNNS3pzeGYxMmFpT3RWazg3NCUyQkszV1ZuMHI5NWVXcXFqd0J2bFFIeDlNNDE5QVdqczklMkI1ODNwdWhaRldrR2ZtMERvUVlSZXVCYXM2SVNLayUyRnN1ZVJsOXpWcDNENyUyRm5zODJhZWo2; _ga_VED1YSGNC7=GS2.1.s1762106185$o1$g1$t1762106199$j46$l0$h0; _uetsid=40144f10b81511f0b822e1ade2c06615; _uetvid=40144810b81511f09d6083a24cd7f441; x-hng=lang=en-US; acs_usuc_t=x_csrf=na_0b34gz7is&acs_rt=a80022a0bb3f40b8b68b560191704627; JSESSIONID=B4F2F1F02943BBF94B79FCFE3C790F0D; _baxia_sec_cookie_=%257B%2522tfstk%2522%253A%2522gQNIkDca0HxCx12xdb7whaIcmnc7dN5VwUg8ozdeyXhLyua7kwcrYzh5PkrX40kP-0n-fumELXBHFLZUyDur49bS2cU0LacL4_w7vRqULz7neba0j4k8a083IozvTWWnaQGnZbIV0s548ycowmm_2AtHXqgVaQnKyXcOXPWKfs54-ypfn6EVgJ-nAJ0-2bHKehhtjqv-wBdd5c3SoLKL2bQ15q0-2epK2hUt8qh-2uhR5PniPb3L2bQ_Wc0-teTjP9i3RZf41sJ6-T4IfQd81VQnDy9MZVFERQo0ScsAD5OmdmUKfQIQTgyiVcVAbOagYJEESu1fffUYCX3Q2spqXRaTtxzGpGaEODatXjTR9PGIAxFiQU_0DPa83ANNkscI9Dertz8fYPNQYyV_zUptOXyshWGAiHnzQrNSP7jl1oaLHue54MdqcrZ9FFMDNViV5N9kEEB__mMqNqXZpV0IQN_6v8DKSViV5N9kEv3iRq715Hel.%2522%252C%2522lwrid%2522%253A%2522AgGaRbaTnWNrozijv5x%25252FX39uI8qS%2522%252C%2522lwrtk%2522%253A%2522AAIEaQgLyUbj2KWCNtnrNtunXemuTDlkTx3HHQo84j3AF8Ti3O08jq8%253D%2522%252C%2522epssw%2522%253A%252210*yuzss6DhA0Ol_C3sUNxQb2srStwe1d5RA-wy1EObb-x9t-XQQ-Ns6-xJU_g3s7D0UNxeb-xerpGxPRPuUCM67QQFTrFjGF1fdfxYaFsaOOEunHrf5OWftZp8Wfy9hQcjPB8nrDzb1EQUNL4ji_HURM6jMgc6A1lnOObazI7isd7EaqIhSusyI-PJOeq5UlfyfmE7sNp21L_ZsjnYn8jsXhF-cGfY4NyCOljCi7AsuRIt-NMlLZ7ggmu7usoSUOFJxefabsssssuZULt-FO3b1RJiV9DodWekO_nlQLNHQr22NqE--A6LaogRMaEM8l5Po_W4K8xva3I_FcYSYNfGxifB%2522%257D; isg=BLW1ZVzxMHNBzlTPPMwk-Ur7xDFvMmlE30Q-mzfbgyx7DtIA_4CHFXfIWMo4ToH8`,
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









