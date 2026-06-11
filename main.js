window.addEventListener('DOMContentLoaded', () => {

  const cursor = document.querySelector('.cursor');
  const worksRow = document.querySelector('.works-row');
  const menuBtn = document.getElementById('menu-btn');
  const sideMenu = document.getElementById('side-menu');
  const worksSection = document.querySelector('.works-section');

  /* cursor */
  if(cursor){
    window.addEventListener('mousemove', function(e){
      cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    document.querySelectorAll('a, h1, .work-card, .menu-btn, .gallery-btn, .floating-item').forEach(item => {
      item.addEventListener('mouseenter', () => cursor.classList.add('active'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  /* menu */
  if(menuBtn && sideMenu){
    menuBtn.addEventListener('click', () => {
      sideMenu.classList.toggle('active');
    });
  }

  /* 第二頁後顯示三槓 */
  if(menuBtn && sideMenu && worksSection){
    window.addEventListener('scroll', () => {
      const worksTop = worksSection.offsetTop;

      if(window.scrollY > worksTop - 200){
        menuBtn.classList.add('show');
      }else{
        menuBtn.classList.remove('show');
        sideMenu.classList.remove('active');
      }
    });
  }

  /* Processing 跑馬燈 */
  if(worksRow){
    let speed = 1;
    let pause = false;

    worksRow.addEventListener('mouseenter', () => pause = true);
    worksRow.addEventListener('mouseleave', () => pause = false);

    function getGap(){
      return parseFloat(getComputedStyle(worksRow).gap) || 0;
    }

    function marqueeWorks(){
      if(!pause && worksRow.children.length > 0){
        worksRow.scrollLeft += speed;

        const firstCard = worksRow.children[0];
        const firstWidth = firstCard.offsetWidth + getGap();
        const leftPadding =
          parseFloat(getComputedStyle(worksRow).paddingLeft) || 0;

        if(worksRow.scrollLeft >= firstWidth + leftPadding){
          worksRow.appendChild(firstCard);
          worksRow.scrollLeft -= firstWidth;
        }
      }

      requestAnimationFrame(marqueeWorks);
    }

    marqueeWorks();
  }

  /* Photography sticky scroll */
  const photoWrapper = document.querySelector('.photo-wrapper');
  const photoCards = document.querySelectorAll('.photo-card');
  const photoCount = document.querySelector('.photo-count');

  function updatePhotoByScroll(){
    if(!photoWrapper || !photoCards.length || !photoCount) return;

    const rect = photoWrapper.getBoundingClientRect();

    const maxScroll =
      photoWrapper.offsetHeight - window.innerHeight;

    const progress =
      Math.min(
        Math.max(-rect.top / maxScroll, 0),
        1
      );

    const index =
      Math.min(
        Math.floor(progress * photoCards.length),
        photoCards.length - 1
      );

    photoCards.forEach((card, i) => {
      card.classList.remove('active', 'behind');

      if(i === index){
        card.classList.add('active');
      }else{
        card.classList.add('behind');
      }
    });

    photoCount.textContent = `${index + 1} / ${photoCards.length}`;
  }

  window.addEventListener('scroll', updatePhotoByScroll);
  updatePhotoByScroll();

/* MOTION CAROUSEL */

const motionSlides = document.querySelectorAll('.motion-slide');
const motionPrev = document.querySelector('.motion-prev');
const motionNext = document.querySelector('.motion-next');

let motionIndex = 0;

function updateMotion(){
  if(!motionSlides.length) return;

  motionSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === motionIndex);

    const video = slide.querySelector('video');

    if(video){
      if(i === motionIndex){
        video.currentTime = 0;
        video.play().catch(() => {});
      }else{
        video.pause();
        video.currentTime = 0;
      }
    }
  });
}

if(motionNext){
  motionNext.addEventListener('click', () => {
    motionIndex = (motionIndex + 1) % motionSlides.length;
    updateMotion();
  });
}

if(motionPrev){
  motionPrev.addEventListener('click', () => {
    motionIndex = (motionIndex - 1 + motionSlides.length) % motionSlides.length;
    updateMotion();
  });
}

updateMotion();
