const questions = [ 
  {
    text: "On peut manger un yaourt même après sa date de durabilité minimale (DDM).",
    image: "images/yaourt_pot.png",
    answer: true,
    explanation: "La DDM est une date indicative. Le produit est souvent encore bon après."
  },
  {
    text: "Une banane tachetée est bonne à jeter.",
    image: "images/banane.png",
    answer: false,
    explanation: "Les bananes tachetées sont parfaites pour des smoothies ou gâteaux."
  },
  {
    text: "Le pain rassis est inutilisable.",
    image: "images/pain.png",
    answer: false,
    explanation: "Il peut être utilisé en chapelure, croûtons ou pain perdu."
  },
  {
    text: "Les fruits moches ont moins de goût.",
    image: "images/pomme.png",
    answer: false,
    explanation: "Leur aspect change mais pas leur goût ni leurs nutriments."
  },
  {
    text: "Les légumes flétris sont encore comestibles.",
    image: "images/carottes.png",
    answer: true,
    explanation: "Ils peuvent être cuits en soupe, purée, etc."
  },
  {
    text: "Il faut jeter un œuf dès qu’il a dépassé la date sur la boîte.",
    image: "images/oeuf_verre.png",
    answer: false,
    explanation: "Le test de flottaison dans l’eau suffit à savoir s’il est bon."
  },
  {
    text: "On peut congeler des produits proches de la date limite.",
    image: "images/pain_congele.png",
    answer: true,
    explanation: "Congeler permet de prolonger leur durée de vie sans risque."
  },
  {
    text: "Il faut laver les fruits et légumes avant de les ranger.",
    image: "images/frigo_salade.png",
    answer: false,
    explanation: "Mieux vaut les laver juste avant consommation pour éviter moisissures."
  },
  {
    text: "Un produit dont l’emballage est abîmé doit être jeté.",
    image: "images/conserve.png",
    answer: false,
    explanation: "Si le produit est intact et correctement stocké, il est consommable."
  },
  {
    text: "Une tomate un peu molle est encore bonne à manger.",
    image: "images/tomate_molle.png",
    answer: true,
    explanation: "Elle peut être cuisinée sans problème."
  },
  {
    text: "Les DLC sont plus strictes que les DDM.",
    image: "images/lait.png",
    answer: true,
    explanation: "DLC = risque sanitaire ; DDM = qualité uniquement."
  },
  {
    text: "On peut jeter les fanes de carottes, ça ne se mange pas.",
    image: "images/carottes.png",
    answer: false,
    explanation: "Les fanes sont comestibles : pesto, soupe, etc."
  },
  {
    text: "Le lait peut encore être bu après sa DDM s’il sent bon.",
    image: "images/lait.png",
    answer: true,
    explanation: "S’il a bon goût et bonne odeur, il est encore OK."
  },
  {
    text: "Un produit surgelé peut se consommer après sa DDM s’il a été bien conservé.",
    image: "images/pain_congele.png",
    answer: true,
    explanation: "À -18°C constant, il peut durer bien plus longtemps."
  },
  {
    text: "Les promotions 1 acheté = 1 offert favorisent le gaspillage.",
    image: "images/promo_eau.png",
    answer: true,
    explanation: "On achète parfois plus que nécessaire."
  },
  {
    text: "Il est dangereux de consommer un fromage à croûte dure après sa date.",
    image: "images/fromage.png",
    answer: false,
    explanation: "S’il n’a pas de moisissure anormale, il est encore bon."
  },
  {
    text: "Jeter une pomme abîmée est mieux que la couper.",
    image: "images/pomme_coupee.png",
    answer: false,
    explanation: "Une partie abîmée peut être retirée, le reste est comestible."
  },
  {
    text: "Les restes ne doivent pas être gardés plus de 24h.",
    image: "images/pizza_gaspillee.png",
    answer: false,
    explanation: "Bien conservés, les restes se gardent 2 à 3 jours au frigo."
  },
  {
    text: "Congeler les restes permet de limiter le gaspillage.",
    image: "images/pain_congele.png",
    answer: true,
    explanation: "Excellente façon de prolonger leur durée de vie."
  },
  {
    text: "Les œufs doivent toujours être conservés au frigo.",
    image: "images/oeuf_cru.png",
    answer: false,
    explanation: "Dans certains pays, ce n’est pas nécessaire selon conservation initiale."
  }
];
let currentIndex = 0;
let score = 0;
let timer = 30;
let interval;
let shuffledQuestions = [];

function startQuiz() {
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  score = 0;
  timer = 30;
  currentIndex = 0;
  document.getElementById("score").textContent = "Score : 0";
  document.getElementById("timer").textContent = "Temps : 30 s";
  document.getElementById("next-btn").classList.add("hidden");
  showQuestion();

  interval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `Temps : ${timer} s`;
    if (timer <= 0) {
      currentIndex++;
      if (currentIndex < 10) {
        showQuestion();
        timer = 30;
      } else {
        endQuiz();
      }
    }
  }, 1000);
}

function showQuestion() {
  const q = shuffledQuestions[currentIndex];
  document.getElementById("question-text").textContent = q.text;
  document.getElementById("question-image").src = q.image;
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").classList.add("hidden");
  document.getElementById("timer").textContent = `Temps : ${timer} s`;
}

function answer(userAnswer) {
  const q = shuffledQuestions[currentIndex];
  if (userAnswer === q.answer) {
    score++;
    document.getElementById("feedback").textContent = q.explanation;
    document.getElementById("feedback").style.color = "green";
  } else {
    document.getElementById("feedback").textContent = q.explanation;
    document.getElementById("feedback").style.color = "red";
  }
  document.getElementById("score").textContent = `Score : ${score}`;
  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < 10) {
    timer = 30;
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(interval);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = `Votre score : ${score} / 10`;

  let message = "";
  if (score === 10) {
    message = "🎉 Parfait ! Vous êtes un vrai champion du zéro gaspi !";
  } else if (score >= 8) {
    message = "🍞 Bravo, votre bon sens anti-gaspi fait la différence !";
  } else if (score >= 5) {
    message = "😊 Pas mal, vous êtes sur la bonne voie.";
  } else {
    message = "💡 C'est le moment de découvrir comment éviter le gaspillage alimentaire.";
  }

  document.getElementById("final-message").textContent = message;
}

function restartQuiz() {
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
}
