var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.session.setMode("ace/mode/json");
$(".ediv").hide()
$('#type').change(function() {
    const val = $(this).val()
    if (val == "get") {
        $(".ediv").hide()
    } else {
        $(".ediv").show()

    }
})

function onReady() {
    var dat = {
        "name": "mode"
    }
    dat["value"] = "no-cors"
    headers.push(dat)

    const newHit = document.createElement("div")
    newHit.id = "hit"
    newHit.innerHTML = `
<p id="hitpt"><span id="hitp">${"mode"}</span> - <span id="hitp2">${"no-cors"}</span></p>
  <button id="h${"mode"}" class="remove"><span class="material-symbols-outlined">
    delete_forever
  </span>
  </button>
  `
    const val = "mode"
    const value = "no-cors"


    const head = $(".headers")
    head.append(newHit)
    $("#h" + String(val)).click(function() {
        $(this).parent().hide()
        headers.splice(headers.indexOf([val, value]), 1)
    })
}
headers=[]
onReady();
params = []
$("#error").hide()
$("#addh").click(function() {
    if ($("#hn").val() != "" && $("#hv").val() != "" && (!$("#" + $("#hn").val()).length)) {
        var dat = {
            "name": $("#hn").val()
        }
        dat["value"] = $("#hv").val()
        headers.push(dat)

        const newHit = document.createElement("div")
        newHit.id = "hit"
        newHit.innerHTML = `
    <p id="hitpt"><span id="hitp">${$("#hn").val()}</span> - <span id="hitp2">${$("#hv").val()}</span></p>
      <button id="h${$("#hn").val()}" class="remove"><span class="material-symbols-outlined">
        delete_forever
      </span>
      </button>
      `
        const val = $("#hn").val()
        const value = $("#hv").val()


        const head = $(".headers")
        head.append(newHit)
        $("#h" + String(val)).click(function() {
            $(this).parent().hide()
            headers.splice(headers.indexOf([val, value]), 1)
        })

        $("#hn").val("")
        $("#hv").val("")
    }
})
$("#addp").click(function() {
    if ($("#pn").val() != "" && $("#pv").val() != "" && (!$("#" + $("#pn").val()).length)) {
        let dat = {
            "name": $("#pn").val()
        }
        dat["value"] = $("#pv").val()
        alert(JSON.stringify(dat))
        params.push(dat)
        const newHit = document.createElement("div")
        newHit.id = "hit"
        newHit.innerHTML = `
      <p id="hitpt"><span id="hitp">${$("#pn").val()}</span> - <span id="hitp2">${$("#pv").val()}</span></p>
        <button id="p${$("#pn").val()}" class="remove"><span class="material-symbols-outlined">
          delete_forever
        </span>
        </button>
        `
        const val = $("#pn").val()
        const value = $("#pv").val()


        const head = $(".params")
        head.append(newHit)
        $("#p" + String(val)).click(function() {
            $(this).parent().hide()
            headers.splice(headers.indexOf([val, value]), 1)
        })

        $("#pn").val("")
        $("#pv").val("")
    }
})

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
$("#send").click(function() {
    const type = $("#type").val()
    const url = $("#url").val()
    if (isValidHttpUrl(url)) {
      $("#send").prop("disabled", true)
        $("#error").hide()
        var request = {
            "method": type.toUpperCase()
        }
        if (type == "post") {
            request["body"] = JSON.stringify(JSON.parse(editor.getSession().getValue()))

        }
        request["headers"] = {}
        for (var item of headers) {
            request["headers"][item["name"]] = item["value"]
        }

        var pa = {

        }
        for (var it of params) {
            pa[it["name"]] = it["value"]
        }

        const searchParams = new URLSearchParams(pa)
        const ur = new URL(url)
        console.log(String(searchParams))
        console.log(request)
        fetch(ur.href + "?" + searchParams, request)
            .then((data) => data.text())
          .then((text) => {
            $("#send").prop("disabled", false)

            $("#response").text(text)
            $('html, body').animate({
                scrollTop: $("#response").offset().top
            }, 1000);
          })
            .catch((e) => {
              $("#send").prop("disabled", false)

                $("#error").show()
              $("#error").text(e)
            })

    } else {
        $("#error").text("THe URL is invalid")
        $("#error").show()
    }
})