function loaderAnimation() {
    
var tl = gsap.timeline()

tl.from(".line h1,.line h2",{
    y:150,
    stagger:0.2 ,
    delay:.5,
    onStart:function(){
        var h5timer = document.querySelector("#line1-part1 h5")
        let grow = 0
        setInterval(()=>{
            if (grow<100) {
                h5timer.innerHTML=grow++
            } else {
                h5timer.innerHTML=grow
            }
        },35)       
    }
})


tl.to("#loader",{
    delay:3,
    duration:.2,
    opacity:0,
})

tl.from("#page1",{
    y:1000,
    opacity:0,
    delay:.2,
    duration:.5,
    ease:Power4,

})
tl.to("#loader",{
    display:"none"
})
tl.from("nav",{
    opacity:0
})
tl.from(".hero #move ",{
    y:120,
    stagger:0.2,
    ease:Power4,
    duration:.4,
})
}


function cursorAnimation() {
    
    document.addEventListener("mousemove",function (dets) {
        gsap.to("#crsr",{
            x:dets.x,
            y:dets.y,
            // ease:"none"  ,
            duration:0
        })
    })
    
    Shery.makeMagnet("#nav-part2 h4");
}

loaderAnimation()
cursorAnimation()