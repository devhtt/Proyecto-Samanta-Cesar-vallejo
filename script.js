// Funcionalidad de navegación de secciones
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section-view');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetSection = item.dataset.section;
      
      // Quitar clase active de todos los items de nav y secciones
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));
      
      // Agregar clase active al item clickeado
      item.classList.add('active');
      
      // Mostrar la sección correspondiente
      const targetElement = document.getElementById(targetSection + '-section');
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });
});

// Funcionalidad del modal de perfil
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');
const cancelProfileBtn = document.getElementById('cancelProfileBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const photoInput = document.getElementById('photoInput');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const profileAvatar = document.getElementById('profileAvatar');
const profilePhotoPreview = document.getElementById('profilePhotoPreview');

// Datos de perfil por defecto
const defaultProfile = {
  name: 'Tu Nombre',
  email: '',
  photo: null
};

// Cargar perfil desde localStorage
function loadProfile() {
  const saved = localStorage.getItem('userProfile');
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultProfile;
}

// Guardar perfil en localStorage
function saveProfile(profile) {
  localStorage.setItem('userProfile', JSON.stringify(profile));
}

// Actualizar vista del avatar
function updateAvatarDisplay() {
  const profile = loadProfile();
  
  if (profile.photo) {
    profileAvatar.style.backgroundImage = `url('${profile.photo}')`;
    profileAvatar.style.backgroundSize = 'cover';
    profileAvatar.style.backgroundPosition = 'center';
  } else {
    profileAvatar.style.backgroundImage = 'linear-gradient(135deg, var(--green) 0%, #4FB6E8 100%)';
  }
}

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function formatMinutes(value) {
  return `${value} min`;
}

const userPerformance = {
  totalStudents: 24,
  alerts: { yellow: 4, red: 2 },
  dashboard: {
    totalGamesAssigned: 5,
    enseñarScore: 78,
    games: [
      { id: 'forest', players: 8, share: 22, avgScore: 78 },
      { id: 'island', players: 12, share: 65, avgScore: 65 },
      { id: 'wizard', players: 5, share: 13, avgScore: 50 }
    ]
  },
  evaluation: {
    totalStudents: 24
  },
  monitoring: {
    completionRate: 84,
    averageTime: 34
  },
  students: [
    {
      name: 'Mateo Ríos',
      gamesCompleted: 33,
      gamesTotal: 36,
      score: 45,
      needHelp: 5,
      inProgress: 8,
      mastered: 7,
      evalCount: 10,
      monthlyEvaluations: 8,
      evalScore: 45,
      strengths: 2,
      weaknesses: 5,
      status: 'Inactivo',
      sessionTime: 22,
      level: 'Nivel 3',
      lastActivity: 'Hace 5 min'
    },
    {
      name: 'Valentina Ruiz',
      gamesCompleted: 31,
      gamesTotal: 36,
      score: 53,
      needHelp: 6,
      inProgress: 35,
      mastered: 19,
      evalCount: 11,
      monthlyEvaluations: 10,
      evalScore: 68,
      strengths: 3,
      weaknesses: 3,
      status: 'En Pausa',
      sessionTime: 12,
      level: 'Nivel 5',
      lastActivity: 'Hace 2 min'
    },
    {
      name: 'Sebastián Coya',
      gamesCompleted: 27,
      gamesTotal: 36,
      score: 82,
      needHelp: 1,
      inProgress: 14,
      mastered: 45,
      evalCount: 12,
      monthlyEvaluations: 10,
      evalScore: 82,
      strengths: 5,
      weaknesses: 1,
      status: 'Activo',
      sessionTime: 18,
      level: 'Nivel 7',
      lastActivity: 'Hace 30 seg'
    }
  ]
};

function populatePerformanceMetrics() {
  const classScore = userPerformance.dashboard.enseñarScore;
  const avgGameScore = userPerformance.dashboard.games.reduce((sum, game) => sum + game.avgScore, 0) / userPerformance.dashboard.games.length;
  const completedThisMonth = userPerformance.students.reduce((sum, student) => sum + student.monthlyEvaluations, 0);

  const alertYellow = document.getElementById('alert-yellow-count');
  const alertRed = document.getElementById('alert-red-count');
  if (alertYellow) alertYellow.textContent = userPerformance.alerts.yellow;
  if (alertRed) alertRed.textContent = userPerformance.alerts.red;

  const dashboardClassScore = document.getElementById('dashboard-class-score');
  const dashboardClassAverage = document.getElementById('dashboard-class-average');
  const dashboardGamesAssigned = document.getElementById('dashboard-games-assigned');
  const dashboardGamesAverage = document.getElementById('dashboard-games-average');

  if (dashboardClassScore) dashboardClassScore.textContent = formatPercent(classScore);
  if (dashboardClassAverage) dashboardClassAverage.innerHTML = `Promedio de grado<br>${formatPercent(avgGameScore)}`;
  if (dashboardGamesAssigned) dashboardGamesAssigned.textContent = userPerformance.dashboard.totalGamesAssigned;
  if (dashboardGamesAverage) dashboardGamesAverage.innerHTML = `Basado en ${userPerformance.dashboard.totalGamesAssigned} juegos creados`;

  userPerformance.dashboard.games.forEach((game) => {
    const count = document.getElementById(`game-${game.id}-count`);
    const sub = document.getElementById(`game-${game.id}-sub`);
    const foot = document.getElementById(`game-${game.id}-foot`);
    if (count) count.textContent = `${game.players}`;
    if (sub) sub.textContent = `${game.share}% de la clase`;
    if (foot) foot.innerHTML = `Promedio de grado:<br>${formatPercent(game.avgScore)}`;
  });

  const studentRows = [
    { id: 'student-row-1', name: 'Mateo Ríos' },
    { id: 'student-row-2', name: 'Valentina Ruiz' },
    { id: 'student-row-3', name: 'Sebastián Coya' }
  ];

  studentRows.forEach(({ id, name }) => {
    const row = document.getElementById(id);
    const student = userPerformance.students.find((item) => item.name === name);
    if (!row || !student) return;

    const gamesCell = row.querySelector('.student-games');
    const scoreBar = row.querySelector('.score-bar');
    const scoreNum = row.querySelector('.score-num');
    const needChip = row.querySelector('.student-need');
    const progressChip = row.querySelector('.student-progress');
    const masteredChip = row.querySelector('.student-mastered');

    if (gamesCell) gamesCell.textContent = `${student.gamesCompleted} / ${student.gamesTotal}`;
    if (scoreBar) scoreBar.style.width = `${student.score}%`;
    if (scoreNum) scoreNum.textContent = formatPercent(student.score);
    if (needChip) needChip.textContent = student.needHelp;
    if (progressChip) progressChip.textContent = student.inProgress;
    if (masteredChip) masteredChip.textContent = student.mastered;
  });

  document.querySelectorAll('#evaluar-section .t-row[data-student]').forEach((row) => {
    const name = row.dataset.student;
    const student = userPerformance.students.find((item) => item.name === name);
    if (!student) return;

    const evalCount = row.querySelector('.eval-count');
    const scoreBar = row.querySelector('.score-bar');
    const scoreNum = row.querySelector('.score-num');
    const strengths = row.querySelector('.eval-strengths');
    const weaknesses = row.querySelector('.eval-weaknesses');

    if (evalCount) evalCount.textContent = student.evalCount;
    if (scoreBar) scoreBar.style.width = `${student.evalScore}%`;
    if (scoreNum) scoreNum.textContent = formatPercent(student.evalScore);
    if (strengths) strengths.textContent = student.strengths;
    if (weaknesses) weaknesses.textContent = student.weaknesses;
  });

  document.querySelectorAll('#monitorear-section .t-row[data-student]').forEach((row) => {
    const name = row.dataset.student;
    const student = userPerformance.students.find((item) => item.name === name);
    if (!student) return;

    const statusChip = row.querySelector('.monitor-status');
    const monitorTime = row.querySelector('.monitor-time');
    const monitorLevel = row.querySelector('.monitor-level');
    const monitorLast = row.querySelector('.monitor-last');

    if (statusChip) {
      statusChip.textContent = student.status;
      statusChip.classList.remove('chip-green', 'chip-yellow', 'chip-red');
      if (student.status === 'Activo') statusChip.classList.add('chip-green');
      else if (student.status === 'En Pausa') statusChip.classList.add('chip-yellow');
      else statusChip.classList.add('chip-red');
    }
    if (monitorTime) monitorTime.textContent = formatMinutes(student.sessionTime);
    if (monitorLevel) monitorLevel.textContent = student.level;
    if (monitorLast) monitorLast.textContent = student.lastActivity;
  });

  const evalCompletedCount = document.getElementById('eval-completed-count');
  const evalStudentsCount = document.getElementById('eval-students-count');
  const evalStudentsFoot = document.getElementById('eval-students-foot');
  if (evalCompletedCount) evalCompletedCount.textContent = completedThisMonth;
  if (evalStudentsCount) evalStudentsCount.textContent = userPerformance.students.length;
  if (evalStudentsFoot) evalStudentsFoot.textContent = `De ${userPerformance.totalStudents} total`;

  const monitorCompletionRate = document.getElementById('monitor-completion-rate');
  const monitorAverageTime = document.getElementById('monitor-average-time');
  if (monitorCompletionRate) monitorCompletionRate.textContent = formatPercent(userPerformance.monitoring.completionRate);
  if (monitorAverageTime) monitorAverageTime.textContent = formatMinutes(userPerformance.monitoring.averageTime);
}

// Abrir modal de perfil
profileBtn.addEventListener('click', () => {
  const profile = loadProfile();
  nameInput.value = profile.name;
  emailInput.value = profile.email || '';
  
  if (profile.photo) {
    profilePhotoPreview.style.backgroundImage = `url('${profile.photo}')`;
  }
  
  profileModal.classList.add('active');
});

// Cerrar modal
function closeModal() {
  profileModal.classList.remove('active');
  photoInput.value = '';
}

closeProfileModal.addEventListener('click', closeModal);
cancelProfileBtn.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera
profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) {
    closeModal();
  }
});

// Cargar imagen
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profilePhotoPreview.style.backgroundImage = `url('${event.target.result}')`;
      profilePhotoPreview.style.backgroundSize = 'cover';
      profilePhotoPreview.style.backgroundPosition = 'center';
    };
    reader.readAsDataURL(file);
  }
});

// Guardar cambios de perfil
saveProfileBtn.addEventListener('click', () => {
  const photo = profilePhotoPreview.style.backgroundImage;
  const photoUrl = photo ? photo.slice(5, -2) : null; // Extraer URL de backgroundImage
  
  const profile = {
    name: nameInput.value || defaultProfile.name,
    email: emailInput.value,
    photo: photoUrl
  };
  
  saveProfile(profile);
  updateAvatarDisplay();
  closeModal();
});

// Inicializar avatar al cargar
updateAvatarDisplay();
populatePerformanceMetrics();

// Animaciones del dashboard: barras de progreso y aparición escalonada de tarjetas

document.addEventListener('DOMContentLoaded', () => {

  // 1. Anima las barras de puntaje promedio (van de 0 al valor real)
  document.querySelectorAll('.score-bar').forEach((bar) => {
    const target = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = target; }, 150);
    });
  });

  // 2. Entrada escalonada de las tarjetas de juegos y filas de la tabla
  const staggerTargets = [
    ...document.querySelectorAll('.game-card'),
    ...document.querySelectorAll('.panel'),
    ...document.querySelectorAll('.t-row:not(.t-head)')
  ];

  staggerTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 120 + i * 90);
  });

  // 3. Pequeño "bounce" en los íconos de juego al pasar el mouse
  document.querySelectorAll('.game-icon-badge').forEach((badge) => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.15) rotate(-6deg)';
      badge.style.transition = 'transform .25s ease';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1) rotate(0deg)';
    });
  });

});

// ---- Práctica de diálogos con Bú el búho ----
const dialogosBu = [
  {
    linea: "¡Hola! Soy Bú 🦉 ¿Cómo te llamas?",
    opciones: [
      { texto: "Me llamo Sofía", correcta: true },
      { texto: "Tengo un perro", correcta: false },
      { texto: "Es de color azul", correcta: false }
    ]
  },
  {
    linea: "¡Qué lindo nombre! ¿Quieres jugar conmigo?",
    opciones: [
      { texto: "Mañana llueve", correcta: false },
      { texto: "¡Sí, me encantaría!", correcta: true },
      { texto: "Cinco más cinco es diez", correcta: false }
    ]
  },
  {
    linea: "Genial, gracias por jugar conmigo hoy",
    opciones: [
      { texto: "De nada, fue muy divertido", correcta: true },
      { texto: "El sol es amarillo", correcta: false },
      { texto: "No me gusta el brócoli", correcta: false }
    ]
  }
];

let dlgPaso = 0;

function iniciarDialogoBu(){
  dlgPaso = 0;
  document.getElementById('ensenar-section').classList.remove('active');
  document.getElementById('dialogo-bu-section').classList.add('active');
  document.getElementById('dlgCelebration').classList.remove('show');
  document.getElementById('dlgOptions').style.display = 'flex';
  document.querySelector('.dlg-stage').style.display = 'flex';
  document.getElementById('dlgNextBtn').style.display = 'block';
  renderDialogoPaso();
}

function renderDialogoPaso(){
  const data = dialogosBu[dlgPaso];
  document.getElementById('dlgOwlLine').textContent = data.linea;
  speakText(data.linea, 'es-ES', 0.85, 1.0);

  const optsWrap = document.getElementById('dlgOptions');
  optsWrap.innerHTML = '';
  data.opciones.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'dlg-option';
    btn.textContent = op.texto;
    btn.dataset.correct = op.correcta;
    btn.addEventListener('click', () => seleccionarOpcion(btn, op.correcta));
    optsWrap.appendChild(btn);
  });

  const feedback = document.getElementById('dlgFeedback');
  feedback.textContent = '';
  feedback.className = 'dlg-feedback';
  document.getElementById('dlgNextBtn').disabled = true;

  document.querySelectorAll('.dlg-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === dlgPaso);
    dot.classList.toggle('done', i < dlgPaso);
  });
}

function playFeedbackSound(type){
  const soundFile = `${RUTA_SONIDOS}${type === 'bad' ? 'malo.webm' : 'bueno.webm'}`;
  const sound = new Audio(soundFile);
  sound.volume = type === 'bad' ? 0.35 : 0.8;
  sound.play().catch(() => {});
}

function seleccionarOpcion(btn, esCorrecta){
  document.querySelectorAll('.dlg-option').forEach(b => b.disabled = true);
  const feedback = document.getElementById('dlgFeedback');

  if (esCorrecta){
    btn.classList.add('correct');
    feedback.textContent = '¡Muy bien! Esa respuesta encaja perfecto.';
    feedback.className = 'dlg-feedback ok';
    playFeedbackSound('good');
    speakText('¡Excelente! Sigamos así.', 'es-ES', 0.95, 1.05, 0.9);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Casi, elige la opción que tiene sentido en la conversación.';
    feedback.className = 'dlg-feedback no';
    playFeedbackSound('bad');
    document.querySelectorAll('.dlg-option').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  document.getElementById('dlgNextBtn').disabled = false;
}

function reproducirSonidoLetra(){
  const data = letrasPron[pronPaso];
  const btn = document.getElementById('pronSoundBtn');
  btn.classList.add('playing');
  setTimeout(() => btn.classList.remove('playing'), 500);

  if ('speechSynthesis' in window){
    speakText(data.sonido, 'es-ES', 0.7, 1.2);
  }
}

function speakText(text, lang = 'es-ES', rate = 0.85, pitch = 1.0, volume = 1.0){
  if (!('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;
  window.speechSynthesis.speak(utter);
}

function speakQuestionAndOptions(question, options = [], lang = 'es-ES', rate = 0.85, pitch = 1.0){
  if (!question) return;
  speakText(question, lang, rate, pitch);
}

document.getElementById('pronSoundBtn')?.addEventListener('click', reproducirSonidoLetra);

const letrasPron = [
  {
    letra: "M",
    sonido: "mmm",
    opciones: [
      { emoji: "🐒", palabra: "Mono", correcta: true },
      { emoji: "🐶", palabra: "Perro", correcta: false },
      { emoji: "🦋", palabra: "Mariposa", correcta: true, oculta: true }
    ]
  },
  {
    letra: "S",
    sonido: "sss",
    opciones: [
      { emoji: "🐍", palabra: "Serpiente", correcta: true },
      { emoji: "🐱", palabra: "Gato", correcta: false },
      { emoji: "🌳", palabra: "Árbol", correcta: false }
    ]
  },
  {
    letra: "A",
    sonido: "aaa",
    opciones: [
      { emoji: "🐝", palabra: "Abeja", correcta: true },
      { emoji: "🐟", palabra: "Pez", correcta: false },
      { emoji: "🦴", palabra: "Hueso", correcta: false }
    ]
  }
];

let pronPaso = 0;

function iniciarPronunciacion(){
  pronPaso = 0;
  document.getElementById('pronCelebration').classList.remove('show');
  document.getElementById('pronStage').style.display = 'flex';
  document.getElementById('pronNextBtn').style.display = 'block';
  renderPronPaso();
}

function renderPronPaso(){
  const data = letrasPron[pronPaso];
  document.getElementById('pronLetter').textContent = data.letra;

  const optsWrap = document.getElementById('pronOptions');
  optsWrap.innerHTML = '';
  const opcionesValidas = data.opciones.filter(o => !o.oculta).slice(0, 3);

  opcionesValidas.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'pron-option';
    btn.innerHTML = `<span class="pron-emoji">${op.emoji}</span><span class="pron-word">${op.palabra}</span>`;
    btn.dataset.correct = op.correcta;
    btn.addEventListener('click', () => seleccionarSonido(btn, op.correcta));
    optsWrap.appendChild(btn);
  });

  document.getElementById('pronFeedback').textContent = '';
  document.getElementById('pronFeedback').className = 'dlg-feedback';
  document.getElementById('pronNextBtn').disabled = true;
  speakQuestionAndOptions(`¿Qué palabra empieza con este sonido?`, opcionesValidas.map(o => o.palabra), 'es-ES', 0.85, 1.0);

  document.querySelectorAll('[data-pron-step]').forEach((dot, i) => {
    dot.classList.toggle('active', i === pronPaso);
    dot.classList.toggle('done', i < pronPaso);
  });
}

function seleccionarSonido(btn, esCorrecta){
  document.querySelectorAll('.pron-option').forEach(b => b.disabled = true);
  const feedback = document.getElementById('pronFeedback');

  if (esCorrecta){
    btn.classList.add('correct');
    feedback.textContent = '¡Así suena! Muy bien 🎉';
    feedback.className = 'dlg-feedback ok';
    playFeedbackSound('good');
    speakText('¡Excelente! Lo hiciste muy bien.', 'es-ES', 0.95, 1.05, 0.9);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Casi... escucha el sonido otra vez';
    feedback.className = 'dlg-feedback no';
    playFeedbackSound('bad');
    document.querySelectorAll('.pron-option').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  document.getElementById('pronNextBtn').disabled = false;
}

document.getElementById('pronNextBtn')?.addEventListener('click', () => {
  pronPaso++;
  if (pronPaso < letrasPron.length){
    renderPronPaso();
  } else {
    document.getElementById('pronStage').style.display = 'none';
    document.getElementById('pronNextBtn').style.display = 'none';
    document.getElementById('pronCelebration').classList.add('show');
    playFeedbackSound('good');
    speakText('¡Muy bien! Terminaste la práctica de pronunciación.', 'es-ES', 0.95, 1.05, 0.9);
  }
});

document.getElementById('ritPlayBtn')?.addEventListener('click', () => {
  const data = palabrasRitmo[ritPaso];
  if (data){
    speakText(data.palabra, 'es-ES', 0.85, 1.0);
  }
});

document.getElementById('ritNextBtn')?.addEventListener('click', () => {
  ritPaso++;
  if (ritPaso < palabrasRitmo.length){
    renderRitPaso();
  } else {
    document.getElementById('ritStage').style.display = 'none';
    document.getElementById('ritNextBtn').style.display = 'none';
    document.getElementById('ritCelebration').classList.add('show');
    playFeedbackSound('good');
    speakText('¡Excelente ritmo! Has terminado el juego.', 'es-ES', 0.95, 1.05, 0.9);
  }
});

const palabrasRitmo = [
  { palabra: "Casa", silabas: 2 },
  { palabra: "Pelota", silabas: 3 },
  { palabra: "Mariposa", silabas: 4 }
];

let ritPaso = 0;

function iniciarRitmo(){
  ritPaso = 0;
  document.getElementById('ritCelebration').classList.remove('show');
  document.getElementById('ritStage').style.display = 'flex';
  document.getElementById('ritNextBtn').style.display = 'block';
  renderRitPaso();
}

function renderRitPaso(){
  const data = palabrasRitmo[ritPaso];
  const wordDisplay = document.getElementById('ritWordDisplay');
  wordDisplay.textContent = data.palabra;

  const opciones = generarOpcionesRitmo(data.silabas);
  const optsWrap = document.getElementById('ritOptions');
  optsWrap.innerHTML = '';

  opciones.forEach((num) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rit-option';
    btn.dataset.correct = (num === data.silabas);
    btn.textContent = num;
    btn.addEventListener('click', () => seleccionarRitmo(btn, num === data.silabas));
    optsWrap.appendChild(btn);
  });

  document.getElementById('ritFeedback').textContent = '';
  document.getElementById('ritFeedback').className = 'dlg-feedback';
  document.getElementById('ritNextBtn').disabled = true;

  speakText(data.palabra, 'es-ES', 0.85, 1.0);
  speakQuestionAndOptions(`¿Cuántas sílabas tiene la palabra ${data.palabra}?`, opciones.map(n => n.toString()), 'es-ES', 0.85, 1.0);

  document.querySelectorAll('[data-rit-step]').forEach((dot, i) => {
    dot.classList.toggle('active', i === ritPaso);
    dot.classList.toggle('done', i < ritPaso);
  });
}

function generarOpcionesRitmo(correcto){
  const set = new Set([correcto]);
  while (set.size < 3) {
    const candidato = correcto + (Math.floor(Math.random() * 3) - 1);
    if (candidato >= 1 && candidato <= 5) set.add(candidato);
  }
  return Array.from(set).sort(() => Math.random() - 0.5);
}

function seleccionarRitmo(btn, esCorrecta){
  document.querySelectorAll('.rit-option').forEach(b => b.disabled = true);
  const feedback = document.getElementById('ritFeedback');

  if (esCorrecta){
    btn.classList.add('correct');
    feedback.textContent = '¡Muy bien! Contaste las sílabas correctamente.';
    feedback.className = 'dlg-feedback ok';
    playFeedbackSound('good');
    speakText('¡Excelente! Contaste muy bien.', 'es-ES', 0.95, 1.05, 0.9);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Casi, escucha de nuevo y cuenta otra vez.';
    feedback.className = 'dlg-feedback no';
    playFeedbackSound('bad');
    document.querySelectorAll('.rit-option').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  document.getElementById('ritNextBtn').disabled = false;
}

function mostrarRitmo(){
  document.getElementById('ensenar-section').classList.remove('active');
  document.getElementById('dialogo-bu-section').classList.remove('active');
  document.getElementById('pronunciacion-section').classList.remove('active');
  document.getElementById('ritmo-section').classList.add('active');
  iniciarRitmo();
}

const dialogosExplorador = [
  {
    linea: "Hola explorador, ¿listo para partir al bosque?",
    opciones: [
      { texto: "¡Sí, vamos ya!", correcta: true },
      { texto: "El agua es líquida", correcta: false },
      { texto: "Tengo tres lápices", correcta: false }
    ]
  },
  {
    linea: "Encontramos un río, ¿cómo lo cruzamos?",
    opciones: [
      { texto: "Por el puente de piedras", correcta: true },
      { texto: "El cielo es de noche", correcta: false },
      { texto: "Me gusta el color verde", correcta: false }
    ]
  },
  {
    linea: "¡Llegamos a la cima! ¿Qué sientes?",
    opciones: [
      { texto: "Estoy muy feliz y orgulloso", correcta: true },
      { texto: "El perro ladra fuerte", correcta: false },
      { texto: "Hoy es lunes", correcta: false }
    ]
  }
];

let expPaso = 0;

function iniciarDialogosExplorador(){
  expPaso = 0;
  document.getElementById('expCelebration').classList.remove('show');
  document.getElementById('expStage').style.display = 'flex';
  document.getElementById('expNextBtn').style.display = 'block';
  renderExpPaso();
}

function renderExpPaso(){
  const data = dialogosExplorador[expPaso];
  document.getElementById('expLine').textContent = data.linea;
  speakQuestionAndOptions(data.linea, data.opciones.map(op => op.texto), 'es-ES', 0.85, 1.0);

  const optsWrap = document.getElementById('expOptions');
  optsWrap.innerHTML = '';
  data.opciones.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'exp-option';
    btn.dataset.correct = op.correcta;
    btn.innerHTML = `
      <svg class="exp-option-flag" viewBox="0 0 30 36">
        <path d="M6 2 L6 34 M6 4 L26 10 L6 16Z" stroke="#8B6B4A" stroke-width="3" fill="#8B7FD1"/>
      </svg>
      <span>${op.texto}</span>
    `;
    btn.addEventListener('click', () => seleccionarExplorador(btn, op.correcta));
    optsWrap.appendChild(btn);
  });

  document.getElementById('expFeedback').textContent = '';
  document.getElementById('expFeedback').className = 'dlg-feedback';
  document.getElementById('expNextBtn').disabled = true;

  document.querySelectorAll('[data-exp-stone]').forEach((stone, i) => {
    stone.classList.toggle('active', i === expPaso);
    stone.classList.toggle('done', i < expPaso);
  });
}

function seleccionarExplorador(btn, esCorrecta){
  document.querySelectorAll('.exp-option').forEach(b => b.disabled = true);
  const feedback = document.getElementById('expFeedback');

  if (esCorrecta){
    btn.classList.add('correct');
    feedback.textContent = '¡Buena elección, explorador!';
    feedback.className = 'dlg-feedback ok';
    playFeedbackSound('good');
    speakText('¡Excelente elección! Vamos al siguiente paso.', 'es-ES', 0.95, 1.05, 0.9);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Casi... esa respuesta no encaja en la conversación';
    feedback.className = 'dlg-feedback no';
    playFeedbackSound('bad');
    document.querySelectorAll('.exp-option').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  document.getElementById('expNextBtn').disabled = false;
}

document.getElementById('expNextBtn')?.addEventListener('click', () => {
  expPaso++;
  if (expPaso < dialogosExplorador.length){
    renderExpPaso();
  } else {
    document.getElementById('expStage').style.display = 'none';
    document.getElementById('expNextBtn').style.display = 'none';
    document.querySelectorAll('[data-exp-stone]').forEach(s => s.classList.add('done'));
    document.getElementById('expCelebration').classList.add('show');
  }
});

function mostrarDialogosSimples(){
  document.getElementById('ensenar-section').classList.remove('active');
  document.getElementById('dialogo-bu-section').classList.remove('active');
  document.getElementById('ritmo-section').classList.remove('active');
  document.getElementById('pronunciacion-section').classList.remove('active');
  document.getElementById('dialogos-simples-section').classList.add('active');
  iniciarDialogosExplorador();
}

const bancoSonidosAnimales = [
  { numero: 1, animal: 'Gallo' },
  { numero: 2, animal: 'Perro' },
  { numero: 3, animal: 'Gato' },
  { numero: 4, animal: 'Vaca' },
  { numero: 5, animal: 'Pato' },
  { numero: 6, animal: 'Oveja' },
  { numero: 7, animal: 'Caballo' },
  { numero: 8, animal: 'León' },
  { numero: 9, animal: 'Elefante' },
  { numero: 10, animal: 'Rana' }
];
const RUTA_SONIDOS = 'sounds/';

let audRondas = [];
let audPaso = 0;

function iniciarAuditiva(){
  audPaso = 0;
  audRondas = elegirRondasAleatorias(3);
  document.getElementById('audCelebration').classList.remove('show');
  document.getElementById('audStage').style.display = 'flex';
  document.getElementById('audNextBtn').style.display = 'block';
  renderAudPaso();
}

function elegirRondasAleatorias(cantidad){
  const copia = [...bancoSonidosAnimales];
  const elegidas = [];
  for (let i = 0; i < cantidad; i++){
    const idx = Math.floor(Math.random() * copia.length);
    elegidas.push(copia.splice(idx, 1)[0]);
  }
  return elegidas;
}

function renderAudPaso(){
  const ronda = audRondas[audPaso];
  document.getElementById('audLine').textContent = 'Escucha con atención este sonido misterioso...';
  const source = document.getElementById('audSource');
  const audio = document.getElementById('audPlayer');
  const audioPath = `${RUTA_SONIDOS}${ronda.numero}.webm`;
  const distractores = bancoSonidosAnimales
    .filter(x => x.animal !== ronda.animal)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const opciones = [ronda, ...distractores].sort(() => Math.random() - 0.5);

  if (source){
    source.src = audioPath;
  } else if (audio){
    audio.src = audioPath;
  }

  if (audio){
    audio.load();
  }

  speakQuestionAndOptions('¿Qué animal hizo este sonido?', opciones.map(op => op.animal), 'es-ES', 0.85, 1.0);
  speakText('Escucha este sonido y elige qué animal lo hizo.', 'es-ES', 0.85, 1.0);

  const optsWrap = document.getElementById('audOptions');
  optsWrap.innerHTML = '';

  opciones.forEach(op => {
    const btn = document.createElement('button');
    btn.className = 'aud-option';
    btn.dataset.correct = (op.animal === ronda.animal);
    btn.innerHTML = `
      <svg class="aud-option-wedge" viewBox="0 0 34 34">
        <path d="M17 2 L32 17 L17 32 L2 17Z"/>
      </svg>
      <span class="aud-option-name">${op.animal}</span>
    `;
    btn.addEventListener('click', () => seleccionarAnimal(btn, op.animal === ronda.animal));
    optsWrap.appendChild(btn);
  });

  document.getElementById('audFeedback').textContent = '';
  document.getElementById('audFeedback').className = 'dlg-feedback';
  document.getElementById('audNextBtn').disabled = true;

  document.querySelectorAll('[data-aud-step]').forEach((dot, i) => {
    dot.classList.toggle('active', i === audPaso);
    dot.classList.toggle('done', i < audPaso);
  });
}

document.getElementById('audPlayBtn')?.addEventListener('click', () => {
  const btn = document.getElementById('audPlayBtn');
  const audio = document.getElementById('audPlayer');
  const source = document.getElementById('audSource');

  if (!audio || !source || !source.src){
    alert('No se encontró la pista de audio. Revisa que el archivo exista en sounds/.');
    return;
  }

  const canPlay = audio.canPlayType('audio/webm');
  if (!canPlay){
    alert('Tu navegador no puede reproducir audio .webm. Usa Chrome, Edge u otro navegador compatible.');
    return;
  }

  btn.classList.add('playing');
  audio.currentTime = 0;

  audio.onerror = () => {
    btn.classList.remove('playing');
    alert('No se pudo reproducir el audio. Asegúrate de que el archivo existe y el navegador lo soporta.');
  };

  audio.onended = () => btn.classList.remove('playing');
  audio.load();
  audio.play().catch((error) => {
    btn.classList.remove('playing');
    console.warn('Error al reproducir audio:', error);
    alert('No se pudo reproducir el audio. Verifica el archivo en la carpeta sounds.');
  });
});

function seleccionarAnimal(btn, esCorrecta){
  document.querySelectorAll('.aud-option').forEach(b => b.disabled = true);
  const feedback = document.getElementById('audFeedback');

  if (esCorrecta){
    btn.classList.add('correct');
    feedback.textContent = '¡Pista correcta, buen oído de detective!';
    feedback.className = 'dlg-feedback ok';
    playFeedbackSound('good');
    speakText('¡Correcto! Tienes oído de detective.', 'es-ES', 0.95, 1.05, 0.9);
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Casi... escucha la pista otra vez';
    feedback.className = 'dlg-feedback no';
    playFeedbackSound('bad');
    document.querySelectorAll('.aud-option').forEach(b => {
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
  }

  document.getElementById('audNextBtn').disabled = false;
}

document.getElementById('audNextBtn')?.addEventListener('click', () => {
  audPaso++;
  if (audPaso < audRondas.length){
    renderAudPaso();
  } else {
    document.getElementById('audStage').style.display = 'none';
    document.getElementById('audNextBtn').style.display = 'none';
    document.getElementById('audCelebration').classList.add('show');
    playFeedbackSound('good');
    speakText('¡Muy bien! Finalizaste la comprensión auditiva.', 'es-ES', 0.95, 1.05, 0.9);
  }
});

function mostrarAuditiva(){
  document.getElementById('ensenar-section').classList.remove('active');
  document.getElementById('dialogo-bu-section').classList.remove('active');
  document.getElementById('ritmo-section').classList.remove('active');
  document.getElementById('pronunciacion-section').classList.remove('active');
  document.getElementById('dialogos-simples-section').classList.remove('active');
  document.getElementById('auditiva-section').classList.add('active');
  iniciarAuditiva();
}

function mostrarPronunciacion(){
  document.getElementById('ensenar-section').classList.remove('active');
  document.getElementById('dialogo-bu-section').classList.remove('active');
  document.getElementById('ritmo-section').classList.remove('active');
  document.getElementById('dialogos-simples-section').classList.remove('active');
  document.getElementById('auditiva-section').classList.remove('active');
  document.getElementById('pronunciacion-section').classList.add('active');
  iniciarPronunciacion();
}

document.getElementById('dlgNextBtn')?.addEventListener('click', () => {
  dlgPaso++;
  if (dlgPaso < dialogosBu.length){
    renderDialogoPaso();
  } else {
    document.querySelector('.dlg-stage').style.display = 'none';
    document.getElementById('dlgNextBtn').style.display = 'none';
    document.getElementById('dlgCelebration').classList.add('show');
    playFeedbackSound('good');
    speakText('¡Muy bien! Completaste la conversación con Bú.', 'es-ES', 0.95, 1.05, 0.9);
  }
});

function volverAEnsenar(){
  document.getElementById('dialogo-bu-section').classList.remove('active');
  document.getElementById('dialogos-simples-section').classList.remove('active');
  document.getElementById('pronunciacion-section').classList.remove('active');
  document.getElementById('ritmo-section').classList.remove('active');
  document.getElementById('ensenar-section').classList.add('active');
}
