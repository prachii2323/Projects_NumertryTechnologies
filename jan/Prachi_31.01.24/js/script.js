
function changeSlide(){
  
}

function slideInit() {
  let sliders = document.querySelectorAll('.tab-slider')
  sliders.forEach(slider => {
    let autorotater;
    let pauseRotate = false;
    let justScrolled = false;
    slider.querySelectorAll('.slides-wrapper').forEach((slide) => {
      if(!slide.querySelector('.slides')) return;
      Array(5).fill(0).map(o => {
        slide.querySelector('.slides').innerHTML += slide.querySelector('.slides').innerHTML
      })
      
      if(!slide.hasAttribute("popup")){
        slide.querySelectorAll('.tabcontent').forEach((elem,snum) => {
          elem.addEventListener('click', (e) => {
            pauseRotate = true
            let div = document.createElement('div')
            div.style = 'position:fixed;left:0px;top:0px;background:#0009;z-index:10000;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;'

            div.className = 'overlay'
            div.innerHTML = slide.outerHTML
            document.body.appendChild(div)
            div.addEventListener('click',(e) => {
              if(e.target==div){
                div.parentNode.removeChild(div)
                pauseRotate = false
              }
            })
            let d = div.children[0]
            // setting initial slide
            let s = d.querySelector('.slides')
            let width = s.children[0].offsetWidth
            
            s.style['scroll-behavior'] = 'auto'
            s.scrollTo(width*snum,0)
            s.style['scroll-behavior'] = 'smooth'  

            div.querySelectorAll('img').forEach(o => {
              if(o.getAttribute('big-src')){
                o.src = o.getAttribute('big-src')
              }
            })
            {
              let slide = d
              let div = document.createElement('div')
              div.innerHTML = '<i class="fas fa-angle-left" style="position:absolute;left:-13px;top:45%;"></i><i class="fas fa-angle-right" style="position:absolute;right:-17px;top:45%;"></i>'
              slide.appendChild(div)
              div.children[0].addEventListener('click',(e) => {
                console.log('prev')
                let s = slide.querySelector('.slides')
                let width = s.children[0].offsetWidth
                let left = s.scrollLeft;
                s.scrollTo(left - width,0)
                e.stopPropagation()
              })
              div.children[1].addEventListener('click',(e) => {
                console.log('next')
                let s = slide.querySelector('.slides')
                let width = s.children[0].offsetWidth
                let left = s.scrollLeft;
                s.scrollTo(left + width,0)
                e.stopPropagation()
              })
             
            }
          })
        })
      }
      
      let div = document.createElement('div')
      div.innerHTML = '<i class="fas fa-angle-left" style="position:absolute;left:-13px;top:45%;"></i><i class="fas fa-angle-right" style="position:absolute;right:-17px;top:45%;"></i>'
      slide.appendChild(div)
      div.children[0].addEventListener('click',(e) => {
        let s = slide.querySelector('.slides')
        let width = s.children[0].offsetWidth
        let left = parseInt(s.scrollLeft/width)*width;
        s.scrollTo(left - width,0)
        justScrolled = true
        e.stopPropagation()
      })
      div.children[1].addEventListener('click',(e) => {
        let s = slide.querySelector('.slides')
        let width = s.children[0].offsetWidth
        let left = parseInt(s.scrollLeft/width)*width;
        s.scrollTo(left + width,0)
        justScrolled = true
        e.stopPropagation()
      })
    })
      
  	slider.querySelectorAll('.tab').forEach((o,_i) => {
      o.addEventListener('click', (e) => {
        slider.querySelectorAll('.tab').forEach(o => {
          o.className = o.className.replace(' sel','')
        })
        e.target.className += ' sel'
        slider.querySelectorAll('.slides-wrapper').forEach(o => o.style.display = 'none')
        let activeslide = slider.querySelectorAll('.slides-wrapper')[_i];
        activeslide.style.display = 'block'
        let slide = activeslide.querySelector('.slides');
        if(!slide) return;
        slide.style['scroll-behavior'] = 'auto'
        slide.scrollTo(0,0)
        slide.style['scroll-behavior'] = 'smooth'  
        if(autorotater) clearInterval(autorotater);
        autorotater = setInterval(() => {  
          if(pauseRotate){
            return
          }
          if(justScrolled){
            justScrolled = false
            return
          }
          let width = slide.children[0].offsetWidth
          let left = parseInt(slide.scrollLeft/width)*width;
          slide.scrollTo(left + width,0)
        },3000)
      })
    })
    slider.querySelector('.default').click()
  })
}
  
  slideInit()

  

    
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}