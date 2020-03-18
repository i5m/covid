const starter = '<!DOCTYPE html><html><head>';
const meta0 = '<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">';
const title = '<title>COVID-19</title>';
const favicon = '<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"><link rel="icon" href="img/favicon.ico" type="image/x-icon">';
const style_tag = '<link rel="stylesheet" href="main.css">';
const head_body = '</head><body>';
const nav_start = '<nav id="navbar">';
const nav_open_btn_icon = '<svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>';
const nav_open_btn = '<a href="javascript:void(0)" onclick="openNav()" id="nav-open-btn">' + nav_open_btn_icon + '</a>';
const nav_header = '<span id="nav-title">COVID-19</span>';
const nav_close_btn_icon = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
const nav_close_btn = '<a href="javascript:void(0)" onclick="closeNav()" class="nav-item" id="nav-close-btn">' + nav_close_btn_icon + '<span> Close</span></a>';
const nav_opts_title = ['Home', 'Map', 'Countries', 'Buy', 'Measures', 'Internet'];
var nav_opts = '<div id="sidenav">';
for(var i in nav_opts_title) {
    nav_opts += '<a href="#" class="nav-item">' + nav_opts_title[i] + '</a>';
}
nav_opts += nav_close_btn + '</div>';
const nav_end = '</nav>';
const nav = nav_start + nav_open_btn + nav_header + nav_opts + nav_end;
document.write(starter + meta0 + title + favicon + style_tag + head_body + nav);

var nav_opts_box = document.getElementById("sidenav");

function openNav() {
    nav_opts_box.style.width = "250px";
    nav_opts_box.style.padding = "20px";
}
function closeNav() {
    nav_opts_box.style.width = "0";
    nav_opts_box.style.padding = "0";
}
window.onclick = function(event) {
    if (event.target == nav_opts_box) {
        nav_opts_box.style.width = "0";
        nav_opts_box.style.padding = "0";
    }
}