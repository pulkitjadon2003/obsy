function locomotive() {
            gsap.registerPlugin(ScrollTrigger);

            // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

            const locoScroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true
            });
            // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
            locoScroll.on("scroll", ScrollTrigger.update);

            // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
            ScrollTrigger.scrollerProxy("#main", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
            });

            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();


}

function loaderAnimation() {
    
var tl = gsap.timeline()

    tl.from("#line1-part1",{
        opacity:0,
    })

   
    tl.from(".line h1,.line h2",{
        y:150,
        stagger:0.3 ,
        // delay:.5,
        onStart:function(){
            var h5timer = document.querySelector("#line1-part1 h5")
            let grow = 0
            setInterval(()=>{
                if (grow<100) {
                    h5timer.innerHTML=grow++
                } else {
                    h5timer.innerHTML=grow
                }
            },25)       
        },
    })

    tl.from("#loader p",{
        opacity:0,
        duration:1,
    },'=-.5')

    tl.to("#loader .line h1",{
        delay:2.6,
        // duration:.3,
        opacity:0,
        stagger: {
        from: "random",
        ease: "power2.in",
        each:.18,
  }
    })

    tl.to("#loader p",{
        opacity:0,
        // duration:1,
    })

     

    tl.to("#loader .line",{
        delay:.3,
        // duration:.3,
        opacity:0,
        
    })
    tl.to("#loader",{
        duration:1.4,
        y:'-100%',
        ease:'expo.out',

    })

    tl.to("#loader",{
        display:"none",
        // delay:.1,
    })

    tl.from("nav",{
        opacity:0
    },"=-1.2")

    tl.from(" .hero ",{
    opacity:0,
    },'=-1')

    tl.from(".hero #move ",{
        y:120,
        stagger:0.2,
        duration:.8,
        delay:.1,   
        opacity:0,
        ease:'circ.out',
    },'=-1')

    tl.from(" #page2 ",{
    opacity:0,
    },'=-1')

}


function cursorAnimation() {
    
//   Shery.mouseFollower({
//     skew:true,
//     ease:"none",
//     duration:.1,

//   })

// Shery.makeMagnet("#nav-part2 h4");

    let cursor = document.querySelector(".cursor")




    
    var videoContainer = document.querySelector("#video-container")
    var videoCursor = document.querySelector("#video-cursor")
    var video = document.querySelector("#video-container video")

    if (!window.matchMedia("only screen and (max-width: 760px)").matches) {
        videoContainer.addEventListener("mouseenter",function(){

        gsap.to(cursor,{
                display:'none',
                duration:0
            },'=-1')

            
        videoContainer.addEventListener("mousemove",function(dets){
           
            gsap.to(videoCursor,{   
                left:dets.clientX - 400 ,
                top:dets.clientY - 230,
                duration:1,
            })
            

        })
    })
    

    videoContainer.addEventListener("mouseleave",function(){
        gsap.to(cursor,{
                display:'block',
                duration:0
            })

        gsap.to(videoCursor,{
            left : "70%",
            top: "-10%",
            duration:1.1
        })

    })

        
    }
    
    var flag = 0
    videoContainer.addEventListener("click",()=>{
        if (flag == 0) {
            video.play()
            video.style.opacity = 1
            flag = 1
            gsap.to(videoCursor,{
                scale:.5,
                duration:.5
            })
            videoCursor.innerHTML = `<i class="ri-pause-large-fill"></i>`
            if (window.matchMedia("only screen and (max-width: 760px)").matches){
                gsap.to(videoCursor,{
                    opacity:0
                })
            }
        }else{
            video.pause()
            video.style.opacity = 0
            flag = 0
             gsap.to(videoCursor,{
                scale:1,
                duration:.5
            })
            videoCursor.style.scale = 1
            videoCursor.innerHTML = `<i class="ri-play-large-fill"></i>`

            if (window.matchMedia("only screen and (max-width: 760px)").matches){
                gsap.to(videoCursor,{
                    opacity:1
                })
            }

        }
    })


      window.addEventListener("mousemove",function (dets) {
        // console.log(dets.offsetY , dets.y);
        
        gsap.to(cursor,{
            x:dets.x - 10 ,
            y:dets.y - 10,
            duration:0,
        })
    })


    let heroFlag = document.querySelector('#heroFlag')
    document.addEventListener('mousemove' , dets=>{
        // console.log(dets);
        
               gsap.to(heroFlag,{   
                left:dets.clientX + 'px',
                top:dets.clientY + 'px',
               })
            })

    document.querySelectorAll("#flagOn #move h1").forEach(elem=>{
        
        elem.addEventListener('mouseenter',()=>{
            gsap.to(heroFlag,{
                opacity:1,
                duration:.5,
            })
        })

        elem.addEventListener('mouseleave',()=>{
            gsap.to(heroFlag,{
                opacity:0,
                // duration:.2,
            })
        })
    })

    document.querySelector('#page1').addEventListener('mouseleave',()=>{
        gsap.to(heroFlag,{
            display:'none'
        })
    }
    )

    document.querySelector('#page1').addEventListener('mouseenter',()=>{
        gsap.to(heroFlag,{
            display:'block'
        })
    }
    )


    


    


}

function GooeyAnimation() {
    if(!window.matchMedia("only screen and (max-width: 760px)").matches){
        Shery.imageEffect(".image-div",{
        style:5,
        // debug:true,
        gooey:true,
        config: {"a":{"value":1.37,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.15,"range":[0,10]},"metaball":{"value":0.47,"range":[0,2]},"discard_threshold":{"value":0.79,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.6,"range":[0,2]},"noise_scale":{"value":7.63,"range":[0,100]}} 
    })
    }

    
}


function footerAnimation(){


    let footClutter1 = ""
    let footClutter2 = ""
    document.querySelector('#footer-text h1').textContent.split('').forEach(elem=>{
        footClutter1 += `<span>${elem}</span>`
        
    })

    document.querySelector('#footer-text h1').innerHTML = footClutter1

     document.querySelector('#footer-text h2').textContent.split('').forEach(elem=>{
        footClutter2 += `<span>${elem}</span>`
        
    })

    document.querySelector('#footer-text h2').innerHTML = footClutter2

    
    let footerText = document.querySelector("#footer-text")


    footerText.addEventListener('mouseenter',()=>{
        
        gsap.to('#footer-text h1 span',{
            opacity:0,
            stagger:.05,
            duration:.2
        })

        gsap.to('#footer-text h2 span',{
            opacity:1,
            stagger:.05,
            duration:.2
        })
        gsap.to('#footer-text svg',{
            x: 100,
            delay: .5,
           ease: "power1.out",
        })

    })

    footerText.addEventListener('mouseleave',()=>{
        
       gsap.to('#footer-text h1 span',{
            opacity:1,
            stagger:.05,
            duration:.2
        })

        gsap.to('#footer-text h2 span',{
            opacity:0,
            stagger:.05,
            duration:.2
        })

         gsap.to('#footer-text svg',{
            x: 0,
            delay:.6,
            ease: "power1.out",

        })

        

    })

   
}
function menuAnimation(){

    let menuBtn = document.querySelector('#menu-button')
    let rectAll = document.querySelectorAll("#menu-button svg rect")
    // console.log(rectAll);

    let menuToggle = false

        
 
    menuBtn.addEventListener('click',()=>{

        
        if (menuToggle == false) {
        
        gsap.to(rectAll[1],{
            x:5,
            duration:.3,
        });

        gsap.to(rectAll[3],{
            y:-5,
            duration:.3,
        });

        gsap.to(rectAll[5],{
            y:5,
            duration:.3,
        });

        gsap.to(rectAll[7],{
            x:-5,
            duration:.3,
        });

        gsap.fromTo('#menu-overlay',{
            top:'-100%',
            duration:.5,
        },{
            top:"0%",
            duration:.5,
            ease:'circ.out'
        })

        gsap.to('#nav-part1>p , #nav-part2',{
            y:-20,
            opacity:0,
            duration:.5,
        })

        gsap.to('#menu',{
            top:0,
            duration:.5,
            opacity:1,
        })

        gsap.fromTo('.heads h1',{
            y:100,
            opacity:0,
        },{
            y:0,
            opacity:1,
            ease:'circ.out',
            duration:.7,
            stagger:.1,
            delay:.7
        })

        gsap.fromTo('#menu-part2 .box ',{
            opacity:0,

        },{
            opacity:1,
            ease:'circ.out',
            duration:.5,
            stagger:.2,
            delay:.7
        })

        menuToggle = true
        } else {


        gsap.to(rectAll[1],{
            x:0,
            duration:.3,
        });

        gsap.to(rectAll[3],{
            y:0,
            duration:.3,
        });

        gsap.to(rectAll[5],{
            y:0,
            duration:.3,
        });

        gsap.to(rectAll[7],{
            x:0,
            duration:.3,
        });




         gsap.to('#menu',{
            top:'-40px',
            opacity:0,
            duration:.5,
        })
        
        gsap.to('#menu-overlay',{
            top:'120%',
            ease:'circ.out',
            duration:1,
        })

        gsap.to('#nav-part1>p , #nav-part2',{
            y:0,
            opacity:1,
            duration:.5,
        })

       
         gsap.to('#menu',{
            top:'100%',
            ease:'circ.out',
            duration:.5,
            // opacity:0,
            delay:.5
        })

           gsap.to('#menu-part2 .box ',{
            ease:'circ.out',
            duration:.3,
            opacity:0,
            delay:.5
        })

        
        menuToggle = false
        }
    })


    let menuClutter1 = ""

    document.querySelectorAll('.heads h1').forEach(h1=>{

    h1.textContent.split('').forEach(elem=>{
        menuClutter1 += `<span>${elem}</span>`
        
    })
    h1.innerHTML = menuClutter1
    h1.nextElementSibling.innerHTML = menuClutter1
    

    menuClutter1=''
    })



    
    let menutext = document.querySelectorAll(".heads")


    menutext.forEach(menu=>{
        
        menu.addEventListener('mouseenter',(elem)=>{
            // console.log(menu.childNodes);

            
            
            gsap.to(menu.querySelectorAll('.heads h1 span'),{
                opacity:0,
                stagger:.05,
                duration:.3,
            })
    
            gsap.to(menu.querySelectorAll('.heads h2 span'),{
                opacity:1,
                stagger:.05,
                duration:.3,
                delay:.2
            })
            
        
    })


    menu.addEventListener('mouseleave',(elem)=>{
            console.log(menu.childNodes);
            
            
            gsap.to(menu.querySelectorAll('.heads h1 span'),{
                opacity:1,
                stagger:.05,
                duration:.3,
                delay:.2
            })
    
            gsap.to(menu.querySelectorAll('.heads h2 span'),{
                opacity:0,
                stagger:.05,
                duration:.4,
                delay:.2
            })
            
        
    })
    
    })


}
function cursorEvents(){
    let cursor = document.querySelector(".cursor")  
            
        let circleOn = document.querySelectorAll('.circleOn')

        circleOn.forEach(circle=>{
            circle.addEventListener('mouseover',()=>{
                gsap.to(cursor,{
                    scale:1.3
                })
            })

            circle.addEventListener('mouseout',()=>{
                gsap.to(cursor,{
                    scale:1
                })
            })
        })



    const magnets = document.querySelectorAll(".magnet");
    const strength = .5     

    magnets.forEach(magnet => {
        magnet.addEventListener("mousemove", e => {
        const rect = magnet.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);

        gsap.to(magnet,{
            x : `${mx / strength}px`,
            y : `${my / strength}px)`
        })
      });

      magnet.addEventListener("mouseleave", () => {
        gsap.to(magnet,{
            x : 0,
            y : 0
        })
      });
    });
               
                
    
}


function ScrollingAnimation(){
   
    gsap.to('nav #nav-part1 p , nav #nav-part2, #scroll',{
        y:-40,
        opacity:0,
        scrollTrigger:{
            trigger:'#page1',
            scroller:'#main',
            // markers:'true',
            start:'top 10%',
            end: 'top -5%',
            scrub:1
        },
        

    })

    gsap.to('#video-cursor',{
        opacity:1,
        scrollTrigger:{
            trigger:'#video-cursor',
            scroller:'#main',
            // markers:'true',
            start:'top 75%',
            end: 'top -5%',
        }
    })
    
    let page3tl = gsap.timeline({
            scrollTrigger:{
                trigger:'#page3-content h1',
                scroller:'#main',
                // markers:'true',  
                start:'top 130%',
                end: 'top 120%',
            }
    })

    page3tl.from('#page3-content h1',{
        opacity:0,
        y:150,
        duration:.8,
    })

    page3tl.from('#page3 .underline',{
            transform:'scaleX(0)',
            duration:1,
            ease:Power4.out
            
    },'=-.6')


    gsap.utils.toArray('#page3 .projects').forEach(project=>{
            gsap.from(project.querySelectorAll('.image-title h4'),{
            marginTop:'100%',
            opacity:0,
            duration:.8,
            ease:Power4.out,
            scrollTrigger:{
                trigger:project,
                scroller:'#main',
                start:'top 100%',
                end: 'top 90%',
            }

            },'image1')


    gsap.from(project.querySelectorAll('.description p'),{
            y:15,
            opacity:0,
            duration:1.2,
            ease:Power4,
            delay:.2,
            stagger:.2,
            scrollTrigger:{
                trigger:project,
                scroller:'#main',
                start:'top 80%',
                end: 'top 70%',
            }
    },'image1')

    gsap.from(project.querySelectorAll('.image-underline'),{
            transform:'scaleX(0)',
            opacity:0,
            duration:1.5,
            ease:Power4,
            scrollTrigger:{
                trigger:project,
                scroller:'#main',

                start:'top 80%',
                end: 'top 70%',
            }
    },'image1')
    })


    gsap.utils.toArray('.page3-circle').forEach(circle=>{
         gsap.from(circle,{
            opacity:0,
            duration:1.2,
            ease:Power4.out,
            scrollTrigger:{
                trigger:circle,
                scroller:'#main',
                start:'top 90%',
                end: 'top 70%',
                // markers:true,
                scrub:2
            }

            },'image1')
    })

   
        



    let page4tl = gsap.timeline({
            scrollTrigger:{
                trigger:'#page4-content h1',
                scroller:'#main',
                // markers:'true',
                start:'top 140%',
                end: 'top 110%',
            }
    })

    page4tl.from('#page4-content h1',{
        opacity:0,
        y:150,
        duration:.8 ,
    })

    page4tl.from('#page4 .underline-top',{
            transform:'scaleX(0)',
            opacity:0,
            duration:.8,
            ease:'circ.out',
            
    },'=-1')


   
    page4tl.from('#page4-content .page4-description span p',{
            y:120,
            opacity:0,
            duration:.7,
            stagger:.1,
            ease:'circ.out'
            
    },'=-.5')


    page4tl.from('#page4-flex p , #page4-flex img',{
            opacity:0,
            duration:.8,
            stagger:.2,
            ease:'circ.out'
            
    },)


     page4tl.from('#page4 #award-showcase',{
            opacity:0,
            duration:.6,
            ease:'circ.out'
            
    },)

    page4tl.from('#page4 .underline-bottom',{
            transform:'scaleX(0)',
            duration:.8,
            ease:'circ.out'
            
    },)

     page4tl.from('#page4 h5',{
            opacity:0,
            duration:.5,
            ease:'circ.out'
            
    },)

    gsap.from('#page5',{
        opacity:0,
        duration:1,
        ease:'circ.out',
        scrollTrigger:{
            trigger:'#page5',
            scroller:'#main',
            // markers:true,
            start:'top 90%'
        }
    })
    
    let footertl = gsap.timeline({
        scrollTrigger:{
        scroller:'#main',
        trigger:'#footer-text',
        start:'top 80%',
        // markers:true,
        }

    })

    footertl.from('#footer-text',{
        opacity:0,
        duration:.8,
    })

    footertl.from('#footer .underline-top',{
        transform:'scaleX(0)',
        duration:.8,
        ease:'circ.out'

    })
    footertl.from('#footer-div',{
        opacity:0,
        duration:.5,
        ease:'circ.out'

    })

    footertl.from('#footer .underline-bottom',{
        transform:'scaleX(0)',
        duration:.8,
        ease:'circ.out'
    })

      footertl.from('#footer>p',{
        opacity:0,
        duration:.8,
        ease:'circ.out'
    })

  
   
   

}


loaderAnimation()   
cursorAnimation()
cursorEvents()
menuAnimation()
GooeyAnimation()
footerAnimation()
locomotive()    
ScrollingAnimation()

let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (Math.abs(window.innerWidth - lastWidth) > 100) {
    location.reload();
  }
  lastWidth = window.innerWidth;
});