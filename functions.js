colors = ["#9B1402", "#A85910", "#BC9405", "#176041", "#173D60", "#151367", "#421452"];
//projects = ["0-store-tech-tee", "1-hackathon-2022",""];

let filteredBy = [],
currentImageIndex = 0,
numCols = 0;

projectInfo = [
    {
        name:"Heisey Designs T-Shirt Graphic For 2023 Store Tech Conference",
        synopsis:"As the designer chosen to create the 2023 Store Tech conference t-shirt, Anna Heisey sought to make it playful and personal. To accomplish this, she used a 3D block illustration incorporating the different teams in store technology.",
        contentType: "graphic",
        descParagraphs:[
            "After being asked to create a graphic for the store technology group’s conference t-shirt, I found myself sketching some ideas on an airplane as I flew home from a business trip.",
            "The thought had struck me that DSG’s business sits upon store technology as a foundation. It is what enables the company to fulfill online orders, give athletes an incredible experience, and maintain its inventory. There are a total of ten teams in Store Technology at DICK’S Sporting Goods who work on these, and other, critical functions.",
            "As I iterated on the idea, I decided that I wanted each team’s function incorporated into the graphic. Many people on the store tech teams do a lot of work that isn’t very visible. I also wanted to make it more personal, including the names of each engineer, product manager, and designer.",
            "I settled on a 3D block design that sits on top of store technology as a foundation. I included a power cord to create a connection between the store that sits on top and the base. I incorporated elements from each team in the graphic, such as inventory, in-store services, point of sale, and curbside pickup."],
        images: [
            {
                url:"url(./assets/images/projectImages/2023tee-sketch.jpg)",
                altText:"A 3D graphic showing block text that says Store Tech 2023. On top of the text, there is a miniature Dick's Sporting Goods store with cars parked outside and a truck being unloaded."
            },
            {
                url:"url(./assets/images/projectImages/2023tee.svg)",
                altText:""
            },
            {
                url:"url(./assets/images/projectImages/2023tee-actual.png)",
                altText:""
            }
        ]
    },
    {
        name:"Heisey, Team Claim 2022 DSG Store Tech Hackathon Win",
        synopsis:"This will be a synopsis",
        contentType: "case-study",
        deckURL: "./assets/projectDecks/2022Hackathon.pdf",
        descParagraphs:[],
        images: [
            {
                url:"url(./assets/images/projectImages/2022hackathon.jpeg)",
                altText:"Anna Heisey stands with a trophy belt for winning the 2022 hackathon. She has blonde curly hair and is wearing light wash blue jeans and a dark orange brown shirt."
            }
        ]
    },
]

window.onload = () => {
    let selectables = document.getElementsByClassName('selectable'),
    content = $("content"),
     project = $("project-modal"),
     background = $("project-modal-background")
     title = $("project-title"),
    heroImage = $('hero'),
     pdfViewer = $("PDF-viewer"),
     filterContainer = $("filter-container"),
     filters = $("filters").getElementsByTagName("li"),
     navItems = $$("nav-item"),
    currentArticleLocation = content.getElementsByClassName("article")[0].getBoundingClientRect(),
    selectedProject = {};

    //Add an event listener to the window for resize.
    window.addEventListener("resize", adjustDisplay);

    //Create hover effect for nav links.
    for(let i = 0; i < navItems.length; i++){
        navItems[i].addEventListener("mouseenter", ()=>{
            navItems[i].style.color = "#2D51D2";
            if(navItems[i].classList.contains("selected")){
                $$('select-underline')[0].style.backgroundColor = "#2D51D2";
            }
        });
        navItems[i].addEventListener("mouseleave", ()=>{
            navItems[i].style.color = "#332D29";
            if(navItems[i].classList.contains("selected")){
                $$('select-underline')[0].style.backgroundColor = "#332D29";
            }
        });
    }

     //Set content height so that there are two columns.
     //console.log(content.clientHeight / 2.7 + "px");
     //This should be for medium screen.
     //content.style.height = content.clientHeight / 1.75 + "px";
     //This is large screen.
     //content.style.height = content.clientHeight / 1.75 + "px";

    for (i = 0; i < selectables.length; i++){
       // articles[i].style.backgroundColor = randomColor();
       let selectable = selectables[i];
       selectable.addEventListener('mouseenter', ()=>{
        selectable.style.borderColor = "#000000";
        selectable.style.borderRadius = "80px";
       });
       selectable.addEventListener('mouseleave', ()=>{
        selectable.style.borderColor = "#000000";
        selectable.style.transition = "border-radius .2s ease";
        selectable.style.borderRadius = "0px";
        });
        selectable.addEventListener("click", ()=>{
            project.style.top = "95px";
            project.style.display = "block";
            background.style.top = document.documentElement.scrollTop;
            background.style.display = "block";
            document.body.style.overflowY = "hidden";
            

            //Populate project information.
            selectedProject = projectInfo[selectable.id];


            if(selectedProject.contentType == "graphic"){

                currentImageIndex = 0;
                $("left-arrow").style.opacity = ".2";
                newText(title, selectedProject.name);

                //Populate title and hero image with the image at the current index.
                heroImage.style.backgroundImage = selectedProject.images[currentImageIndex].url;

                //Display arrows.
                $("left-arrow").style.display = "block";
                $("right-arrow").style.display = "block";

                //Display the title and hero image.
                heroImage.style.display = "block";
                title.style.display = "block";

                //Update and display the image counter.
                updateImageCounter(currentImageIndex, selectedProject.images.length);
                imageCounter.style.top = heroImage.getBoundingClientRect().bottom - imageCounter.clientHeight - 40 + "px";

                //Add event listeners to the gallery arrows.
                $("left-arrow").addEventListener("click", arrowDecrement);

                $("right-arrow").addEventListener("click", arrowIncrement);
                
            }
            else if(selectedProject.contentType == "case-study"){
                //open PDFViewer
                pdfViewer.data = selectedProject.deckURL;
                pdfViewer.style.display = "block";
            }
            
        });

    }

    background.addEventListener("click", () => {

        //Hide everything in the modal.
        hide(project);
        hide(background);
        hide(title);
        hide(heroImage);
        hide(pdfViewer);
        hide($("left-arrow"));
        hide($("right-arrow"));

        //reset image index.
        currentImageIndex = 0;
        $("left-arrow").style.opacity = ".2";
        $("right-arrow").style.opacity = "1";

        //remove event listeners on arrows
        //$("left-arrow").removeEventListener("click");
        //$("right-arrow").removeEventListener("click");

        //Allow scrolling to resume.
        document.body.style.overflowY = "scroll";
    })

    for(i = 0; i < filters.length; i++){

        let filter = filters[i];
        
        filter.addEventListener("click",()=>{
            filter.style.border = "1px #332D29 solid";
            filter.style.borderRadius = "24px";
            filter.style.textAlign = "center";

            let span = filter.childNodes[0];

            //If the array of applied filters does not include this filter, add it to the list of filters.
            if(!filteredBy.includes(filter.id)){
                span.removeChild(span.childNodes[0]);
                newText(span, "-");
                //Add filter to the array. (filter.id is the name of the filter used to tag articles)
                filteredBy.push(filter.id);
                console.log(filteredBy);

                //Call filter function that fill filter the articles by the array of filters.
                articleFilter(filteredBy);

            }
            //Else the filter was already applied, so we need to remove it.
            else{
                span.removeChild(span.childNodes[0]);
                newText(span, "+");
                //Remove from array
                filteredBy.splice(filteredBy.indexOf(filter.id), 1);

                //Change the appearance of the button so it looks unselected
                filter.style.border = "none";
                filter.style.textAlign = "left";

                console.log(filteredBy);
                //Call filter function with updated array.
                articleFilter(filteredBy);

            }
            
        });
    }

    adjustDisplay();
}

function randomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
}

//Event Handlers
function arrowDecrement(event){
    galleryArrows(selectedProject, "DOWN");
}

function arrowIncrement(event){
    galleryArrows(selectedProject, "UP");
}

function $(id){
    return document.getElementById(id);
}

function $$(className){
    return document.getElementsByClassName(className);
}

function newText(ele, text){
    if(ele.childNodes.length > 0){
        ele.removeChild(ele.childNodes[0]);
    }
    ele.appendChild(document.createTextNode(text));
}

function hide(ele){
    ele.style.display = "none";
}

//Filter the articles based on an array of filter values.
function articleFilter(filterValues){
    //Get all the articles
    let articles = $$("article");
    //If there are no filters applied, display everything
    if(filterValues.length == 0){
        console.log("show all articles")
        //For each article, set it's display to "block"
        for(k = 0; k < articles.length; k++){
            articles[k].style.display = "block";
        }
    }
    //Else, there are filters applied. Go through the filters and only show articles that have the active filters on them.
    else { 
        //for each article...
        for(i = 0; i < articles.length; i++){

            //check if it has any of the filter values
            for(j=0; j < filterValues.length; j++){

                console.log(filterValues[j]);

                //If the filter value is tagged on the article, show it.
                if(articles[i].classList.contains(filterValues[j])){
                    articles[i].style.display = "block";
                    break;
                }
                //Else it is not tagged, don't show it.
                else{
                    articles[i].style.display = "none";
                }

            }
        }
    }
}
//Change gallery images based on arrow clicks.
function galleryArrows(selectedProject, direction){
    if(direction == "DOWN"){

        if(currentImageIndex > 0){
            $("right-arrow").style.opacity = "1";
            currentImageIndex --;
            if(currentImageIndex == 0){
                $("left-arrow").style.opacity = ".2";
            }else{
                $("left-arrow").style.opacity = "1";
            }
            console.log(currentImageIndex);
            heroImage.style.backgroundImage = selectedProject.images[currentImageIndex].url;
            updateImageCounter(currentImageIndex, selectedProject.images.length);
        }

    }

    else{
        if(currentImageIndex < selectedProject.images.length - 1){
            console.log("here");
            $("left-arrow").style.opacity = "1";
            currentImageIndex ++;
            console.log("The image index was less than the length. Added one. ", currentImageIndex);
            
            if(currentImageIndex == selectedProject.images.length - 1){
                $("right-arrow").style.opacity = "0.2";
            }else{
                $("right-arrow").style.opacity = "1";
            }
            heroImage.style.backgroundImage = selectedProject.images[currentImageIndex].url;
            updateImageCounter(currentImageIndex, selectedProject.images.length);
        }
    }
   
}

function adjustDisplay(){
    let currentWidth = document.documentElement.clientWidth,
        filtersContainer = $("filter-container"),
        nav = $("desktop-nav"),
        underline = $$("select-underline")[0],
        navItemDimensions = $$("selected")[0].childNodes[0].getBoundingClientRect();
        

    console.log(currentWidth);

    if(currentWidth <= 1023){
        console.log("mobile size!");
        //Make the projects one column.
        content.style.height = "fit-content";
        numCols = 1;
    }
    
    if(currentWidth >= 868) {
        let currentArticleLocation = $("content").getElementsByClassName("article")[0].getBoundingClientRect();
         //position filter container 8px to the left of the main container. The 198 number is the width of the filters container plus padding plus borders plus margin.
        filtersContainer.style.display = "block";
        filtersContainer.style.left = currentArticleLocation.x - 198 + "px";
        $("name").style.fontSize = "40px";
        content.style.marginTop = "148px";

        //Display the nav.
        nav.style.display = "block";
        underline.style.left = navItemDimensions.x + "px";
        underline.style.width = navItemDimensions.right - navItemDimensions.left + "px";
    }else{
        //Don't show the desktop filters.
        $("filter-container").style.display = "none";
        //Make the title name smaller.
        $("name").style.fontSize = "32px";
        content.style.marginTop = "120px";
        nav.style.display = "none";
    }
    
    if(currentWidth > 1200 && currentWidth < 1500){
        if(numCols == 1 || numCols == 0){
            content.style.height = content.clientHeight / 1.75 + "px";
            numCols = 2;
        }else if(numCols == 3){
            content.style.height = content.clientHeight * 1.4 + "px";
            numCols = 2
        }
        let currentArticleLocation = $("content").getElementsByClassName("article")[0].getBoundingClientRect();
        filtersContainer.style.display = "block";
        filtersContainer.style.left = currentArticleLocation.x - 198 + "px";
    }

    if(currentWidth > 1500){
        if(numCols == 2 ){
            content.style.height = content.clientHeight / 1.4 + "px";
            numCols = 3;
        }else if(numCols == 0){
            content.style.height = content.clientHeight / 2.6 + "px";
            numCols = 3;
        }
        let currentArticleLocation = $("content").getElementsByClassName("article")[0].getBoundingClientRect();
        filtersContainer.style.display = "block";
        filtersContainer.style.left = currentArticleLocation.x - 198 + "px";
    }
}

function updateImageCounter(index, total){
    let imageCounter = $("imageCounter");
    imageCounter.removeChild(imageCounter.childNodes[0]);
    let str = (index + 1) + " / " + total;
    newText(imageCounter, str);
}