var modal = document.getElementById("modal-box");
var modal_content = document.getElementById("modal-content");
var modal_close_btn = document.getElementById("modal-close-btn");

var imp_data0;

function open_modoal_func() { modal.style.display = "block"; }

modal_close_btn.onclick = function() {
    modal.style.display = "none";
    modal_content.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
}
window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }

function accordian_func(cl) {
    var btns = document.getElementsByClassName(cl);
    for (var j = 0; j < btns.length; j++) {
        btns[j].addEventListener("click", function() {
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

function load_data_func() {
    var xhttp_imp0 = new XMLHttpRequest();
    var country_page = 'https://corona.lmao.ninja/countries';   
    xhttp_imp0.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            imp_data0 = JSON.parse(this.responseText);
        }
    };
    xhttp_imp0.open("GET", country_page, true);
    xhttp_imp0.send();
}

function map_func() {
    var bubble_map = new Datamap({
        element: document.getElementById("bubble-map"),
        geographyConfig: {
            popupOnHover: false,
            highlightOnHover: false
        },
        fills: {
            defaultFill: 'var(--main-bg)',
            c: '#FF0000'
        }
    });
    bubble_map.bubbles([
        {
            name: 'Not a bomb, but centered on Brazil',
            radius: 23,
            centered: 'BRA',
            country: 'USA',
            yeild: 0,
            fillKey: 'c',
            date: '1954-03-01'
        },
        {
            name: 'Not a bomb',
            radius: 15,
            yeild: 0,
            country: 'USA',
            centered: 'USA',
            date: '1986-06-05',
            significance: 'Centered on US',
            fillKey: 'c'
        },
        {
            name: 'Castle Bravo',
            radius: 25,
            yeild: 15000,
            country: 'USA',
            significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
            fillKey: 'c',
            date: '1954-03-01',
            latitude: 11.415,
            longitude: 165.1619
        }, {
            name: 'Tsar Bomba',
            radius: 70,
            yeild: 50000,
            country: 'USSR',
            fillKey: 'c',
            significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
            date: '1961-10-31',
            latitude: 73.482,
            longitude: 54.5854
        }
    ], {
        popupTemplate: function (geo, data) {
            return '<div class="p-8 br-10 hoverinfo">Country:' + data.country + '<br/>Total cases: ' + data.total_cases;
        }
    });
}

function data_overview_func() {
    var xhttp_overview = new XMLHttpRequest();
    var overview_page = 'https://corona.lmao.ninja/all/';
    xhttp_overview.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jf = JSON.parse(this.responseText);
            var total_cases_num = jf["cases"];
            var deaths_cases_num = jf["deaths"];
            var recovered_cases_num = jf["recovered"];
            var active_cases_num = total_cases_num - deaths_cases_num - recovered_cases_num;
            document.getElementById("line-active").style.width = 250 * active_cases_num / total_cases_num;
            document.getElementById("line-recovered").style.width = 250 * recovered_cases_num / total_cases_num;
            document.getElementById("line-fatal").style.width = 250 * deaths_cases_num / total_cases_num;
            document.getElementById("total-cases-num").innerHTML = total_cases_num;
            document.getElementById("active-cases-num").innerHTML = active_cases_num;
            document.getElementById("recovered-cases-num").innerHTML = recovered_cases_num;
            document.getElementById("deaths-cases-num").innerHTML = deaths_cases_num;
        }
    };
    xhttp_overview.open("GET", overview_page, true);
    xhttp_overview.send();
}

function country_func() {
    open_modoal_func();
    var plus_icon = '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'
    var country_str = '<h1 class="modal-heading p-4 mb-12 underlined">Countries Stats</h1>';
    var cntry = total = '';
    var list_start = list_name = list_det = ball_today = ball_deaths = ball_today_deaths = ball_recovered = list_end = '';
    for(var i in imp_data0) {
        cntry = imp_data0[i]["country"];
        total = imp_data0[i]["cases"];
        list_start = '<div class="sub-sec sec-opts br-10 sec-boundary country-item">';
        list_name = '<span class="country-title"><h4><span>' + cntry + '<span> &nbsp; ' + plus_icon + '</h4><h4>' + total + ' Cases</h4></span>';
        list_det = '<div class="country-detail p-12">';
        ball_today = '<div><br/><div class="ball-round-sm color-ball mr-8 primary-color-bg"></div> Cases Today: &nbsp; <b>' + imp_data0[i]["todayCases"] + '</b></div>';
        ball_deaths = '<div><br/><div class="ball-round-sm color-ball mr-8 danger-color-bg"></div> Total Deaths: &nbsp; <b>' + imp_data0[i]["deaths"] + '</b></div>';
        ball_today_deaths= '<div><br/><div class="ball-round-sm color-ball mr-8 warning-color-bg"></div> Deaths Today: &nbsp; <b>' + imp_data0[i]["todayDeaths"] + '</b></div>';
        ball_recovered = '<div><br/><div class="ball-round-sm color-ball mr-8 success-color-bg"></div> Recovered: &nbsp; <b>' + imp_data0[i]["recovered"] + '</b></div>';
        list_end = '</div></div>';
        country_str += list_start + list_name + list_det + ball_today + ball_deaths + ball_today_deaths + ball_recovered + list_end;
    }
    modal_content.innerHTML = country_str;
    setTimeout(accordian_func("country-title"), 2000);
}

function chart_func() {
    open_modoal_func();

}

function who_func() {
    open_modoal_func();

}

function qa_func() {
    var xhttp_qa = new XMLHttpRequest();
    open_modoal_func();
    xhttp_qa.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jf = JSON.parse(this.responseText);
            var qa_str = '<div><h1 class="modal-heading p-4 mb-12 underlined">Questions & Answers</h1>';
            for(var i in jf) {
                q = '<h4 class="p-8 m-8 ques"><span class="mr-12">' + i + '</span><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="6 9 12 15 18 9"></polyline></svg></h4>';
                a = '<p class="p-12 sec-bg ans br-10">' + jf[i] + '</p>';
                qa_str += q + a;
            }
            qa_str += '</div>';
            modal_content.innerHTML = qa_str;
            setTimeout(accordian_func("ques"), 2000);
        }
    };
    xhttp_qa.open("GET", "data/qa.json", true);
    xhttp_qa.send();
}

function news_func() {
    var xhttp_news = new XMLHttpRequest();
    open_modoal_func();
    var k = '31be5c56b8135e47b2481357df415fg8';
    var ko = '';    
    for (var i in k) {
        ko += String.fromCharCode(k.charCodeAt(i) - 1)
    }
    xhttp_news.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jf = JSON.parse(this.responseText);
            var news_start = news_img = news_text = news_title = news_des = news_end = '';
            var s_name = n_title = des = datePub = urlNews = '';
            var article_str = '<div><h1 class="modal-heading p-4 mb-12 underlined">Latest News</h1>';
            for(var i in jf["articles"]) {
                img_src = jf["articles"][i]["urlToImage"];
                if (img_src) {
                    urlNews = jf["articles"][i]["url"];
                    s_name = jf["articles"][i]["source"]["name"];
                    n_title = jf["articles"][i]["title"].substring(0, 20);
                    des = jf["articles"][i]["description"].substring(0, 75);
                    datePub = jf["articles"][i]["publishedAt"].substring(0, 10);
                    news_start = '<a href="' + urlNews + '"><div class="news-card m-8 p-12 br-10">';
                    news_img = '<img class="news-img br-10 mr-12" src="' + img_src + '">';
                    news_text = '<div class="news-text">';
                    news_s_name = '<p class="primary-color">' + s_name + '</p>';
                    news_title = '<h3>' + n_title + '...</h3>';
                    news_des = '<p class="sec-color">' + des + '...</p>';
                    news_end = '</div></div></a>';
                    article_str += news_start + news_img + news_text + news_s_name + news_title + news_des + news_end;
                }
            }
            modal_content.innerHTML = article_str;
        }
    };
    xhttp_news.open("GET", "http://newsapi.org/v2/top-headlines?country=in&q=corona&apiKey="+ko, true);
    xhttp_news.send();
}

data_overview_func();
load_data_func();
map_func();