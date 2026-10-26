
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const themeButton = document.querySelector(".theme-toggle");
const appointmentDate = document.querySelector("#appointment-date");
const form = document.querySelector(".appointment-form");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function setTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.innerHTML = isDark
      ? '<span aria-hidden="true">☀</span> Switch to light mode'
      : '<span aria-hidden="true">◐</span> Switch to dark mode';
  }
}

try {
  const savedTheme = localStorage.getItem("pawcare-theme");
  setTheme(savedTheme === "dark");
} catch {
  setTheme(false);
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    setTheme(isDark);

    try {
      localStorage.setItem("pawcare-theme", isDark ? "dark" : "light");
    } catch {
      // Theme switching still works if storage is unavailable.
    }
  });
}

function setMinimumAppointmentDate() {
  if (!appointmentDate) return;

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  appointmentDate.min = localToday;
}

setMinimumAppointmentDate();

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    alert(
      "Thank you! Your demo appointment request passed validation. This sample website does not send data to a clinic."
    );

    form.reset();
    setMinimumAppointmentDate();
  });
}
