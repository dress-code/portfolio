/*
<!-- <div class="hero"></div> -->

<!--<div id="heroControls">
     <h3 id="heroTitle">Placeholder</h3>
    <img id="backSkipButton" class="heroButton" src="./assets/images/icons/backSkip.svg" alt="Skip back" />
    <img id="pauseButton" class="heroButton" src="./assets/images/icons/pauseButton.svg" alt="Pause" />
    <img id="playButton" class="heroButton" src="./assets/images/icons/playButton.svg" alt="Play" />
    <img id="forwardSkipButton" class="heroButton" src="./assets/images/icons/forwardSkip.svg" alt="Skip forward" />
</div>-->
*/

/* Hero styles #########################################################################################################

.hero {
    width: 100vw;
    height: 50vh;
}

.heroImage {
    width: 100vw;
    height: 70vh;
    position: absolute;
    top: 0;
    z-index: -1;
    border-image-width: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0;
    transition: opacity 1s ease;
}

.currentHeroImage {
    opacity: 1;
}

#heroTitle {
    display: none;
    color: #000000;
    margin-right: 25px;
    z-index: 2;
    font-weight: normal;
    font-size: 12px;
}

#heroControls {
    display: none;
    position: absolute;
    top: calc(70vh - 40px);
    right: 0;
    background-color: rgba(255,255,255, .85);
    padding: 10px;
    width: 150px;
    align-items: center;
    justify-content: flex-end;
}

.heroButton {
    z-index: 2;
    width: 20px;
    height: 20px;
    margin: 0 6px;
}

#playButton {
    display: none;
}

.heroButton:hover {
    cursor: pointer;
}

End hero styles */

let heroImages = [],
    heroImageDivs = [],
    bannerImageInfo = [
        {type: 1, title: "Cosmo, a concept app about space program monkeys finding home.", url: "Space_Monkey.svg"},
        {type: 1, title: "Pasta, a carb-filled cooking application.", url: "Pasta.svg"},
        {type: 1, title: "ScrubHub, an ambulatory nurse management system.", url: "ScrubHub.svg"},
        {type: 1, title: "A storyboard excerpt from a golf fitting experience project.", url: "GG_Storyboard.svg"},
        {type: 1, title: "A typography project focused on the font Bebas Neue.", url: "bebas.svg"},
        {type: 1, title: "A re-design of an 1873 Nature magazine article.", url: "Cotopaxi.svg"},
        {type: 2, title: "", url: "Space_Monkey_Mobile.svg"},
        {type: 2, title: "", url: "Nutrix_Mobile.svg"},
        {type: 2, title: "", url: "ScrubHub_Mobile.svg"},
        {type: 2, title: "", url: "Pasta_Mobile.svg"}
        ];

        //SETUP IN WINDOW ONLOAD
window.onload = () => {

            let width = document.documentElement.clientWidth,
                hero = $$("hero")[0],
                safari = !!window.ApplePaySession;
            console.log(safari);
            //width > 750 ? heroImages = $$("heroImage") : [];
        
            if(width > 750){
                //Use type 1 images.
                heroImages = bannerImageInfo.filter(image => image.type === 1);
            }else{
                //Use the type 2 images.
                heroImages = bannerImageInfo.filter(image => image.type === 2);
            }
        
            //Use the type 1 images to generate heroImage divs.
            heroImages.forEach(image => {
                let imageDiv = createEle("div", "heroImage", null, null);
                imageDiv.style.backgroundImage = "url('./assets/images/bannerImages/" + image.url + "')";
                imageDiv.setAttribute("title", image.title);
                hero.appendChild(imageDiv);
                heroImageDivs.push(imageDiv);
            });

            /* Hero stuff ------------------------------------------------------------------------------------------------------*/
    //Start the hero
    changeHeroImage(0);
    let i = 1, paused = false;
    setInterval(() => {
            if(!paused){
                changeHeroImage(i);
                i < (heroImages.length - 1) ? i++ : i = 0;
            }
        }, 4000);

    //Set the controls for the hero.
    $("pauseButton").addEventListener("click", () => {
        paused = true;
        pauseHero(paused)
    });

    $("playButton").addEventListener("click", () => {
        paused = false;
        pauseHero(paused)
    })

    $("backSkipButton").addEventListener("click", () => {
        i > 0 ? i-- : i = heroImages.length - 1;
        changeHeroImage(i);
        if(paused === false) {
            paused = true;
            pauseHero(paused);
        }
    });

    $("forwardSkipButton").addEventListener("click", () => {
        i < (heroImages.length - 1) ? i++ : i = 0;
        changeHeroImage(i);
        if(paused === false) {
            paused = true;
            pauseHero(paused);
        }
    });

    //When the window is resized, check the location of the controls
    window.addEventListener("resize", () => {
        resize();
    });

};

function changeHeroImage(newIndex){

    if($$("currentHeroImage").length > 0){
        $$("currentHeroImage")[0].classList.remove("currentHeroImage");
    }
    heroImageDivs[newIndex].classList.add("currentHeroImage");
    let title = $("heroTitle");
    title.childNodes[0].remove();
    title.append(document.createTextNode(heroImageDivs[newIndex].title));
}

function pauseHero(paused){
    let pauseButton = $("pauseButton");
    if(paused){
        $("pauseButton").style.display = "none";
        $("playButton").style.display = "block";
    }else{
        $("playButton").style.display = "none";
        $("pauseButton").style.display = "block";
    }
}

function resize(){
    let homeTextDiv = $$("homeText")[0],
        heroControls = $("heroControls"),
        homeTitle = $$("homeTitle")[0],
        homePara = $("hp"),
        hr = document.getElementsByTagName("hr")[0],
        heroImage = $("heroImage");

    //heroControls.style.top = homeTextDiv.getBoundingClientRect().y + "px";//homeTextDiv.offsetHeight - 25 + "px";
    homeTitle.style.width = homePara.offsetWidth + "px";

}