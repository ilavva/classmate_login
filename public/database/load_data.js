function load_json(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => {
            if (json["status"] == "OK") {
                return callback(json["message"]);
            }
            return callback(json);
        });
}
function create_html(json, template_name) {
    let html = "";
    console.log(json);
    if (template_name === 'course_with_topics_list') {

        for (let [i, v] of Object.entries(json)) {
            html += `<div class="info_course_card"><div>`;
            const course_name = v["name"];
            html += "<h2>";
            html += course_name;
            html += "</h2> ";

            console.log(v["topics"], v["topics"].length);
            for (let [j, t] of Object.entries(v["topics"])) {
                html += `<p>${t}<p>`;
            }

            html += "";
            html += `</div></div>`;
        }

    }

    return html;
}
function loadData() {
    const listLoadData = document.querySelectorAll(".load_data");
    if (listLoadData.length > 0) {
        for (let index = 0; index < listLoadData.length; index++) {
            const elemLoadData = listLoadData[index];
            //<ol class="question load_data" data-src="northwindsqlexer1.json" show-solutions="no">
            const data_src_filename = elemLoadData.getAttribute("data-src");
            const data_template = elemLoadData.getAttribute("data-template");
            load_json(data_src_filename, (json) => {
                elemLoadData.innerHTML = create_html(json, data_template);
            });
        }
    }
}

loadData();