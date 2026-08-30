// Draws the sunflower marker into every .nsf placeholder, and wires the
// "Email" link to copy the address instead of opening a mail client blindly.

(function () {
  var EMAIL = "elianadu@princeton.edu";

  function sfPaths() {
    var p = "";
    for (var r = 0; r < 360; r += 30) {
      p += '<ellipse rx="4.5" ry="13" cy="-16" fill="var(--petal)"' +
           (r ? ' transform="rotate(' + r + ')"' : '') + "/>";
    }
    return '<g transform="translate(30,30)">' + p + '<circle r="11" fill="var(--core)"/></g>';
  }

  document.querySelectorAll(".nsf").forEach(function (el) {
    el.innerHTML = sfPaths();
    el.setAttribute("viewBox", "0 0 60 60");
  });

  var toast = document.getElementById("toast");
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove("show"); }, 1600);
  }

  var emailBtn = document.getElementById("emailBtn");
  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      var copy = function () {
        try { navigator.clipboard.writeText(EMAIL); }
        catch (e) {
          var t = document.createElement("textarea");
          t.value = EMAIL;
          document.body.appendChild(t);
          t.select();
          document.execCommand("copy");
          document.body.removeChild(t);
        }
      };
      copy();
      showToast("Copied email");
    });
  }
})();
