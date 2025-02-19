function execute() {
    return Response.success([
        { title: "Trang chủ", input: "/ajax_topindex/{0}", script: "gen.js" },
    ]);
}