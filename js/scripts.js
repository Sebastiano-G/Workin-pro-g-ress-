document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("scroll", function(event) { 
        const animatedNav = document.getElementById("navbar");
        const animatedCov = document.getElementsByClassName("cov");
        const windowOffsetTop = window.innerHeight - 60;
        if (window.scrollY >= windowOffsetTop) {
            addClass(animatedNav, "navBg");
        }
        else {
            if (animatedNav.hasAttribute('class')) {
                animatedNav.classList.remove("navBg");
            }
        }
        const a = animatedCov[0];
        const b = animatedCov[1];
        if ((window.innerHeight + window.scrollY) >= a.offsetTop) {
            addClass(a, "slider1");
        }
        if ((window.innerHeight + window.scrollY) >= b.offsetTop) {
            addClass(b, "slider2");
        }
    });
});

function addClass(element, className) {
    const arrayClasses = element.className.split(" ");
    if (arrayClasses.indexOf(className) === -1) {
        element.className += " " + className;
    }
}




$(document).ready(function(){
    $("#start").click(function() {
        $('html, body').animate({
            scrollTop: $("#subHero").offset().top
        }, 800);
    });
});


/* textShown */ 

function getList(entry) {
    switch (entry) {
        case 'poem1':
            return (["Death", "Family", "Music", "Nature", "Salvation", "Sickness"]);
            break;
        case 'poem2':
            return (["Eternal Sleep", "Secret", "Suffering", "Nature", "Salvation", "Memory", "Writing", "Religion"]);
            break;
        case 'poem3':
            return (["Family", "Justice", "Darkness vs Light", "Knowledge"]);
            break;
        case 'text1':
            return (["Death", "Family", "Music", "Nature", "Salvation", "Sickness"]);
            break;
        case 'text2':
            return (["Death", "Writing", "Darkness vs Light", "Nature", "Salvation"]);
            break;
        case 'text3':
            return ([ "Family", "Sight", "Darkness vs Light", "Love", "Salvation", "Church", "Hate", "Justice"]);
            break;
    }
}

$(document).ready(function(){
    $(".menu-item a").click(function(){
        $("#topics").addClass("topicsEntry");
    });
    $("#songList .right-pointer").click(function(){
        $("#text1").removeClass("reverseMarginLeft");
        $("#text1").addClass("marginLeft");
        $("#songList .left-pointer").fadeIn(500);
    });
    $("#songList .left-pointer").click(function(){
        $("#text1").addClass("reverseMarginLeft");
        $("#songList .left-pointer").hide();
    });
    $("#poemList .right-pointer").click(function(){
        $("#poem1").removeClass("reverseMarginLeft");
        $("#poem1").addClass("marginLeft");
        $("#poemList .left-pointer").fadeIn(500);
    });
    $("#poemList .left-pointer").click(function(){
        $("#poem1").addClass("reverseMarginLeft");
        $("#poemList .left-pointer").hide();
    });
    $("#songList a").click(function(){
        $("#select").hide();
        var name = $(this).attr('id');
        var url = "https://sebastiano-g.github.io/Workin-pro-g-ress-/texts/" + name + ".html";
        $("#songText").load(url);
        $("#songText").hide();
        $("#songText").fadeIn(800);
        $("#songText").addClass("activated");
        $("#songList .active").removeClass("active");
        $(this).addClass('active');
        var newString = generatorS(getList(name));
        $("#topics").html(newString) ;
    });
    $("#poemList a").click(function(){
        $("#select").hide();
        var name = $(this).attr('id');
        var url = "https://sebastiano-g.github.io/Workin-pro-g-ress-/texts/" + name + ".html";
        $("#poemText").load(url);
        $("#poemText").hide();
        $("#poemText").fadeIn(800);
        $("#poemList .activeSecond").removeClass("activeSecond");
        $(this).addClass('activeSecond');
        var newString = generatorP(getList(name));
        $("#topics").html(newString) ;
    });
    $(".menu-item a").click(function(){
        $("#topics").addClass("topicsEntry");
    });
});

function topss(el) {
    const spans = document.getElementsByTagName('span');
    for (let s = 0; s < spans.length; s++) {
        if (spans[s].classList.length == 2) {
            spans[s].classList.remove(spans[s].classList[1]);
        }
    } 
    if (el.innerText == "Darkness vs Light") {
        var x = "DarknessvsLight";
    }
    else if (el.innerText == "Eternal Sleep") {
        var x = "Eternalsleep";
    }
    else {
        var x = el.innerText;
    }
    var newX = x.toLowerCase();
    var className = "highlight" + newX;
    const classes = document.getElementsByClassName(newX);
    var a = 1
    for (let i = 0; i < classes.length; i++) {
        if (i < a) {
            classes[i].scrollIntoView({ behavior: 'smooth', block: "center" }, true);
        }
        classes[i].classList.add(className);
    }
}


function generatorP(l) {
    var start = "<a onclick='topss(this)'>";
    var end = "</a>";
    var oldList = activeList('poem');
    var newString = "";
    var final = removeDuplicates((oldList.concat(l)).sort());
    for (let i = 0; i < final.length; i++) {
        newString = newString + start + final[i] + end;
    }
    return newString;   
}

function generatorS(l) {
    var start = "<a onclick='topss(this)'>";
    var end = "</a>";
    var oldList = activeList('song');
    console.log(oldList);
    var newString = "";
    var final = removeDuplicates((oldList.concat(l)).sort());
    for (let i = 0; i < final.length; i++) {
        newString = newString + start + final[i] + end;
    }
    return newString;   
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function activeList(genre) {
    if (genre == 'poem') {
        var el = document.getElementsByClassName('active');
    }
    else if (genre == 'song') {
        var el = document.getElementsByClassName('activeSecond');
    }
    if (el.length > 0) {
        var elId = el[0].getAttribute("id");
        var result = getList(elId);
    }
    else {
        var result = [];
    }
    return result
}

