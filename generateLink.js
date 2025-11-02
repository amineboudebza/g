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
                    Cookie: `ali_apache_id=33.64.244.185.1760996765481.613897.9; _gcl_au=1.1.1506821426.1760996766; _ga=GA1.1.2107472735.1760996766; cna=vE4iIXmG/xICAWnrh+gn7cNW; xman_us_t=ctoken=1c_sm47rhw4he&l_source=aliexpress&x_user=WfSyFqYC3BJC4SEWeNAWG48tZWRW1KO8hYixyMOhyTw=&x_lid=dz3265767613aseae&sign=y&rmb_pp=rabehmsnf1@gmail.com; aep_common_f=GN1V3mT/v5yXEw5uYhy6pU+FS1+MZoR//ZRA1HSRCiOZ+phjHIYZzg==; xman_t=FON6HhMEDUfgnLovK2xn9h7LIBO42gNAM9IhVJX8NjWRHNWjbzFzZafojc3IV5stgs6QZzJdH49TGhmOf4UH8gSKtkQrMXcLsW4mCgVmxjeiBzr5yP2ZI/akmmIjrE9Abopbo3vam7HNA3Vpe/8KRyHxYFeeYraWB7WfJvfhwzBYA2OECX7UviLFjcagHd+HofoUznx5lEUKj8f7frhRwYqZAP+MWcXn8A1BpFyp5f9UoqY6ntgngdlG3KrbhklgVQmBUAUsnnd7qAxqNyNt9fWoHiw7LjqM/RlsbtqooiPSYMnSD9uUbnREZbnYkbDSJiRdMrqZzIhRNXQkfuGW9Ibwo6HwrWWJ/o7DZKLzpym2qSSKUcy2yweBOfUwtVwu6m2bSJPEPoK9t9DMUMhrij9Cwh4izYEzHOfLU1TtUDP49QSD0GD4JJNz8HMyxMvh3tCSdOqyyg+/dsYXDrfbbz/3I0szxLDnTqJ/UoUR/C/Zbp7tw/0jQQMuxVnF9ITrl7rHPdZrmvoqndCyJFadopX4FUa2/+N4vUyaNNjQm9IBj18Fu/8bVfFafl3cPh+8xqxC7ijyJVvytXeYEtzkTVy0NS5ea7ClbCg0/CA7QXqjiSNvtcuwC856MHJwq9xIsHoLMxRh5DHouSRTq1fQqVtEqQMj3HH3KGaAzp6/jSUXixrkZzFQjgmftQQq+Udej9Tof33oyv52SZSGcN6CVA==; sgcookie=E1009zjHFzrtLoJyv/I4/7Xbgsg/dUymScbAZaiFd0SSwkkR37xQIbcdBD8t1QTWC7nYcZN8VrDON/V0zSDQs67ocH96FT5Fg3Bxo32LI0/McqE=; aep_usuc_f=site=ara&province=null&city=null&c_tp=USD&x_alimid=4860735742&isfb=y&isb=y&region=DZ&b_locale=en_US&ae_u_p_s=2; af_ss_a=1; af_ss_b=1; x-hng=lang=en-US; aep_history=keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%091005010144378570%091005009947885656%091005007828059987%091005008748883434%091005010165893594%091005006323693930%091005005379063116%091005009077995167; _ga_VED1YSGNC7=GS2.1.s1761560301$o27$g1$t1761560319$j42$l0$h0; xman_us_f=x_locale=en_US&x_l=1&x_user=DZ|RABEH|MSNF|ifm|4860735742&x_lid=dz3265767613aseae&x_c_chg=1&x_as_i=%7B%22aeuCID%22%3A%227e1d3ab5103847df938ae61009bd8952-1761567762614-06366-_c3Pq1J6P%22%2C%22affiliateKey%22%3A%22_c3Pq1J6P%22%2C%22channel%22%3A%22AFFILIATE%22%2C%22cv%22%3A%221%22%2C%22isCookieCache%22%3A%22N%22%2C%22ms%22%3A%221%22%2C%22pid%22%3A%224860735742%22%2C%22tagtime%22%3A1761567762614%7D&acs_rt=71e206f9e7924e3498ad6fd517fb4bf9&intl_locale=en_US; aeu_cid=7e1d3ab5103847df938ae61009bd8952-1761567762614-06366-_c3Pq1J6P; xman_f=F1qKNxBm7gxhVhtedp4CPUCh8XJMCxM+TpdlH+FLmd6PSrnf+dcJ4UbjAbPvGRQfrivxpm6SmMRy31Yq1bhTc5FBfnUZ7TmnCeHH5MVudbZgDIdzJm65Ie7Ltn1ag3e0iz4p9vZNud4pjMYOa90dJoH+/9p2gZDFArAsFQxoKSf0cAJf1zZEjb5qVCKkkbk9aM63g2UvZUaJJC5nE9woUiJJimK5o8A3ao4iivCpWs5YdBLbxuQlnhL3b2Qo2tI//g9DuqjIrLjKgEPbA43Sc2CjGYeJf8gK8RshNgO75hZ9QUvveaiRrZwcR25anwfhPAzpie9WZEHzhRiTiZ9ZOAg99zXPl8rxgoLT0Scjc4n9Rvyim8pcGp8VbT0jiQ82/DiqVY0UlIujzKmgUTBazAbHDayW4SiL3VHWMw0tuhg+BXVH9BRmq4jE8lYGAO10; _m_h5_tk=91e8b279624fe0dc6fc05117d4aa3041_1761569834093; _m_h5_tk_enc=5daa092865d24abc42c7ea69e0e5f8b2; acs_usuc_t=x_csrf=10_kg2wpwkuq2&acs_rt=6649a1458feb4740a69392575350c5d6; JSESSIONID=C1AC2EA92D10F0FB99C2E5E870551EAE; _baxia_sec_cookie_=%257B%2522lwrid%2522%253A%2522AgGaA5YnydX8oKIBfHR0X39uI8qS%2522%252C%2522tfstk%2522%253A%2522gKlIkDi4eMjCabkYd78NhUg_7GVSdFR2waa-o4CFyWFKy0gSkeVzY4FWPDof4uyy-uE8f0qULWphFTiEykzz4pY72l3mLUVK4QMSvAmEL483e7gmjzy-au7nImuATXJ3a_N3Z7K20IRqx2Vuw2uNHDjhXrzJa_e8yWV9XVJLfIRq-2QiMt2DgbudZPz827eLe1eTjrX8w_Ep5lU7oTIK27L65zaR96E8wlETyrF820FJ5VEgP7UK27LsWl4-Zhj_zpa-REjVgJ6Xw00Lf_C-9p2Qcdr3Syl1xRqSJX1Rwz4Qdo3LfHnySPytr8Glr_wSJxmukDIp0J0-CcaQNCWLMVM-cPcpgMaiLV34Xq_lZ2VQP-F8CaC-5Wq_BfVvMGaiB2k-tD_5wycEg8Z0CUCuU5h4HxnCrE0T9znunb-ctk3-ojD4GCWLMVM-cYszQsrfL767lof75o865TXlkdGacj1KJjwLSya95FsIqJUg5u865TXYpP4NqFT1HCf..%2522%252C%2522lwrtk%2522%253A%2522AAIEaP%252B3bDhJ440320fiI19Kp2iC2%252FqlREn85O2L8pFvEx2kdgAtDnI%253D%2522%252C%2522epssw%2522%253A%252210*9hYss6Bx3gDEk7D6O-ysZIFN6tTe1_2H1ImYO6J1AO3asRX9O-XQtC3sOOb36sdFb-xeb-XQUNxQapsKPMqVljmUFfaSuCljXn1fXxfYaROOXR9zdrsaXRWUtassss3BC4rtZ9KllhaBPFFJ-ObPs7n8r8ffHdBo-Vhi_Tv5EDJY6a137EF8XuwN--OkQ4yv-Ot_uCMZY4h9M4sETAvbG6CsO-JZUCGsbRFabRrbORrtsLJZOROew9VR6tfb-OrpbWwUjyYvehGuFVW4VYHuxZPnmuEiXYcF8pMlQicDUCfWboCZUAQ1x6..%2522%257D; isg=BPDwKoTbbAwjMDBsyJlfMKtCwb5COdSDGr9bhOpC2ssepZVPkktKEuxT-bXFNYxb`,
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








