(() => {
  // Countdown uses the event's local timezone: Vietnam (UTC+7).
  const target = new Date('2026-10-23T10:00:00+07:00').getTime();
  const els = {days: document.getElementById('days'), hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds')};
  const note = document.getElementById('countdownNote');
  const pad = n => String(n).padStart(2, '0');
  function updateCountdown(){
    const diff = target - Date.now();
    if(diff <= 0){ Object.values(els).forEach(el => el.textContent = '00'); note.textContent = diff > -86400000 ? 'Hôm nay là ngày đặc biệt rồi — chúc mừng tân cử nhân! ♡' : 'Khoảnh khắc đáng nhớ đã bắt đầu. Cảm ơn bạn đã đồng hành cùng Trúc!'; return; }
    const d = Math.floor(diff / 86400000), h = Math.floor(diff % 86400000 / 3600000), m = Math.floor(diff % 3600000 / 60000), s = Math.floor(diff % 60000 / 1000);
    els.days.textContent = d; els.hours.textContent = pad(h); els.minutes.textContent = pad(m); els.seconds.textContent = pad(s);
  }
  updateCountdown(); setInterval(updateCountdown, 1000);

  const toast = document.getElementById('toast'); let toastTimer;
  function showToast(message){ toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
  function burst(symbols, x, y){
    for(let i=0;i<13;i++){
      const item = document.createElement('span'); item.className='confetti'; item.textContent=symbols[Math.floor(Math.random()*symbols.length)];
      item.style.left=(x+(Math.random()-.5)*150)+'px'; item.style.top=(y+(Math.random()-.5)*45)+'px'; item.style.color=['#b22e2d','#d9a941','#e58b7d','#7e9e84'][i%4]; item.style.animationDelay=(Math.random()*.25)+'s'; document.body.appendChild(item); setTimeout(()=>item.remove(),1900);
    }
  }
  document.querySelector('.hotspot-heart').addEventListener('click', e => {const r=e.currentTarget.getBoundingClientRect(); burst(['♡','♥','✦'],r.left+r.width/2,r.top+r.height/2);showToast('Một chiếc ôm và lời cảm ơn gửi đến bạn ♡');});
  document.querySelector('.hotspot-star').addEventListener('click', e => {const r=e.currentTarget.getBoundingClientRect();burst(['✦','✧','✷'],r.left+r.width/2,r.top+r.height/2);showToast('Lấp lánh như một khởi đầu mới ✨');});
  const musicToggle = document.getElementById('musicToggle');
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.play().then(() => {
    musicToggle.classList.add('is-playing');
    musicToggle.setAttribute('aria-pressed', 'true');
  }).catch(() => {
    // Browsers may require a user gesture before allowing audio playback.
  });
  musicToggle.addEventListener('click', async () => {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        musicToggle.classList.add('is-playing');
        musicToggle.setAttribute('aria-pressed', 'true');
        showToast('Đang phát nhạc Tết ♪');
      } catch {
        showToast('Không thể phát nhạc. Vui lòng thử lại.');
      }
      return;
    }

    backgroundMusic.pause();
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-pressed', 'false');
    showToast('Đã tạm dừng nhạc.');
  });

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  const calendarButton = document.getElementById('calendarButton');
  calendarButton?.addEventListener('click', () => {
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Truc Graduation Invite//VI','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:truc-graduation-20261023T100000@invite.local','DTSTAMP:20261021T000000Z','DTSTART;TZID=Asia/Ho_Chi_Minh:20261023T100000','DTEND;TZID=Asia/Ho_Chi_Minh:20261023T113000','SUMMARY:Lễ tốt nghiệp - Trần Thanh Trúc','LOCATION:Đại học Tôn Đức Thắng, 19 Nguyễn Hữu Thọ, TP. Hồ Chí Minh','DESCRIPTION:Chúc mừng lễ tốt nghiệp của Trần Thanh Trúc. Vui lòng xác nhận khung giờ và địa điểm cụ thể với khoa/ban tổ chức.','END:VEVENT','END:VCALENDAR'].join('\r\n');
    const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'}), url=URL.createObjectURL(blob), a=document.createElement('a');a.href=url;a.download='le-tot-nghiep-tran-thanh-truc.ics';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);showToast('Đã tạo tệp lịch .ics để bạn lưu vào lịch cá nhân.');
  });
})();
