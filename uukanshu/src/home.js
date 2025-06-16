function execute() {
    var fxlist = [
        {
            title: "完本小說",
            input: "https://uukanshu.cc/quanben/{0}.html",
            script: "gen.js"
        },
        {
            title: "玄幻奇幻",
            input: "https://uukanshu.cc/class_1_{0}.html",
            script: "gen.js"
        },
        {
            title: "武俠仙俠",
            input: "https://uukanshu.cc/class_2_{0}.html",
            script: "gen.js"
        },
        {
            title: "武俠仙俠",
            input: "https://uukanshu.cc/class_3_{0}.html",
            script: "gen.js"
        }
    ];

    return Response.success(fxlist);
}