window.addEventListener("load", () =>   {
    "use strict"
    const start__count_text = document.querySelector(".start__count")
    const start__btn = document.querySelector(".start__btn")
    const hero__start = document.querySelector(".hero__start")
    let hero__victorina  = document.querySelector(".hero__victorina")
    let template = document.querySelector("template").content 
    let hero__end = document.querySelector(".hero__end")
    let  hero__end__result = document.querySelector(".hero__end__result")
    let start__count = 1;
    let trues = 0;
    let falses = 0
    let idx = 0;
    
    let startInterval;
   function  handleTypeFunction(type, element, truesFalses) {
        if(type === "display" &&  truesFalses === false){
            element.classList.add("d-none")
            element.classList.remove("d-block")
        }else if(type === "display" && truesFalses === true){
            element.classList.remove("d-none")
            element.classList.add("d-block")
        }  else if(type === "color" && truesFalses === true){
            element.classList.remove("bg-dark")
            element.classList.add("bg-success")
        }else if(type === "color" && truesFalses === false){
            element.classList.remove("bg-dark")
            element .classList.add("bg-danger")
        }
     }
      let  handleEnd = () =>{

        if(savollar.length === trues){
            hero__end__result.textContent = "sizning vapshe supersizda"
        } else if((savollar.length / 2) < trues){
            hero__end__result.textContent = "sizning natijangiz yaxshi"
        } else if((savollar.length / 2) > trues){
            hero__end__result.textContent = "sizning natijangiz yaxshmas    "
            handleTypeFunction("color", hero__end__result, false)
        }
     };
     function handleStart(){
        startInterval =  setInterval(() => {
            
            if(start__count > 0){
                start__count -- 
                start__count_text.textContent = start__count
            }else{
                 clearInterval(startInterval)
                 hero__start.classList.add("d-none")
                 hero__victorina.classList.remove("d-none")
                 handleVictorina([savollar[idx]])
            }

        }, 1000)
    }
    start__btn.addEventListener("click", (event) => {
        event.target.classList.add("d-none")
        if(start__btn.getAttribute("class").includes("d-none")){
            start__count_text.classList.remove("d-none")
            handleStart()
           
        }
    })
    function handleVictorina(arr){

            if(arr?.length){
                hero__victorina.innerHTML = null
                for(let i = 0; i<arr.length; i++){
                    let clone  = template.cloneNode(true)
                    let savol = clone.querySelector(".savol")
                    savol.textContent = arr[i].savol
                    let variant__ul = clone.querySelector(".variant__ul")
                    let variants = arr[i].variants
                    if(variants?.length){
                        for(let si = 0; si < variants.length; si++){
                            let li = document.createElement("li")
                            li.className = "variant bg-dark p-2 rounded text-light text-center fs-4 my-2",
                            li.textContent = variants[si]
                            variant__ul.appendChild(li)
                        }
                    }
                    hero__victorina.appendChild(clone)
                }       
            }
    }
    function handleTrueVariant(li){
      trues ++
      handleTypeFunction("color",li , true)
     

    }
    function handleFalseVariant(li){
       falses++
      handleTypeFunction("color", li, false)
    }
    function handleNextQuestion() {
        if(savollar.length -1 > idx){
            idx ++
            handleVictorina([savollar[idx]])
        }else{
           handleTypeFunction("display", hero__victorina, false)
           handleTypeFunction("display", hero__end, true)
        }

    }
    window.addEventListener("click",(event) => {
        if(event.target.matches(".variant")){
            let text = event.target.textContent
            if(text === savollar[idx].javob){
                handleTrueVariant(event.target)
            }else{
              handleFalseVariant(event.target)
            }
            setTimeout(() =>{
                handleNextQuestion()

            },500)
        }
        
    })
    handleEnd()
});