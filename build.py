import os

OUT = os.path.dirname(os.path.abspath(__file__))

PAGES = [
    # key,          filename,          nav label
    ("home",        "index.html",      None),
    ("now",         "now.html",        "Now"),
    ("writing",     "writing.html",    "Writing"),
    ("projects",    "projects.html",   "Projects"),
    ("inspirations","inspirations.html","Inspirations"),
    ("contact",     "contact.html",    "Contact"),
]

NAV_ITEMS = [k for k, f, n in PAGES if n]  # excludes home

ICONS = {
    "Email": '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
    "Calendly": '<path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>',
    "LinkedIn": '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>',
    "GitHub": '<path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>',
    "Substack": '<path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>',
    "Curius": '<path d="M18 6 A8 8 0 1 0 18 18" stroke="var(--bright)" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
}
ICON_ORDER = ["Email", "Calendly", "LinkedIn", "GitHub", "Substack", "Curius"]
ICON_HREFS = {
    "Calendly": "https://calendly.com/elianadu",
    "LinkedIn": "https://www.linkedin.com/in/elianadu/",
    "GitHub": "https://github.com/elianadu",
    "Substack": "https://elianadu.substack.com/",
    "Curius": "https://curius.app/eliana-du",
}

DEFAULT_BODY = {
    "home": """    <p>I'm currently a sophomore at Princeton studying CS. I want to do the most good I can, which means that right now, I'm thinking a lot about AI safety. I think powerful AI has the potential to have both enormous upsides and downsides, and it's up to us to shape which way the future swings. On campus, I help organize <a class="il" href="https://www.princetonalignment.org/" target="_blank" rel="noopener">Princeton AI Alignment</a>. I'm excited to put in ridiculous amounts of effort to keep the club growing next year.</p>
    <p>Other things I like doing include reading, writing, and talking to people. I recently revived my <a class="il" href="https://elianadu.substack.com/" target="_blank" rel="noopener">Substack</a> as part of a thirty-day challenge and would love for you to check out my work! I also enjoy being outdoors, especially as a leader for my school's Outdoor Action orientation program.</p>
    <p>I believe in being generous with one's time. I have been helped in so many different ways by other people's generosity. So, if there's any way I can help you, please reach out.</p>""",
    "now": """    <p>Reading through the alignment literature I keep bookmarking and never opening. Building out this site so that updating it stops being a chore.</p>
    <p>Off the screen: trail running before it gets dark too early, and relearning how to write a first draft without editing every sentence twice.</p>""",
    "writing": """    <p>Most of my writing lives on <a class="il" href="https://elianadu.substack.com/" target="_blank" rel="noopener">Substack</a>. Selected pieces collect here.</p>
    <p><strong>On doing the most good</strong><br />What I actually mean when I say I want my work to matter.</p>
    <p><strong>Notes on running a club</strong><br />Everything I got wrong in my first semester organizing.</p>""",
    "projects": """    <p>Things I'm building, on campus and off.</p>
    <p><strong>Princeton AI Alignment</strong><br />Helping the club grow.</p>
    <p><strong>Outdoor Action</strong><br />Orientation program leader.</p>""",
    "inspirations": """    <p>Media that changed how I think — books, essays, films, people.</p>
    <ul><li>A book that rearranged something</li><li>An essay I keep resending to people</li><li>A film I think about at odd hours</li></ul>
    <p>This page will fill up over time.</p>""",
    "contact": """    <p>The best way to reach me is by email — click the Email button to copy my address. You're also welcome to <a class="il" href="https://calendly.com/elianadu" target="_blank" rel="noopener">book a meeting</a>.</p>
    <p>(And if I don't respond, follow up!)</p>
    <p>I want to be the best version of myself, so feel free to leave me some <a class="il" href="https://forms.gle/KY2NNEeaDHK8buj88" target="_blank" rel="noopener">anonymous feedback</a>. Thanks for helping me be better.</p>""",
}

TITLES = {
    "home": "Welcome!",
    "now": "Now",
    "writing": "Writing",
    "projects": "Projects",
    "inspirations": "Inspirations",
    "contact": "Contact",
}


def nav_html(current):
    label_by_key = {k: n for k, f, n in PAGES}
    file_by_key = {k: f for k, f, n in PAGES}
    items = []
    for key in NAV_ITEMS:
        cur = ' aria-current="page"' if key == current else ""
        items.append(
            '        <li><a href="%s"%s><svg class="nsf"></svg>%s</a></li>'
            % (file_by_key[key], cur, label_by_key[key])
        )
    return "\n".join(items)


def rail_html():
    links = []
    for name in ICON_ORDER:
        icon = '<span class="chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">%s</svg></span>' % ICONS[name]
        if name == "Email":
            links.append('        <li><button type="button" id="emailBtn">%s%s</button></li>' % (icon, name))
        else:
            links.append(
                '        <li><a href="%s" target="_blank" rel="noopener">%s%s</a></li>'
                % (ICON_HREFS[name], icon, name)
            )
    return "\n".join(links)


def page(key, filename, current_label):
    title_tag = "Eliana Du" if key == "home" else "%s — Eliana Du" % TITLES[key]
    mark_href = "index.html"

    html = """<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="author" content="Eliana Du" />
<meta name="description" content="The personal website of Eliana Du." />
<link rel="icon" href="images/favicon_sunflower.png" />
<title>%s</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=EB+Garamond:ital,wght@0,400..700;1,400..600&display=swap" rel="stylesheet" />
<link href="styles/site.css" rel="stylesheet" />
</head>
<body>
  <div class="page">

    <div class="navcol">
      <div class="markline">
        <a href="%s" class="mark">Eliana Du</a>
      </div>
      <nav aria-label="Sections">
        <ul>
%s
        </ul>
      </nav>
    </div>

    <main class="main">
      <h1>%s</h1>
      <!-- NOTION:START -->
%s
      <!-- NOTION:END -->
      <p class="updated">Synced from Notion</p>
    </main>

    <aside class="rail">
      <div class="frame">
        <div class="inner">
          <img src="images/me_by_nassau_hall.jpg" alt="Eliana Du" />
        </div>
      </div>
      <p class="cap">Here's a photo of me, so you know this is the Eliana Du you were trying to find!</p>
      <ul class="links">
%s
      </ul>
    </aside>

    <div id="toast">Copied email</div>
  </div>

  <script src="scripts/site.js" defer></script>
</body>
</html>
""" % (title_tag, mark_href, nav_html(key), TITLES[key], DEFAULT_BODY[key], rail_html())

    with open(os.path.join(OUT, filename), "w") as f:
        f.write(html)
    print("wrote", filename)


for key, filename, label in PAGES:
    page(key, filename, label)
