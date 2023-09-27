const API_KEY="eb94c1d645174438b8d602f7b1a5cf0a";
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=>fetchnews('today news'));

async function fetchnews(query)
{
     const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);

     const data=await res.json();

     console.log(data);

    binddata(data.articles); 
}

function binddata(articles)
{
    const cardscontainer=document.getElementById('cards-container');

    const newscardtemplate=document.getElementById('template-card-news');

    cardscontainer.innerHTML="";

    articles.forEach((x)=> {

        if(!x.urlToImage) return ;

        const clonecard=newscardtemplate.content.cloneNode(true);

        fillclonecard(clonecard,x);

        cardscontainer.appendChild(clonecard);
        
        
    });



}


function fillclonecard(clonecard,x)
{
    
    const newsimage=clonecard.querySelector('#news-image');
    const newstitle=clonecard.querySelector('#news-title');
    const newsdesc=clonecard.querySelector('#news-desc');
    const newssource=clonecard.querySelector('#news-source');
    newsimage.src=x.urlToImage;
    newstitle.innerHTML=x.title;
    newsdesc.innerHTML=x.description;
    const date=
    newssource.innerHTML=x.source.name;

    clonecard.firstElementChild.addEventListener('click',()=>{
        window.open(x.url,"_blank")
    })



}


// nav items
let currentselect=null;
function onclicknav(id)
{
    fetchnews(id);
    const navitem=document.getElementById(id);
    if(currentselect)currentselect.classList.remove('active')
    currentselect=navitem;
    currentselect.classList.add('active');
}

// handling search input

const searchbutton=document.getElementById('searchbutton');
const searchtext=document.getElementById('searchtext');

searchbutton.addEventListener('click',()=>
{
    const text=searchtext.value;
    if(!text) return;
    fetchnews(text); 

})
// reload handling here
function reload()
{
    window.location.reload();
}