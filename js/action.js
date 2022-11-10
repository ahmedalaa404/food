let Rows=$('#rowDisplay');
let showDataSection=document.querySelector('.showData');
let contactSection = document.querySelector('.contact');
let searchSection=document.querySelector('.search')
function showSearchSection()
{
  searchSection.classList.replace('d-none','d-block')
  Rows.html("");
}
function hiddenSearchSection()
{
  searchSection.classList.replace('d-block','d-none')
}

function showData()
{
  showDataSection.classList.replace('d-none','d-block')
}
function hiddenData()
{
  showDataSection.classList.replace('d-block','d-none')
}


function showContact()
{
  contactSection.classList.replace('d-none','d-block')
}
function hiddemContact()
{
  contactSection.classList.replace('d-block','d-none')
}
// to prevent the reload in the site when u click any link



// loading screen and doc ready
  $(document).ready(
      function ()
      {
          $('.loading').fadeOut(1000,function(){ $('.loading').remove();});

      }
  );
  // end of loading screen

// plugins Jquery
  new WOW().init();
// end plugins 

// start navbar  aside in the left of document
let iconeOpen=$("i.iconeOpen");
let navs=$(".nav-site");
let navbar=$(".nav");
navbar.css('left',`-${navs.innerWidth()}px`)

iconeOpen.click(
    function()
    {
        iconeOpen.toggleClass('fa-xmark');
        if(navbar.css('left')=='0px')
        {

            navbar.animate({left:`-${navs.innerWidth()}`},500);
            $(".nav-links p").removeClass('animate__fadeInUpBig');
            $(".nav-links p").css('animation-name','fadeOutDownBig');
        }
        else
        {
          $(".nav-links p").css('animation-name','fadeInUpBig');
            navbar.animate({left:`0px`},500);
        }
    }
)


// end nav of aside 

// function of click in any links of nav
$('.nav-links p a[typeShow]').click(
   function(e)
  {
    $(document).click(function (event) {
      event.preventDefault();
    });
    let goals = $(e.target);
    if(goals.attr("typeShow")=="search")
    { 
      hiddemContact();
      showSearchSection();
      showData()
    }

    if(goals.attr("typeShow")=="c")
    {
      responsData(``,"categories.php",displayCatigory);
      hiddemContact();
      hiddenSearchSection();
      showData();
    }
    else if(goals.attr("typeShow")=="a")
    {   
      responsData("list.php?",`${goals.attr("typeShow")}=list`,displayArea);
      hiddemContact();
      hiddenSearchSection();
      showData()

    }
    else if(goals.attr("typeShow")=="i")
    {
      responsData("list.php?",`${goals.attr("typeShow")}=list`,displayIngredient);
      hiddemContact();
      hiddenSearchSection();
      showData()
    }


    else if(goals.attr("typeShow")=="ContactUs")
    {
      hiddenData();
      hiddenSearchSection();
      showContact();
      contact();
    }

    }
)
// respons Data from Api 
let containerResponse;
let dataRes;

async function responsData(type="search.php?",query="s",show=Display )
{
  let SendReq=await fetch(`https://www.themealdb.com/api/json/v1/1/${type}${query}`);
        containerResponse = await SendReq.json();
        dataRes=await containerResponse;
        show(dataRes);
        // Display(dataRes)
} 
responsData();
// function Display data in the site 

// show Data in Row


 function Display(value)
{
        containerRow ='';
        for(let i=0 ; i<value.meals.length;i++)
        {
            containerRow+=`   
               <div class="overflow-hidden col-lg-3 col-md-6 col-sm-12 wow animate__zoomInDown rounded c-pointer" data-wow-delay="0s" data-wow-duration="1s" onclick="responsData('lookup.php?','i=${value.meals[i].idMeal}',clickFood )">
            <div class="filem position-relative">
              <img src="${value.meals[i].strMealThumb}" alt="" class="w-100">
              <div class="overflow-hidden cover-image position-absolute h-100 w-100 top-100 d-flex justify-content-center align-items-center">
                <div class="text-center">
                  <h6 class="pt-sm-4 mb-0 py-lg-3">${value.meals[i].strMeal}</h6>
                </div>
              </div>
            </div>
          </div>`
        }
        Rows.html(containerRow);
}







function displayCatigory(value)
{
  containerRow ='';
  for(let i=0 ; i<value.categories.length;i++)
  {
      containerRow+=`   
         <div class="overflow-hidden col-lg-3 col-md-6 col-sm-12 wow animate__zoomInDown rounded c-pointer" data-wow-delay="0s" data-wow-duration="1s" onclick='responsData("filter.php?","c=${value.categories[i].strCategory}",Display)'>
      <div class="filem position-relative">
        <img src="${value.categories[i].strCategoryThumb}" alt="" class="w-100">
        <div class="overflow-hidden cover-image position-absolute h-100 w-100 top-100 d-flex justify-content-center align-items-center">
          <div class="text-center text-black">
            <h6 class="pt-sm-4 mb-0 py-lg-3">${value.categories[i].strCategory}</h6>
            <p style="font-size: 10px !important;height: 76px;line-height: 1;">${value.categories[i].strCategoryDescription}</p>
          </div>
        </div>
      </div>
    </div>`
  }
  Rows.html(containerRow);
}



function clickFood(value)
{
  let concat=``;
  let concatTag=``;
  // console.log(dataRes.meals[x])
  let splitTag;
if(value.meals[0].strTags!=undefined)
{
     splitTag=value.meals[0].strTags.split(",");
     for(let i=0;i<splitTag.length;i++)
     {
       concatTag+=`<p class="bg-danger mx-1 p-1 rounded-1">${splitTag[i]}</p>`
     }
}
        let xxx=new Map(Object.entries(dataRes.meals[0]));
        for(let i=1;i<=20;i++)
          {
            if(xxx.get(`strMeasure${i}`)!=0)
                  {
              concat+=`<i class="alert-success my-2 me-1 p-1 rounded-1">${xxx.get(`strMeasure${i}`)}${xxx.get(`strIngredient${i}`)}</i>`
            } 
          }
        let containerFood=`<div class="col-lg-4 ">
        <div class="div-imag w-100">
          <img src="${value.meals[0].strMealThumb}" alt="" class="w-100">
          <h2>${value.meals[0].strMeal}</h2>
        </div>
        </div>
        <div class="col-lg-8">
        <h4>Instructions</h4>
        <p>${value.meals[0].strInstructions}</p>
        <p> <span class="">Area:</span>${value.meals[0].strArea}</p>
        <p> <span class="">catogery:</span>${value.meals[0].strCategory}</p>
        <h3>Recipes :</h3>
        <ul class="d-flex list-unstyled flex-wrap w-100">
          ${concat}
                    </ul>
        <h3>tags :</h3>
        <div class="d-flex">
            ${concatTag}
        </div>
        <a class="btn btn-danger" href='${value.meals[0].strYoutube}'target="_blank">Youtube</a>
        <a  class="btn btn-success" href="${value.meals[0].strSource}" target="_blank">Source</a>
        </div>`;
  Rows.html(containerFood);
}






function displayArea(value)
{
  let concata=``;
  for(let i=0;i<value.meals.length;i++)
  {
    concata+=`<div class="col-lg-3 text-center c-pointer"  onclick="responsData('filter.php?','a=${value.meals[i].strArea}',Display )">
    <i class="fa-solid fa-city fa-3x my-2"></i>
    <h4>${value.meals[i].strArea}</h4>
    </div>
    `;
  }
  Rows.html(concata);
}

function displayIngredient(value)
{
  let concata=``;
  for(let i=0;i<value.meals.length;i++)
  {
if(value.meals[i].strType!=null)
{
    concata+=`<div class="col-lg-3 text-center overflow-hidden c-pointer" style="height:155px" onclick="responsData('filter.php?','i=${value.meals[i].strIngredient}',Display )">
    <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
    <h4>${value.meals[i].strIngredient}</h4>
    <p>${value.meals[i].strDescription}</p>
    </div>
    `;
}
  }
  Rows.html(concata);
}








function contact()
{    
let inpName=document.querySelector('.inpName');
let messageName=document.querySelector('.inpName+div');

let inpPhone=document.querySelector('.inpPhone');
let messagePhone=document.querySelector('.inpPhone+div');

let inpEmail=document.querySelector('.inpEmail');
let messageEmail=document.querySelector('.inpEmail+div');

let inpPassword=document.querySelector('.inpPassword');
let messagePassword=document.querySelector('.inpPassword+div');

let inpAge=document.querySelector('.inpAge');
let messageAge=document.querySelector('.inpAge+div');

let inpRePassword=document.querySelector('.inpRePassword');
let messageRepassowrd=document.querySelector('.inpRePassword+div');
let btnSend=document.querySelector('.send');

inpName.addEventListener('input',function()
{
  regux(/^[a-zA-z]{1,20}/,this,messageName);
  checkbtn();
})


inpPhone.addEventListener('input',function()
{
  regux(/^(01)[0-9]{9}$/,this,messagePhone);
  checkbtn();
})


inpEmail.addEventListener('input',function()
{
  regux(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,this,messageEmail);
  checkbtn();
})


inpPassword.addEventListener('input',function()
{
  regux(/^[a-z0-9]{8,20}$/,this,messagePassword);

  if(this.value==inpRePassword.value)
  {
    Validsuccess(inpRePassword,messageRepassowrd);

  }
  else
  {
    Validwrong(inpRePassword,messageRepassowrd);
  }
  checkbtn();
})


inpAge.addEventListener('input',function()
{
  regux(/^([1-9]{1}[0-9]{1}|100)$/,this,messageAge);
  checkbtn();
})

inpRePassword.addEventListener('input',function()
{
  if(this.value==inpPassword.value)
  {
    Validsuccess(this,messageRepassowrd);

  }
  else
  {
    Validwrong(this,messageRepassowrd);
  }
        checkbtn();
})

function checkbtn()
{
  if(inpName.classList.contains('is-valid')==true&&
  inpPhone.classList.contains('is-valid')==true
  &&inpEmail.classList.contains('is-valid')==true 
  &&inpPassword.classList.contains('is-valid')==true
  &&inpAge.classList.contains('is-valid')==true
  &&inpRePassword.classList.contains('is-valid')==true)
  {
    btnSend.removeAttribute('disabled');
    btnSend.classList.replace('btn-outline-danger','btn-outline-success');
  }
  else
  {
    btnSend.setAttribute('disabled','');
    btnSend.classList.replace('btn-outline-success','btn-outline-danger');
  }
}

}

function Validsuccess(ele,message)
{
  if(ele.classList.contains('is-invalid')==true)
  {
    ele.classList.replace('is-invalid','is-valid');
    ele.classList.replace('border-danger','border-success');
    HiddenMessage(message);
  }
}
function Validwrong(ele,message)
{
  if(ele.classList.contains('is-valid')==true)
  {
       ele.classList.replace('is-valid','is-invalid');
      ele.classList.replace('border-success','border-danger');
  }
  showMessage(message);

}

function showMessage(ele)
{
    if(ele.classList.contains('d-none')==true)
    {
      ele.classList.replace('d-none','d-block')
    }

}
function HiddenMessage(ele)
{
    if(ele.classList.contains('d-block')==true)
    {
      ele.classList.replace('d-block','d-none')
    }

}

function regux(value,ele,message)
{
  let reg=value;
  if(reg.test(ele.value)==true)
  {
    Validsuccess(ele,message);
  }
  else
  {
    Validwrong(ele,message);
  }
}








