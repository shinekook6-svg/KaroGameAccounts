// Store Original Home Layout
let originalHomeHTML = "";

window.addEventListener('DOMContentLoaded', () => {
    const mainApp = document.getElementById('main-app');
    originalHomeHTML = mainApp.innerHTML;
    initParallaxCanvas();
    
    // First Load မှာ Card Animation စတင်ရန်
    initCardScrollAnimation();
});

// Go Back to Home Function
function goHome() {
    const mainApp = document.getElementById('main-app');
    mainApp.innerHTML = originalHomeHTML;
    
    window.scrollTo({ top: 0, behavior: 'instant' });

    gsap.from(".fade-card", {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    });

    // 🔴 DOM အသစ်ဝင်လာလို့ Animation ကို Re-initialize ပြန်လုပ်ပေးရမယ်
    setTimeout(() => {
        initCardScrollAnimation();
    }, 100); 
}
// 1. Open MLBB Categories Page
function openMlbbCategories() {
    const mainApp = document.getElementById('main-app');
    
    mainApp.innerHTML = `
        <div class="category-page-bg" style="padding: 100px 15px 60px 15px; min-height: 100vh; position: relative; overflow-x: hidden;">
            
            <div class="parallax-orb orb-1"></div>
            <div class="parallax-orb orb-2"></div>

            <div class="detail-header" style="position: relative; z-index: 2; max-width: 600px; margin: 0 auto 30px auto;">
                <img src="BackIcon.png" alt="Back" class="back-img-btn" onclick="goHome()" onerror="this.src='https://cdn-icons-png.flaticon.com/512/271/271220.png'">
                <h2 class="section-title" style="margin: 0; font-size: 1.8rem;">MLBB CATEGORIES</h2>
                <div style="width: 48px;"></div>
            </div>

            <!-- FAKE DECK LAYER -->
            <div id="fake-deck-layer"></div>

            <!-- REAL TARGET CONTAINER -->
            <div class="category-container" style="position: relative; z-index: 2;">
                
                <div class="category-card" onclick="openMlbbAccounts('High Rank')" style="background-image: url('HighRankBg.png');">
                    <div class="light-sweep"></div>
                    <div class="category-card-overlay">
                        <h3 style="color: #eab308;">High Rank</h3>
                        <p>Mythic & Glory Accounts</p>
                    </div>
                </div>

                <div class="category-card" onclick="openMlbbAccounts('Skins')" style="background-image: url('SkinsBg.png');">
                    <div class="light-sweep"></div>
                    <div class="category-card-overlay">
                        <h3 style="color: #06b6d4;">Skins</h3>
                        <p>Collector & Epic Skins</p>
                    </div>
                </div>

                <div class="category-card" onclick="openMlbbAccounts('Rank & Skin')" style="background-image: url('RankSkinBg.png');">
                    <div class="light-sweep"></div>
                    <div class="category-card-overlay">
                        <h3 style="color: #ec4899;">Rank & Skins</h3>
                        <p>Complete Combo Accounts</p>
                    </div>
                </div>

                <div class="category-card" onclick="openMlbbAccounts('Budget')" style="background-image: url('BudgetBg.png');">
                    <div class="light-sweep"></div>
                    <div class="category-card-overlay">
                        <h3 style="color: #22c55e;">Low Budget</h3>
                        <p>Affordable Accounts</p>
                    </div>
                </div>

            </div>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'instant' });

    // Header Fade Down
    gsap.from(".detail-header", { duration: 0.5, y: -30, opacity: 0, ease: "power2.out" });

    // ==========================================
    // 🎬 MASTERPIECE NATURAL MOTION ENGINE
    // ==========================================
    const realCards = document.querySelectorAll('.category-card');
    const fakeDeckLayer = document.getElementById('fake-deck-layer');
    
    // 🛑 1️⃣ ANIMATION မပြီးမချင်း REAL CARDS တွေကို နှိပ်လို့မရအောင် POINTER EVENTS OFF ထားမည်
    gsap.set(realCards, { 
        opacity: 0, 
        pointerEvents: "none" 
    });

    const sampleRect = realCards[0].getBoundingClientRect();

    const fakeCards = [];
    realCards.forEach((card, index) => {
        const fakeCard = document.createElement('div');
        fakeCard.className = 'fake-card';
        fakeCard.style.backgroundImage = card.style.backgroundImage;
        fakeCard.style.width = `${sampleRect.width}px`;
        fakeCard.style.height = `${sampleRect.height}px`;
        fakeDeckLayer.appendChild(fakeCard);
        fakeCards.push(fakeCard);
    });

    // CENTER STACK
    gsap.set(fakeCards, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "45%",
        scale: 1,
        opacity: 0,
        x: 0,
        y: 0,
        rotation: 0
    });

    fakeCards.forEach((card, i) => {
        gsap.set(card, { zIndex: i + 1 }); 
    });

    const tl = gsap.timeline();

    // Fade In Center Stack
    tl.to(fakeCards, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out"
    })

    // PRE-SHUFFLE EFFECT
    .to(fakeCards, {
        x: (i) => [ -6, 8, -5, 7 ][i],
        rotation: (i) => [ -3, 4, -2, 3 ][i],
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
    })

    // SHRINK BEFORE SPREAD
    .to(fakeCards, {
        scale: 0.38,
        x: 0,
        rotation: 0,
        duration: 0.22,
        ease: "power2.inOut"
    })

    // NATURAL FAN SPREAD
    .to(fakeCards, {
        x: (i) => [-165, -55, 55, 165][i],
        rotation: (i) => [-12, -4, 4, 12][i],
        scale: (i) => [0.36, 0.38, 0.38, 0.36][i],
        duration: 0.35,
        ease: "back.out(1.2)",
        onStart() {
            if (typeof playSound === "function") playSound("Swoosh1.mp3", { volume: 0.6 });
        }
    })

    // CINEMATIC FREEZE
    .to({}, { duration: 0.18 })

    // SEQUENTIAL RHYTHM LANDING WITH BOUNCE SNAP
    fakeCards.forEach((fakeCard, i) => {
        const realCard = realCards[i];
        const rect = realCard.getBoundingClientRect();
        const targetTop = rect.top + window.scrollY;

        tl.to(fakeCard, {
            left: rect.left + rect.width / 2,
            top: targetTop + rect.height / 2,
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.36 + i * 0.03,
            ease: "expo.out",
            onStart() {
                if (typeof playSound === "function") playSound("Card_swoosh.mp3", { volume: 0.5 });
            },
            onComplete() {
                // ✅ 2️⃣ LANDING ပြီးသွားမှ REAL CARD ကို ပေါ်စေပြီး နှိပ်လို့ရအောင် POINTER EVENTS "AUTO" ပြန်ဖွင့်မည်
                gsap.set(realCard, { 
                    opacity: 1, 
                    pointerEvents: "auto" 
                });
                fakeCard.remove();

                // AAA MICRO BOUNCE SNAP EFFECT
                gsap.fromTo(realCard, 
                    { scale: 1.05 }, 
                    { scale: 1, duration: 0.18, ease: "power2.out" }
                );

                // Light Sweep Action
                const sweep = realCard.querySelector(".light-sweep");
                if (sweep) {
                    gsap.fromTo(sweep, 
                        { left: "-100%" }, 
                        { left: "200%", duration: 0.45, ease: "power2.inOut" }
                    );
                }

                // Smooth Floating Loop
                gsap.to(realCard, {
                    y: "-=3",
                    duration: 2.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }, "-=0.12");
    });
}
// 2. Accounts များကို Category အလိုက် Filter လုပ်ပြီး ပြသရန် Function
let currentFilteredAccounts = [];
let currentIndex = 0;
function openMlbbAccounts(categoryName) {
    const mainApp = document.getElementById('main-app');

    currentFilteredAccounts = gameAccounts.mlbb.filter(acc => acc.type.toLowerCase() === categoryName.toLowerCase());  
    currentIndex = 0; 

    if (currentFilteredAccounts.length === 0) {  
        mainApp.innerHTML = `  
            <div class="detail-page-wrapper" style="padding: 100px 15px 60px 15px; min-height: 100vh; max-width: 600px; margin: 0 auto; position: relative;">  
                <div class="detail-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px;">  
                    <img src="BackIcon.png" alt="Back" class="back-img-btn" onclick="openMlbbCategories()" onerror="this.src='https://cdn-icons-png.flaticon.com/512/271/271220.png'" style="cursor: pointer; width: 32px;">  
                    <h2 class="section-title" style="margin: 0; font-size: 1.4rem; text-align: center;">MLBB: ${categoryName.toUpperCase()}</h2>  
                    <div style="width: 32px;"></div>  
                </div>  
                <p style="text-align: center; color: #a0aec0; padding: 40px; font-size: 1.1rem;">ဒီ Category ထဲမှာ အကောင့် မရှိသေးပါဘူး သားကြီး။</p>  
            </div>  
        `;  
        return;
    }  

    let firstCardHTML = generateCardHTML(currentFilteredAccounts[0]);

    mainApp.innerHTML = `  
        <div class="detail-page-wrapper" style="padding: 100px 15px 60px 15px; min-height: 100vh; max-width: 600px; margin: 0 auto; position: relative;">  
            
            <div class="detail-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; background: rgba(11,15,25,0.9); padding: 10px 0; position: sticky; top: 0; z-index: 10; backdrop-filter: blur(10px);">  
                <img src="BackIcon.png" alt="Back" class="back-img-btn" onclick="openMlbbCategories()" onerror="this.src='https://cdn-icons-png.flaticon.com/512/271/271220.png'" style="cursor: pointer; width: 32px;">  
                <h2 class="section-title" style="margin: 0; font-size: 1.4rem; text-align: center;">MLBB: ${categoryName.toUpperCase()}</h2>  
                <div style="width: 32px;"></div>  
            </div>  
            
            <div class="product-container">  
                ${firstCardHTML}  
            </div>  

            <!-- Premium Next Button & Counter Section (Gap နီးပါးမရှိအောင် margin-top ကို 12px သာထားသည်) -->
            <div id="next-btn-container" style="text-align: center; margin-top: 12px; margin-bottom: 50px;">
                ${currentFilteredAccounts.length > 1 ? `
                    <!-- Counter ကို Button အပေါ်မှာ သီးသန့်ခွဲထုတ်ပြခြင်း -->
                    <div style="color: #06b6d4; font-family: 'Orbitron', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 8px; text-shadow: 0 0 10px rgba(6,182,212,0.3);">
                        SHOWING ${currentIndex + 1} OF ${currentFilteredAccounts.length}
                    </div>

                    <!-- Premium Glassmorphism Next Button -->
                    <button onclick="loadNextAccount()" class="premium-next-btn">
                        <span>NEXT ACCOUNT</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                ` : ''}
            </div>
        </div>  
    `;  

    window.scrollTo({ top: 0, behavior: 'instant' });  
    playSingleCardAnimation(document.querySelector('.fade-card'));
}
function generateCardHTML(acc) {
    const isSold = acc.status && acc.status.toUpperCase() === "SOLD OUT";  
    const ribbonClass = isSold ? "ribbon-sale ribbon-sold" : "ribbon-sale";
    
    return `
    <div class="account-showcase-card fade-card" style="margin-bottom: 16px;"> <!-- Card တစ်ခုနဲ့တစ်ခုကြား Gap ကိုလည်း 16px သို့ လျှော့ချထားသည် -->
        <div class="${ribbonClass}">${acc.status || "FOR SALE"}</div>
        <span class="game-type-badge">MLBB</span>
        <div class="account-image-box">
            <img src="${acc.cardImage}" alt="Account Image" class="card-account-img" onerror="this.src='https://via.placeholder.com/600x600'">
        </div>
        <div class="price-container">
            <div class="current-price">
                <span class="gold-sweep"></span>
                ${acc.price}
            </div>
            ${acc.oldPrice ? `<div class="old-price">${acc.oldPrice}</div>` : ''}
        </div>
        <h3 class="account-rank-title">${acc.rankTitle}</h3>
        <div class="account-stats">
            <div class="stat-chip hero">👥 ${acc.heroesCount}</div>
            <div class="stat-chip skin">⭐ ${acc.skinsCount}</div>
            <div class="stat-chip emblem">🛡️ ${acc.emblem}</div>
        </div>
        <div class="account-description">
            ${acc.descriptionPoints ? acc.descriptionPoints.map(p => `<p>• ${p}</p>`).join("") : ""}
        </div>
        <div class="account-region">️🌍 ${acc.region}</div>
        <button class="detail-view-btn" onclick="openDetailView('${acc.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View Showcase
        </button>
    </div>
    `;
}
function loadNextAccount() {
    currentIndex++;
    if (currentIndex >= currentFilteredAccounts.length) return;

    const container = document.querySelector('.product-container');
    const nextBtnContainer = document.getElementById('next-btn-container');

    if (nextBtnContainer) {
        nextBtnContainer.innerHTML = '';
    }

    const newCardHTML = generateCardHTML(currentFilteredAccounts[currentIndex]);
    container.insertAdjacentHTML('beforeend', newCardHTML);

    const newCard = container.lastElementChild;
    playSingleCardAnimation(newCard);

    if (currentIndex < currentFilteredAccounts.length - 1) {
        nextBtnContainer.innerHTML = `
            <div style="color: #06b6d4; font-family: 'Orbitron', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 8px; text-shadow: 0 0 10px rgba(6,182,212,0.3);">
                SHOWING ${currentIndex + 1} OF ${currentFilteredAccounts.length}
            </div>
            <button onclick="loadNextAccount()" class="premium-next-btn">
                <span>NEXT ACCOUNT</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        `;
    } else {
        // နောက်ဆုံး Card ရောက်တဲ့အခါ Next Button လုံးဝမပါတော့ဘဲ Counter လေးပဲ ပြန်ပြရန်
        nextBtnContainer.innerHTML = `
            <div class="account-counter" style="color: #06b6d4; font-family: 'Orbitron', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 2px; text-shadow: 0 0 10px rgba(6,182,212,0.3);">
                SHOWING ${currentIndex + 1} OF ${currentFilteredAccounts.length}
            </div>
        `;
    }

    // setTimeout ထည့်ထားသော Smooth Auto Scroll ပိုင်း
    setTimeout(() => {
        window.scrollTo({
            top: newCard.offsetTop - 80,
            behavior: "smooth"
        });
    }, 300);
}

// 3. 🎬 Card တစ်ခုချင်းစီအတွက်
function playSingleCardAnimation(card) {
    if (!card) return;

    const button = card.querySelector(".detail-view-btn");
    const price = card.querySelector(".current-price");
    const shine = price ? price.querySelector(".gold-sweep") : null;

    // အစပိုင်း State
    gsap.set(card, {
        opacity: 0,
        y: 60,
        scale: .94,
        rotateX: 12,
        transformPerspective: 1000
    });

    if (button) {
        gsap.set(button, { opacity: 0, y: 18, scale: .92 });
    }

    const tl = gsap.timeline();

    tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: .42,
        ease: "back.out(1.5)",
        onStart: () => {
            card.style.willChange = "transform, opacity";
        },
        onComplete: () => {
            card.style.willChange = "auto";
        }
    })
    .fromTo(card,
        { boxShadow: "0 0 0 rgba(6,182,212,0)" },
        { boxShadow: "0 0 18px rgba(6,182,212,.35)", duration: .16, repeat: 1, yoyo: true },
        "-=.18"
    );

    if (price) {
        tl.fromTo(price,
            { scale: .9 },
            { scale: 1, duration: .18, ease: "back.out(2)" },
            "-=.18"
        )
        .fromTo(price,
            { boxShadow: "0 0 0 rgba(234,179,8,0)" },
            { boxShadow: "0 0 18px rgba(234,179,8,.6)", duration: .18, repeat: 1, yoyo: true },
            "<"
        );
    }

    if (shine) {
        tl.fromTo(shine,
            { left: "-120%" },
            { left: "150%", duration: .45, ease: "power2.out" },
            "<"
        );
    }

    if (button) {
        tl.to(button, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: .28,
            ease: "back.out(2)"
        }, "-=.05")
        .fromTo(button,
            { boxShadow: "0 0 0 rgba(6,182,212,0)" },
            { boxShadow: "0 0 18px rgba(6,182,212,.45)", duration: .16, repeat: 1, yoyo: true },
            "<"
        );
    }
}
// 4. Open Detail View Page (ပုံတစ်ပုံကျ၊ Screen တစ်ချက်လိုက်ဆင်းမည့် ဖဲချပ်ဝေပုံစံ)
 function openDetailView(accountId) {
    let allAccounts = [...gameAccounts.mlbb, ...gameAccounts.pubg];
    let account = allAccounts.find(acc => acc.id === accountId);

    if (!account || !account.detailImages || account.detailImages.length === 0) {
        alert("ဒီအကောင့်အတွက် အသေးစိတ်ပုံများ မရှိသေးပါ သားကြီး။");
        return;
    }

    let imagesHTML = '';
    account.detailImages.forEach((imgUrl, idx) => {
        imagesHTML += `
            <div class="detail-img-card">
                <div class="light-sweep"></div>
                <img src="${imgUrl}" alt="Detail Image ${idx + 1}" style="width: 100%; max-width: 600px; border-radius: 12px; border: 1px solid rgba(6,182,212,0.3); box-shadow: 0 5px 20px rgba(0,0,0,0.5);">
                <p style="color: #94a3b8; font-size: 0.8rem; margin-top: 8px;">
                    Photo ${idx + 1} of ${account.detailImages.length}
                </p>
            </div>
        `;
    });

    const mainApp = document.getElementById('main-app');
    
    mainApp.innerHTML = `
        <div class="detail-page-wrapper" style="padding: 100px 15px 60px 15px; min-height: 100vh; max-width: 700px; margin: 0 auto; position: relative;">
            <div class="detail-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; background: rgba(11,15,25,0.9); padding: 10px 0; position: sticky; top: 0; z-index: 10; backdrop-filter: blur(10px);">
                <img src="BackIcon.png" alt="Back" class="back-img-btn" onclick="openMlbbAccounts('${account.type}')" onerror="this.src='https://cdn-icons-png.flaticon.com/512/271/271220.png'" style="cursor: pointer; width: 32px;">
                <h2 class="section-title" style="margin: 0; font-size: 1.3rem; text-align: center;">ACCOUNT DETAILS</h2>
                <div style="width: 32px;"></div>
            </div>

            <div style="background: rgba(11, 15, 25, 0.85); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 14px; padding: 20px; margin-bottom: 30px; text-align: center;">
                <h3 style="color: #06b6d4; font-family: 'Orbitron', sans-serif; font-size: 1.1rem; margin-bottom: 8px;">${account.rankTitle || 'Account Showcase'}</h3>
                <p style="color: #eab308; font-family: 'Orbitron', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 15px;">Price: ${account.price}</p>
                <a href="${account.telegramLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #06b6d4, #0284c7); color: #fff; text-decoration: none; padding: 10px 25px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; box-shadow: 0 0 15px rgba(6,182,212,0.4);">
                    Buy via Telegram
                </a>
            </div>

            <div class="images-stack-container">
                ${imagesHTML}
            </div>

            <div class="showcase-complete">
                <h2>✓ SHOWCASE COMPLETE</h2>
            </div>
            
            <div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">
                <button class="back-bottom-btn" onclick="openMlbbAccounts('${account.type}')" style="background: transparent; border: 1px solid #06b6d4; color: #06b6d4; padding: 10px 30px; border-radius: 10px; font-weight: 700; cursor: pointer;">
                    ← Back to Accounts
                </button>
            </div>
        </div>
    `;

    // =========================
    // SCENE 1 : CINEMATIC ENTRY
    // =========================
    window.scrollTo(0, 0);

    const page = document.querySelector(".detail-page-wrapper");
    const header = document.querySelector(".detail-header");
    const infoCard = document.querySelector(".detail-header").nextElementSibling;
    const imageContainer = document.querySelector(".images-stack-container");
    const bottomBtn = document.querySelector(".back-bottom-btn");
    const completeText = document.querySelector(".showcase-complete");

    if(bottomBtn){ gsap.set(bottomBtn, { opacity: 0, y: 20 }); }
    if(completeText){ gsap.set(completeText, { opacity: 0, y: 30, scale: .8 }); }

    gsap.set(page, { opacity: 0 });
    gsap.set(header, { y: -40, opacity: 0 });
    gsap.set(infoCard, { y: 30, opacity: 0 });
    gsap.set(imageContainer, { opacity: 0 });

    const intro = gsap.timeline();

    intro.to(page, { opacity: 1, duration: 0.25 })
    .to(header, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" })
    .to(infoCard, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.15")
    .to(imageContainer, { opacity: 1, duration: 0.2 }, "-=0.1");
// =========================
// SCENE 2 : LEGENDARY CARD REVEAL
// =========================
const cards = document.querySelectorAll(".detail-img-card");

// Initial State
gsap.set(cards, {
    opacity: 0,
    y: -180,
    rotationX: 70,
    rotationZ: () => gsap.utils.random(-5, 5),
    scale: 0.88,
    transformPerspective: 1000,
    transformOrigin: "center top"
});

cards.forEach((card, index) => {

    intro.call(() => {
        gsap.to(window, {
            scrollTo: {
                y: card,
                offsetY: 120
            },
            duration: 0.45,
            ease: "power2.inOut"
        });
    });

    intro.to(card, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        rotationZ: 0,
        scale: 1,
        duration: 0.28,
        ease: "back.out(2.2)",
        
        // ပုံကျလာတဲ့အခါ
onStart() {
    playSound('Card_swoosh.mp3');
    gsap.to(imageContainer, {
        filter: "brightness(.75)",
        duration: 0.2
    });
},

        onComplete() {
            imageContainer.style.filter = "brightness(1)";

            gsap.fromTo(card,
                { boxShadow: "0 0 0 rgba(6,182,212,0)" },
                {
                    boxShadow: "0 0 22px rgba(6,182,212,.45)",
                    duration: .15,
                    repeat: 1,
                    yoyo: true
                }
            );
            gsap.fromTo(card,
                { scale: 1 },
                {
                    scale: 1.02,
                    duration: 0.18,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                }
            );

            const sweep = card.querySelector(".light-sweep");
            if(sweep){
                gsap.fromTo(sweep,
                    { left: "-120%" },
                    {
                        left: "150%",
                        duration: 0.45,
                        ease: "power2.out"
                    }
                );
            }
        }
    });

    intro.to({}, {
        duration: 0.25
    });

});

if(completeText){
    intro.to(completeText, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        onStart() {
            // 🔊 Showcase Complete ဖြစ်တဲ့အခါ PopClick.mp3 (သို့မဟုတ် အခြားအသံ) ကို သုံးမည်
            playSound('Noti.mp3');
        }
    });
}

intro.to({}, {
    duration: 0.5
});

intro.to(bottomBtn, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out"
});

}
// 5. Open PUBG Mobile Accounts Page
function openPubgAccounts() {
    const mainApp = document.getElementById('main-app');
    
    let cardsHTML = '';
    
    // အကောင့် မရှိရင် ဒါလေး အလုပ်လုပ်မယ်
    if (!gameAccounts.pubg || gameAccounts.pubg.length === 0) {
        cardsHTML = `
            <div class="col-span-full text-center py-20" style="grid-column: 1 / -1; text-align: center; padding: 60px 0;">
                <p style="color: #94a3b8; font-size: 1.1rem; font-family: 'Poppins', sans-serif;">
                    လက်ရှိတွင် ရောင်းရန် Accounts မရှိသေးပါ။
                </p>
            </div>
        `;
    } else {
        // အကောင့်ရှိမှ ဒီ Loop ထဲက Cards တွေကို တည်ဆောက်မယ်
        gameAccounts.pubg.forEach(acc => {
            cardsHTML += `
                <div class="game-card fade-card">
                    <img src="${acc.image}" alt="${acc.title}" onerror="this.src='https://via.placeholder.com/300x200'">
                    <div class="card-info">
                        <h3>${acc.title}</h3>
                        <div class="price">${acc.price}</div>
                        <a href="${acc.telegramLink}" target="_blank" class="buy-btn">Buy via Telegram</a>
                    </div>
                </div>
            `;
        });
    }

    mainApp.innerHTML = `
        <div class="detail-page-wrapper" style="padding: 100px 15px 60px 15px; min-height: 100vh; max-width: 1200px; margin: 0 auto; position: relative;">
            <div class="detail-header">
                <img src="BackIcon.png" alt="Back" class="back-img-btn" onclick="goHome()" onerror="this.src='https://cdn-icons-png.flaticon.com/512/271/271220.png'">
                <h2 class="section-title" style="margin: 0; font-size: 1.8rem;">PUBG MOBILE ACCOUNTS</h2>
                <div style="width: 48px;"></div>
            </div>
            <div class="product-container">
                ${cardsHTML}
            </div>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'instant' });

    gsap.from(".fade-card", {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// Background Parallax Animation Canvas
function initParallaxCanvas() {
    const canvas = document.getElementById('parallax-canvas');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.3 + 0.1
    }));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < 0) star.y = canvas.height;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${star.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
// GSAP ScrollTrigger Plugin ကို Register လုပ်ခြင်း
gsap.registerPlugin(ScrollTrigger);
// Card Scroll Animation ကို Function သီးသန့် ခွဲထုတ်လိုက်သည်
function initCardScrollAnimation() {
    // ရှေ့က ရှိပြီးသား Trigger အဟောင်းတွေကို ရှင်းထုတ်ခြင်း
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    document.querySelectorAll('.game-select-card').forEach((card) => {
        gsap.to(card, {
            scale: 1.12,
            borderColor: "#06b6d4",
            boxShadow: "0 15px 35px rgba(6, 182, 212, 0.5)",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 65%",
                end: "bottom 35%",
                toggleActions: "play reverse play reverse",
                refreshPriority: 1
            }
        });
    });

    ScrollTrigger.refresh();
}

// First Load မှာ Animation အလုပ်လုပ်ရန် ခေါ်ပေးခြင်း
window.addEventListener("DOMContentLoaded", () => {
    initCardScrollAnimation();
});
let isLoaderFinished = false;

// 🌟 PWA Banner အတွက် လိုအပ်သော Variable များ
let deferredPrompt; 
let isAppEntered = false; 

const pwaBanner = document.getElementById('pwa-install-banner');
const installBtn = document.getElementById('pwa-install-btn');
const closeBtn = document.getElementById('pwa-close-btn');
// Preload Assets Directory List
const assetsToLoad = [
    "MlbbLogo.jpeg", "Loading.png", "PubgLogo.jpeg", "BackIcon.png", "Arrow.png",
    "SkinsBg.png", "RankSkinBg.png", "HighRankBg.png", "BudgetBg.png", "SkinsCard.jpg",
    "Skins_info01.jpg", "Skins_info02.jpg", "Skins_info03.jpg", "Skins_info04.jpg", "Skins_info05.jpg",
    "Skins_info06.jpg", "Skins_info07.jpg", "Skins_info08.jpg", "Skins_info09.jpg", "SkinTitle.png",
    "M7.png", "Starlight.png", "Naruto.png",
    "PopClick.mp3", "Swoosh1.mp3", "MouseClick.mp3", "Swoosh2.mp3", "Card_swoosh.mp3", "Noti.mp3"
];
let isLoaderFinished = false;
// Universal Sound Function (အသံဖိုင်များ အလွယ်တကူ ဖွင့်ရန်)
// 1. Web Audio Context နှင့် Sound Buffer များ
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const soundBuffers = {};

// User ပထမဆုံး Touch/Click နှိပ်လိုက်သည်နှင့် AudioContext ကို Resume လုပ်မည်
document.addEventListener("pointerdown", () => {
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}, { once: true });

// 2. Audio Preload Logic (၁၀၀% Safe Version)
async function preloadAudio(filename) {
    try {
        // 1.5 စက္ကန့်အတွင်း Response မရရင် Request ကို Auto ဖျက်မည့် Controller
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const response = await fetch(filename, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("File not found");

        const arrayBuffer = await response.arrayBuffer();
        
        const decodedData = await new Promise((res, rej) => {
            audioCtx.decodeAudioData(arrayBuffer, res, rej);
        });

        soundBuffers[filename] = decodedData;
    } catch (err) {
        console.warn(`[Audio Skipped/Error]: ${filename}`);
    }
}
// 3. 🚀 FLEXIBLE & HIGH-END PLAY SOUND FUNCTION
function playSound(filename, options = {}) {
    const buffer = soundBuffers[filename];
    if (!buffer) return;

    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    
    source.buffer = buffer;
    
    // --- 🔊 A. PITCH / RATE SETTINGS ---
    if (options.rate !== undefined) {
        source.playbackRate.value = options.rate;
    } else if (filename.toLowerCase().includes('swoosh')) {
        // Default Random Pitch Variation for Swoosh
        source.playbackRate.value = 0.98 + Math.random() * 0.04;
    } else {
        source.playbackRate.value = 1.0;
    }

    // --- 🔊 B. VOLUME / GAIN SETTINGS ---
    if (options.volume !== undefined) {
        gainNode.gain.value = options.volume;
    } else if (filename.toLowerCase().includes('swoosh')) {
        // Default Random Volume Variation for Swoosh (45% - 55%)
        gainNode.gain.value = 0.45 + Math.random() * 0.1;
    } else {
        gainNode.gain.value = 0.5; // Default volume
    }

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    source.start(0);
}
//4. Asset Single Loader Logic
function loadSingleAsset(url) {
    return new Promise((resolve) => {
        let isDone = false;

        const forceTimer = setTimeout(() => {
            if (!isDone) {
                isDone = true;
                console.warn(`[Timeout Skipped]: ${url}`);
                resolve(url);
            }
        }, 1500);

        const safeResolve = () => {
            if (!isDone) {
                isDone = true;
                clearTimeout(forceTimer);
                resolve(url);
            }
        };

        const isAudio = url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg');

        if (isAudio) {
            preloadAudio(url).finally(() => safeResolve());
        } else {
            const img = new Image();
            img.src = url;
            img.onload = () => safeResolve();
            img.onerror = () => safeResolve();
        }
    });
}
// Complete Loading Event Function
function showContinueButton() {
    if (isLoaderFinished) return;
    isLoaderFinished = true;

    const fill = document.getElementById('progress-fill');
    const percentText = document.getElementById('progress-text');
    const progressBar = document.querySelector('.progress-bar');
    const percentWrapper = document.querySelector('.percent-wrapper');
    const continueBtn = document.getElementById('continue-btn');

    if (fill) fill.style.width = '100%';
    if (percentText) percentText.innerText = '100';

    gsap.to([progressBar, percentWrapper], {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
            if (progressBar) progressBar.style.display = 'none';
            if (percentWrapper) percentWrapper.style.display = 'none';

            if (continueBtn) {
                continueBtn.style.display = 'inline-block';
                gsap.fromTo(continueBtn, 
                    { scale: 0.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
                );

                // 🔊 Hover & Click Sound (options ပါဝင်သော playSound သုံးမည်)
                continueBtn.onmouseenter = () => {
                    playSound('PopClick.mp3', { volume: 0.3 });
                };

                continueBtn.onclick = () => {
                    playSound('Cash.mp3', { volume: 0.7 });
                    enterApp(); // Continue နှိပ်ရင် Main App သို့ ဝင်မည်
                };
            }
        }
    });
}

// 🌟 Realistic Fake Active Users Counter Script
let currentUsers = Math.floor(Math.random() * (32 - 25 + 1)) + 12; // 12မှ 32ကြား တန်ဖိုးဖြင့် စတင်မည်

function updateActiveUsers() {
    const userDisplay = document.getElementById('active-user-count');
    if (!userDisplay) return;

    // ဂဏန်း အတက်အကျ (၁ မှ ၃ယောက်အထိ တက်တက်မည် သို့မဟုတ် ကျမည်)
    const change = Math.floor(Math.random() * 3) + 1;
    const isIncreasing = Math.random() > 0.45; // 55% အတက်၊ 45% အကျ (တက်တာ ပိုများအောင်)

    if (isIncreasing) {
        currentUsers += change;
    } else {
        currentUsers -= change;
    }

    // 10 အောက် လျော့မသွားစေရန်နှင့် 100 အထက် မကျော်လွန်စေရန် ထိန်းချုပ်ခြင်း
    if (currentUsers < 10) currentUsers = 12;
    if (currentUsers > 100) currentUsers = 95;

    // GSAP စာသားလေး အနည်းငယ် မှိန်ပြီး ပြန်လင်းကာ အပြောင်းအလဲ ပြမည်
    gsap.to(userDisplay, {
        opacity: 0.3,
        duration: 0.3,
        onComplete: () => {
            userDisplay.innerText = currentUsers;
            gsap.to(userDisplay, { opacity: 1, duration: 0.2 });
        }
    });

    // 4 စက္ကန့် မှ 8 စက္ကန့်ကြား ကြိုက်သလို ကြာချိန် ပြောင်းပြီး နောက်တစ်ကြိမ် Run မည် (သဘာဝကျစေရန်)
    const nextInterval = Math.floor(Math.random() * (9000 - 7000 + 1)) + 6000;
    setTimeout(updateActiveUsers, nextInterval);
}

// Page ပွင့်သည်နှင့် စတင်လည်ပတ်စေမည်
document.addEventListener('DOMContentLoaded', () => {
    updateActiveUsers();
});

// User Continue နှိပ်လျှင် Main App သို့ ဝင်မည့် Function
function enterApp() {
    isAppEntered = true; // 🌟 အသံထည့်ရန်
    
    const loader = document.getElementById('loader-screen');
    if (loader) loader.classList.add('loader-hidden');

    // 🌟 အထဲရောက်တာနဲ့ Prompt ရှိရင် Banner ပြမည်
    if (deferredPrompt && pwaBanner) {
        pwaBanner.style.display = 'block';
    }
}
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // User က App ထဲ ရောက်နေပြီဆိုမှ Banner ကို ပြမယ်
    if (isAppEntered && pwaBanner) {
        pwaBanner.style.display = 'block';
    }
});
// Main Loader Controller Logic
async function startAppPreloader() {
    const fill = document.getElementById('progress-fill');
    const percentText = document.getElementById('progress-text');

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    // 🚨 5 Seconds Safety Timeout: တစ်ခုခုကြောင့် ညပ်နေပါက 5 စက္ကန့်အကြာတွင် Continue ကို အလိုအလျောက် ဖော်ပေးမည်
    const safetyTimer = setTimeout(() => {
        showContinueButton();
    }, 5000);

    for (const asset of assetsToLoad) {
        if (isLoaderFinished) break; // 5s ပြည့်လို့ Safety ခေါ်သွားရင် Loop ကို ရပ်မည်

        await loadSingleAsset(asset);
        loadedCount++;

        const percentage = Math.round((loadedCount / totalAssets) * 100);

        if (fill) fill.style.width = `${percentage}%`;
        if (percentText) percentText.innerText = `${percentage}`;

        await new Promise(r => setTimeout(r, 15));
    }

    // Asset အကုန် Load ပြီးသွားပါက Timeout ကို ဖျက်ပြီး Continue ခလုတ် ဖော်မည်
    clearTimeout(safetyTimer);
    showContinueButton();
}

// Page DOM တက်တာနဲ့ Preloader စတင်မည်
document.addEventListener('DOMContentLoaded', () => {
    updateActiveUsers();
    startAppPreloader();
});
