let projects = [
    {title: "Monroe County Parks", 
        company: "Class project",
        desc: "A redesign for the Monroe County, NY Parks Department website featuring a unique illustration style that adds an element of playfulness while still communicating clearly.",
        img: "./assets/images/projectCards/MCP.svg",
        link: "https://www.figma.com/file/d1ymJqsPUN2n9fLJC8ioew/MCP-Project?node-id=201%3A7506"},
    {title: "Virago", 
        company: "Personal project",
        desc: "A recent (August 2020) project I designed for fun. Virago (Latin for a heroic or rebellious woman) is a health application that tracks the menstrual cycle. ",
        img: "./assets/images/projectCards/Virago.svg",
        link: "https://www.figma.com/file/WjRxeejLpXhm1GiUdVGMzwO1/Virago?node-id=92%3A79"},  
    {title: "Golf Galaxy", 
        company: "Dick's Sporting Goods",
        desc: "Due to COVID-19, a 3-month internship became a 5-week hackathon-style sprint to develop a brand new golf service appointment scheduler"
        + " for the Dick's Sporting Goods company.", 
        img: "./assets/images/projectCards/GG.svg",
        link: "https://www.figma.com/file/jHRObbgTnUVL3jHbqCberN/GG-Appointment-Scheduling?node-id=0%3A1"},
    {title: "ScrubHub", 
        company: "Rochester Regional Health",
        desc: "An ambulatory nurse scheduling system built to handle nurse flotation complexities between clinics. Over time, it will allow for discovering optimal nurse to patient ratios.",
        img: "./assets/images/projectCards/ScrubHub.svg",
        link: "https://www.figma.com/file/SDWGlJtNG7cPlWDmMEthVL5v/ScrubHub?node-id=4880%3A4"},
    /*{title: "Nutrix", 
        company: "Class project",
        desc: "One of my first Figma projects from 2nd year. Nutrix, Latin for nurse, is a fictional application designed to manage medical bacta facilities in the Star Wars universe.",
        img: "./assets/images/bannerImages/Space_Monkey.svg"},*/
    {title: "Crew Infographic",
        company: "Personal project",
        desc: " After a year of rowing, I realized the general population knows little of the sport. I used Adobe Illustrator to create a playful, informative graphic for those new to crew.",
        img: "./assets/images/projectCards/Crew.svg",
        link: "./assets/files/CrewInfographic.pdf"},
    {title: "Cosmo", 
        company: "Personal project",
        desc: "Current project. Monkeys used in the Russian Space Program often did not return back to earth. This game is about one, named Cosmo, finding his way through the stars and back home.",
        img: "./assets/images/projectCards/Cosmo.svg",
        link: "https://www.figma.com/file/sbD4PMvGNevTMFsVVmHfea/Cosmo?node-id=28%3A1174"},
    /*{title: "Noto", 
        company: "Class project",
        desc: "After interviewing students about RIT's current grading and assignment system, it became apparen that an alternative was strongly desired.",
        img: "./assets/images/bannerImages/Space_Monkey.svg"},*/
    {title: "Research", 
        company: "School Employment/Passion Project",
        desc: "Co-author of \"Study of Accessibility Guidelines in Mobile Applications\", published in the proceedings of the 17th international Mobile and Ubiquitous Media conference in Cairo, Egypt.",
        img: "./assets/images/projectCards/Research.svg",
        link: "https://dl.acm.org/citation.cfm?doid=3282894.3282921&fbclid=IwAR2yK4HDRlDn6ivA1pJQegphGK7Y4lVKZw9M88xqVFIRLlKlTCCzGR2l-Y0"},
    {title: "Pasta", 
        company: "Personal project",
        desc: "This was my first Figma project ever. I am currently re-working it for fun. \"Pasta\" is an application focused on carb-filled recipes.",
        img: "./assets/images/projectCards/Pasta.svg",
        link: "https://www.figma.com/file/gbRbK0TTQPIDacOyI9OiYWTq/Pasta-La-Vista?node-id=123%3A4"}
];

window.onload = () => {

    let width = document.documentElement.clientWidth,
    safari = !!window.ApplePaySession;;

    if(localStorage.getItem("visited") || width < 1000 || safari){
        displayHidden();
    }else{
        $("cover").style.display = "flex";
        setTimeout(() => {
            $("cover").style.display = "none";
            displayHidden();
        }, 5700);
        localStorage.setItem("visited", true);
    }

    if(localStorage.getItem("contacted")){
        let thankYou = $("thankYou");
        //Show the thank you message
        $("thankYouTitle").textContent = "Thanks for reaching out, " + localStorage.getItem("firstName") + "!";
        thankYou.style.display = "flex";
        thankYou.addEventListener("click", () => {
            thankYou.style.display = "none";
        });
        //Remove cookie
        localStorage.removeItem("contacted");
        localStorage.removeItem("firstName");
    }

    //Construct the project cards.
    let projectParent = $("projectsContainer");
    projects.forEach(project => {
        let projDiv = createEle("div", "projectCard", null, null),
        projTitle = createEle("h2", "projectCardTitle", null, project.title),
        projDesc = createEle("p", "cardDesc", null, project.desc),
        projFade = createEle("div", "cardFade", null, null),
        projCompany = createEle("h3", "cardCompany", null, project.company);
        //projDiv.appendChild(projTitle);

        projDiv.style.backgroundImage = "URL(" + project.img +")";

        //On hover, switch to description.
        projDiv.addEventListener("mouseenter", function(){
            projDiv.appendChild(projFade);
            projDiv.appendChild(projTitle);
            projDiv.appendChild(projCompany);
            projDiv.appendChild(projDesc);
        });

        projDiv.addEventListener("mouseleave", function(){
            while(projDiv.firstChild){
                projDiv.removeChild(projDiv.firstChild);
            }
        });

        projDiv.addEventListener("click", function(){
            openTab(project.link);
        });

        projectParent.appendChild(projDiv);
    });

    let menu = $("nav-icon4");
    let mobileMenu = $("mobileNav");

    menu.addEventListener('click', function(){
        if(menu.classList.contains("open")){
            menu.classList.remove("open");
            mobileMenu.style.display = "none";
        }else{
            menu.classList.add("open");
            mobileMenu.style.display = "block";
        }
    });
};

function displayHidden(){
    let hiddenItems = document.getElementsByClassName("hidden");
    for(var i = 0; i < hiddenItems.length; i++){
        if(!hiddenItems[i].classList.contains("section")){
            hiddenItems[i].style.display = "flex";
            hiddenItems[i].style.opacity = '0';
            hiddenItems[i].classList.add("fade-in");
        }
    }
    let currentSection = $$("current")[0];
    currentSection.classList.remove("hidden");
    currentSection.style.opacity = '0';
    currentSection.classList.add("fade-in");
}

function changeSection(newSectionIndex){
        let newSection = $(newSectionIndex),
            oldSection = $$("current")[0],
            nav = $("mainNav"),
            navItems = [],
            selected = $$("selected");

        selected[0].classList.remove("selected");


        for(let k = 0; k < nav.childNodes.length; k++){
            if(nav.childNodes[k].tagName === "LI"){
               navItems.push(nav.childNodes[k]);
            }
        }

        navItems[newSectionIndex].classList.add("selected");

        oldSection.classList.remove("current");
        oldSection.classList.add("hidden");
        newSection.classList.remove("hidden");
        newSection.classList.add("current");
        newSection.classList.add('fade-in');

        $("nav-icon4").classList.remove("open");
        $("mobileNav").style.display = "none";
}

/* Shortcuts ###########################################################################################################*/
function $(id){
    return document.getElementById(id);
}

function $$(className){
    return document.getElementsByClassName(className);
}

function createEle(tag, className, id, textContent){
    let x = document.createElement(tag);
    if(className){
        x.classList.add(className);
    }
    if(id){
        x.id = id;
    }
    if(textContent){
        x.appendChild(document.createTextNode(textContent));
    }

    return x;
}

/* Validation */

function validateContact(){
    let ok = true,
        form = $("contactForm"),
        msgError = $("messageError"),
        fnameError = $("fnameError"),
        emailError = $("emailError"),
        lnameError = $("lnameError");

    console.log("Starting validation ", ok);

   if(!validateTextField(form, "first name", fnameError)){
       ok = false;
   }
    console.log(ok);

   if(!validateTextField(form, "last name", lnameError)){
       ok = false;
   }
    console.log(ok);

   if(!validateTextField(form, "email", emailError)){
       ok = false;
   }
    console.log(ok);

    if(!validateTextField(form, "message", msgError)){
        ok = false;
    }else{
        form.elements["message"].value = sanitize(form.elements["message"].value);
    }
    console.log("At end of validation, the form was: ", ok);

    if(ok){
        //set cookie saying they have contacted me.
        localStorage.setItem("contacted", true);
        localStorage.setItem("firstName", form.elements["first name"].value);
    }

    return ok;

}

function validateTextField(form, formEleName, errorEle){
    let ok = true,
        value = form.elements[formEleName].value;

    if(value.length > 0 && value.length < 500){
        switch(formEleName.toLowerCase()){
            case "_replyto":
                ok = validateEmail(value);
                break;
            case "first name":
               ok = validateText(value);
               break;
            case "last name":
                ok = validateText(value);
                break;
        }
    }else{
        ok = false;
    }

    if(!ok){
       if(errorEle.childNodes.length === 0){
           errorEle.appendChild(document.createTextNode("Please enter a valid " + formEleName + "."));
       }
       else if(errorEle.childNodes[0].nodeValue === ""){
           errorEle.childNodes[0].nodeValue = "Please enter a valid " + formEleName + ".";
       }
    }else{
        if(errorEle.childNodes.length > 0){
            errorEle.childNodes[0].nodeValue = "";
        }
    }

    return ok;
}

function validateText(value){
    return /^[a-zA-Z]+$/.test(value);
}

function validateEmail(value){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;'
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
}

//window behavior
function openTab(address){
    window.open(address, '_blank').focus();
}

function mobileMenu(){
    let mobileMenu = $("mobileNav");
    if(mobileMenu.style.display === "none"){
        mobileMenu.style.display = "block";
    }else{
        mobileMenu.style.display = "none";
    }
}