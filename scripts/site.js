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

  var emailBtn = document.getElementById("emailBtn");
  var emailTip = document.getElementById("emailTooltip");
  var emailTipwrap = emailBtn && emailBtn.closest(".tipwrap");
  if (emailBtn && emailTip && emailTipwrap) {
    var resetTip;

    function placeTip(e) {
      var rect = emailTipwrap.getBoundingClientRect();
      emailTip.style.left = (e.clientX - rect.left + 14) + "px";
      emailTip.style.top = (e.clientY - rect.top - 10) + "px";
    }
    emailBtn.addEventListener("mouseenter", placeTip);
    emailBtn.addEventListener("mousemove", placeTip);

    emailBtn.addEventListener("mouseleave", function () {
      clearTimeout(resetTip);
      emailTipwrap.classList.remove("tip-hidden");
      emailTip.textContent = "Click to copy";
    });

    emailBtn.addEventListener("click", function () {
      try { navigator.clipboard.writeText(EMAIL); }
      catch (e) {
        var t = document.createElement("textarea");
        t.value = EMAIL;
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }

      emailTip.textContent = "Copied!";
      emailTipwrap.classList.remove("tip-hidden");
      // Clicking leaves the button focused, which would keep the tooltip open
      // (via :focus-within) even after the mouse leaves — blur it so hover
      // alone controls visibility, same as the other icons.
      emailBtn.blur();
      clearTimeout(resetTip);
      resetTip = setTimeout(function () {
        emailTipwrap.classList.add("tip-hidden");
      }, 1200);
    });
  }
})();
