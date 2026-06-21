/* ==========================================
   AI MEDICAL ASSISTANT
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initSidebar();

    initAnimations();

    initMedicineSearch();

    initChatScroll();

    initTypingIndicator();

    initUploadArea();

    initCounters();

});

/* ==========================================
   SIDEBAR ACTIVE LINK
========================================== */

function initSidebar() {

    const links =
        document.querySelectorAll(".menu a");

    links.forEach(link => {

        if (
            link.href === window.location.href
        ) {

            link.parentElement.classList.add("active");
        }

    });

}

/* ==========================================
   FADE IN ANIMATION
========================================== */

function initAnimations() {

    const cards = document.querySelectorAll(
        ".glass-card, .stat-card, .tool-card, .medicine-card, .analysis-card, .upload-card"
    );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0px)";
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(25px)";

        card.style.transition =
            "all .6s ease";

        observer.observe(card);

    });

}

/* ==========================================
   MEDICINE SEARCH
========================================== */

function initMedicineSearch() {

    const searchInput =
        document.querySelector(
            "input[name='medicine']"
        );

    if (!searchInput) return;

    searchInput.addEventListener(
        "focus",
        () => {

            searchInput.parentElement.style.transform =
                "scale(1.01)";
        }
    );

    searchInput.addEventListener(
        "blur",
        () => {

            searchInput.parentElement.style.transform =
                "scale(1)";
        }
    );

}

/* ==========================================
   CHAT AUTO SCROLL
========================================== */

function initChatScroll() {

    const chatBox =
        document.querySelector(
            ".chat-messages"
        );

    if (!chatBox) return;

    chatBox.scrollTop =
        chatBox.scrollHeight;

}

/* ==========================================
   TYPING INDICATOR
========================================== */

function initTypingIndicator() {

    const form =
        document.querySelector(
            ".chat-input-area"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        () => {

            const container =
                document.querySelector(
                    ".chat-messages"
                );

            if (!container) return;

            const typing =
                document.createElement("div");

            typing.className =
                "message-bot typing-message";

            typing.innerHTML = `
                <div class="message-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>

                <div class="message-content">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            `;

            container.appendChild(typing);

            container.scrollTop =
                container.scrollHeight;
        }
    );

}

/* ==========================================
   DRAG & DROP UPLOAD
========================================== */

function initUploadArea() {

    const uploadArea =
        document.querySelector(
            ".upload-area"
        );

    if (!uploadArea) return;

    const fileInput =
        uploadArea.querySelector(
            "input[type='file']"
        );

    uploadArea.addEventListener(
        "dragover",
        e => {

            e.preventDefault();

            uploadArea.style.borderColor =
                "#5f7dff";

            uploadArea.style.background =
                "rgba(95,125,255,.08)";
        }
    );

    uploadArea.addEventListener(
        "dragleave",
        () => {

            uploadArea.style.borderColor =
                "rgba(95,125,255,.35)";

            uploadArea.style.background =
                "transparent";
        }
    );

    uploadArea.addEventListener(
        "drop",
        e => {

            e.preventDefault();

            uploadArea.style.borderColor =
                "rgba(95,125,255,.35)";

            uploadArea.style.background =
                "transparent";

            if (
                e.dataTransfer.files.length
            ) {

                fileInput.files =
                    e.dataTransfer.files;

                showFileName(
                    e.dataTransfer.files[0].name
                );
            }

        }
    );

    fileInput.addEventListener(
        "change",
        () => {

            if (
                fileInput.files.length
            ) {

                showFileName(
                    fileInput.files[0].name
                );
            }

        }
    );

}

/* ==========================================
   SHOW FILE NAME
========================================== */

function showFileName(name) {

    const uploadArea =
        document.querySelector(
            ".upload-area"
        );

    if (!uploadArea) return;

    let existing =
        document.querySelector(
            ".selected-file"
        );

    if (existing) {

        existing.remove();
    }

    const fileTag =
        document.createElement("div");

    fileTag.className =
        "selected-file";

    fileTag.innerHTML = `
        <i class="fa-solid fa-file-image"></i>
        ${name}
    `;

    fileTag.style.marginTop = "15px";
    fileTag.style.color = "#7ce9ff";
    fileTag.style.fontWeight = "600";

    uploadArea.appendChild(fileTag);

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    counters.forEach(counter => {

        const target =
            parseInt(
                counter.dataset.target
            );

        if (!target) return;

        let current = 0;

        const speed =
            Math.ceil(target / 50);

        const update = () => {

            current += speed;

            if (current >= target) {

                counter.innerText =
                    target;

                return;
            }

            counter.innerText =
                current;

            requestAnimationFrame(update);

        };

        update();

    });

}

/* ==========================================
   PRINT REPORT
========================================== */

function printReport() {

    window.print();

}

/* ==========================================
   DOWNLOAD REPORT AS HTML
   (DEMO VERSION)
========================================== */

function downloadReport() {

    const report =
        document.querySelector(
            ".report-container"
        );

    if (!report) return;

    const blob =
        new Blob(
            [report.outerHTML],
            {
                type: "text/html"
            }
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "medical_report.html";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

/* ==========================================
   QUICK SYMPTOM CHIPS
========================================== */

document.addEventListener(
    "click",
    e => {

        if (
            e.target.matches(
                ".symptom-tags span"
            )
        ) {

            const input =
                document.querySelector(
                    "input[name='symptom']"
                );

            if (!input) return;

            if (
                input.value.trim() === ""
            ) {

                input.value =
                    e.target.innerText;
            } else {

                input.value +=
                    ", " +
                    e.target.innerText;
            }

            input.focus();

        }

    }
);

/* ==========================================
   LIVE CLOCK (OPTIONAL)
========================================== */

function startClock() {

    const clock =
        document.getElementById(
            "live-clock"
        );

    if (!clock) return;

    setInterval(() => {

        const now =
            new Date();

        clock.innerText =
            now.toLocaleTimeString();

    }, 1000);

}

startClock();

/* ==========================================
   LOADING BUTTON STATE
========================================== */

document.addEventListener(
    "submit",
    function (e) {

        const btn =
            e.target.querySelector(
                "button[type='submit']"
            );

        if (!btn) return;

        const original =
            btn.innerHTML;

        btn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Processing';

        btn.disabled = true;

        setTimeout(() => {

            btn.innerHTML =
                original;

            btn.disabled = false;

        }, 5000);

    }
);

/* ==========================================
   TOAST MESSAGE
========================================== */

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.padding = "14px 20px";
    toast.style.borderRadius = "14px";
    toast.style.background =
        "linear-gradient(135deg,#5f7dff,#25d7ff)";
    toast.style.color = "#fff";
    toast.style.zIndex = "9999";
    toast.style.fontWeight = "600";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

/* ==========================================
   END OF FILE
========================================== */
