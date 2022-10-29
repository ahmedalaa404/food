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
    if(goals.attr("typeShow")=="c")
    {
      responsData(``,"categories.php",displayCatigory);
      console.log(responsData)
    }
    else if(goals.attr("typeShow")=="a")
    {
      responsData("list.php?",`${goals.attr("typeShow")}=list`,displayArea);
      console.log(goals.attr("typeShow"))
    }
    else if(goals.attr("typeShow")=="i")
    {
      responsData("list.php?",`${goals.attr("typeShow")}=list`,displayIngredient);
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
        // console.log(dataRes.meals[0]);
        show(dataRes);
        // Display(dataRes)
} 
responsData();
// async function responsData(type="https://www.themealdb.com/api/json/v1/1/search.php?s",show=Display )
// {
//   let SendReq=await fetch(`${type}`);
//         containerResponse = await SendReq.json();
//         dataRes=await containerResponse;
//         // console.log(dataRes);
//         show(dataRes);
//         // Display(dataRes)
// } 
// responsData();






// function Display data in the site 
let Rows=$('#rowDisplay');
// show Data in Row
 function Display(value)
{
        containerRow ='';
        for(let i=0 ; i<value.meals.length;i++)
        {
            containerRow+=`   
               <div class="overflow-hidden col-lg-3 col-md-6 col-sm-12 wow animate__zoomInDown rounded c-pointer" data-wow-delay="0s" data-wow-duration="1s" onclick='responsData("lookup.php?","i=${value.meals[i].idMeal}",clickFood)'>
            <div class="filem position-relative bg-info ">
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

// https://www.themealdb.com/api/json/v1/1/lookup.php?i=53052

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
            <p style="font-size: 10px !important;">${value.categories[i].strCategoryDescription}</p>
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
       concatTag+=`<p class="bg-danger mx-1">${splitTag[i]}</p>`
     }
}

  // let xxx=new Map(Object.entries(value.meals));
  for(let i=1;i<=20;i++)
    {
      console.log(value.meals[0].strMeasure`${i}`);
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
<a class="btn btn-danger" href='${value.meals[0].strYoutube}'>Youtube</a>
<a  class="btn btn-success" href="${value.meals[0].strSource}" target="_blank">Source</a>
</div>`;
    Rows.html(containerFood);
}



function displayArea(value)
{
  let concata=``;
  for(let i=0;i<value.meals.length;i++)
  {
    concata+=`<div class="col-lg-3 text-center">
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
if(value.meals[i].strDescription!=null)
{
    concata+=`<div class="col-lg-3 text-center overflow-hidden" style="height:155px">
    <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
    <h4>${value.meals[i].strIngredient}</h4>
    <p>${value.meals[i].strDescription}</p>
    </div>
    `;
}
  }
  Rows.html(concata);
}