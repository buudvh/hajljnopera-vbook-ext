function execute() {
    var fxlist = [
        {
            title: "Đề cử",
            input: "https://qidian-vp.com/xep-hang/de-cu",
            script: "gen.js"
        }, {
            title: "Top lượt đọc",
            input: "https://qidian-vp.com/xep-hang/luot-doc",
            script: "gen.js"
        }, {
            title: "Vừa lên chương",
            input: "https://qidian-vp.com/danh-sach/truyen-moi",
            script: "gen.js"
        },{
            title: "Hoàn thành",
            input: "https://qidian-vp.com/danh-sach/truyen-hoan-thanh",
            script: "gen.js"
        },{
            title: "Đồng nhân",
            input: "https://qidian-vp.com/the-loai/dong-nhan",
            script: "gen.js"
        },{
            title: "Hoàn thành",
            input: "https://qidian-vp.com/danh-sach/truyen-hoan-thanh",
            script: "gen.js"
        }
    ];

    return Response.success(fxlist);
}