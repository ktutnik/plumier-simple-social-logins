// function to open a dialog window at the center of the screen
function modal(url) {
    const h = 400; const w = 500;
    const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
    const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
    const option = [
        ["toolbar", "no"], ["location", "no"], ["directories", "no"], ["status", "no"],
        ["menubar", "no"], ["scrollbars", "no"], ["resizable", "no"], ["copyhistory", "no"],
        ["width", w], ["height", h], ["top", y], ["left", x]
    ]
    window.open(url, undefined, option.map(([a, b]) => `${a}=${b}`).join(", "));
}