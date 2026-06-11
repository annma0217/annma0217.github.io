const cursor = document.querySelector('.cursor');
const worksRow = document.querySelector('.works-row');
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const worksSection = document.querySelector('.works-section');

/* cursor */
window.addEventListener('mousemove', function(e){
  if(cursor){
    cursor.style.transform =
      `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }
});

document.querySelectorAll('a, h1, .work-card, .menu-btn').forEach(item => {
  item.addEventListener('mouseenter', () => cursor && cursor.classList.add('active'));
  item.addEventListener('mouseleave', () => cursor && cursor.classList.remove('active'));
});

/* menu */
if(menuBtn && sideMenu){
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
  });
}

/* 第二頁後顯示三槓 */
window.addEventListener('scroll', () => {
  if(!worksSection || !menuBtn || !sideMenu) return;

  const worksTop = worksSection.offsetTop;

  if(window.scrollY > worksTop - 200){
    menuBtn.classList.add('show');
  }else{
    menuBtn.classList.remove('show');
    sideMenu.classList.remove('active');
  }
});

/* Processing 跑馬燈 */
let speed = 1;
let pause = false;

if(worksRow){
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
  if(!photoWrapper || photoCards.length === 0) return;

  const rect = photoWrapper.getBoundingClientRect();
  const scrollRange = photoWrapper.offsetHeight - window.innerHeight;

  let progress = 0;

  if(scrollRange > 0){
    progress = -rect.top / scrollRange;
  }

  progress = Math.max(0, Math.min(progress, 1));

  const index = Math.min(
    Math.floor(progress * photoCards.length),
    photoCards.length - 1
  );

  photoCards.forEach((card, i) => {
    if(i === index){
      card.classList.add('active');
      card.classList.remove('behind');
    }else{
      card.classList.remove('active');
      card.classList.add('behind');
    }
  });

  if(photoCount){
    photoCount.textContent = `${index + 1} / ${photoCards.length}`;
  }
}

window.addEventListener('scroll', updatePhotoByScroll);
window.addEventListener('load', updatePhotoByScroll);
updatePhotoByScroll();
