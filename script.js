window.onload = function()
{
  bodyChild = document.body.children;
  bodyLastChild = document.body.lastChild;
  myName = document.getElementById("myName");
  navbar = document.getElementsByClassName('navbar')[0];
  darkModeContainer = document.getElementById("darkMode");
  darkModeIcon = document.getElementById("darkModeIcon");
  var myAge = document.getElementById("myAge");
  var bar = document.getElementsByClassName("bar");
  menu = document.getElementsByClassName("menu");
  var year = document.getElementById("year");
  var preloader = document.getElementById("preloader");
  isMenuShowing = false;
  
  // Preloader
  preloader.classList.add("finished");
  preloader.children[0].children[1].innerHTML = "Ready!";
  
  // Scroll Up Animation on Specific Element
  document.addEventListener("scroll", inView);
  document.addEventListener("scroll", darkModeMove);
  
  // Scroll Up Animation on Body Child
  for (n = 3 /*Start from 3rd child*/; n < bodyChild.length; n++)
  {
    if ((bodyChild[n].getBoundingClientRect().top + 200) <= window.innerHeight)
    {
      bodyChild[n].style.animation = `fadeInUp 1s ${300 * (n - 2)}ms 1 forwards`;
      animatedElement = n;
    }
    
    // Scroll Up Animation for My Name
    myName.style.animation = "nameAnimate 1s .8s 1 forwards";
    
    // Scroll Up Animation for Menu
    menu[0].style.animation = "zoomIn .5s 1.3s 1 forwards";
    
    // Scroll Up Animation for Dark Mode Icon
    darkMode.style.animation = "zoomIn .5s 1.5s 1 forwards";
  }
  
  // Dark Mode
  darkModeContainer.addEventListener("click", function()
  {
    if (localStorage.darkMode == "Off")
    {
      darkModeOn();
      
      // Dark Mode On Animation
      darkModeIcon.style.animation = "fadeIn2 .3s 1";
    }
    else
    {
      darkModeOff();
      
      // Dark Mode Off Animation
      darkModeIcon.style.animation = "fadeOut .3s 1";
    }
    showToast(`Dark Mode ${localStorage.darkMode}`);
  });
  
  // Show/hide Menu
  menu[0].addEventListener("click", function()
  {
    menu[0].classList.toggle("clicked");
    if (!isMenuShowing)
    {
      showMenu();
    }
    else
    {
      hideMenu();
    }
  });
  
  // Get Date
  d = new Date();
  // My Age
  myAge.innerHTML = d.getFullYear() - 2002;
  // Year
  year.innerHTML = d.getFullYear();
  
  // Draggable Bar
  for (n = 0; n < bar.length; n++)
  {
    bar[n].addEventListener("touchmove", function(event)
    {
      var barX = event.touches[0].clientX;
      this.style.width = `${barX - 15}px`;
    });
  }
  checkPlatform();
};
function inView() 
{
  for (n = animatedElement + 1; n < bodyChild.length - 1 && bodyChild[n].className != "toast"; n++)
  {
    if ((bodyChild[n].getBoundingClientRect().top + 150) <= window.innerHeight)
    {
      bodyChild[n].style.animation = "fadeInUp 1s 1 forwards";
    }
  }
  
  // Skill Bar Animation 
  if (document.getElementsByClassName("skill")[0].getBoundingClientRect().bottom <= window.innerHeight) 
  {
    var progressBar = document.getElementsByClassName("bar");
    for (n = 0; n < progressBar.length; n++)
    {
      progressBar[n].style.animation = `barAnimate 1s ${200 * n}ms 1 forwards`;
    }
  }
  
  // Projects Animations
  if ((document.getElementsByClassName("projectContainer")[0].getBoundingClientRect().top + 290) <= window.innerHeight)
  {
    var projects = document.getElementsByClassName("projects");
    for (n = 0; n < projects.length; n++)
    {
      projects[n].style.animation = `fadeInUp 1s ${200 * n}ms 1 forwards`;
    }
  }
  
  // Contact Animation
  if ((document.getElementById("contact").getBoundingClientRect().top + 150) <= window.innerHeight)
  {
    var socialIcons = document.getElementsByClassName("socialIconContainer");
    for (n = 0; n < socialIcons.length; n++)
    {
      socialIcons[n].style.animation = `fadeInLeft 1s ${300 * n}ms 1 forwards`;
    }
  }
  
  // Copyright Bar Animation
  if (document.getElementById("copyright").getBoundingClientRect().bottom <= window.innerHeight)
  {
      var copyrightBar = document.querySelector("#copyright > div");
      copyrightBar.style.width = "50px";
      setTimeout(function()
      {
        document.removeEventListener("scroll", inView);
      }, 1000);
  }
}

function showMenu()
{
  isMenuShowing = true;
  menuIC = document.getElementsByClassName("menuItemsContainer");
  
  if (menuIC.length < 1)
  {
    menuItemsContainer = document.createElement("div");
    var home = document.createElement("a");
    var contact = document.createElement("a");
    var projects = document.createElement("a");
    
    menuItemsContainer.className = "menuItemsContainer";
    
    menuItemsContainer.appendChild(home);
    menuItemsContainer.appendChild(projects);
    menuItemsContainer.appendChild(contact);
    document.body.appendChild(menuItemsContainer);
    
    home.innerHTML = "Home";
    home.href = "https://thuhtoosan.github.io/";
    projects.innerHTML = "Projects";
    projects.href = "#projects";
    projects.addEventListener("click", function()
    {
      hideMenu();
      menu[0].classList.remove("clicked");
    });
    contact.innerHTML = "Contact";
    contact.href = "#contact";
    contact.addEventListener("click", function()
    {
      hideMenu();
      menu[0].classList.remove("clicked");
    });
  }
  
  menuItemsContainer.style.animation = "showMenu 1s 1 forwards";
  for (n = 0; n < menuItemsContainer.children.length; n++)
  {
    menuItemsContainer.children[n].style.animation = `zoomIn .5s .${n}s 1 forwards`;
  }
  document.documentElement.style.overflow = "hidden";
}

function hideMenu()
{
  isMenuShowing = false;
  
  menuItemsContainer.style.animation = "hideMenu .9s 1";
  menuItemsContainer.style.animationFillMode = "forwards";
  for (n = 0; n < menuItemsContainer.children.length; n++)
  {
    menuItemsContainer.children[n].style.animation = `zoomOut .5s .${n + 1}s 1`;
    menuItemsContainer.children[n].style.opacity = "1";
  }
  setTimeout(function()
  {
    document.documentElement.style.overflow = "auto";
    document.body.removeChild(menuItemsContainer);
  }, 1000);
}

function checkPlatform()
{
  var android = navigator.userAgent.match(/Android/i);
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  var fbLink = document.getElementsByClassName("fb")[0];
  
  // Change FB link to open in app if OS is Android or iOS
  if (android || iOS)
  {
    fbLink.href = "fb://profile/100010894442629";
  }
  else 
  {
    inView();
  }
}

function checkTheme()
{
  root = document.documentElement;
  
  if (localStorage.darkMode === undefined)
  {
    localStorage.darkMode = "Off";
  }
  else if (localStorage.darkMode == "On")
  {
    darkModeOn();
  }
}
checkTheme();

// Dark Mode Icon Move
function darkModeMove()
{
  scrollY = document.documentElement.scrollTop;
  if (scrollY <= 100)
  {
    distanceFromRight = -50 + (scrollY/2);
    
    darkMode.style.transform = `translateX(${distanceFromRight}px)`;
  }
  
  // Error Fallback (When scroll fast)
  else if (scrollY > 100 && distanceFromRight != 0)
  {
    distanceFromRight = 0;
    
    darkMode.style.transform = "translateX(0)";
  }
}

// Dark Mode ON
function darkModeOn()
{
  var meta = document.getElementsByTagName("meta");
  
  localStorage.darkMode = "On";
  root.style.setProperty("--white", "#2c2c2c");
  root.style.setProperty("--black", "#ccc");
  root.style.setProperty("--second-color", "#d98100");
  root.style.background = "#000";
  root.style.setProperty("--background-image", "url('images/invert-background.png')");
  root.style.setProperty("--background-opacity", ".8");
  
  // Change Status Bar Color 
  for (n = 4; n <= 6; n++)
  {
    meta[n].content = "#000";
  }
  
  // Change Dark Mode Icon (ON)
  setTimeout(function()
  {
    darkModeIcon.className = "fas fa-moon";
  }, 300);
}

// Dark Mode OFF
function darkModeOff()
{
  var meta = document.getElementsByTagName("meta");
  
  localStorage.darkMode = "Off";
  root.style.setProperty("--white", "#fff");
  root.style.setProperty("--black", "#000");
  root.style.setProperty("--second-color", "#FFA726");
  root.style.background = "none";
  root.style.setProperty("--background-image", "url('images/background.png')");
  root.style.setProperty("--background-opacity", ".4");
  
  // Change Status Bar Color
  for (n = 4; n <= 6; n++)
  {
    meta[n].content = "#fff";
  }
  
  // Change Dark Mode Icon (OFF)
  setTimeout(function()
  {
    darkModeIcon.className = "far fa-moon";
  }, 300);
}

// Toast 
function showToast(text)
{
  var toast = document.createElement("div");
  toast.innerHTML = text;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(function()
  {
    document.body.removeChild(toast);
  }, 2500);
}