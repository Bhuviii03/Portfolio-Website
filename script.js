const projects = {
  NoteZipper: {
    title: "NoteZipper",
    img: "notezipper.png", // path to project image if you have one (e.g. '/assets/notezipper.png')
    desc: "A full-stack note-taking application built using MERN stack (MongoDB, Express, React, Node.js). NoteZipper features a vibrant, user-friendly interface allowing users to organize, color-code, and manage their notes effectively. The platform supports seamless note categorization and search, making productivity and task management easier and enjoyable.",
    links: [
      { label: "Repository", href: "https://github.com/Bhuviii03/NoteZipper" },
    ],
  },
  RescuWave: {
    title: "RescuWave",
    img: "rescuwave.png",
    desc: "An Android-based emergency response application leveraging Firebase for real-time location sharing and SOS alerts. It helps users quickly request assistance and notify trusted contacts during emergencies. The app integrates intuitive UI for rapid interaction and reliable connectivity, ensuring prompt emergency support anytime, anywhere.",
    links: [
      { label: "Repository", href: "https://github.com/mNik033/RescuWave" },
    ],
  },
  BlogTown: {
    title: "Blog Town",
    img: "blogtown.png",
    desc: "A responsive personal blog site crafted with HTML, CSS, and JavaScript. Blog Town serves as a platform for sharing tech insights, tutorials, and personal experiences with a clean, modern layout, focusing on readability and easy navigation for visitors.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/Bhuviii03/Blog-Website",
      },
      {
        label: "Live (demo)",
        href: "https://bhuviii03.github.io/Blog-Website/",
      },
    ],
  },
  HotelBooking: {
    title: "Hotel Booking App and Website",
    img: "hotelbookingapp.png",
    desc: "Designed an intuitive hotel booking app and website featuring virtual tours, easy room selection, and secure payment processing. Developed UI/UX flows for a seamless booking experience, enhancing customer satisfaction and engagement with consistent visual language.",
    links: [
      {
        label: "Figma Link",
        href: "https://www.figma.com/design/GXOw7CTJywrCHnK3KFkNQM/Hotel?node-id=0-1",
      },
    ],
  },
  CloudGame: {
    title: "Cloud Gaming Community App and Website",
    img: "cloudgame.png",
    desc: "Developed a community platform for cloud gaming enthusiasts with forums, user profiles, live streaming integration, and interactive features. The design fosters connection and engagement within the gamer community, presenting content through clean layouts and easy access.",
    links: [
      {
        label: "Figma Link",
        href: "https://www.figma.com/design/RcBg8WyQbu2oXCKEnX0PlU/GAME",
      },
    ],
  },
};

/* ===== Modal handlers ===== */
const backdrop = document.getElementById("modalBackdrop");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalThumb = document.getElementById("modalThumb");
const modalDesc = document.getElementById("modalDesc");
const modalLinks = document.getElementById("modalLinks");

function openProjectModal(key) {
  const p = projects[key];
  if (!p) return;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalLinks.innerHTML = "";
  p.links.forEach((l) => {
    const a = document.createElement("a");
    a.href = l.href;
    a.target = "_blank";
    a.className = "btn-outline";
    a.style.display = "inline-block";
    a.style.fontSize = "13px";
    a.style.marginRight = "8px";
    a.textContent = l.label;
    modalLinks.appendChild(a);
  });

  // thumbnail: use provided img path or a generated gradient placeholder
  modalThumb.innerHTML = "";
  if (p.img) {
    const im = document.createElement("img");
    im.src = p.img;
    im.alt = p.title;
    im.style.width = "100%";
    im.style.height = "100%";
    im.style.objectFit = "cover";
    modalThumb.appendChild(im);
  } else {
    // placeholder with project title
    const ph = document.createElement("div");
    ph.style.width = "100%";
    ph.style.height = "100%";
    ph.style.display = "flex";
    ph.style.alignItems = "center";
    ph.style.justifyContent = "center";
    ph.style.fontWeight = "700";
    ph.style.fontSize = "20px";
    ph.style.color = "rgba(255,255,255,0.08)";
    ph.style.background =
      "linear-gradient(135deg, rgba(110,231,183,0.04), rgba(76,201,240,0.02))";
    ph.textContent = p.title;
    modalThumb.appendChild(ph);
  }

  backdrop.style.display = "flex";
  // small timeout so CSS transition can animate
  requestAnimationFrame(() => modal.classList.add("show"));
  backdrop.removeAttribute("aria-hidden");
}

function closeProjectModal() {
  modal.classList.remove("show");
  backdrop.setAttribute("aria-hidden", "true");
  setTimeout(() => (backdrop.style.display = "none"), 260);
}

// close when clicking outside modal content
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeProjectModal();
});
// escape key closes modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

/* ===== Floating bubbles logic ===== */
const bubblesContainer = document.getElementById("bubbles");

// create some bubbles with random sizes, positions, durations
function createBubble(i) {
  const b = document.createElement("div");
  b.className = "bubble";
  const size = 30 + Math.round(Math.random() * 180); // varied sizes
  b.style.width = size + "px";
  b.style.height = size + "px";
  // start horizontal somewhere across -20% .. 120% to allow float-in
  const left = Math.random() * 120;
  b.style.left = left + "%";
  // random vertical start between 60% and 110% (so many float up)
  b.style.top = 60 + Math.random() * 50 + "%";
  // varied opacity
  b.style.opacity = (0.06 + Math.random() * 0.28).toFixed(2);
  // slight horizontal drift direction
  const drift = (Math.random() * 40 - 20).toFixed(2);
  const duration = 16 + Math.random() * 22; // seconds
  b.style.transition = `transform ${duration}s linear, opacity ${
    duration / 2
  }s ease-in-out`;
  // animate using transform to move up and drift horizontally
  // apply initial transform and then a timeout to move to final position
  bubblesContainer.appendChild(b);
  // small delay so they don't all start same time
  setTimeout(() => {
    b.style.transform = `translate3d(${drift}px, -140vh, 0) rotate(${
      Math.random() * 180
    }deg)`;
    // fade slightly
    b.style.opacity = (0.02 + Math.random() * 0.12).toFixed(2);
  }, 60 * i);
  // remove after animation completes
  setTimeout(() => b.remove(), duration * 1000 + 2000);
}

// spawn bubbles continuously but limited
function spawnBubbles(count) {
  for (let i = 0; i < count; i++) {
    createBubble(i);
  }
}
// initial spawn and periodic spawn
spawnBubbles(10);
setInterval(() => spawnBubbles(6), 3500);

/* ===== Reveal animations on scroll ===== */
const revealEls = document.querySelectorAll(".fade-in-up");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => obs.observe(el));

/* ===== Smooth nav scrolling ===== */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ===== Initialize tiny accessibility focus trap when modal opens =====
       (keeps example simple; for production consider a full focus-trap library) */
modal.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    // simple trap: keep focus inside modal by preventing tab if no focusable next found
    const focusables = modal.querySelectorAll(
      'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    // let browser handle default — lightweight approach
  }
});
