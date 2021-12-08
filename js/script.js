document.addEventListener("DOMContentLoaded", () => {
  
function Card()
{
       this.timeOption="Weekly";

    this.setData=function(value){
        this.data=value;
        this.element=document.getElementById(this.data.title);
        this.timeElement=this.element.querySelector(".activityTime");
        this.previousTimeElement=this.element.querySelector(".previousTime");

    };

    this.changeTimeOption=function(value){
        this.timeOption=value;
        this.display();
    };

    this.display=function()
    {
        let time;
        let previousTime;
        switch(this.timeOption)
        {
            case "Weekly":{
                time=this.data.timeframes.weekly.current+"hrs";
                previousTime="Last Week - "+this.data.timeframes.weekly.previous+"hrs";
            }
            break;

            case "Daily":{
                time=this.data.timeframes.daily.current+"hrs";
                previousTime="Last Day - "+this.data.timeframes.daily.previous+"hrs";
            }
            break;

            case "Monthly":{
                time=this.data.timeframes.monthly.current+"hrs";
                previousTime="Last Month - "+this.data.timeframes.monthly.previous+"hrs";
            }
            break;
        }
        this.timeElement.innerHTML=time;
        this.previousTimeElement.innerHTML=previousTime;
    };
 }

function Page()
{
  
   this.option=document.querySelectorAll("#timeTrackingOption span");
   
   
   this.setOption=function(){

        for(let i=0;i<this.option.length;i++)
        {
            this.option[i].addEventListener("click",function(e){page.changeOption(e.target.innerHTML);});
        }
    this.changeOption("Weekly");
   };

     this.getData=async function(){
        let response=fetch("js/data.json");
        let data=response.then(data=> data.json());
        return data;
    };
    
    this.setCardList=async function(){

        let data=await this.getData();
        let list=[];
        let element;   
     
         for(let i=0;i<data.length;i++)
        {
            element=new Card();
            element.setData(data[i]);
            list.push(element);   
        }
        this.cardList=list;          
    };

    this.changeOption=async function(value)
    {
        await this.setCardList();
        for(let j=0;j<this.cardList.length;j++)
        {
            this.cardList[j].changeTimeOption(value);
        }
    };
}

let page=new Page();
page.setOption();
});