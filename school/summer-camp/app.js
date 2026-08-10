const course = window.SUMMER_CAMP_COURSE;
const tabs = document.querySelector('#weekTabs');
const lessonRoot = document.querySelector('#lesson');
const template = document.querySelector('#lessonTemplate');
let activeWeek = 0;

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replaceAll(' / ', ', '));
  utterance.lang = 'en-US';
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function renderTabs() {
  tabs.innerHTML = course.map((item, index) => `
    <button class="week-tab ${index === activeWeek ? 'is-active' : ''}" data-week="${index}" aria-pressed="${index === activeWeek}">
      <small>WEEK ${item.week}</small><strong>${item.title}</strong>
    </button>`).join('');
  tabs.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    activeWeek = Number(button.dataset.week); renderTabs(); renderLesson();
    lessonRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function renderLesson() {
  const item = course[activeWeek];
  const fragment = template.content.cloneNode(true);
  const hero = fragment.querySelector('.week-hero');
  hero.dataset.color = item.color;
  fragment.querySelector('.week-kicker').textContent = `WEEK ${item.week}`;
  fragment.querySelector('.week-hero h2').textContent = item.title;
  fragment.querySelector('.week-subtitle').textContent = item.subtitle;
  fragment.querySelector('.week-icon').textContent = item.icon;

  fragment.querySelector('.audio-list').innerHTML = item.audio.map((track, index) => `
    <article class="audio-card">
      <div class="audio-number">${String(index + 1).padStart(2, '0')}</div>
      <div><h4>${track.label}</h4><p>${track.note}</p><button class="focus-button" type="button" data-speak="${track.speech}">▶ Play practice</button></div>
    </article>`).join('');

  const sheet = `assets/week-${String(item.week).padStart(2, '0')}-vocab.webp`;
  fragment.querySelector('.word-grid').innerHTML = item.words.map(([en, zh], wordIndex) => {
    const column = wordIndex % 5;
    const row = Math.floor(wordIndex / 5);
    return `
    <button class="word-card" type="button" data-speak="${en}" aria-label="播放 ${en} 的發音">
      <span class="word-card__image" aria-hidden="true" style="--sheet:url('${sheet}');--x:${column * 25}%;--y:${row * (100 / 3)}%"></span>
      <span class="word-card__front"><strong>${en}</strong><small>tap to listen</small></span>
      <span class="word-card__back">${zh}</span>
    </button>`;
  }).join('') + `<p class="language-note"><strong>自然英文小提醒</strong>${item.languageNote}</p>`;

  fragment.querySelector('.sentence-list').innerHTML = item.sentences.map(sentence => {
    const highlighted = sentence.swap ? sentence.text.replace(sentence.swap, `<u>${sentence.swap}</u>`) : sentence.text;
    return `<article class="sentence-card"><button type="button" data-speak="${sentence.text}" aria-label="播放句子">▶</button><div><p>${highlighted}</p><small>${sentence.zh}</small></div></article>`;
  }).join('');

  fragment.querySelector('.activity').innerHTML = `<div class="activity-icon">✂</div><div><h4>${item.activity.title}</h4><p>${item.activity.body}</p></div>`;

  const quiz = fragment.querySelector('.quiz');
  quiz.innerHTML = item.quiz.map((question, qIndex) => `
    <fieldset><legend><span>${qIndex + 1}</span>${question.q}</legend>
      ${question.options.map((option, oIndex) => `<label><input type="radio" name="q${qIndex}" value="${oIndex}"><span>${option}</span></label>`).join('')}
    </fieldset>`).join('');

  fragment.querySelector('.check-button').addEventListener('click', event => {
    let score = 0;
    item.quiz.forEach((question, qIndex) => {
      const fieldset = quiz.querySelectorAll('fieldset')[qIndex];
      const selected = fieldset.querySelector('input:checked');
      fieldset.classList.remove('is-correct', 'is-wrong');
      if (selected && Number(selected.value) === question.answer) { score += 1; fieldset.classList.add('is-correct'); }
      else fieldset.classList.add('is-wrong');
    });
    const scoreBox = event.currentTarget.nextElementSibling;
    scoreBox.textContent = score === item.quiz.length ? `太棒了！${score} / ${item.quiz.length} 全部答對！` : `你答對 ${score} / ${item.quiz.length} 題，再聽一次就會更棒。`;
  });

  lessonRoot.replaceChildren(fragment);
  lessonRoot.querySelectorAll('[data-speak]').forEach(button => button.addEventListener('click', () => speak(button.dataset.speak)));
}

renderTabs();
renderLesson();
