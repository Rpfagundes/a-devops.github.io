//Mouse drag
document.querySelectorAll('.drag-carousel').forEach(carousel => {   
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) =>{
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add('is-dragging');
    cancelMomentumTracking();
  });
  
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('is-dragging');
  });
  
  carousel.addEventListener('mouseup', (e) => {
    isDown = false;
    carousel.classList.remove('is-dragging');
    beginMomentumTracking();
  });
  
  carousel.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1;
    var prevScrollLeft = carousel.scrollLeft;
    carousel.scrollLeft = scrollLeft - walk;
    velX = carousel.scrollLeft - prevScrollLeft;
  });
  
  // Momentum 
  let velX = 0;
  let momentumID;
  
  carousel.addEventListener('wheel', (e) => {
    cancelMomentumTracking();
  });  
  
  function beginMomentumTracking(){
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
  }

  function cancelMomentumTracking(){
    cancelAnimationFrame(momentumID);
  }

  function momentumLoop(){
    carousel.scrollLeft += velX;
    velX *= 0.94; 
    if (Math.abs(velX) > .5){
      momentumID = requestAnimationFrame(momentumLoop);
    }
  }
});



//observe width
const items = document.querySelectorAll('.drag-carousel-item');

const myObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const it = document.querySelectorAll('.drag-carousel-item');
    const iw = Math.floor(entry.contentRect.width);
    for (let i = 0; i < it.length;  i++) {
      it[i].setAttribute('data-width', iw);
    }
  }
});

items.forEach(item => {
  myObserver.observe(item);
});


