const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        // delay: 1.5
    })
        .to(".boundingelem",{
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -0.5,
            // stagger: 0.1
        })
    
}
firstPageAnim();
//jab mouse move ho toh hum log skew kar paye aur maximum skew and minimum skew define kar paye, 
//jab mouse move ho toh chapta ki value badhe, aur jab mouse chalna band ho jaye to chapta hata lo
function circleChaptaakaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientX - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
    });
}
circleChaptaakaro();
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleMouseFollower();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("video"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot*0.2)
        });
    });
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("video"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });
});
