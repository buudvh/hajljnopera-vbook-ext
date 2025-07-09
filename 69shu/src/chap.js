load('config.js');
load('libs.js');
function execute(url) {
    try {
        url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

        let response = fetch(url, {
            method: "GET",
            headers: {
                ":authority": "www.69shuba.com",
                ":method": "GET",
                ":path": url.replace(BASE_URL, ''),
                ":scheme": "https",
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br, zstd",
                "accept-language": "vi,en-US;q=0.9,en;q=0.8",
                "cookie": "zh_choose=s; _ga=GA1.1.1670355267.1737508777; _ga_04LTEL5PWY=deleted; g_session=cd9b76bbf229680369ad2165cf1e9fa2; history_val2=1743048475@661147c89e6c8ad02d998c33cc4bd6d2; cf_clearance=LLB0i07xAfFuSMmkrXwVdiry5OpUOG5Abnsx0akwPYo-1751957515-1.2.1.1-TfNVUtQuWWwEZwJSml8lHj5GGJd_4HEZPGAiMLeUwzsM3X2ljH.wl_I6DlO5IQu1lcZvI7Y3PcxKgTySHLWaNBVJWIZvPo.6tnN7sLFit65S0iDAUtsPtyZuFk3XqlLwPQuTGRoVNVjtlzZmgqJvdZS98bVN46zB6pOxztfffT6PQoHbL4H4GB6m.C7_lbA187sMXnmIPMvMmqlLYD852lW7SoXGqOO450o07Mi9qBk; shuba_userverfiy=1751957515@6d91103b4863dc58a11ec5778842868c; shuba=3298-5427-19931-2411; jieqiHistory=89520-40167690-%25u7B2C4%25u7AE0%2520%25u6218%25u6597-1752032507%7C89532-40178501-%25u7B2C1%25u7AE0%25201%25u53D8%25u6210%25u8611%25u83C7%25u7684%25u516C%25u7235%25u5343%25u91D1-1752030116%7C85437-39560256-%25u7B2C1%25u7AE0%2520%25u5929%25u65E0%25u7EDD%25u4EBA%25u4E4B%25u8DEF-1751955486; _ga_04LTEL5PWY=GS2.1.s1752030107$o45$g1$t1752032507$j56$l0$h0",
                "if-modified-since": "Sat, 03 May 2025 07:24:58 GMT",
                "if-none-match": "\"b02a257762a6215e1f6487f25d9d901c\"",
                "priority": "u=1, i",
                "referer": url,
                "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
                "sec-ch-ua-arch": "\"x86\"",
                "sec-ch-ua-bitness": "\"64\"",
                "sec-ch-ua-full-version": "\"138.0.7204.97\"",
                "sec-ch-ua-full-version-list": "\"Not)A;Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"138.0.7204.97\", \"Google Chrome\";v=\"138.0.7204.97\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-model": "\"\"",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-ch-ua-platform-version": "\"10.0.0\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
            },
            credentials: "include"
        });

        let doc;
        if (response.ok) {
            doc = response.html('gbk');
        } else if (response.status == 403) {
            var browser = Engine.newBrowser();
            doc = browser.launch(url, 4000);
        } else {
            return Response.success(`fetch ${url} failed: status ${response.status}`);
        }

        var htm = doc.select(".txtnav")
        htm.select(".contentadv").remove()
        htm.select(".bottom-ad").remove()
        htm.select(".txtinfo").remove()
        htm.select("#txtright").remove()
        htm.select("h1").remove()
        htm = htm.html()
        htm = cleanHtml(htm)
            .replace(/^第\d+章.*?<br>/, '') // Ex: '  第11745章 大结局，终<br>'
            .replace('(本章完)', '')
            ;

        return Response.success(htm);
    } catch (error) {
        return Response.success(`fetch ${url} failed: ${error.message}`);
    }
}