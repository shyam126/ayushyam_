document.addEventListener("DOMContentLoaded", () => {

  /******** 🔥 FIREBASE CONFIG ********/
  const firebaseConfig = {
    apiKey: "AIzaSyCbWHq6lA1ps1EYnRZ1Fej5WFAK4EnzLco",
    authDomain: "customcount-1ac47.firebaseapp.com",
    databaseURL: "https://customcount-1ac47-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "customcount-1ac47",
    storageBucket: "customcount-1ac47.firebasestorage.app",
    messagingSenderId: "790474863358",
    appId: "1:790474863358:web:a44a44b479620d87f76baf"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const yesRef = database.ref("yesClicks");

  /******** 🎶 MUSIC ********/
  const music = document.getElementById("bg-music");
  document.addEventListener("click", () => {
    music.muted = false;
    music.play().catch(() => {});
  }, { once: true });

  /******** 📸 SLIDESHOW ********/
  const images = [
    { src: "pic/love1.jpeg", caption: "This smile is my favorite." },
    { src: "pic/love2.jpeg", caption: "A moment I never forgot." },
    { src: "pic/love3.jpeg", caption: "I hope we make many more like this." }
  ];

  let index = 0;
  const slide = document.getElementById("slide");
  const caption = document.getElementById("caption");

  caption.innerText = images[0].caption;

  setInterval(() => {
    index = (index + 1) % images.length;
    slide.style.opacity = 0;
    setTimeout(() => {
      slide.src = images[index].src;
      caption.innerText = images[index].caption;
      slide.style.opacity = 1;
    }, 500);
  }, 3500);

  /******** 🕰 TIMELINE ********/
  const storyText = document.getElementById("storyText");
  document.querySelectorAll(".timeline button").forEach(btn => {
    btn.addEventListener("click", () => {
      storyText.innerText = btn.dataset.story;
    });
  });

  /******** 🎁 SURPRISE ********/
  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseText = document.getElementById("surpriseText");

  surpriseBtn.addEventListener("click", () => {
    surpriseText.innerText =
      "No matter what today brings, I just want you to know — you matter to me 💖";
    surpriseBtn.disabled = true;
  });

  /******** 🎥 YES BUTTON VIDEO POPUP (STAYS OPEN) ********/
  const videoModal = document.getElementById("videoModal");
  const yesVideo = document.getElementById("yesVideo");
  const closeModalBtn = document.getElementById("closeModal");

  // ✅ Safety: If modal elements are missing, don't break the rest of the page
  function openVideoModal() {
    if (!videoModal || !yesVideo) return;

    videoModal.classList.add("show");

    // Restart from beginning each time
    yesVideo.currentTime = 0;
    yesVideo.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !yesVideo) return;

    videoModal.classList.remove("show");
    yesVideo.pause();
    yesVideo.currentTime = 0;
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeVideoModal);
  }

  if (videoModal) {
    // Close when clicking outside the modal content (overlay click)
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("show")) {
      closeVideoModal();
    }
  });

  // ❌ Do NOT add ended event => it must stay open until user closes
  // yesVideo.addEventListener("ended", closeVideoModal);

  /******** 😊 YES BUTTON ********/
  const yesBtn = document.getElementById("yesBtn");
  const result = document.getElementById("result");

  // Check if already counted in Firebase
  const alreadySaved = localStorage.getItem("yesSaved");

  if (alreadySaved) {
    result.innerText = "My Buggii + Her Yes = Perfect Love 💞";
  }

  yesBtn.addEventListener("click", () => {

    // ✅ Button always clickable
    result.innerText = "That smile just made my day 💖";

    // ✅ Save to Firebase ONLY ONCE
    if (!localStorage.getItem("yesSaved")) {
      localStorage.setItem("yesSaved", "true");

      // Safe Firebase increment
      yesRef.transaction(count => {
        return (count || 0) + 1;
      });
    } else {
      // Optional message for repeated clicks
      result.innerText = "You keep saying YES 😄💖";
    }

    // ✅ Open video popup and play (stays open until user closes)
    openVideoModal();
  });

  /******** ❤️ FALLING HEARTS ********/
  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";
    document.getElementById("hearts-container").appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 350);

  /******** 🕰 TIMELINE POP‑IN BOX ********/
  const storyBox = document.getElementById("storyBox");
  const storyBoxText = document.getElementById("storyBoxText");

  document.querySelectorAll(".timeline button").forEach(button => {
    button.addEventListener("click", () => {
      // NOTE: Your HTML currently doesn't show storyBox/storyBoxText.
      // If they don't exist, this will error. Add a guard:
      if (!storyBox || !storyBoxText) return;

      storyBoxText.innerText = button.dataset.story;
      storyBox.classList.add("show");
    });
  });

});
