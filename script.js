function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
setVh();

const input = document.getElementById('inputArea');
const output = document.getElementById('output');
const statusBar = document.getElementById('statusBar');

const characters = [];
let MAX_CHARS = 50;
if (window.innerWidth < 768) MAX_CHARS = 30;
let currentMessage = null;

const emotionTriggers = ["화나", "열받아", "빡쳐", "지쳐", "지친다", "스트레스",
  "무섭다", "무서워", "피곤", "몰라", "불안", "힘들다", "짜증", "좋아",
  "ㅅㅂ", "시발", "씨발", "집", "멍함", "멍해", "부담", "답답", "막막",
  "슬퍼", "슬프다", "눈물", "외로워", "괴로워", "머리아파", "뭐야",
  "재밌다", "재밌어", "지겨워", "지겹다", "지루", "졸려", "졸리다", "황당", "대박"];

const emotionColors = [
  "#AF331C", "#AF331C", "#AF331C", "#454818", "#454818", "#16235C",
  "#242833", "#242833", "#1F2902", "#556093", "#5E647C", "#1F37A0",
  "#323821", "#306753", "#7E1F5D", "#7E1F5D", "#7E1F5D", "#43746B",
  "#8D8D8D", "#8D8D8D", "#48325A", "#48325A", "#48325A", "#303657",
  "#303657", "#303657", "#464646", "#3F221A", "#1C2656", "#8D5A9A",
  "#5967D6", "#5967D6", "#3A2B4B", "#3A2B4B", "#474B6A", "#000000",
  "#000000", "#7C6F5C", "#1B7563"];

const emotionEmojis = [
  "😡", "😡", "😡", "😩", "😩", "😖", "😱", "😱",
  "😴", "🤷", "😰", "🫠", "😤", "😊", "🨬", "🨬", "🨬",
  "🏠", "🫥", "🫥", "🩱", "🩱", "🩱", "😢", "😢", "😢",
  "🦀", "😖", "🨯", "😶", "😂", "😂", "😒", "😒", "🥱",
  "😴", "😴", "🤯", "🨯"];

const phrases = [
  "계속 해.", "지금이야.", "더 쳐.", "그만두지 마.", "이게 다야?",
  "네가 만든 혼돈이다.", "너답다.", "뇌를 꺼.", "의식의 끝으로 가.",
  "말이 안 돼.", "이상한데 좋아.", "그거 괜찮은데?", "손이 멈추질 않네.",
  "멋대로 해.", "쏟아내.", "쓸데없는 걸 써봐.", "그냥 치라고.",
  "혼자 해도 돼.", "괜찮아. 더 이상해도.", "이건 기록이 아냐."
];

input.addEventListener('focus', () => {
  setTimeout(() => {
    input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
});

input.addEventListener('input', () => {
  const value = input.value;
  const lastChar = value.slice(-1);
  if (!lastChar.trim()) return;

  const span = document.createElement('span');
  span.className = 'char';
  span.textContent = lastChar;
  span.style.left = `${Math.random() * window.innerWidth}px`;
  span.style.top = `${Math.random() * 20}px`;
  span.style.fontSize = `${Math.random() * 35 + 15}px`;
  span.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
  output.appendChild(span);

  const finalY = window.innerHeight;
  const x = parseFloat(span.style.left);

  setTimeout(() => {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = `${x}%`;
    explosion.style.top = `${finalY - 30}px`;
    output.appendChild(explosion);
    setTimeout(() => explosion.remove(), 600);
  }, 2600);

  characters.push(span);
  if (characters.length > MAX_CHARS) {
    const old = characters.shift();
    old.remove();
  }

  const lowerValue = value.toLowerCase().trim();
  let lastIndex = -1;
  let lastEmotionIndex = -1;

  emotionTriggers.forEach((word, i) => {
    const idx = lowerValue.lastIndexOf(word.toLowerCase());
    if (idx > lastIndex) {
      lastIndex = idx;
      lastEmotionIndex = i;
    }
  });

  if (lastEmotionIndex !== -1) {
    const color = emotionColors[lastEmotionIndex];
    const emoji = emotionEmojis[lastEmotionIndex];
    document.body.style.backgroundColor = color;
    statusBar.textContent = `감정 상태: ${emotionTriggers[lastEmotionIndex]} ${emoji}`;
  }

  if (Math.random() > 0.75) {
    if (currentMessage) currentMessage.remove();
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    document.body.appendChild(msg);
    currentMessage = msg;
    setTimeout(() => {
      if (msg === currentMessage) {
        msg.remove();
        currentMessage = null;
      }
    }, 2500);
  }
});
